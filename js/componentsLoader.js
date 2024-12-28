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

async function loadComponents() {
    try {
        // Carica l'header
        const headerResponse = await fetch('../components/header.html');
        const headerContent = await headerResponse.text();
        document.getElementById('header-container').innerHTML = headerContent;

        // Carica il footer
        const footerResponse = await fetch('../components/footer.html');
        const footerContent = await footerResponse.text();
        document.getElementById('footer-content').innerHTML = footerContent;

        // Inizializza il menu hamburger
        initializeHamburgerMenu();

        // Aggiorna le traduzioni dopo il caricamento dei componenti
        if (window.translationManager) {
            window.translationManager.updatePageContent();
            // Riattacca i listener dopo il caricamento dei componenti
            window.translationManager.setupLanguageToggle();
        } else {
            console.error('TranslationManager not found');
        }

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Carica i componenti quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
});