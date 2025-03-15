// Projects data and functionality

// Project data array
const projectsData = [
    {
        id: 1,
        title: "Blockchain Explorer",
        description: "A comprehensive blockchain explorer application that allows users to search and analyze transactions, blocks, and wallet addresses across multiple blockchain networks. Features real-time data updates, advanced filtering, and interactive visualizations of blockchain metrics.",
        image: "assets/images/project1.jpg",
        category: "blockchain",
        technologies: "React, Node.js, Web3.js, GraphQL",
        demoLink: "https://example.com/demo1",
        codeLink: "https://github.com/yourusername/blockchain-explorer"
    },
    {
        id: 2,
        title: "NFT Marketplace",
        description: "A full-featured NFT marketplace where users can mint, buy, sell and trade digital collectibles. The platform includes a robust auction system, creator royalties, collection management, and integration with popular wallets. Supports ERC-721 and ERC-1155 token standards.",
        image: "assets/images/project2.jpg",
        category: "nft",
        technologies: "Next.js, Solidity, Ethers.js, IPFS",
        demoLink: "https://example.com/demo2",
        codeLink: "https://github.com/yourusername/nft-marketplace"
    },
    {
        id: 3,
        title: "DeFi Dashboard",
        description: "An all-in-one DeFi dashboard that aggregates data from various DeFi protocols, allowing users to track their investments, yields, and portfolio performance. Features include yield farming strategies, impermanent loss calculators, and gas optimization suggestions.",
        image: "assets/images/project3.jpg",
        category: "defi",
        technologies: "Vue.js, Moralis, The Graph, Tailwind CSS",
        demoLink: "https://example.com/demo3",
        codeLink: "https://github.com/yourusername/defi-dashboard"
    },
    {
        id: 4,
        title: "AI Image Generator",
        description: "An AI-powered image generation platform that leverages machine learning models to create unique digital artwork from text prompts. Users can customize generation parameters, save favorite outputs, and export in various formats.",
        image: "assets/images/project4.jpg",
        category: "ai",
        technologies: "React, TensorFlow.js, Express, MongoDB",
        demoLink: "https://example.com/demo4",
        codeLink: "https://github.com/yourusername/ai-image-generator"
    },
    {
        id: 5,
        title: "Crypto Dashboard",
        description: "A real-time cryptocurrency tracking dashboard providing comprehensive market data, price alerts, portfolio management, and technical analysis tools. Features interactive charts, customizable watchlists, and news aggregation from trusted sources.",
        image: "assets/images/project5.jpg",
        category: "crypto",
        technologies: "Angular, Node.js, CoinGecko API, D3.js",
        demoLink: "https://example.com/demo5",
        codeLink: "https://github.com/yourusername/crypto-dashboard"
    },
    {
        id: 6,
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with cryptocurrency payment integration. Includes product management, user authentication, shopping cart functionality, order processing, and multiple crypto payment gateways with automatic conversion rates.",
        image: "assets/images/project6.jpg",
        category: "web3",
        technologies: "React, Redux, Node.js, MongoDB, Web3",
        demoLink: "https://example.com/demo6",
        codeLink: "https://github.com/yourusername/crypto-ecommerce"
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project display and functionality
    initProjects();
});

function initProjects() {
    // Get the projects grid container
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Early exit if no grid found
    if (!projectsGrid) return;
    
    // Populate the projects grid
    renderProjects(projectsGrid, projectsData);
    
    // Setup category filters if they exist
    setupFilters();
    
    // Add 3D hover effects to project cards
    addProjectHoverEffects();
}

// Render all projects to the specified container
function renderProjects(container, projects) {
    // Clear the container first
    container.innerHTML = '';
    
    // Create and append each project card
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

// Create a project card element from project data
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.setAttribute('data-category', project.category);
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <div class="project-tech">${project.technologies}</div>
            <p class="project-description">${project.description}</p>
            <div class="project-links">
                <a href="${project.demoLink}" class="btn btn-sm btn-primary" target="_blank">Live Demo</a>
                <a href="${project.codeLink}" class="btn btn-sm btn-secondary" target="_blank">View Code</a>
            </div>
        </div>
    `;
    
    // Add the card to the visible elements after a small delay for staggered animation
    setTimeout(() => {
        card.classList.add('visible');
    }, 100 * project.id);
    
    return card;
}

// Setup category filters
function setupFilters() {
    const filterContainer = document.querySelector('.project-filters');
    
    if (!filterContainer) return;
    
    // Get unique categories from projects
    const categories = ['all', ...new Set(projectsData.map(project => project.category))];
    
    // Create filter buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-filter', category);
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        
        // Set 'all' as active by default
        if (category === 'all') {
            button.classList.add('active');
        }
        
        filterContainer.appendChild(button);
    });
    
    // Add click event to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
}

// Filter projects based on category
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Get the card's category
        const cardCategory = card.getAttribute('data-category');
        
        // Apply filter
        if (category === 'all' || category === cardCategory) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Add 3D hover effects to project cards
function addProjectHoverEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            
            // Calculate mouse position relative to card
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            // Calculate rotation based on mouse position
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
} 