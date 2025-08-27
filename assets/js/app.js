// assets/js/app.js
import { translations } from './modules/i18n.js';
import { dom } from './modules/dom.js';
import { state, loadData, saveData, setTimeToZero, parseDateString, formatDateToYYYYMMDD, getFilteredAndSortedTasks } from './modules/state.js';
import { renderAll, renderBinnedTasks, applyTheme, applyAccentColor, setLanguage, showConfirmModal, closeConfirmModal, setupPersonalization } from './modules/ui.js';

/**
 * Main controller for the application.
 */
function main() {
    
    // --- LÓGICA DE EXPORTACIÓN Y COMPARTIR ---

    function generateTaskListText(format = 'plain') {
        const tasksToExport = getFilteredAndSortedTasks();
        const title = `${translations[state.currentLanguage].headerTitle} (${state.selectedDate.toLocaleDateString(state.currentLanguage)})`;
        if (tasksToExport.length === 0) return "No hay tareas para exportar.";
        
        if (format === 'csv') {
            let csvContent = "Estado;Tarea;Prioridad;Fecha de Vencimiento\n";
            tasksToExport.forEach(task => {
                const status = task.completed ? 'Completada' : 'Pendiente';
                const priorityKey = `priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;
                const priority = translations[state.currentLanguage][priorityKey] || 'Normal';
                const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString(state.currentLanguage) : 'N/A';
                csvContent += `"${status}";"${task.text}";"${priority}";"${dueDate}"\n`;
            });
            return csvContent;
        }

        let plainText = title + "\n---------------------\n";
        tasksToExport.forEach(task => {
            const status = task.completed ? '[x]' : '[ ]';
            plainText += `${status} ${task.text}\n`;
        });
        return plainText;
    }

    function downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    function downloadPdf() {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const tasksToExport = getFilteredAndSortedTasks();
            const title = `${translations[state.currentLanguage].headerTitle} (${state.selectedDate.toLocaleDateString(state.currentLanguage)})`;
            
            doc.setFontSize(18);
            doc.text(title, 14, 22);
            doc.setFontSize(11);
            let y = 30;
            
            tasksToExport.forEach(task => {
                if (y > 280) { doc.addPage(); y = 20; }
                const status = task.completed ? '✓' : 'o';
                const line = `${status} ${task.text}`;
                const splitText = doc.splitTextToSize(line, 180);
                doc.text(splitText, 14, y);
                y += (splitText.length * 6) + 4;
            });
            doc.save("lista_de_tareas.pdf");
        } catch(e) {
            console.error("Error al generar PDF:", e);
            alert("Error al generar el PDF. Asegúrate de que la librería jsPDF está cargada.");
        }
    }
    
    async function shareList(platform) {
        const textToShare = generateTaskListText();
        const encodedText = encodeURIComponent(textToShare);
        
        if (platform === 'native' && navigator.share) {
            try {
                await navigator.share({ title: translations[state.currentLanguage].headerTitle, text: textToShare });
            } catch (err) { console.error("Error al compartir:", err); }
        } else if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodedText}`, '_blank');
        } else if (platform === 'telegram') {
            window.open(`https://t.me/share/url?url=&text=${encodedText}`, '_blank');
        } else if (platform === 'copy' || (platform === 'native' && !navigator.share)) {
            try {
                await navigator.clipboard.writeText(textToShare);
                alert(state.currentLanguage === 'es' ? "¡Texto copiado al portapapeles!" : "Text copied to clipboard!");
            } catch (err) { alert(state.currentLanguage === 'es' ? "No se pudo copiar el texto." : "Could not copy text."); }
        }
    }

    /**
     * Handles adding a new task.
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
        const newItem = dom.taskList.querySelector(`[data-id='${newTask.id}']`);
        if (newItem) {
            newItem.classList.add('task-item--new');
            newItem.addEventListener('animationend', () => newItem.classList.remove('task-item--new'), { once: true });
        }
    }

    /**
     * Sets up all event listeners for the application.
     */
    function addEventListeners() {
        // Navigation
        dom.prevWeekBtn.addEventListener('click', () => { state.selectedDate.setDate(state.selectedDate.getDate() - 7); renderAll(); });
        dom.nextWeekBtn.addEventListener('click', () => { state.selectedDate.setDate(state.selectedDate.getDate() + 7); renderAll(); });
        dom.daySelector.addEventListener('click', (e) => {
            const dayBtn = e.target.closest('.day-btn');
            if (dayBtn) {
                state.selectedDate = parseDateString(dayBtn.dataset.date);
                renderAll();
            }
        });

        // Task Form
        dom.taskForm.addEventListener('submit', event => {
            event.preventDefault();
            const text = dom.taskInput.value.trim();
            if (text) {
                addTask(text);
                dom.taskInput.value = '';
            }
        });

        // Filtering, Sorting, Searching
        dom.filterControls.addEventListener('click', e => {
            if (e.target.matches('.filter-btn')) {
                dom.filterControls.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                state.currentFilter = e.target.dataset.filter;
                renderAll();
            }
        });
        dom.searchInput.addEventListener('input', e => { state.searchTerm = e.target.value; renderAll(); });
        dom.sortSelect.addEventListener('change', e => { state.currentSort = e.target.value; renderAll(); });

        // Task List Actions
        dom.taskList.addEventListener('click', event => {
            const item = event.target.closest('.task-list__item');
            if (!item) return;
            const id = Number(item.dataset.id);

            if (event.target.closest('.task-list__delete-button')) {
                showConfirmModal('binTitle', 'taskDeletedConfirmation', () => {
                    const taskIndex = state.tasks.findIndex(t => t.id === id);
                    if (taskIndex > -1) {
                        const [taskToDelete] = state.tasks.splice(taskIndex, 1);
                        state.binnedTasks.push(taskToDelete);
                        saveData();
                        renderAll();
                    }
                });
            } else if (event.target.matches('.task-list__checkbox')) {
                const task = state.tasks.find(t => t.id === id);
                if (task) {
                    task.completed = event.target.checked;
                    task.completedAt = event.target.checked ? new Date().toISOString() : null;
                    saveData();
                    renderAll();
                }
            } else if (event.target.closest('.task-list__edit-button')) {
                item.classList.add('editing');
                item.querySelector('.task-list__edit-input').focus();
            } else if (event.target.closest('.task-list__priority-button')) {
                state.taskToModifyId = id;
                dom.priorityModalOverlay.classList.add('visible');
            } else if (event.target.closest('.task-list__duedate-button')) {
                state.taskToModifyId = id;
                const task = state.tasks.find(t => t.id === id);
                dom.duedateInput.value = formatDateToYYYYMMDD(task.dueDate);
                dom.duedateModalOverlay.classList.add('visible');
            }
        });

        // Save Task Edit
        const saveTaskEdit = (input) => {
            const item = input.closest('.task-list__item');
            if (!item) return;
            const id = Number(item.dataset.id);
            const task = state.tasks.find(t => t.id === id);
            if (!task) return;
            const newText = input.value.trim();
            if (newText) {
                task.text = newText;
            } else {
                state.tasks = state.tasks.filter(t => t.id !== id);
            }
            saveData();
            renderAll();
        };
        dom.taskList.addEventListener('blur', e => { if (e.target.matches('.task-list__edit-input')) saveTaskEdit(e.target); }, true);
        dom.taskList.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('.task-list__edit-input')) e.target.blur(); });

        // Modals
        dom.priorityOptions.addEventListener('click', (event) => {
            const priority = event.target.closest('.priority-option')?.dataset.priority;
            if (priority && state.taskToModifyId) {
                const task = state.tasks.find(t => t.id === state.taskToModifyId);
                if (task) task.priority = priority;
                dom.priorityModalOverlay.classList.remove('visible');
                state.taskToModifyId = null;
                saveData();
                renderAll();
            }
        });
        dom.saveDuedateBtn.addEventListener('click', () => {
            if (state.taskToModifyId) {
                const task = state.tasks.find(t => t.id === state.taskToModifyId);
                if (task) task.dueDate = parseDateString(dom.duedateInput.value);
                dom.duedateModalOverlay.classList.remove('visible');
                state.taskToModifyId = null;
                saveData();
                renderAll();
            }
        });
        dom.removeDuedateBtn.addEventListener('click', () => {
            if (state.taskToModifyId) {
                const task = state.tasks.find(t => t.id === state.taskToModifyId);
                if (task) task.dueDate = null;
                dom.duedateModalOverlay.classList.remove('visible');
                state.taskToModifyId = null;
                saveData();
                renderAll();
            }
        });
        dom.confirmAcceptBtn.addEventListener('click', () => { if (state.onConfirmCallback) state.onConfirmCallback(); closeConfirmModal(); });
        dom.confirmCancelBtn.addEventListener('click', closeConfirmModal);

        // Bin Actions & Context Menu
        dom.openBinBtn.addEventListener('click', () => { renderBinnedTasks(); dom.binModalOverlay.classList.add('visible'); });
        dom.openBinBtn.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            dom.binContextMenu.style.top = `${event.pageY}px`;
            dom.binContextMenu.style.left = `${event.pageX}px`;
            dom.binContextMenu.style.display = 'block';
        });
        dom.binContextMenu.addEventListener('click', (event) => {
            const action = event.target.dataset.action;
            dom.binContextMenu.style.display = 'none';
            if (action === 'empty' && state.binnedTasks.length > 0) {
                showConfirmModal('binEmpty', 'emptyBinConfirmation', () => {
                    state.binnedTasks = [];
                    saveData();
                    renderAll();
                    renderBinnedTasks();
                });
            } else if (action === 'restore-all' && state.binnedTasks.length > 0) {
                showConfirmModal('binRestoreAll', 'restoreAllConfirmation', () => {
                    state.tasks.push(...state.binnedTasks);
                    state.binnedTasks = [];
                    saveData();
                    renderAll();
                });
            } else if (action === 'properties') {
                dom.propItemCount.textContent = `${state.binnedTasks.length}`;
                if (state.binnedTasks.length > 0) {
                    const dates = state.binnedTasks.map(t => t.id);
                    dom.propOldestItem.textContent = new Date(Math.min(...dates)).toLocaleString(state.currentLanguage);
                    dom.propNewestItem.textContent = new Date(Math.max(...dates)).toLocaleString(state.currentLanguage);
                } else {
                    dom.propOldestItem.textContent = 'N/A';
                    dom.propNewestItem.textContent = 'N/A';
                }
                dom.propertiesModalOverlay.classList.add('visible');
            }
        });
        dom.emptyBinBtn.addEventListener('click', () => {
            if (state.binnedTasks.length > 0) {
                showConfirmModal('binEmpty', 'emptyBinConfirmation', () => {
                    state.binnedTasks = [];
                    saveData();
                    renderAll();
                    renderBinnedTasks();
                });
            }
        });
        dom.binList.addEventListener('click', event => {
            const item = event.target.closest('.bin-list__item');
            if (item && event.target.closest('.bin-list__restore-btn')) {
                const id = Number(item.dataset.id);
                const taskIndex = state.binnedTasks.findIndex(t => t.id === id);
                if (taskIndex > -1) {
                    const [restoredTask] = state.binnedTasks.splice(taskIndex, 1);
                    state.tasks.push(restoredTask);
                    saveData();
                    renderAll();
                    renderBinnedTasks();
                }
            }
        });

        // Settings & Personalization
        dom.themeToggle.addEventListener('change', () => applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark'));
        dom.openSettingsBtn.addEventListener('click', () => dom.settingsModalOverlay.classList.add('visible'));
        dom.languageSelect.addEventListener('change', (e) => setLanguage(e.target.value));
        dom.colorPalette.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-swatch')) {
                const color = { h: e.target.dataset.hue, s: e.target.dataset.saturation, l: e.target.dataset.lightness };
                applyAccentColor(color);
            }
        });

        // Header Buttons & Export Modal
        dom.openHelpBtn.addEventListener('click', () => dom.helpModalOverlay.classList.add('visible'));
        dom.openAboutBtn.addEventListener('click', () => dom.aboutModalOverlay.classList.add('visible'));
        dom.openExportBtn.addEventListener('click', () => dom.exportModalOverlay.classList.add('visible'));
        
        dom.exportModalOverlay.addEventListener('click', (e) => {
            if (e.target.matches('.export-btn')) {
                const exportType = e.target.dataset.export;
                const shareType = e.target.dataset.share;
                
                if (exportType === 'txt') downloadFile('tareas.txt', generateTaskListText(), 'text/plain;charset=utf-8');
                else if (exportType === 'csv') downloadFile('tareas.csv', generateTaskListText('csv'), 'text/csv;charset=utf-8');
                else if (exportType === 'pdf') downloadPdf();
    
                if (shareType) shareList(shareType);
    
                dom.exportModalOverlay.classList.remove('visible');
            }
        });

        // General: Close modals and context menu
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#open-bin-btn')) {
                dom.binContextMenu.style.display = 'none';
            }
            if (e.target.matches('[data-close]') || e.target.classList.contains('modal-overlay')) {
                e.target.closest('.modal-overlay').classList.remove('visible');
            }
        });
    }

    /**
     * Initializes the application.
     */
    function init() {
        state.selectedDate = setTimeToZero(new Date());
        loadData();
        
        const savedLang = localStorage.getItem('language') || navigator.language.split('-')[0] || 'en';
        
        setupPersonalization();
        
        const savedAccentColor = JSON.parse(localStorage.getItem('accentColor'));
        applyAccentColor(savedAccentColor || { h: 210, s: '79%', l: '61%' });

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
        
        addEventListeners();
        
        setLanguage(translations[savedLang] ? savedLang : 'en');
    }

    init();
}

document.addEventListener('DOMContentLoaded', main);
