/*
Javascript for join page
*/

document.addEventListener('DOMContentLoaded', function() {
    // Department accordion functionality
    const departmentHeaders = document.querySelectorAll('.department-header');
    const departmentContents = document.querySelectorAll('.department-content');
    
    // Initially hide all department contents
    departmentContents.forEach(content => {
        content.style.display = 'none';
    });
    
    departmentHeaders.forEach((header, index) => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const parent = this.parentElement;
            const icon = this.querySelector('.toggle-icon i');
            
            // Toggle the clicked department
            if (content.style.display === 'none' || !content.style.display) {
                // Close all departments first
                departmentContents.forEach(item => {
                    item.style.display = 'none';
                });
                departmentHeaders.forEach(item => {
                    item.parentElement.classList.remove('active');
                    item.querySelector('.toggle-icon i').className = 'fas fa-plus';
                });
                
                // Open this department
                content.style.display = 'flex';
                parent.classList.add('active');
                icon.className = 'fas fa-times';
                
                // Smooth scrolling
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = headerHeight + 20;
                const targetPosition = parent.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Close this department
                content.style.display = 'none';
                parent.classList.remove('active');
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqAnswers = document.querySelectorAll('.faq-answer');
    
    // Initially hide all FAQ answers
    faqAnswers.forEach(answer => {
        answer.style.display = 'none';
    });
    
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const parent = this.parentElement;
            const icon = this.querySelector('.toggle-icon i');
            
            // Toggle the clicked FAQ
            if (answer.style.display === 'none' || !answer.style.display) {
                // Open this FAQ
                answer.style.display = 'block';
                parent.classList.add('active');
                icon.className = 'fas fa-times';
            } else {
                // Close this FAQ
                answer.style.display = 'none';
                parent.classList.remove('active');
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Form validation and submission
    const joinForm = document.getElementById('join-form');
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = joinForm.querySelectorAll('[required]');
            
            // Check all required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            // Check department checkboxes
            const departmentCheckboxes = joinForm.querySelectorAll('input[name="departments"]');
            let departmentSelected = false;
            
            departmentCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    departmentSelected = true;
                }
            });
            
            if (!departmentSelected) {
                isValid = false;
                departmentCheckboxes.forEach(checkbox => {
                    checkbox.parentElement.style.color = 'red';
                });
            } else {
                departmentCheckboxes.forEach(checkbox => {
                    checkbox.parentElement.style.color = '';
                });
            }
            
            // Email validation
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.style.borderColor = 'red';
                }
            }
            
            // File validation (if provided, must be PDF)
            const resumeInput = document.getElementById('resume');
            if (resumeInput && resumeInput.files.length > 0) {
                const file = resumeInput.files[0];
                if (!file.type.includes('pdf')) {
                    isValid = false;
                    resumeInput.style.borderColor = 'red';
                    alert('Please upload resume in PDF format only.');
                } else {
                    resumeInput.style.borderColor = '';
                }
            }
            
            // AI-generated placeholder
            if (isValid) {
                // Create success message
                const formActions = joinForm.querySelector('.form-actions');
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Your application has been submitted successfully! We will contact you soon.';
                successMsg.style.color = 'green';
                successMsg.style.marginTop = '20px';
                successMsg.style.fontWeight = 'bold';
                
                // Add to the form
                formActions.appendChild(successMsg);
                
                // Reset form
                joinForm.reset();
                
                // Scroll to success message
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
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
        joinForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
        
        // Clear error styling when any department is checked
        joinForm.querySelectorAll('input[name="departments"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                joinForm.querySelectorAll('input[name="departments"]').forEach(cb => {
                    cb.parentElement.style.color = '';
                });
            });
        });
    }
    
    // Animate perks on scroll
    const perkItems = document.querySelectorAll('.perk-item');
    
    const observePerks = new IntersectionObserver((entries) => {
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
    
    perkItems.forEach(item => {
        // Set initial styles for animation
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        
        // Observe the item
        observePerks.observe(item);
    });
    
    // Animate process steps on scroll
    const processSteps = document.querySelectorAll('.process-step');
    
    const observeSteps = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    processSteps.forEach(step => {
        // Set initial styles for animation
        step.style.opacity = 0;
        step.style.transform = 'translateY(20px)';
        
        // Observe the step
        observeSteps.observe(step);
    });
    
    // Open first department by default
    if (departmentHeaders.length > 0) {
        // Simulate click on first department after a short delay
        setTimeout(() => {
            departmentHeaders[0].click();
        }, 500);
    }
});