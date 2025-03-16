// Professional Web3/Blockchain Animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initHeroAnimation();
    initScrollAnimations();
    initThreeJS();
    initTypewriter();
    observeElements();
});

/**
 * Initialize GSAP animations for hero section
 */
function initHeroAnimation() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library not loaded');
        return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
        .from('.hero-text h1', { 
            y: 50, 
            opacity: 0, 
            duration: 1 
        })
        .from('.cyber-badge', { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
        }, '-=0.5')
        .from('.hero-text p', { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
        }, '-=0.5')
        .from('.hero-buttons', { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
        }, '-=0.5')
        .from('.hero-image', { 
            x: 50, 
            opacity: 0, 
            duration: 1 
        }, '-=1')
        .from('.scroll-indicator', { 
            opacity: 0, 
            duration: 0.5 
        }, '-=0.3');
}

/**
 * Initialize scroll-based animations using Intersection Observer
 */
function initScrollAnimations() {
    // Fade in animation for sections
    const sections = document.querySelectorAll('.section-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/**
 * Initialize ThreeJS background for enhanced visual effect
 */
function initThreeJS() {
    if (typeof THREE === 'undefined') {
        console.warn('THREE.js library not loaded');
        return;
    }
    
    const container = document.querySelector('.background-container');
    if (!container) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add particle system for blockchain nodes
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Create particles in a grid-like structure (blockchain metaphor)
    for (let i = 0; i < particleCount; i++) {
        // Position
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10 - 5;
        
        // Color - blue/purple palette
        colors[i3] = 0.3 + Math.random() * 0.3; // R
        colors[i3 + 1] = 0.3 + Math.random() * 0.4; // G
        colors[i3 + 2] = 0.7 + Math.random() * 0.3; // B
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
        size: 5,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.4
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Create lines to connect nearby particles (blockchain connections)
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x3b5fff,
        transparent: true,
        opacity: 0.2
    });
    
    const lines = [];
    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            // Only connect relatively close particles
            const i3 = i * 3;
            const j3 = j * 3;
            
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (distance < 2) {
                const lineGeometry = new THREE.BufferGeometry();
                const linePositions = new Float32Array(6);
                
                linePositions[0] = positions[i3];
                linePositions[1] = positions[i3 + 1];
                linePositions[2] = positions[i3 + 2];
                
                linePositions[3] = positions[j3];
                linePositions[4] = positions[j3 + 1];
                linePositions[5] = positions[j3 + 2];
                
                lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
                lines.push(line);
            }
        }
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire particle system slowly
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        
        // Update line rotations to match particle system
        lines.forEach(line => {
            line.rotation.y += 0.001;
            line.rotation.x += 0.0005;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/**
 * Initialize typewriter effect for the hero section
 */
function initTypewriter() {
    const textElement = document.querySelector('.typed-text');
    if (!textElement) return;
    
    const phrases = [
        'Full-Stack Developer',
        'Blockchain Enthusiast',
        'Smart Contract Developer',
        'Web3 Innovator'
    ];
    
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = [];
    let isDeleting = false;
    let isEnd = false;
    
    function typeEffect() {
        isEnd = false;
        
        // Current phrase
        const text = phrases[phraseIndex];
        
        // Text effect logic
        if (isDeleting) {
            // Remove character
            currentPhrase.pop();
        } else {
            // Add character
            currentPhrase.push(text[letterIndex]);
        }
        
        // Display the current phrase
        textElement.innerHTML = currentPhrase.join('');
        
        // Typing speed
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed /= 2; // Faster when deleting
        }
        
        // If completed typing current phrase
        if (!isDeleting && letterIndex === text.length - 1) {
            // Pause at end of phrase
            typeSpeed = 2000;
            isDeleting = true;
            isEnd = true;
        } else if (isDeleting && currentPhrase.length === 0) {
            isDeleting = false;
            // Move to next phrase
            phraseIndex = (phraseIndex + 1) % phrases.length;
            letterIndex = 0;
            typeSpeed = 500;
        } else {
            // Move to next letter
            if (!isDeleting) {
                letterIndex++;
            }
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
}

/**
 * Observe elements and add animation classes when they become visible
 */
function observeElements() {
    // Elements to observe
    const elementsToObserve = [
        { selector: '.project-card', animation: 'animate', threshold: 0.2 },
        { selector: '.timeline-item', animation: 'animate', threshold: 0.3 },
        { selector: '.skill-item', animation: 'animate', threshold: 0.3 },
        { selector: '.about-image', animation: 'visible', threshold: 0.5, class: 'fade-in' },
        { selector: '.about-text', animation: 'visible', threshold: 0.5, class: 'fade-in' },
        { selector: '.contact-item', animation: 'visible', threshold: 0.5, class: 'fade-in' },
        { selector: '.contact-form-container', animation: 'visible', threshold: 0.5, class: 'fade-in' }
    ];
    
    elementsToObserve.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        if (elements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (item.class) {
                        entry.target.classList.add(item.class);
                    }
                    entry.target.classList.add(item.animation);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: item.threshold,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    });
    
    // Back to top button visibility
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
