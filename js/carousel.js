/* ====================================
   1. CLASSE CAROUSEL
==================================== */
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.indicators = this.carousel.querySelectorAll('.indicator');
        this.prevBtn = this.carousel.querySelector('.prev');
        this.nextBtn = this.carousel.querySelector('.next');
        this.currentIndex = 0;
        this.intervalId = null;
        this.intervalTime = 4000; // 4 secondi per slide

        this.init();
    }

    /* ====================================
       2. INIZIALIZZAZIONE
    ==================================== */
    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Gestione indicatori
        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });

        /* ====================================
           3. GESTIONE TOUCH
        ==================================== */
        let touchStartX = 0;
        let touchEndX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, false);

        /* ====================================
           4. AUTOPLAY
        ==================================== */
        // Start autoplay
        this.startAutoplay();

        // Pause su hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());

        // Gestione dei click sulle slide
        this.items.forEach(item => {
            const link = item.querySelector('.carousel-caption .btn');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.stopPropagation(); // Previene che il click sul link attivi altri eventi
                });
            }
        });
    }

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    startAutoplay() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => this.next(), this.intervalTime);
    }

    stopAutoplay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    goToSlide(index) {
        // Remove active class from current items
        this.items[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex].classList.remove('active');

        // Update current index
        this.currentIndex = index;

        // Add active class to new items
        this.items[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goToSlide(prevIndex);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        new Carousel(carouselElement);
    }
}); 