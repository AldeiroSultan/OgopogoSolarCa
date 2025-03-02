/*
Javascript for Sponsor
*/

document.addEventListener('DOMContentLoaded', function() {
    // Animate sponsor cards on scroll
    const sponsorCards = document.querySelectorAll('.sponsor-card');
    
    const observeSponsors = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    sponsorCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        
        observeSponsors.observe(card);
    });
    
    // Animate small sponsor logos on scroll
    const sponsorLogos = document.querySelectorAll('.sponsor-logo-small');
    
    const observeLogos = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.1 });
    
    sponsorLogos.forEach(logo => {
        logo.style.opacity = 0;
        logo.style.transform = 'translateY(20px)';
        
        observeLogos.observe(logo);
    });
    
    // Animate sponsorship level cards
    const levelCards = document.querySelectorAll('.level-card');
    
    const observeLevels = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    levelCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        
        observeLevels.observe(card);
    });
    
    // Animate impact stats with counting effect
    const impactStats = document.querySelectorAll('.stat-number');
    
    function animateCounter(el) {
        const target = parseInt(el.textContent.replace(/\+|\$|,/g, ''));
        const prefix = el.textContent.charAt(0) === '$' ? '$' : '';
        const suffix = el.textContent.includes('+') ? '+' : '';
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); // approximately 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format with commas for thousands
            const formattedNumber = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            el.textContent = `${prefix}${formattedNumber}${suffix}`;
        }, 16);
    }
    
    const observeStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observeStats.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    impactStats.forEach(stat => {
        // Store the original text to use as the target
        const originalText = stat.textContent;
        // Set initial value to 0
        stat.textContent = originalText.charAt(0) === '$' ? '$0' : '0';
        
        // Observe the stat
        observeStats.observe(stat);
    });
    
    // Hover effects for sponsor links
    const sponsorLinks = document.querySelectorAll('.sponsor-link');
    
    sponsorLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(3px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
});