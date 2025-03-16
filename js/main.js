// Main JavaScript file for portfolio functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize blockchain loader
    initBlockchainLoader();
    
    // Initialize all functionality
    initNavigation();
    initFormValidation();
    initScrollToTop();
    initSmoothScrolling();
    observeIntersections();
    initMobileMenu();
    initHeroImageEffect();
    initAboutImageEffect();
    initScrollDownButtons();
    initTestimonialsCarousel();
});

/**
 * Initialize the blockchain-inspired loader
 */
function initBlockchainLoader() {
    const loader = document.querySelector('.blockchain-loader');
    if (!loader) return;
    
    // Add some blockchain animation effects
    animateBlockchainLoader();
    
    // Simulate loading time (you can adjust this based on your site's actual loading needs)
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // After animation completes, hide the loader
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600); // matches transition time in CSS
    }, 2500); // Show loader for 2.5 seconds
}

/**
 * Add some dynamic animations to the blockchain loader
 */
function animateBlockchainLoader() {
    // Get the blocks and add some randomized animations
    const blocks = document.querySelectorAll('.block');
    
    blocks.forEach((block, index) => {
        // Randomize the binary data to change periodically
        const binaryElement = block.querySelector('.binary-data');
        if (binaryElement) {
            // Update binary data every second with random binary strings
            setInterval(() => {
                let binary = '';
                for (let i = 0; i < 8; i++) {
                    binary += Math.random() > 0.5 ? '1' : '0';
                }
                binaryElement.textContent = binary;
            }, 1000 + (index * 300)); // Stagger the updates
        }
        
        // Add a slight wobble animation to each block
        block.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Update the loading text with different blockchain-related terms
    const loaderText = document.querySelector('.loader-text');
    if (loaderText) {
        const loadingMessages = [
            'Loading Blockchain Portfolio',
            'Validating Blocks',
            'Syncing Nodes',
            'Mining Experience',
            'Verifying Credentials'
        ];
        
        let messageIndex = 0;
        setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loaderText.textContent = loadingMessages[messageIndex];
        }, 800);
    }
}

// Initialize navigation functionality
function initNavigation() {
    // Call the navbar initialization to ensure consistent navigation behavior
    initNavbar();
    
    // Set the active navigation link based on the current section
    updateActiveNavLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update the active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const scrollPosition = window.scrollY + 100; // Add offset for header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
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
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            showFormError('Please fill out all fields');
            return;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Form is valid, show success message
        showFormSuccess('Your message has been sent! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

/**
 * Show form error message
 * @param {string} message - The error message to display
 */
function showFormError(message) {
    const submitBtn = document.querySelector('.submit-btn');
    
    // Create or update error message
    let errorEl = document.querySelector('.form-error');
    
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        submitBtn.parentNode.insertBefore(errorEl, submitBtn);
    }
    
    errorEl.textContent = message;
    errorEl.style.opacity = '1';
    
    // Clear error after 3 seconds
    setTimeout(() => {
        errorEl.style.opacity = '0';
    }, 3000);
}

/**
 * Show form success message
 * @param {string} message - The success message to display
 */
function showFormSuccess(message) {
    const contactForm = document.getElementById('contactForm');
    
    // Create or update success message
    let successEl = document.querySelector('.form-success');
    
    if (!successEl) {
        successEl = document.createElement('div');
        successEl.className = 'form-success';
        contactForm.appendChild(successEl);
    }
    
    successEl.textContent = message;
    successEl.style.opacity = '1';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
        successEl.style.opacity = '0';
    }, 5000);
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
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
    // Smooth scroll for all links that point to an ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just # or not an ID selector
            if (targetId === '#' || targetId.length <= 1) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
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

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.back-to-top');
    
    if (!scrollTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize intersection observer for animations
 */
function observeIntersections() {
    // Only run if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) return;
    
    // Elements to observe
    const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-item, .section-header');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    console.log("Initializing mobile menu");
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    console.log("Hamburger element:", hamburger);
    console.log("Nav list element:", navList);
    
    if (hamburger && navList) {
        console.log("Mobile menu elements found, setting up event listeners");
        
        // Toggle menu when hamburger is clicked
        hamburger.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            e.stopPropagation(); // Prevent the click from bubbling up
            console.log("Hamburger clicked");
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
            console.log("Nav list active:", navList.classList.contains('active'));
            document.body.classList.toggle('menu-open'); // Add class to body to prevent scrolling
        });
        
        // Close the mobile menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log("Nav link clicked");
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navList.classList.contains('active') && 
                !navList.contains(event.target) && 
                !hamburger.contains(event.target)) {
                console.log("Clicking outside menu");
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    } else {
        console.warn("Mobile menu elements not found:", { hamburger, navList });
    }
}

/**
 * Initialize hero image hover effect
 */
function initHeroImageEffect() {
    const heroImage = document.querySelector('.image-container');
    const profileImage = document.querySelector('.profile-image');
    
    if (!heroImage || !profileImage) return;
    
    // Add subtle rotation on mouse move
    heroImage.addEventListener('mousemove', (e) => {
        const rect = heroImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        
        profileImage.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-5px) scale(1.05)`;
    });
    
    // Reset on mouse leave
    heroImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = '';
    });
}

// Add 3D effect to the about image
function initAboutImageEffect() {
    const aboutImage = document.querySelector('.about-image .image-container');
    const aboutProfileImage = document.querySelector('.about-profile-image');
    
    if (!aboutImage || !aboutProfileImage) return;
    
    // Add subtle rotation on mouse move
    aboutImage.addEventListener('mousemove', (e) => {
        const rect = aboutImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        
        aboutProfileImage.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-5px) scale(1.05)`;
    });
    
    // Reset on mouse leave
    aboutImage.addEventListener('mouseleave', () => {
        aboutProfileImage.style.transform = '';
    });
}

// Initialize the scroll functionality for the scroll down buttons
function initScrollDownButtons() {
    const scrollButtons = document.querySelectorAll('.scroll-down-btn');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    const prevBtn = document.querySelector('.testimonial-nav-btn.prev');
    const nextBtn = document.querySelector('.testimonial-nav-btn.next');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    let autoSlideTimer;

    // Show specific card
    function showCard(index) {
        // Hide all cards
        cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Deactivate all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the current card and activate corresponding indicator
        cards[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }

    // Next card
    function nextCard() {
        currentIndex = (currentIndex + 1) % totalCards;
        showCard(currentIndex);
    }

    // Previous card
    function prevCard() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        showCard(currentIndex);
    }

    // Add event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevCard();
            resetAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextCard();
            resetAutoSlide();
        });
    }

    // Add indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showCard(index);
            resetAutoSlide();
        });
    });

    // Setup auto slide
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextCard, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    // Initialize with auto-sliding
    startAutoSlide();

    // Pause auto-slide when hovering over testimonials
    const testimonialsContainer = document.querySelector('.testimonials-cards-container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideTimer);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Initialize first card
    showCard(currentIndex);
} 