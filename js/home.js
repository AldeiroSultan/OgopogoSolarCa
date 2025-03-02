/*
JavaScript for the home page
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Video background function
    const videoElement = document.querySelector('.video-bg');
    
    // If using a video (not an image fallback)
    if (videoElement && videoElement.tagName === 'VIDEO') {
        // Handle video loading issues
        videoElement.addEventListener('error', function() {
            console.error('Video failed to load, falling back to image');
            // Replace with fallback image if video fails to load
            const fallbackImage = document.createElement('img');
            fallbackImage.src = 'img/hero-bg.jpg';
            fallbackImage.alt = 'Solar Car';
            fallbackImage.classList.add('video-bg');
            videoElement.parentNode.replaceChild(fallbackImage, videoElement);
        });
        
        // So the video plays on mobile
        videoElement.setAttribute('playsinline', '');
        
        // Try to play the video automatically
        videoElement.play().catch(e => {
            console.warn('Auto-play prevented:', e);
            // Add a play button if autoplay is prevented
            const playButton = document.createElement('button');
            playButton.innerHTML = '<i class="fas fa-play"></i> Play Video';
            playButton.classList.add('video-play-button');
            document.querySelector('.overlay').appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                videoElement.play();
                playButton.style.display = 'none';
            });
        });
    }
    
    // Card animations on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observeFeatures = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    featureCards.forEach(card => {
        observeFeatures.observe(card);
    });
    
    // Staggered animation for cards
    const updateCards = document.querySelectorAll('.update-card');
    
    const observeUpdates = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    updateCards.forEach(card => {
        observeUpdates.observe(card);
    });
    
    // Simple parralax animation :)
    const heroSection = document.querySelector('.hero-video');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const overlay = heroSection.querySelector('.overlay');
                overlay.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    }
});