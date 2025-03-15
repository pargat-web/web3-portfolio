// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize Three.js effects
    initThreeJS();
});

// ======== GSAP Animations ========
function initGSAPAnimations() {
    // Register GSAP ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        animateHero();
        
        // Section animations
        animateSections();
        
        // Skill items animations
        animateSkills();
        
        // Timeline animations
        animateTimeline();
        
        // Project card animations
        animateProjects();
    } else {
        console.warn('GSAP or ScrollTrigger not loaded');
    }
}

// Animate hero section elements
function animateHero() {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        // Create timeline for hero section
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        // Animate hero text elements
        tl.from('.hero-text h1', {
            y: 50,
            opacity: 0,
            duration: 1
        })
        .from('.hero-text h2', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.cta-buttons .btn', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2
        }, '-=0.4')
        .from('.scroll-indicator', {
            y: -20,
            opacity: 0,
            duration: 0.6
        }, '-=0.2');
    }
}

// Animate section headers and content
function animateSections() {
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // About section animation
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        gsap.from('.about-text', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Contact section animation
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        gsap.from('.contact-form', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from('.social-links', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    }
}

// Animate skill items
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (skillItems.length > 0) {
        gsap.from(skillItems, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Add hover animation for each skill
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    y: -10,
                    scale: 1.05,
                    boxShadow: '0 15px 30px rgba(94, 66, 166, 0.4)',
                    duration: 0.3
                });
                
                // Animate icon
                const icon = item.querySelector('i');
                if (icon) {
                    gsap.to(icon, {
                        color: 'var(--accent-blue)',
                        scale: 1.2,
                        duration: 0.3
                    });
                }
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    y: 0,
                    scale: 1,
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                    duration: 0.3
                });
                
                // Reset icon
                const icon = item.querySelector('i');
                if (icon) {
                    gsap.to(icon, {
                        color: 'var(--secondary-color)',
                        scale: 1,
                        duration: 0.3
                    });
                }
            });
        });
    }
}

// Animate timeline elements
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            const isEven = index % 2 === 0;
            const xDirection = isEven ? -30 : 30;
            
            gsap.from(item, {
                x: xDirection,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
            
            // Animate timeline dot
            gsap.from(item.querySelector('.timeline-dot'), {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                delay: 0.3,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
}

// Animate project cards
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        gsap.from(projectCards, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
}

// ======== Three.js Effects ========
function initThreeJS() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }
    
    // Get canvas element for hero section
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Set camera position
    camera.position.z = 5;
    
    // Create cyberpunk-themed geometry
    createCyberpunkGeometry(scene);
    
    // Add lights
    addLights(scene);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate all scene objects
        scene.children.forEach(child => {
            if (child.type === 'Mesh' || child.type === 'Group') {
                child.rotation.x += 0.003;
                child.rotation.y += 0.005;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Create cyberpunk-themed 3D geometry
function createCyberpunkGeometry(scene) {
    // Create a group to hold all objects
    const group = new THREE.Group();
    
    // Create main geometry - futuristic cube grid
    const gridSize = 3;
    const spacing = 0.6;
    
    for (let x = -gridSize; x <= gridSize; x++) {
        for (let y = -gridSize; y <= gridSize; y++) {
            for (let z = -gridSize; z <= gridSize; z++) {
                // Skip some cubes for a more interesting pattern
                if (Math.random() < 0.8 && Math.abs(x) + Math.abs(y) + Math.abs(z) > gridSize) continue;
                
                // Create cube
                const size = Math.random() * 0.2 + 0.05;
                const geometry = new THREE.BoxGeometry(size, size, size);
                
                // Create material with cyberpunk colors
                const material = new THREE.MeshPhongMaterial({
                    color: getRandomCyberpunkColor(),
                    transparent: true,
                    opacity: 0.8,
                    shininess: 100
                });
                
                // Create mesh and position it
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(
                    x * spacing,
                    y * spacing,
                    z * spacing
                );
                
                // Random rotation
                cube.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );
                
                // Add to group
                group.add(cube);
            }
        }
    }
    
    // Add central torus for focus
    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0x00FFFF, // Electric blue
        emissive: 0x5E42A6, // Deep purple
        shininess: 50,
        transparent: true,
        opacity: 0.7
    });
    
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    group.add(torus);
    
    // Add group to scene
    scene.add(group);
    
    // Scale whole group to fit nicely in the canvas
    group.scale.set(0.7, 0.7, 0.7);
    
    return group;
}

// Add lights to the scene
function addLights(scene) {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x121212, 0.5);
    scene.add(ambientLight);
    
    // Point lights with cyberpunk colors
    const pointLight1 = new THREE.PointLight(0x2DFE54, 1, 10); // Cyber green
    pointLight1.position.set(5, 3, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x00FFFF, 1, 10); // Electric blue
    pointLight2.position.set(-5, -3, 5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xFF6D00, 1, 10); // Neon orange
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);
    
    // Create light animation
    animateLights(pointLight1, pointLight2, pointLight3);
}

