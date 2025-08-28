// assets/js/modules/ui.js
import { dom, icons } from './dom.js';
import { state, getStartOfWeek, isSameDay, setTimeToZero, formatDateToYYYYMMDD, getFilteredAndSortedTasks } from './state.js';

/**
 * Renders all dynamic parts of the application based on the current state.
 */
export function renderAll() {
    renderWeekNavigator();
    renderDateHeader();
    const tasksToRender = getFilteredAndSortedTasks();
    renderTasks(tasksToRender);
    updateStats();
    updateChart();
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
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    dom.currentWeekDisplay.textContent = `${startOfWeek.toLocaleDateString(state.currentLanguage, { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString(state.currentLanguage, { day: 'numeric', month: 'short', year: 'numeric' })}`;
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
        const today = setTimeToZero(new Date());
        const taskDueDate = new Date(task.dueDate);
        const isOverdue = taskDueDate && taskDueDate < today && !task.completed;
        const formattedDate = task.dueDate ? taskDueDate.toLocaleDateString(state.currentLanguage, { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
        
        listItem.innerHTML = `
            <input type="checkbox" class="task-list__checkbox" ${task.completed ? 'checked' : ''}>
            <label class="task-list__label">${task.text}</label>
            <span class="task-duedate ${isOverdue ? 'overdue' : ''}">${formattedDate}</span>
            <input type="text" class="task-list__edit-input" value="${task.text}">
            <div class="task-list__actions">
                <button class="task-list__button task-list__duedate-button" aria-label="Asignar fecha">${icons.calendar}</button>
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

function updateChart() {
    const allTasks = state.tasks;
    const completed = allTasks.filter(t => t.completed).length;
    const pending = allTasks.length - completed;
    const data = {
        labels: ['Completadas', 'Pendientes'],
        datasets: [{ data: [completed, pending], backgroundColor: ['#2ecc71', '#f39c12'], borderWidth: 0 }]
    };
    if (state.progressChart) {
        state.progressChart.data = data;
        state.progressChart.update();
    } else {
        state.progressChart = new Chart(dom.chartCanvas, {
            type: 'doughnut',
            data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                cutout: '75%'
            }
        });
    }
}

function updateBinBadge() {
    dom.binBadge.textContent = state.binnedTasks.length;
    dom.binBadge.classList.toggle('visible', state.binnedTasks.length > 0);
}

function updateFilterBadges() {
    const selectedDateZero = setTimeToZero(state.selectedDate);
    const dailyTasks = state.tasks.filter(task => task.dueDate && isSameDay(new Date(task.dueDate), selectedDateZero));
    const allCount = dailyTasks.length;
    const priorityCount = dailyTasks.filter(t => !t.completed && (t.priority === 'urgent' || t.priority === 'important')).length;
    const completedCount = dailyTasks.filter(t => t.completed).length;

    dom.allBadge.textContent = allCount;
    dom.allBadge.classList.toggle('visible', allCount > 0);
    dom.priorityBadge.textContent = priorityCount;
    dom.priorityBadge.classList.toggle('visible', priorityCount > 0);
    dom.completedBadge.textContent = completedCount;
    dom.completedBadge.classList.toggle('visible', completedCount > 0);
}

export function showConfirmModal(titleKey, textKey, callback) {
    dom.confirmModalTitle.textContent = state.translations[titleKey] || titleKey;
    dom.confirmModalText.textContent = state.translations[textKey] || textKey;
    state.onConfirmCallback = callback;
    dom.confirmModalOverlay.classList.add('visible');
}

export function closeConfirmModal() {
    dom.confirmModalOverlay.classList.remove('visible');
    state.onConfirmCallback = null;
}

/**
 * Applies the currently loaded translations from the state to the DOM.
 */
export function applyTranslations() {
    document.documentElement.lang = state.currentLanguage;
    dom.languageSelect.value = state.currentLanguage;
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        const translation = state.translations[key];
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else if (key.includes('Content')) {
                el.innerHTML = translation;
            } else {
                const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
                if (textNode) {
                    textNode.textContent = translation + ' ';
                }
            }
        }
    });
    renderAll();
}

export function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    dom.themeToggle.checked = (theme === 'dark');
    localStorage.setItem('theme', theme);
}

export function applyAccentColor(color) {
    const root = document.documentElement;
    root.style.setProperty('--primary-hue', color.h);
    root.style.setProperty('--primary-saturation', color.s);
    root.style.setProperty('--primary-lightness', color.l);
    localStorage.setItem('accentColor', JSON.stringify(color));
    document.querySelectorAll('.color-swatch').forEach(swatch => swatch.classList.toggle('active', swatch.dataset.hue === String(color.h)));
}

export function setupPersonalization() {
    const pastelColors = [ { name: 'Rose', h: 350, s: '87%', l: '70%' }, { name: 'Orange', h: 24, s: '95%', l: '65%' }, { name: 'Gold', h: 45, s: '90%', l: '60%' }, { name: 'Lime', h: 80, s: '70%', l: '65%' }, { name: 'Mint', h: 150, s: '70%', l: '60%' }, { name: 'Sky', h: 190, s: '80%', l: '65%' }, { name: 'Blue', h: 210, s: '79%', l: '61%' }, { name: 'Indigo', h: 230, s: '80%', l: '70%' }, { name: 'Violet', h: 260, s: '80%', l: '70%' }, { name: 'Fuchsia', h: 300, s: '80%', l: '70%' }, { name: 'Crimson', h: 340, s: '80%', l: '65%' }, { name: 'Graphite', h: 210, s: '15%', l: '60%' }];
    dom.colorPalette.innerHTML = '';
    pastelColors.forEach(color => {
        const swatch = document.createElement('button');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = `hsl(${color.h}, ${color.s}, ${color.l})`;
        swatch.dataset.hue = color.h;
        swatch.dataset.saturation = color.s;
        swatch.dataset.lightness = color.l;
        dom.colorPalette.appendChild(swatch);
    });
}
