class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
            
            // Inizializza il menu hamburger dopo che l'header è stato caricato
            if (elementId === 'header-container') {
                initializeHamburgerMenu();
            }
        } catch (error) {
            console.error('Error loading component', error);
        }
    }
}

function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const navMenu = this.nextElementSibling;
            navMenu.classList.toggle('show');
        });
    }
}

function loadAllComponents() {
    ComponentLoader.loadComponent('header-container', '../components/header.html');
    ComponentLoader.loadComponent('footer-content', '../components/footer.html');
}

// Carica i componenti quando il DOM è pronto
document.addEventListener('DOMContentLoaded', loadAllComponents);