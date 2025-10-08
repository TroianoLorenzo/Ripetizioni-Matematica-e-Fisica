// Inizializzazione tsParticles per l'effetto particelle SOLO nell'hero
async function loadParticles() {
    // Verifica se l'elemento particles-js esiste (solo nella homepage)
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        console.log('Particelle non caricate - non siamo nella homepage');
        return;
    }
    
    await tsParticles.load("particles-js", {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    });
    console.log('Particelle caricate con successo!');
}

// Smooth scrolling per i link di navigazione
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animazioni scroll-triggered
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Osserva gli elementi che devono essere animati
    document.querySelectorAll('.subject-card, .service-card, .pricing-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Stile per elementi animati
    if (!document.querySelector('#animation-styles')) {
        const animationStyle = document.createElement('style');
        animationStyle.id = 'animation-styles';
        animationStyle.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(animationStyle);
    }
}

// Menu mobile (per future implementazioni)
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            menuBtn.classList.toggle('menu-open');
        });
    }
}

// Gestione focus per accessibilità
function initAccessibility() {
    // Gestione navigazione da tastiera
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Stili per navigazione da tastiera
    if (!document.querySelector('#keyboard-styles')) {
        const keyboardStyle = document.createElement('style');
        keyboardStyle.id = 'keyboard-styles';
        keyboardStyle.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid #f59e0b !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(keyboardStyle);
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        }
    });
}

// Inizializzazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inizializzazione sito...');
    
    // Carica le particelle SOLO se l'elemento esiste (homepage)
    loadParticles();
    
    // Inizializza tutte le funzionalità
    initSmoothScrolling();
    initScrollAnimations();
    initMobileMenu();
    initAccessibility();
    initHeaderScroll();
    
    console.log('Sito web ripetizioni caricato con successo!');
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Sito caricato in ${loadTime}ms`);
    }
});