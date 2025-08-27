    // assets/js/modules/ui.js
    import { dom, icons } from './dom.js';
    import { state, getStartOfWeek, isSameDay, formatDateToYYYYMMDD } from './state.js';
    import { getFilteredAndSortedTasks } from '../app.js'; // Lo importaremos desde app.js

    /**
     * Renders all dynamic parts of the application.
     * This is the main function to call after any state change.
     */
    export function renderAll() {
        renderWeekNavigator();
        renderDateHeader();
        const tasksToRender = getFilteredAndSortedTasks();
        renderTasks(tasksToRender);
        updateStats();
        // updateChart(); // Lo añadiremos después
        updateBinBadge();
        updateFilterBadges();
    }

    function renderWeekNavigator() {
        dom.daySelector.innerHTML = '';
        const startOfWeek = getStartOfWeek(state.selectedDate);
        const today = setTimeToZero(new Date());
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            const dayBtn = document.createElement('button');
            dayBtn.className = 'day-btn';
            dayBtn.dataset.date = formatDateToYYYYMMDD(day);
            if (isSameDay(day, setTimeToZero(state.selectedDate))) dayBtn.classList.add('active');
            if (isSameDay(day, today)) dayBtn.classList.add('today');
            dayBtn.innerHTML = `<span class="day-name">${day.toLocaleDateString(state.currentLanguage, { weekday: 'short' })}</span><span class="day-number">${day.getDate()}</span>`;
            dom.daySelector.appendChild(dayBtn);
        }
    }

    function renderDateHeader() {
        dom.currentDateHeader.textContent = state.selectedDate.toLocaleDateString(state.currentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    function renderTasks(tasksToRender) {
        dom.taskList.innerHTML = '';
        if (tasksToRender.length === 0) {
            dom.taskList.innerHTML = `<p style="text-align:center;color:var(--color-text-light)">No hay tareas para este día.</p>`;
            return;
        }
        tasksToRender.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = `task-list__item task-list__item--${task.priority || 'normal'}`;
            if (task.completed) listItem.classList.add('completed');
            listItem.dataset.id = task.id;
            listItem.innerHTML = `
                <input type="checkbox" class="task-list__checkbox" ${task.completed ? 'checked' : ''}>
                <label class="task-list__label">${task.text}</label>
                <input type="text" class="task-list__edit-input" value="${task.text}">
                <div class="task-list__actions">
                    <button class="task-list__button task-list__priority-button" aria-label="Asignar prioridad">${icons.tag}</button>
                    <button class="task-list__button task-list__edit-button" aria-label="Editar tarea">${icons.edit}</button>
                    <button class="task-list__button task-list__delete-button" aria-label="Mover a la papelera">${icons.delete}</button>
                </div>`;
            dom.taskList.appendChild(listItem);
        });
    }

    export function renderBinnedTasks() {
        dom.binList.innerHTML = '';
        if (state.binnedTasks.length === 0) {
            dom.binList.innerHTML = `<p style="text-align:center;color:var(--color-text-light)">La papelera está vacía.</p>`;
            dom.emptyBinBtn.disabled = true;
        } else {
            dom.emptyBinBtn.disabled = false;
            state.binnedTasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.className = 'bin-list__item';
                listItem.dataset.id = task.id;
                listItem.innerHTML = `<span class="bin-list__text">${task.text}</span><button class="bin-list__restore-btn" aria-label="Restaurar tarea">${icons.restore}</button>`;
                dom.binList.appendChild(listItem);
            });
        }
    }

    function updateStats() {
        const completed = state.tasks.filter(t => t.completed).length;
        dom.pendingCountEl.textContent = state.tasks.length - completed;
        dom.completedCountEl.textContent = completed;
    }

    function updateBinBadge() {
        dom.binBadge.textContent = state.binnedTasks.length;
        dom.binBadge.classList.toggle('visible', state.binnedTasks.length > 0);
    }

    function updateFilterBadges() {
        const dailyTasks = state.tasks.filter(task => task.dueDate && isSameDay(new Date(task.dueDate), setTimeToZero(state.selectedDate)));
        dom.allBadge.textContent = dailyTasks.length;
    }

    export function showConfirmModal(titleKey, textKey, callback) {
        // Lógica del modal de confirmación
    }

    export function applyTheme(theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        dom.themeToggle.checked = (theme === 'dark');
        localStorage.setItem('theme', theme);
    }
    