// Animate lights to create dynamic effect
function animateLights(light1, light2, light3) {
    // Use GSAP to animate the lights
    gsap.to(light1.position, {
        x: 5,
        y: -3,
        z: 2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to(light2.position, {
        x: -3,
        y: 3,
        z: -3,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to(light3.position, {
        x: 2,
        y: -5,
        z: 4,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Animate intensity
    gsap.to(light1, {
        intensity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to(light2, {
        intensity: 0.7,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
    });
    
    gsap.to(light3, {
        intensity: 0.6,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });
}

// Return a random cyberpunk-themed color
function getRandomCyberpunkColor() {
    const colors = [
        0x5E42A6, // Deep purple
        0x2DFE54, // Cyber green
        0x00FFFF, // Electric blue
        0xFF6D00, // Neon orange
        0x4B0082  // Dark purple
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Animations and visual effects for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initHeroAnimation();
    initScrollAnimations();
    initParticleBackground();
    initTextEffects();
});

// Initialize three.js hero animation
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    
    // Exit if canvas doesn't exist
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add responsive sizing
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    
    // Camera position
    camera.position.z = 5;
    
    // Create a grid of cubes
    const cubes = [];
    const cubeSize = 0.2;
    const gridSize = 6;
    const spacing = 0.4;
    
    // Create material with cyberpunk colors
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x5E42A6, wireframe: true }), // Purple
        new THREE.MeshBasicMaterial({ color: 0x2DFE54, wireframe: true }), // Green
        new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: true })  // Cyan
    ];
    
    // Create a geometry that will be shared by all cubes
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    
    // Create grid of cubes
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
                // Skip some cubes randomly for a more organic look
                if (Math.random() < 0.7) continue;
                
                // Choose a random material
                const material = materials[Math.floor(Math.random() * materials.length)];
                
                // Create cube
                const cube = new THREE.Mesh(geometry, material);
                
                // Position cube in grid
                cube.position.x = (x - gridSize / 2) * spacing;
                cube.position.y = (y - gridSize / 2) * spacing;
                cube.position.z = (z - gridSize / 2) * spacing;
                
                // Add slight rotation
                cube.rotation.x = Math.random() * Math.PI;
                cube.rotation.y = Math.random() * Math.PI;
                
                // Add to scene and track in array
                scene.add(cube);
                cubes.push({
                    mesh: cube,
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.01,
                        y: (Math.random() - 0.5) * 0.01,
                    },
                    pulseSpeed: Math.random() * 0.02 + 0.01,
                    pulseDirection: Math.random() > 0.5 ? 1 : -1
                });
            }
        }
    }
    
    // Mouse tracking for interactive effect
    const mouse = { x: 0, y: 0 };
    
    document.addEventListener('mousemove', (event) => {
        // Normalize mouse coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate all cubes
        cubes.forEach(cube => {
            cube.mesh.rotation.x += cube.rotationSpeed.x;
            cube.mesh.rotation.y += cube.rotationSpeed.y;
            
            // Pulse effect (slight scale change)
            const scale = 1 + Math.sin(Date.now() * cube.pulseSpeed) * 0.1 * cube.pulseDirection;
            cube.mesh.scale.set(scale, scale, scale);
        });
        
        // Rotate entire scene based on mouse position for interactive effect
        scene.rotation.y = mouse.x * 0.5;
        scene.rotation.x = mouse.y * 0.5;
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
}

// Initialize GSAP scroll animations
function initScrollAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP and/or ScrollTrigger not loaded. Skipping scroll animations.');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        gsap.fromTo(title, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Animate section lines after titles
    const sectionLines = document.querySelectorAll('.section-line');
    
    sectionLines.forEach(line => {
        gsap.fromTo(line, 
            { width: 0 },
            { 
                width: 80, 
                duration: 1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: line,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Animate project cards with stagger
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        gsap.fromTo(projectCards, 
            { y: 100, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
    
    // Animate skill items with stagger
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (skillItems.length > 0) {
        gsap.fromTo(skillItems, 
            { scale: 0, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
}

// Initialize particle background effect
function initParticleBackground() {
    // Check if we're on the hero section
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    heroSection.appendChild(particlesContainer);
    
    // Create particles
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random particle properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animationDuration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply properties
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        
        // Random color
        const colors = ['#5E42A6', '#2DFE54', '#00FFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Animation
        particle.style.animation = `float ${animationDuration}s infinite ease-in-out ${delay}s`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
    
    // Add the needed CSS for the particles
    const style = document.createElement('style');
    style.textContent = `
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-30px) translateX(15px);
            }
            50% {
                transform: translateY(0) translateX(30px);
            }
            75% {
                transform: translateY(30px) translateX(15px);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize text effects
function initTextEffects() {
    // Add data-text attribute to all glitch elements for the effect
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        if (!element.getAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }
    });
    
    // Apply typing effect to elements with typing-text class
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        // Create a style for this element
        const elementStyle = document.createElement('style');
        const uniqueClass = 'typing-' + Math.random().toString(36).substr(2, 9);
        
        element.classList.add(uniqueClass);
        
        elementStyle.textContent = `
            .${uniqueClass} {
                width: 0;
                white-space: nowrap;
                overflow: hidden;
                border-right: 3px solid var(--secondary-color);
                animation: typing-${uniqueClass} 3.5s steps(${text.length}, end) forwards,
                           blink-caret 0.75s step-end infinite;
            }
            
            @keyframes typing-${uniqueClass} {
                from { width: 0 }
                to { width: 100% }
            }
            
            @keyframes blink-caret {
                from, to { border-color: transparent }
                50% { border-color: var(--secondary-color) }
            }
        `;
        
        document.head.appendChild(elementStyle);
        
        // Delay the typing animation start slightly
        setTimeout(() => {
            element.textContent = text;
        }, 500);
    });
}

// Track elements in viewport for fade-in animations
document.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    
    fadeElements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If the element is in the viewport
        if (position.top < window.innerHeight * 0.9) {
            element.classList.add('visible');
        }
    });
}); 