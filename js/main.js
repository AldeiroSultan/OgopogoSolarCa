/*
Javascript for the entire website
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenuClose && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; 
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    // Add current year to copyright in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Header scroll shaddow effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Page transition effects
    function initPageTransitions() {
        const pageTransitionElements = document.querySelectorAll('.page-transition');
        
        pageTransitionElements.forEach(element => {
            element.classList.add('active');
        });
    }
    
    initPageTransitions();
});

// Animation on scroll 
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - elementHeight / 4) {
                element.classList.add('animate');
            }
        });
    }
    
    checkIfInView();
    window.addEventListener('scroll', checkIfInView);
});

// Fade-in animation when scrolling
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Call scroll animations setup if the browser supports Intersection Observer
if ('IntersectionObserver' in window) {
    setupScrollAnimations();
}