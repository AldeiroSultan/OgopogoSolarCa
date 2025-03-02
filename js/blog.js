/*
Javvascript for blog page
*/

document.addEventListener('DOMContentLoaded', function() {
    // Blog post animations on scroll
    const blogPosts = document.querySelectorAll('.blog-post');
    
    const observePosts = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for cascade effect
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Longer delay for more pronounced effect
            }
        });
    }, { threshold: 0.1 });
    
    blogPosts.forEach(post => {
        // Set initial styles for animation
        post.style.opacity = 0;
        post.style.transform = 'translateY(30px)';
        
        // Observe the post
        observePosts.observe(post);
    });
    
    // Sidebar widget animations
    const sidebarWidgets = document.querySelectorAll('.sidebar-widget');
    
    const observeWidgets = new IntersectionObserver((entries) => {
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
    
    sidebarWidgets.forEach(widget => {
        // Set initial styles for animation
        widget.style.opacity = 0;
        widget.style.transform = 'translateY(20px)';
        
        // Observe the widget
        observeWidgets.observe(widget);
    });
    
    // Read more link hover effect
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
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
    
    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            
            if (searchTerm) {
                // For demonstration purposes, just alert the search term
                // In a real implementation, this would redirect to search results
                alert(`Searching for: ${searchTerm}`);
                
                // Clear the input after search
                this.querySelector('input').value = '';
            }
        });
    }
    
    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value.trim();
            
            if (email) {
                // Validate email (basic validation)
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailRegex.test(email)) {
                    // For demonstration purposes, just show a success message
                    // In a real implementation, this would submit to a backend
                    
                    // Create success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = 'Thank you for subscribing!';
                    successMsg.style.color = 'green';
                    successMsg.style.marginTop = '10px';
                    
                    // Add to the form
                    this.appendChild(successMsg);
                    
                    // Clear the input after submission
                    this.querySelector('input').value = '';
                    
                    // Remove the message after 3 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 3000);
                } else {
                    // Show error for invalid email
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please enter a valid email address';
                    errorMsg.style.color = 'red';
                    errorMsg.style.marginTop = '10px';
                    
                    // Add to the form
                    this.appendChild(errorMsg);
                    
                    // Remove the message after 3 seconds
                    setTimeout(() => {
                        errorMsg.remove();
                    }, 3000);
                }
            }
        });
    }
    
    // Category filter functionality
    const categoryLinks = document.querySelectorAll('.categories-list a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the category name (without the count)
            const categoryName = this.querySelector('span:first-child').textContent;
            
            // In a real implementation, this would filter posts or redirect to a category page
            // For demonstration, we'll just highlight the selected category
            
            // Reset all links
            categoryLinks.forEach(catLink => {
                catLink.style.fontWeight = '';
                catLink.style.color = '';
            });
            
            // Highlight this link
            this.style.fontWeight = 'bold';
            this.style.color = 'var(--primary-color)';
            
            // Show a message to indicate filtering
            alert(`Filtering posts by category: ${categoryName}`);
        });
    });
    
    // Tag filter functionality
    const tagLinks = document.querySelectorAll('.tag');
    
    tagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the tag name
            const tagName = this.textContent;
            
            // In a real implementation, this would filter posts or redirect to a tag page
            // For demonstration, we'll just highlight the selected tag
            
            // Reset all tags
            tagLinks.forEach(tagLink => {
                tagLink.style.backgroundColor = '';
                tagLink.style.color = '';
            });
            
            // Highlight this tag
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.color = 'white';
            
            // Show a message to indicate filtering
            alert(`Filtering posts by tag: ${tagName}`);
        });
    });
    
    // Pagination functionality (simplified)
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would navigate to another page of posts
            // For demonstration, we'll just show a message
            alert('In a real website, this would navigate to another page of blog posts.');
        });
    });
});