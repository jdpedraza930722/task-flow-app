    // assets/js/modules/i18n.js

    /**
     * Dictionary with all the translations for the application.
     * It supports Spanish (es), English (en), and French (fr).
     */
    export const translations = {
        es: {
            headerTitle: "Mis Tareas ✔️",
            dashboardPending: "Pendientes",
            dashboardCompleted: "Completadas",
            formInputPlaceholder: "Añadir tarea para el día seleccionado...",
            formButton: "Añadir",
            filterAll: "Todas",
            filterPriority: "Prioridades",
            filterCompleted: "Completadas",
            searchInputPlaceholder: "Buscar en este día...",
            sortCreation: "Por Creación",
            sortPriority: "Por Prioridad",
            sortAlphabetical: "Alfabéticamente (A-Z)",
            sortStatus: "Por Estado",
            settingsTitle: "Configuración",
            settingsAppearance: "Apariencia",
            settingsTheme: "Tema",
            settingsLanguage: "Idioma",
            settingsAccentColor: "Color de Acento",
            helpTitle: "Manual de Usuario",
            helpContent: `
                <h3>¡Bienvenido a tu Planificador de Tareas!</h3>
                <p>Aquí tienes una guía rápida para sacar el máximo provecho de la aplicación.</p>
                <h3>1. Navegación Principal: El Planificador</h3>
                <p>La vista principal es un planificador semanal. Usa los botones <strong>&lt;</strong> y <strong>&gt;</strong> para navegar entre semanas. Haz clic en el número de un día para seleccionarlo y ver las tareas asociadas a esa fecha.</p>
                <h3>2. Creación y Gestión de Tareas</h3>
                <ul>
                    <li><strong>Añadir Tarea:</strong> Escribe en el campo de texto y pulsa "Añadir".</li>
                    <li><strong>Marcar como Completada:</strong> Usa la casilla de verificación.</li>
                    <li><strong>Asignar Prioridad (🏷️):</strong> Clasifica tus tareas como "Urgente", "Importante" o "Normal".</li>
                    <li><strong>Editar (✏️) y Eliminar (🗑️):</strong> Modifica el texto de una tarea o muévela a la papelera.</li>
                </ul>`,
            aboutTitle: "Acerca de la Aplicación",
            aboutContent: `<h3>Lista de Tareas Pro</h3><p><strong>Versión:</strong> 2.1.0</p><p><strong>Autor:</strong> Juan Daniel Pedraza Díaz</p><hr><p>Este proyecto fue desarrollado con un fin curricular para demostrar y aplicar habilidades avanzadas en las tecnologías fundamentales de la web: HTML5, CSS3 y JavaScript (Puro/Vanilla).</p>`,
            exportTitle: "Exportar y Compartir",
            exportDownloadTitle: "Descargar Lista Actual",
            exportShareTitle: "Compartir Lista",
            save: "Guardar",
            priorityTitle: "Asignar Prioridad",
            priorityUrgent: "Urgente",
            priorityImportant: "Importante",
            priorityNormal: "Normal",
            binTitle: "Papelera de Reciclaje",
            binEmpty: "Vaciar Papelera",
            cancel: "Cancelar",
            confirm: "Confirmar",
        },
        en: {
            headerTitle: "My Tasks ✔️",
            dashboardPending: "Pending",
            dashboardCompleted: "Completed",
            formInputPlaceholder: "Add a task for the selected day...",
            formButton: "Add",
            filterAll: "All",
            filterPriority: "Priorities",
            filterCompleted: "Completed",
            searchInputPlaceholder: "Search in this day...",
            sortCreation: "By Creation",
            sortPriority: "By Priority",
            sortAlphabetical: "Alphabetically (A-Z)",
            sortStatus: "By Status",
            settingsTitle: "Settings",
            settingsAppearance: "Appearance",
            settingsTheme: "Theme",
            settingsLanguage: "Language",
            settingsAccentColor: "Accent Color",
            helpTitle: "User Guide",
            helpContent: `
                <h3>Welcome to your Task Planner!</h3>
                <p>Here's a quick guide to get the most out of the application.</p>
                <h3>1. Main Navigation: The Planner</h3>
                <p>The main view is a weekly planner. Use the <strong>&lt;</strong> and <strong>&gt;</strong> buttons to navigate between weeks. Click on a day's number to select it and see the tasks associated with that date.</p>
                <h3>2. Creating and Managing Tasks</h3>
                <ul>
                    <li><strong>Add Task:</strong> Type in the text field and press "Add".</li>
                    <li><strong>Mark as Complete:</strong> Use the checkbox.</li>
                    <li><strong>Set Priority (🏷️):</strong> Classify your tasks as "Urgent", "Important", or "Normal".</li>
                    <li><strong>Edit (✏️) and Delete (🗑️):</strong> Modify a task's text or move it to the recycle bin.</li>
                </ul>`,
            aboutTitle: "About the Application",
            aboutContent: `<h3>To-Do List Pro</h3><p><strong>Version:</strong> 2.1.0</p><p><strong>Author:</strong> Juan Daniel Pedraza Díaz</p><hr><p>This project was developed for curricular purposes to demonstrate and apply advanced skills in fundamental web technologies: HTML5, CSS3, and Vanilla JavaScript.</p>`,
            exportTitle: "Export & Share",
            exportDownloadTitle: "Download Current List",
            exportShareTitle: "Share List",
            save: "Save",
            priorityTitle: "Set Priority",
            priorityUrgent: "Urgent",
            priorityImportant: "Important",
            priorityNormal: "Normal",
            binTitle: "Recycle Bin",
            binEmpty: "Empty Bin",
            cancel: "Cancel",
            confirm: "Confirm",
        },
        fr: {
            headerTitle: "Mes Tâches ✔️",
            dashboardPending: "En attente",
            dashboardCompleted: "Terminées",
            formInputPlaceholder: "Ajouter une tâche pour le jour sélectionné...",
            formButton: "Ajouter",
            filterAll: "Toutes",
            filterPriority: "Priorités",
            filterCompleted: "Terminées",
            searchInputPlaceholder: "Chercher ce jour...",
            sortCreation: "Par Création",
            sortPriority: "Par Priorité",
            sortAlphabetical: "Alphabétiquement (A-Z)",
            sortStatus: "Par Statut",
            settingsTitle: "Paramètres",
            settingsAppearance: "Apparence",
            settingsTheme: "Thème",
            settingsLanguage: "Langue",
            settingsAccentColor: "Couleur d'accentuation",
            helpTitle: "Guide d'utilisation",
            helpContent: `
                <h3>Bienvenue dans votre Planificateur de Tâches !</h3>
                <p>Voici un guide rapide pour tirer le meilleur parti de l'application.</p>
                <h3>1. Navigation Principale : Le Planificateur</h3>
                <p>La vue principale est un planificateur hebdomadaire. Utilisez les boutons <strong>&lt;</strong> et <strong>&gt;</strong> pour naviguer entre les semaines. Cliquez sur le numéro d'un jour pour le sélectionner et voir les tâches associées à cette date.</p>
                <h3>2. Création et Gestion des Tâches</h3>
                <ul>
                    <li><strong>Ajouter une tâche :</strong> Écrivez dans le champ de texte et appuyez sur "Ajouter".</li>
                    <li><strong>Marquer comme terminée :</strong> Utilisez la case à cocher.</li>
                    <li><strong>Définir la priorité (🏷️) :</strong> Classez vos tâches comme "Urgente", "Importante" ou "Normale".</li>
                    <li><strong>Modifier (✏️) et Supprimer (🗑️) :</strong> Modifiez le texte d'une tâche ou déplacez-la vers la corbeille.</li>
                </ul>`,
            aboutTitle: "À propos de l'application",
            aboutContent: `<h3>Liste de Tâches Pro</h3><p><strong>Version:</strong> 2.1.0</p><p><strong>Auteur:</strong> Juan Daniel Pedraza Díaz</p><hr><p>Ce projet a été développé à des fins curriculaires pour démontrer et appliquer des compétences avancées dans les technologies web fondamentales : HTML5, CSS3 et JavaScript Vanille.</p>`,
            exportTitle: "Exporter & Partager",
            exportDownloadTitle: "Télécharger la Liste Actuelle",
            exportShareTitle: "Partager la Liste",
            save: "Enregistrer",
            priorityTitle: "Définir la Priorité",
            priorityUrgent: "Urgente",
            priorityImportant: "Importante",
            priorityNormal: "Normale",
            binTitle: "Corbeille",
            binEmpty: "Vider la corbeille",
            cancel: "Annuler",
            confirm: "Confirmer",
        }
    };
    