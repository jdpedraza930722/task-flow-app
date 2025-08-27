// assets/js/modules/state.js

/**
 * The application's reactive state.
 */
export const state = {
    tasks: [],
    binnedTasks: [],
    selectedDate: new Date(),
    currentLanguage: 'es',
    currentFilter: 'all',
    currentSort: 'creationDate',
    searchTerm: '',
    progressChart: null,
    onConfirmCallback: null,
    taskToModifyId: null,
};

/**
 * Loads tasks and settings from localStorage.
 */
export function loadData() {
    state.tasks = (JSON.parse(localStorage.getItem('tasks')) || []).map(task => {
        if (task.dueDate && typeof task.dueDate === 'string') {
            return { ...task, dueDate: new Date(task.dueDate) };
        }
        return task;
    });
    state.binnedTasks = JSON.parse(localStorage.getItem('binnedTasks')) || [];
}

/**
 * Saves the current state to localStorage.
 */
export function saveData() {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('binnedTasks', JSON.stringify(state.binnedTasks));
}

// --- DATE HELPER FUNCTIONS ---

export const setTimeToZero = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

export const getStartOfWeek = (date) => {
    const d = setTimeToZero(new Date(date));
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
};

export const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

export const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return setTimeToZero(new Date(year, month - 1, day));
};
    
export const formatDateToYYYYMMDD = (date) => {
    if (!date || !(date instanceof Date)) return '';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

/**
 * Filters and sorts tasks based on the current state.
 */
export function getFilteredAndSortedTasks() {
    const selectedDateZero = setTimeToZero(state.selectedDate);
    let filtered = state.tasks.filter(task => task.dueDate && isSameDay(new Date(task.dueDate), selectedDateZero));

    if (state.searchTerm) {
        filtered = filtered.filter(task => task.text.toLowerCase().includes(state.searchTerm.toLowerCase()));
    }

    if (state.currentFilter === 'priority') {
        filtered = filtered.filter(task => !task.completed && (task.priority === 'urgent' || task.priority === 'important'));
    } else if (state.currentFilter === 'completed') {
        filtered = filtered.filter(task => task.completed);
    }

    return filtered.sort((a, b) => {
        switch (state.currentSort) {
            case 'priority':
                const priorityOrder = { 'urgent': 1, 'important': 2, 'normal': 3 };
                const priorityA = priorityOrder[a.priority] || 3;
                const priorityB = priorityOrder[b.priority] || 3;
                if (priorityA !== priorityB) return priorityA - priorityB;
                return a.id - b.id;
            case 'alphabetical':
                return a.text.localeCompare(b.text);
            case 'status':
                if (a.completed !== b.completed) return a.completed - b.completed;
                return a.id - b.id;
            case 'creationDate':
            default:
                return a.id - b.id;
        }
    });
}
