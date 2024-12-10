// Gestione del form di contatto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Qui puoi aggiungere la logica per inviare i dati del form
            // Per esempio, usando fetch() per inviare a un servizio esterno
            
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            alert('Grazie per il tuo messaggio! Ti risponderò presto.');
            this.reset();
        });
    }

    // Gestione menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Chiudi il menu quando si clicca su un link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }

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