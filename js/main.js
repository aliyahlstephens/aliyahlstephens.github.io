// Stephen's Tech Portfolio Website - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Project Filtering (on projects page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Check if fields are empty
            if (!name.value.trim()) {
                isValid = false;
                showError(name, 'Name is required');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                isValid = false;
                showError(email, 'Email is required');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (!subject.value.trim()) {
                isValid = false;
                showError(subject, 'Subject is required');
            } else {
                removeError(subject);
            }
            
            if (!message.value.trim()) {
                isValid = false;
                showError(message, 'Message is required');
            } else {
                removeError(message);
            }
            
            // If valid, submit the form (in a real application, this would send data to a server)
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Show success message
                    contactForm.innerHTML = `
                        <div class="form-success">
                            <h3>Thank you for your message!</h3>
                            <p>I'll get back to you as soon as possible.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Theme Switcher
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            document.body.classList.remove('light-mode');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        const newTheme = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Apply saved theme on initial load
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    applyTheme(savedTheme);
});

// Helper Functions
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 