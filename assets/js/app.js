    // assets/js/app.js
    import { translations } from './modules/i18n.js';
    import { dom, icons } from './modules/dom.js';

    document.addEventListener('DOMContentLoaded', () => {
        console.log("App initialized!");
        console.log("DOM Elements:", dom);
        console.log("Translations:", translations);
        console.log("Icons:", icons);
        // Aquí irá el resto de la lógica de la aplicación
    });
    