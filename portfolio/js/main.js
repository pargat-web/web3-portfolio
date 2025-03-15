// Main JavaScript file for portfolio functionality

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// Initialize all application components
function initApp() {
    // Initialize UI Components
    initNavbar();
    initThemeToggle();
    initScrollEffects();
    initFormValidation();
    initProjectFilters();
    initCardHoverEffects();
    initSmoothScrolling();
    initFadeInAnimations();
    
    // Log initialization complete
    console.log('Portfolio application initialized successfully');
}

// Navigation bar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a nav link on mobile
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.classList.add('active');
    }
    
    // Toggle theme if button exists
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            themeToggle.classList.toggle('active');
            
            // Save preference
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }
}

// Scroll-based animations and effects
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    // Highlight active nav item based on scroll position
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Call once on page load
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    // Show all or filter by category
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Contact form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.textContent = '');
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Validate inputs
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                const formContainer = document.querySelector('.contact-form');
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                        <button class="btn btn-primary" onclick="location.reload()">Send Another Message</button>
                    </div>
                `;
            }
        });
    }
    
    // Helper functions for validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = message;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Card hover highlight effect
function initCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', handleCardHover);
        card.addEventListener('mouseleave', removeCardEffect);
    });
    
    function handleCardHover(e) {
        const cardRect = this.getBoundingClientRect();
        const cardHighlight = document.createElement('div');
        
        // Remove any existing highlights
        const existingHighlight = this.querySelector('.card-highlight');
        if (existingHighlight) existingHighlight.remove();
        
        // Calculate the position relative to the card
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        // Add the highlight effect
        cardHighlight.classList.add('card-highlight');
        cardHighlight.style.left = `${x}px`;
        cardHighlight.style.top = `${y}px`;
        
        this.appendChild(cardHighlight);
        
        // Subtle 3D effect based on cursor position
        const xAxis = (cardRect.width / 2 - (e.clientX - cardRect.left)) / 20;
        const yAxis = ((e.clientY - cardRect.top) - cardRect.height / 2) / 20;
        
        this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(10px)`;
    }
    
    function removeCardEffect() {
        // Remove highlight
        const highlight = this.querySelector('.card-highlight');
        if (highlight) highlight.remove();
        
        // Reset transform
        this.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    
                    window.scrollTo({
                        top: offsetTop - 70, // Adjust for navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Fade-in animations on scroll
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFadeElements() {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFadeElements);
    window.addEventListener('resize', checkFadeElements);
    
    // Initial check
    checkFadeElements();
}

// ======== Glitch Text Effect ========
function initGlitchEffect() {
    // Apply random glitch effect to elements with .glitch-text class
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        // Trigger glitch effect on hover
        element.addEventListener('mouseover', () => {
            element.classList.add('glitching');
            
            // Random glitch duration
            setTimeout(() => {
                element.classList.remove('glitching');
            }, Math.random() * 1000 + 500);
        });
    });
}

// ======== Scroll Animation ========
function initScrollAnimation() {
    // Reveal elements on scroll
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(callback, options);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Apply parallax to hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollY * 0.5 + 'px';
        }
        
        // Apply parallax to other elements as needed
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.3;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ======== Utility Functions ========
// Get the current viewport dimensions
function getViewport() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
}

// Throttle function to limit how often a function can be called
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Debounce function to delay function execution
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
} 