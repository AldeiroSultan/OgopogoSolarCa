/*
Javascript for ABout page
*/

document.addEventListener('DOMContentLoaded', function() {
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observeTimeline = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for cascade effect
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = 0;
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        observeTimeline.observe(item);
    });
    
    // Achievement cards animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    const observeAchievements = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    achievementCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        
        observeAchievements.observe(card);
    });
    
    // Section content animation
    const sectionContents = document.querySelectorAll('.section-content');
    
    const observeSections = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.2 });
    
    sectionContents.forEach(section => {
        observeSections.observe(section);
    });
});