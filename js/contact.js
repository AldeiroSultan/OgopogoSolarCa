/*
Javascript for contact page
*/

document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            // Check all required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            // Email validation
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.style.borderColor = 'red';
                }
            }
            
            // If valid, show success message and reset form
            if (isValid) {
                // Here you would normally submit the form data to a server
                // For demo purposes, we'll just show a success message
                
                // Create success message
                const formActions = contactForm.querySelector('.form-actions');
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Your message has been sent successfully! We will get back to you soon.';
                successMsg.style.color = 'green';
                successMsg.style.marginTop = '15px';
                successMsg.style.fontWeight = 'bold';
                
                // Add to the form
                formActions.appendChild(successMsg);
                
                // Reset form
                contactForm.reset();
                
                // Remove the message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            } else {
                // Show error message
                alert('Please fill in all required fields correctly.');
            }
        });
        
        // Clear error styling when field is changed
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value.trim();
            
            if (email) {
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailRegex.test(email)) {
                    // For demonstration purposes, just show a success message
                    
                    // Store the original button text
                    const button = this.querySelector('button');
                    const originalText = button.textContent;
                    
                    // Change button text to show success
                    button.textContent = 'Subscribed!';
                    button.style.backgroundColor = 'var(--primary-dark)';
                    
                    // Reset form
                    this.querySelector('input').value = '';
                    
                    // Restore button text after 3 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                    }, 3000);
                } else {
                    // Show error for invalid email
                    alert('Please enter a valid email address.');
                }
            } else {
                alert('Please enter your email address.');
            }
        });
    }
    
    // Animate contact info items
    const infoItems = document.querySelectorAll('.info-item');
    
    const observeInfo = new IntersectionObserver((entries) => {
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
    
    infoItems.forEach(item => {
        // Set initial styles for animation
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        
        // Observe the item
        observeInfo.observe(item);
    });
    
    // Animate social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    
    const observeSocial = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    socialIcons.forEach(icon => {
        // Set initial styles for animation
        icon.style.opacity = 0;
        icon.style.transform = 'translateY(20px)';
        
        // Observe the icon
        observeSocial.observe(icon);
    });
    
    // Animate department contacts
    const departmentContacts = document.querySelectorAll('.department-contact');
    
    const observeDepartments = new IntersectionObserver((entries) => {
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
    
    departmentContacts.forEach(contact => {
        // Set initial styles for animation
        contact.style.opacity = 0;
        contact.style.transform = 'translateY(20px)';
        
        // Observe the contact
        observeDepartments.observe(contact);
    });
    
    // Animate FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    const observeFaq = new IntersectionObserver((entries) => {
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
    
    faqItems.forEach(item => {
        // Set initial styles for animation
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        
        // Observe the item
        observeFaq.observe(item);
    });
});