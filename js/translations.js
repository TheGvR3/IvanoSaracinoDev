// Sistema di eventi personalizzato
window.translationEvents = {
    init: function() {
        this.callbacks = [];
        this.initialized = true;
    },
    onReady: function(callback) {
        if (window.translationManager) {
            callback(window.translationManager);
        } else {
            this.callbacks.push(callback);
        }
    },
    trigger: function() {
        while (this.callbacks.length) {
            this.callbacks.shift()(window.translationManager);
        }
    }
};

window.translationEvents.init();

class TranslationManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'it';
        this.translations = {};
        this.baseUrl = window.location.pathname.includes('/pages/') ? '..' : '';
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('chi-sono')) return 'about';
        if (path.includes('progetti')) return 'projects';
        if (path.includes('contatti')) return 'contact';
        return 'home';
    }

    async init() {
        try {
            // Carica sempre le traduzioni comuni
            const commonUrl = `${this.baseUrl}/translations/${this.currentLang}/common.json`;
            const commonResponse = await fetch(commonUrl);
            if (!commonResponse.ok) throw new Error(`HTTP error! status: ${commonResponse.status}`);
            this.translations = await commonResponse.json();

            // Carica le traduzioni specifiche della pagina
            const pageUrl = `${this.baseUrl}/translations/${this.currentLang}/${this.currentPage}.json`;
            const pageResponse = await fetch(pageUrl);
            if (pageResponse.ok) {
                const pageTranslations = await pageResponse.json();
                this.translations = { ...this.translations, ...pageTranslations };
            }

            this.updatePageContent();
            this.setupLanguageToggle();
        } catch (error) {
            console.error('Error loading translations:', error.message);
            this.loadFallbackTranslations();
        }
    }

    async loadFallbackTranslations() {
        try {
            // Carica le traduzioni comuni
            const commonResponse = await fetch(`${this.baseUrl}/translations/it/common.json`);
            if (!commonResponse.ok) throw new Error(`HTTP error! status: ${commonResponse.status}`);
            this.translations = await commonResponse.json();

            // Carica le traduzioni specifiche della pagina
            const pageResponse = await fetch(`${this.baseUrl}/translations/it/${this.currentPage}.json`);
            if (pageResponse.ok) {
                const pageTranslations = await pageResponse.json();
                this.translations = { ...this.translations, ...pageTranslations };
            }

            this.updatePageContent();
        } catch (error) {
            console.error('Error loading fallback translations:', error.message);
        }
    }

    setupLanguageToggle() {
        const langToggles = document.querySelectorAll('.lang-toggle');
        langToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const newLang = this.currentLang === 'it' ? 'en' : 'it';
                this.switchLanguage(newLang);
            });
        });
    }

    async switchLanguage(lang) {
        try {
            // Carica le traduzioni comuni
            const commonResponse = await fetch(`${this.baseUrl}/translations/${lang}/common.json`);
            if (!commonResponse.ok) throw new Error(`HTTP error! status: ${commonResponse.status}`);
            this.translations = await commonResponse.json();

            // Carica le traduzioni specifiche della pagina
            const pageResponse = await fetch(`${this.baseUrl}/translations/${lang}/${this.currentPage}.json`);
            if (pageResponse.ok) {
                const pageTranslations = await pageResponse.json();
                this.translations = { ...this.translations, ...pageTranslations };
            }

            this.currentLang = lang;
            localStorage.setItem('language', lang);
            this.updatePageContent();
            this.updateToggleButton();
        } catch (error) {
            console.error('Error switching language:', error.message);
        }
    }

    updateToggleButton() {
        const langToggles = document.querySelectorAll('.lang-toggle');
        langToggles.forEach(toggle => {
            const text = toggle.querySelector('.lang-text');
            const icon = toggle.querySelector('i');
            if (text) {
                text.textContent = this.currentLang === 'it' ? 'English' : 'Italiano';
            }
            if (icon) {
                icon.className = `fas fa-${this.currentLang === 'it' ? 'gb' : 'it'}`;
            }
        });
    }

    updatePageContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getNestedTranslation(key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], this.translations);
    }
}

window.translationManager = new TranslationManager();
window.translationEvents.trigger(); 