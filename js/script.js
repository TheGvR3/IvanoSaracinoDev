// Gestione del form di contatto
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    // Gestione menu hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const navMenu = this.nextElementSibling;
            navMenu.classList.toggle('show');
        });
    }

    // Chiudi il menu quando si clicca fuori
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('show') && !nav.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });

    // Chiudi il menu quando si clicca su un link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Smooth scrolling per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 