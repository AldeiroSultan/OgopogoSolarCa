/*
JavaScript fort the team page
*/

document.addEventListener('DOMContentLoaded', function() {
    // Team cards staggered animation
    const teamCards = document.querySelectorAll('.team-card');
    
    const observeCards = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for cascade effect
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    teamCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        
        observeCards.observe(card);
    });
    
    // Hover effect to show more info
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const bio = this.querySelector('.member-bio');
            if (bio) {
                bio.style.maxHeight = bio.scrollHeight + 'px';
                bio.style.opacity = 1;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const bio = this.querySelector('.member-bio');
            if (bio) {
                bio.style.maxHeight = null;
                bio.style.opacity = null;
            }
        });
    });
    
    // Social icon hover animation
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
});