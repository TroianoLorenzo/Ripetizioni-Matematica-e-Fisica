// Inizializzazione tsParticles per l'effetto particelle nell'hero
async function loadParticles() {
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

// Gestione del form di contatto
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Raccolta dati form
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validazione base
            if (!data.name || !data.email || !data.message) {
                showNotification('Per favore, compila tutti i campi obbligatori.', 'error');
                return;
            }
            
            // Validazione email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Per favore, inserisci un indirizzo email valido.', 'error');
                return;
            }
            
            // Simulazione invio (in produzione collegare a un servizio di email)
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;
            
            // Creazione del link mailto con i dati del form
            const subject = encodeURIComponent(`Richiesta ripetizioni - ${data.subject || 'Informazioni'}`);
            const body = encodeURIComponent(
                `Nome: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Materia: ${data.subject || 'Non specificata'}\n\n` +
                `Messaggio:\n${data.message}`
            );
            
            const mailtoLink = `mailto:lorenz.troiano@gmail.com?subject=${subject}&body=${body}`;
            
            // Simula un delay per l'invio
            setTimeout(() => {
                // Apre il client email
                window.location.href = mailtoLink;
                
                // Reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showNotification('La tua richiesta è stata preparata. Il tuo client email si aprirà automaticamente.', 'success');
            }, 1000);
        });
    }
}

// Sistema di notifiche
function showNotification(message, type = 'info') {
    // Rimuovi notifica esistente se presente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crea nuova notifica
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Chiudi notifica">&times;</button>
        </div>
    `;
    
    // Aggiungi stili per la notifica
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            border-left: 4px solid #10b981;
        }
        
        .notification-error {
            border-left: 4px solid #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            padding: 1rem;
            gap: 1rem;
        }
        
        .notification-message {
            flex: 1;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            line-height: 1;
        }
        
        .notification-close:hover {
            color: #374151;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Aggiungi al DOM
    document.body.appendChild(notification);
    
    // Gestione chiusura
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-rimozione dopo 5 secondi
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
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
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Osserva gli elementi che devono essere animati
    document.querySelectorAll('.subject-card, .service-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Stile per elementi animati
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyle);
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

// Gestione focus per accessiblità
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
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #f59e0b !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyle);
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Inizializzazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Carica le particelle
    loadParticles();
    
    // Inizializza tutte le funzionalità
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initMobileMenu();
    initAccessibility();
    initHeaderScroll();
    
    console.log('🎓 Sito web ripetizioni caricato con successo!');
});

// Gestione errori globale
window.addEventListener('error', function(e) {
    console.error('Errore nel sito:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    // Misura performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Sito caricato in ${loadTime}ms`);
    }
});