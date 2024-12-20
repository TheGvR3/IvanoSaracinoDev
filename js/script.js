/* ====================================
   1. INIZIALIZZAZIONE
==================================== */
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
});

/* ====================================
   2. GESTIONE MENU MOBILE
==================================== */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-nav ul');
let isMenuOpen = false;

if (hamburger && mobileMenu) {
    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Chiusura menu su click dei link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Chiusura menu su click esterno
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Previeni chiusura su click interno al menu
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

/* ====================================
   3. FUNZIONI MENU
==================================== */
// Apri/chiudi menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
    hamburger.innerHTML = isMenuOpen ? '✕' : '☰';
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Chiudi menu
function closeMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove('show');
    hamburger.classList.remove('active');
    hamburger.innerHTML = '☰';
    document.body.style.overflow = '';
}

/* ====================================
   4. GESTIONE DEL TEMA
==================================== */
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

/* ====================================
  5. Invio email
==================================== */

function sendEmail(event) {
    event.preventDefault(); // Evita il refresh della pagina

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const recipient = "ivanosaracinodev@gmail.com";

    if (!email.includes("@")) {
        alert("Inserire un indirizzo email valido.");
        document.getElementById("email").focus();
        return;
    }
    if (name === "" || message === "") {
        alert("Compila tutti i campi richiesti.");
        return;
    }
    const mailtoLink = `mailto:${recipient}?subject=Messaggio da ${encodeURIComponent(name)} (${encodeURIComponent(email)})&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
}