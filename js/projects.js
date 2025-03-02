/*
Javascript for projects page
*/

document.addEventListener('DOMContentLoaded', function() {
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const featuredProject = document.querySelector('.featured-project');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            if (filter === 'all') {
                // Show all projects
                projectCards.forEach(card => {
                    card.style.display = 'block';
                });
                
                // Show featured project
                if (featuredProject) {
                    featuredProject.style.display = 'block';
                }
            } else {
                // Hide/show projects based on category
                projectCards.forEach(card => {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Hide/show featured project based on category
                if (featuredProject) {
                    if (featuredProject.getAttribute('data-category') === filter) {
                        featuredProject.style.display = 'block';
                    } else {
                        featuredProject.style.display = 'none';
                    }
                }
            }
            
            // Animate the newly visible cards
            animateVisibleCards();
        });
    });
    
    // Animate project cards on scroll
    const animateVisibleCards = () => {
        const visibleCards = document.querySelectorAll('.project-card[style="display: block"]');
        
        visibleCards.forEach((card, index) => {
            // Reset animation styles
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            
            // Add staggered delay for cascade effect
            setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            }, index * 100);
        });
    };
    
    // Innovation cards animation
    const innovationCards = document.querySelectorAll('.innovation-card');
    
    const observeInnovations = new IntersectionObserver((entries) => {
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
    
    innovationCards.forEach(card => {
        // Set initial styles for animation
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        
        // Observe the card
        observeInnovations.observe(card);
    });
    
    // Featured project animation
    const featuredProjectContent = document.querySelector('.featured-project-content');
    
    if (featuredProjectContent) {
        const observeFeatured = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        // Set initial styles for animation
        featuredProjectContent.style.opacity = 0;
        featuredProjectContent.style.transform = 'translateY(30px)';
        
        // Observe the featured project
        observeFeatured.observe(featuredProjectContent);
    }
    
    // Initialize animations on page load
    function initAnimations() {
        // Ensure all cards are initially visible for proper animation
        projectCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Apply animations to project cards
        animateVisibleCards();
    }
    
    // Run initial animations with a slight delay to ensure DOM is ready
    setTimeout(initAnimations, 100);
    
    // Optional: Add hover effects for project cards
    projectCards.forEach(card => {
        const readMoreLink = card.querySelector('.read-more');
        
        card.addEventListener('mouseenter', function() {
            if (readMoreLink) {
                readMoreLink.style.color = 'var(--primary-dark)';
                const icon = readMoreLink.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(3px)';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (readMoreLink) {
                readMoreLink.style.color = '';
                const icon = readMoreLink.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            }
        });
    });
});