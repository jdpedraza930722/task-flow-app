    // assets/js/modules/state.js

    /**
     * The application's reactive state.
     * All dynamic data should be stored here.
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
     * This function is responsible for hydrating the state on startup.
     */
    export function loadData() {
        state.tasks = (JSON.parse(localStorage.getItem('tasks')) || []).map(task => {
            if (task.dueDate && typeof task.dueDate === 'string') {
                return { ...task, dueDate: new Date(task.dueDate) };
            }
            return task;
        });
        state.binnedTasks = JSON.parse(localStorage.getItem('binnedTasks')) || [];
        state.currentLanguage = localStorage.getItem('language') || 'es';
    }

    /**
     * Saves the current state to localStorage.
     * This ensures data persistence across sessions.
     */
    export function saveData() {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        localStorage.setItem('binnedTasks', JSON.stringify(state.binnedTasks));
        localStorage.setItem('language', state.currentLanguage);
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

    export const formatDateToYYYYMMDD = (date) => {
        if (!date || !(date instanceof Date)) return '';
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };
    