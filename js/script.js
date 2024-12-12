// Gestione del form di contatto
document.addEventListener('DOMContentLoaded', function() {
    // Aspetta che i componenti siano caricati prima di inizializzare il tema
    const checkComponentsLoaded = setInterval(() => {
        const themeToggleBtns = document.querySelectorAll('.theme-toggle');
        if (themeToggleBtns.length > 0) {
            clearInterval(checkComponentsLoaded);
            initThemeToggle();
            console.log('Theme toggle buttons found and initialized');
        }
    }, 100);

    // Timeout di sicurezza dopo 5 secondi
    setTimeout(() => {
        clearInterval(checkComponentsLoaded);
        console.log('Timeout: components loading check stopped');
    }, 5000);

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

        // Close menu function
        function closeMenu() {
            isMenuOpen = false;
            mobileMenu.classList.remove('show');
            hamburger.classList.remove('active');
            hamburger.innerHTML = '☰';
            document.body.style.overflow = '';
        }
    }

    // Theme Toggle Logic
    function initThemeToggle() {
        const themeToggleBtns = document.querySelectorAll('.theme-toggle');
        
        if (themeToggleBtns.length === 0) {
            console.error('Nessun pulsante theme-toggle trovato');
            return;
        }
        
        // Carica il tema salvato o usa quello di default (dark)
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcons(currentTheme);
        
        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Theme toggle clicked');
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                console.log('Changing theme to:', newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcons(newTheme);
            });
        });
        
        function updateThemeIcons(theme) {
            themeToggleBtns.forEach(btn => {
                const icon = btn.querySelector('i');
                const text = btn.querySelector('.theme-text');
                if (icon) {
                    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
                }
                if (text) {
                    text.textContent = theme === 'light' ? 'Night Mode' : 'Day Mode';
                }
            });
        }
    }
}); 