/*
Enhanced JavaScript for the entire website with improved animations and interactions
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality with enhanced animations
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenuClose && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; 
            
            // Animate menu items sequentially
            const menuItems = mobileMenu.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
            });
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
            
            // Reset transition delays
            const menuItems = mobileMenu.querySelectorAll('li');
            menuItems.forEach(item => {
                setTimeout(() => {
                    item.style.transitionDelay = '';
                }, 500);
            });
        });
    }
    
    // Add current year to copyright in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Enhanced smooth scrolling with offset for header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    document.body.style.overflow = '';
                }
                
                // Update URL without reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Enhanced header scroll effect with gradual transformation
    const header = document.querySelector('.header');
    if (header) {
        const headerTransform = () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero-video') ? document.querySelector('.hero-video').offsetHeight / 3 : 200;
            
            if (scrollY > 50) {
                const scrollRatio = Math.min(scrollY / heroHeight, 1);
                header.style.backgroundColor = `rgba(255, 255, 255, ${0.95 + (scrollRatio * 0.05)})`;
                header.style.boxShadow = `0 2px ${10 + scrollRatio * 15}px rgba(0, 0, 0, ${0.05 + scrollRatio * 0.07})`;
                header.classList.add('scrolled');
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', headerTransform);
        headerTransform(); // Initialize on page load
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-video');
    if (heroSection) {
        const handleParallax = () => {
            const scrollY = window.scrollY;
            const overlay = heroSection.querySelector('.overlay');
            const speed = 0.4; // Adjust the speed of the parallax effect
            
            if (scrollY < window.innerHeight) {
                overlay.style.transform = `translateY(${scrollY * speed}px)`;
            }
        };
        
        window.addEventListener('scroll', handleParallax);
    }
    
    // Create particles for hero section
    const createParticles = () => {
        const heroSection = document.querySelector('.hero-video');
        if (heroSection) {
            // Create particles container if it doesn't exist
            let particlesContainer = heroSection.querySelector('.particles');
            if (!particlesContainer) {
                particlesContainer = document.createElement('div');
                particlesContainer.className = 'particles';
                heroSection.appendChild(particlesContainer);
            }
            
            // Number of particles
            const numParticles = 20;
            
            // Clear existing particles
            particlesContainer.innerHTML = '';
            
            // Create new particles
            for (let i = 0; i < numParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random positioning
                const left = Math.random() * 100;
                const size = Math.random() * 5 + 3;
                const opacity = Math.random() * 0.4 + 0.1;
                const duration = Math.random() * 15 + 10;
                const delay = Math.random() * 10;
                
                particle.style.left = `${left}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.opacity = opacity;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
    };
    
    // Initialize particles
    createParticles();
    
    // Create scroll indicator for hero section
    const createScrollIndicator = () => {
        const heroSection = document.querySelector('.hero-video');
        if (heroSection && !heroSection.querySelector('.scroll-indicator')) {
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            
            const mouse = document.createElement('div');
            mouse.className = 'mouse';
            
            const wheel = document.createElement('div');
            wheel.className = 'wheel';
            
            const text = document.createElement('span');
            text.textContent = 'Scroll Down';
            
            mouse.appendChild(wheel);
            scrollIndicator.appendChild(mouse);
            scrollIndicator.appendChild(text);
            
            heroSection.appendChild(scrollIndicator);
            
            // Hide scroll indicator when scrolling down
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '0.8';
                }
            });
        }
    };
    
    // Initialize scroll indicator
    createScrollIndicator();
    
    // Enhanced animation for elements when they come into view
    function setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in-section');
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        // More precise observer with multiple thresholds
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '0px 0px -50px 0px'
        };
        
        // Observer for regular fade animations
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
        
        // Observer for custom animations
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    animateObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            animateObserver.observe(element);
        });
        
        // Special animations for the timeline section
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for cascade effect
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 200);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
        
        // Card animations with staggered effect
        const cardElements = document.querySelectorAll('.feature-card, .update-card, .achievement-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardElements.forEach(card => {
            // Set initial styles for cards that will be animated
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            cardObserver.observe(card);
        });
    }
    
    // Initialize scroll animations if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        setupScrollAnimations();
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.fade-in-section, .animate-on-scroll').forEach(el => {
            el.classList.add('is-visible');
            el.classList.add('animate');
        });
    }
    
    // Add floating animation to selected elements
    const floatingElements = document.querySelectorAll('.feature-icon, .cta-section .btn');
    floatingElements.forEach(element => {
        element.classList.add('float-animation');
    });
    
    // Add hover effects for buttons and links
    const enhanceButtons = () => {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (this.style.transform && this.style.transform.includes('translateY')) {
                    // Keep existing transform if it already has translateY
                } else {
                    this.style.transform = 'translateY(-3px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
        
        // Add ripple effect to buttons
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };
    
    enhanceButtons();
    
    // Add AOS (Animate on Scroll) style animations to specific elements
    const initializeAOSStyle = () => {
        // Create animation for images in About page sections
        const sectionImages = document.querySelectorAll('.image-content img');
        sectionImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(1000px) rotateY(5deg)';
                
                // Find and modify parent's ::before if it exists
                const parent = this.parentElement;
                if (parent && parent.querySelector('::before')) {
                    const beforeElement = parent.querySelector('::before');
                    if (beforeElement) {
                        beforeElement.style.top = '15px';
                        beforeElement.style.left = '15px';
                    }
                }
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = '';
                
                // Reset parent's ::before if it exists
                const parent = this.parentElement;
                if (parent && parent.querySelector('::before')) {
                    const beforeElement = parent.querySelector('::before');
                    if (beforeElement) {
                        beforeElement.style.top = '';
                        beforeElement.style.left = '';
                    }
                }
            });
        });
    };
    
    initializeAOSStyle();
    
    // Page transition effects
    function initPageTransitions() {
        document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links
                if (href && (href.startsWith('/') || href.startsWith('./') || href.indexOf('://') === -1)) {
                    e.preventDefault();
                    
                    const fadeOut = document.createElement('div');
                    fadeOut.className = 'page-transition-overlay';
                    fadeOut.style.position = 'fixed';
                    fadeOut.style.top = '0';
                    fadeOut.style.left = '0';
                    fadeOut.style.width = '100%';
                    fadeOut.style.height = '100%';
                    fadeOut.style.backgroundColor = 'var(--primary-color)';
                    fadeOut.style.zIndex = '9999';
                    fadeOut.style.opacity = '0';
                    fadeOut.style.transition = 'opacity 0.3s ease';
                    
                    document.body.appendChild(fadeOut);
                    
                    setTimeout(() => {
                        fadeOut.style.opacity = '1';
                    }, 10);
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
        
        // Handle back button
        window.addEventListener('pageshow', function(event) {
            if (event.persisted) {
                // Page was loaded from cache (back button)
                const fadeOut = document.querySelector('.page-transition-overlay');
                if (fadeOut) {
                    fadeOut.style.opacity = '0';
                    setTimeout(() => {
                        fadeOut.remove();
                    }, 300);
                }
            }
        });
        
        // Add entry animation
        document.body.classList.add('page-transition');
    }
    
    initPageTransitions();
    
    // Handle light/dark mode preference (if implemented)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = (event) => {
        document.body.classList.toggle('dark-mode', event.matches);
    };
    
    prefersDarkScheme.addEventListener('change', handleColorSchemeChange);
});

// Enhanced Parallax Scrolling Implementation
function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-scroll');
    
    const updateParallaxPosition = () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.3;
            const offset = scrollY * speed;
            element.style.setProperty('--parallax-offset', `${offset}px`);
        });
    };
    
    window.addEventListener('scroll', updateParallaxPosition);
    updateParallaxPosition(); // Initialize positions
}

window.addEventListener('load', function() {
    setupParallaxEffect();
    
    // Add parallax class to background elements
    const heroVideo = document.querySelector('.video-bg');
    if (heroVideo) {
        heroVideo.classList.add('parallax-scroll');
        heroVideo.dataset.speed = '-0.2'; // Negative for opposite direction
    }
    
    // Add simple preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
    
    // Animate in elements that are already in viewport
    const animateInitialElements = () => {
        document.querySelectorAll('.fade-in-section, .animate-on-scroll').forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                el.classList.add('is-visible');
                el.classList.add('animate');
            }
        });
    };
    
    animateInitialElements();
});