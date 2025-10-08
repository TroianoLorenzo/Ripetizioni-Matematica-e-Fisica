// Inizializzazione tsParticles SOLO per la homepage
async function loadParticles() {
    // Triplo controllo per assicurarsi che le particelle vengano caricate solo nella homepage
    const particlesContainer = document.getElementById('particles-js');
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname.includes('index.html') || 
                      window.location.pathname === '' ||
                      window.location.href.includes('github.io/Ripetizioni-Matematica-e-Fisica');
    
    if (!particlesContainer || !isHomepage) {
        console.log('🚫 Particelle NON caricate - non siamo nella homepage o elemento non trovato');
        return;
    }
    
    try {
        await tsParticles.load("particles-js", {
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60, // Ridotto per prestazioni mobile
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
                        quantity: 3, // Ridotto
                    },
                    repulse: {
                        distance: 150,
                        duration: 0.3,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 120, // Ridotto
                    enable: true,
                    opacity: 0.25, // Ridotto
                    width: 1,
                },
                collisions: {
                    enable: false, // Disabilitato per prestazioni
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 1.5, // Ridotto
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 1000,
                    },
                    value: window.innerWidth <= 768 ? 30 : 50, // Meno particelle su mobile
                },
                opacity: {
                    value: 0.4,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 4 },
                },
            },
            detectRetina: true,
        });
        console.log('✨ Particelle caricate con successo nella HOMEPAGE!');
    } catch (error) {
        console.error('❌ Errore nel caricamento delle particelle:', error);
    }
}

// Smooth scrolling per i link di navigazione
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
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

// Menu mobile migliorato
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (menuBtn && nav) {
        // Aggiungi attributi ARIA per accessibilità
        menuBtn.setAttribute('aria-label', 'Menu di navigazione');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-controls', 'main-navigation');
        nav.setAttribute('id', 'main-navigation');
        
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.toggle('nav-open');
            menuBtn.classList.toggle('menu-open');
            
            // Aggiorna aria-expanded
            const isOpen = nav.classList.contains('nav-open');
            menuBtn.setAttribute('aria-expanded', isOpen);
        });
        
        // Chiudi menu quando si clicca su un link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                menuBtn.classList.remove('menu-open');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
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
        
        // Chiudi menu mobile con Escape
        if (e.key === 'Escape') {
            const nav = document.querySelector('.nav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (nav && nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                menuBtn.classList.remove('menu-open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus(); // Rimetti focus sul bottone menu
            }
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
                outline: 3px solid #f59e0b !important;
                outline-offset: 2px !important;
                border-radius: 4px !important;
            }
        `;
        document.head.appendChild(keyboardStyle);
    }
}

// Header scroll effect ottimizzato
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

// Ottimizzazioni mobile
function initMobileOptimizations() {
    // Gestione viewport height dinamica per mobile (iOS Safari fix)
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Prevenzione zoom accidentale
    document.addEventListener('touchstart', {}, { passive: true });
    
    // Rileva dispositivi touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        console.log('📱 Dispositivo touch rilevato');
    }
    
    // Ottimizzazioni per dispositivi mobili
    if (window.innerWidth <= 768) {
        console.log('📱 Modalità mobile attivata');
        
        // Riduci animazioni su mobile
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        
        // Disabilita hover effects su touch
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) and (pointer: coarse) {
                .subject-card:hover .subject-details {
                    max-height: 0;
                }
                .subject-card.touch-expanded .subject-details {
                    max-height: 300px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Gestione tap per espandere dettagli su mobile
        document.querySelectorAll('.subject-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('touch-expanded');
            });
        });
    }
}

// Inizializzazione principale
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inizializzazione sito ripetizioni...');
    
    // Debug informazioni
    console.log('🔍 Debug info:', {
        pathname: window.location.pathname,
        href: window.location.href,
        particlesElement: !!document.getElementById('particles-js'),
        isMobile: window.innerWidth <= 768,
        userAgent: navigator.userAgent.includes('Mobile')
    });
    
    // Verifica se siamo nella homepage e carica particelle
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname.includes('index.html') || 
                      window.location.pathname === '' ||
                      document.getElementById('particles-js') !== null;
    
    if (isHomepage && document.getElementById('particles-js')) {
        console.log('✅ Homepage rilevata - caricamento particelle...');
        loadParticles();
    } else {
        console.log('📄 Pagina diversa dalla homepage - particelle NON caricate');
    }
    
    // Inizializza tutte le funzionalità
    initSmoothScrolling();
    initScrollAnimations();
    initMobileMenu();
    initAccessibility();
    initHeaderScroll();
    initMobileOptimizations();
    
    console.log('✅ Sito caricato con successo!');
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Sito caricato in ${loadTime}ms`);
        
        // Statistiche dettagliate
        console.log('📊 Performance metrics:', {
            loadTime: `${loadTime}ms`,
            particlesLoaded: !!document.getElementById('particles-js'),
            isMobile: window.innerWidth <= 768,
            touchDevice: 'ontouchstart' in window,
            connectionSpeed: navigator.connection ? navigator.connection.effectiveType : 'unknown'
        });
        
        // Avviso se il caricamento è lento
        if (loadTime > 3000) {
            console.warn('⚠️ Caricamento lento rilevato (>3s)');
        }
    }
});

// Gestione errori globale
window.addEventListener('error', function(e) {
    console.error('❌ Errore JavaScript:', e.error);
    console.error('📍 File:', e.filename, 'Linea:', e.lineno);
});