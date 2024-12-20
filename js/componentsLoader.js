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
    const mobileMenu = document.querySelector('.mobile-nav ul');
    let isMenuOpen = false;

    if (hamburger && mobileMenu) {
        // Toggle menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            // Toggle classes
            mobileMenu.classList.toggle('show');
            hamburger.classList.toggle('active');
            
            // Toggle hamburger icon
            hamburger.innerHTML = isMenuOpen ? '✕' : '☰';
            
            // Toggle body scroll
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Close menu when clicking links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Prevent clicks inside menu from closing it
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Close menu function
    function closeMenu() {
        isMenuOpen = false;
        mobileMenu.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.innerHTML = '☰';
        document.body.style.overflow = '';
    }
}

function loadAllComponents() {
    ComponentLoader.loadComponent('header-container', '../components/header.html');
    ComponentLoader.loadComponent('footer-content', '../components/footer.html');
}

// Carica i componenti quando il DOM è pronto
document.addEventListener('DOMContentLoaded', loadAllComponents);