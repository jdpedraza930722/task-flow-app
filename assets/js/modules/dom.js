// assets/js/modules/dom.js

/**
 * Object that holds references to all necessary DOM elements.
 */
export const dom = {
    taskForm: document.querySelector('.task-form'),
    taskInput: document.getElementById('task-form-input'),
    taskList: document.getElementById('task-list'),
    filterControls: document.getElementById('filter-controls'),
    searchInput: document.getElementById('search-input'),
    sortSelect: document.getElementById('sort-select'),
    pendingCountEl: document.getElementById('pending-count'),
    completedCountEl: document.getElementById('completed-count'),
    chartCanvas: document.getElementById('progress-chart').getContext('2d'),
    themeToggle: document.getElementById('theme-toggle'),
    openBinBtn: document.getElementById('open-bin-btn'),
    binModalOverlay: document.getElementById('bin-modal-overlay'),
    binList: document.getElementById('bin-list'),
    emptyBinBtn: document.getElementById('empty-bin-btn'),
    binBadge: document.getElementById('bin-badge'),
    binContextMenu: document.getElementById('bin-context-menu'),
    priorityModalOverlay: document.getElementById('priority-modal-overlay'),
    priorityOptions: document.querySelector('.priority-options'),
    duedateModalOverlay: document.getElementById('duedate-modal-overlay'),
    duedateInput: document.getElementById('duedate-input'),
    saveDuedateBtn: document.getElementById('save-duedate-btn'),
    removeDuedateBtn: document.getElementById('remove-duedate-btn'),
    confirmModalOverlay: document.getElementById('confirm-modal-overlay'),
    confirmModalTitle: document.getElementById('confirm-modal-title'),
    confirmModalText: document.getElementById('confirm-modal-text'),
    confirmAcceptBtn: document.getElementById('confirm-accept-btn'),
    confirmCancelBtn: document.getElementById('confirm-cancel-btn'),
    daySelector: document.getElementById('day-selector'),
    prevWeekBtn: document.getElementById('prev-week-btn'),
    nextWeekBtn: document.getElementById('next-week-btn'),
    currentWeekDisplay: document.getElementById('current-week-display'),
    currentDateHeader: document.getElementById('current-date-header'),
    allBadge: document.getElementById('all-badge'),
    priorityBadge: document.getElementById('priority-badge'),
    completedBadge: document.getElementById('completed-badge'),
    openSettingsBtn: document.getElementById('open-settings-btn'),
    settingsModalOverlay: document.getElementById('settings-modal-overlay'),
    languageSelect: document.getElementById('language-select'),
    colorPalette: document.getElementById('color-palette'),
    openHelpBtn: document.getElementById('open-help-btn'),
    helpModalOverlay: document.getElementById('help-modal-overlay'),
    openAboutBtn: document.getElementById('open-about-btn'),
    aboutModalOverlay: document.getElementById('about-modal-overlay'),
    openExportBtn: document.getElementById('open-export-btn'),
    exportModalOverlay: document.getElementById('export-modal-overlay'),
    propertiesModalOverlay: document.getElementById('properties-modal-overlay'),
    propItemCount: document.getElementById('prop-item-count'),
    propOldestItem: document.getElementById('prop-oldest-item'),
    propNewestItem: document.getElementById('prop-newest-item'),
    binContextMenuRestore: document.querySelector('[data-action="restore-all"]'),
    binContextMenuEmpty: document.querySelector('[data-action="empty"]'),
    mainApp: document.getElementById('main-app'),
    pagesContainer: document.getElementById('pages-container'),
    pageTitle: document.getElementById('page-title'),
    pageContent: document.getElementById('page-content'),
    footer: document.querySelector('.footer'),
};

/**
 * SVG icons used in the application.
 */
export const icons = {
    calendar: `<svg viewBox="0 0 24 24"><path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/></svg>`,
    tag: `<svg viewBox="0 0 24 24"><path d="M5.5,7A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 8.5,7A1.5,1.5 0 0,1 7,8.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.59,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.45 21.77,11.95 21.41,11.58Z"/></svg>`,
    edit: `<svg viewBox="0 0 24 24"><path d="M13.94 5L19 10.06L9.06 20H4v-5.06L13.94 5m3.6-2.05L15.46.86a1 1 0 00-1.42 0l-1.83 1.83L17.17 7.66l1.83-1.83a1 1 0 000-1.42z"/></svg>`,
    delete: `<svg viewBox="0 0 24 24"><path d="M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8z"/></svg>`,
    restore: `<svg viewBox="0 0 24 24"><path d="M12,5V1L7,6L12,11V7A6,6 0 0,1 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13H4A8,8 0 0,0 12,21A8,8 0 0,0 20,13A8,8 0 0,0 12,5Z"/></svg>`
};
