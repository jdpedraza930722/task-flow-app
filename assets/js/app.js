    // assets/js/app.js
    import { translations } from './modules/i18n.js';
    import { dom } from './modules/dom.js';
    import { state, loadData, saveData, setTimeToZero, isSameDay } from './modules/state.js';
    import { renderAll, renderBinnedTasks, applyTheme } from './modules/ui.js';

    /**
     * Filters and sorts tasks based on the current state.
     * Exported because it's needed by the UI module to render tasks.
     * @returns {Array} The filtered and sorted array of tasks.
     */
    export function getFilteredAndSortedTasks() {
        const selectedDateZero = setTimeToZero(state.selectedDate);
        let filtered = state.tasks.filter(task => task.dueDate && isSameDay(new Date(task.dueDate), selectedDateZero));

        if (state.searchTerm) {
            filtered = filtered.filter(task => task.text.toLowerCase().includes(state.searchTerm.toLowerCase()));
        }

        // Add sorting and filtering logic here...
        return filtered;
    }

    /**
     * Adds a new task to the state.
     * @param {string} text - The content of the task.
     */
    function addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
            priority: 'normal',
            dueDate: state.selectedDate
        };
        state.tasks.unshift(newTask);
        saveData();
        renderAll();
    }

    /**
     * Centralized function to handle all event listeners.
     */
    function addEventListeners() {
        dom.taskForm.addEventListener('submit', event => {
            event.preventDefault();
            const text = dom.taskInput.value.trim();
            if (text) {
                addTask(text);
                dom.taskInput.value = '';
            }
        });

        dom.openBinBtn.addEventListener('click', () => {
            renderBinnedTasks();
            dom.binModalOverlay.classList.add('visible');
        });

        // Add all other event listeners here...
    }

    /**
     * Initializes the application.
     */
    function init() {
        state.selectedDate = setTimeToZero(new Date());
        loadData();

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        addEventListeners();
        renderAll();
        console.log("Application fully loaded and initialized.");
    }

    // Start the application when the DOM is ready.
    document.addEventListener('DOMContentLoaded', init);
    