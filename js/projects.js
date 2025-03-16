// Projects data and functionality

// GitHub username to fetch repositories from
const GITHUB_USERNAME = 'pargat-web';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing projects...');
    // Create placeholder image
    createPlaceholderImage();
    // Initialize projects
    initProjects();
});

/**
 * Create a placeholder image if it doesn't exist
 */
function createPlaceholderImage() {
    const placeholderUrl = 'assets/images/projects/placeholder.jpg';
    // Simple base64 encoded placeholder image (grey box with web3 text)
    const fallbackImageSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIGZpbGw9IiMzYjVmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjUwIiBvcGFjaXR5PSIwLjIiLz4KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iMzAiIG9wYWNpdHk9IjAuMyIvPgogIDwvZz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgc3R5bGU9ImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogYm9sZDsgZmlsbDogI2ZmZjsgdGV4dC1hbmNob3I6IG1pZGRsZTsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsiPldlYjMgUHJvamVjdDwvdGV4dD4KPC9zdmc+';
    
    // Immediately set this as a global variable for fallbacks
    window.defaultProjectImage = fallbackImageSrc;
    
    // Set up error handlers for all project images
    setTimeout(() => {
        document.querySelectorAll('.project-image img').forEach(img => {
            img.onerror = function() {
                console.log('Image failed to load, using fallback image');
                this.src = window.defaultProjectImage;
            };
            
            // Force a reload to trigger onerror if the image is already broken
            if (img.naturalWidth === 0) {
                img.src = window.defaultProjectImage;
            }
        });
    }, 1000);
}

/**
 * Initialize projects functionality
 */
async function initProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    try {
        console.log('Loading projects...');
        // Show loading animation
        projectsGrid.innerHTML = `
            <div class="loading-projects">
                <div class="loader"></div>
                <p>Loading projects...</p>
            </div>
        `;
        
        // Try to fetch GitHub projects
        let projects = [];
        try {
            projects = await fetchGitHubProjects();
            
            // Check if we actually have projects
            if (!projects || projects.length === 0) {
                console.log('No GitHub projects found, using local projects');
                projects = getLocalProjects();
            }
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            console.log('Falling back to local projects');
            projects = getLocalProjects();
        }
        
        // Render projects and set up filters
        renderProjects(projects);
        setupFilters(projects);
        
    } catch (error) {
        console.error('Error loading projects:', error);
        
        // Ultimate fallback in case of any error
        const localProjects = getLocalProjects();
        renderProjects(localProjects);
        setupFilters(localProjects);
    }
    
    // Add hover effects to project cards
    addProjectHoverEffects();
}

/**
 * Fetch repositories from GitHub API
 * @returns {Promise<Array>} Array of project objects
 */
async function fetchGitHubProjects() {
    try {
        // Add a timeout to the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
            { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        console.log('Raw GitHub repos data:', repos);
        
        if (!repos || repos.length === 0) {
            throw new Error('No repositories found');
        }
        
        // Map GitHub repositories to our project format
        return repos.map(repo => {
            return {
                id: repo.id,
                title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                description: repo.description || `A ${getProjectCategory(repo.name)} project built with modern technologies.`,
                image: `assets/images/projects/${repo.name}.jpg`,
                category: getProjectCategory(repo.name),
                technologies: getProjectTechnologies(repo),
                demoLink: repo.homepage || '#',
                codeLink: repo.html_url
            };
        });
    } catch (error) {
        console.error('Error in fetchGitHubProjects:', error);
        throw error; // Re-throw to trigger fallback
    }
}

/**
 * Determine project category based on repository name
 * @param {string} repoName The repository name
 * @returns {string} Category name
 */
function getProjectCategory(repoName) {
    const repoNameLower = repoName.toLowerCase();
    
    if (repoNameLower.includes('blockchain') || repoNameLower.includes('web3') || 
        repoNameLower.includes('smart-contract') || repoNameLower.includes('dapp')) {
        return 'blockchain';
    } else if (repoNameLower.includes('react') || repoNameLower.includes('vue') || 
               repoNameLower.includes('angular')) {
        return 'frontend';
    } else if (repoNameLower.includes('api') || repoNameLower.includes('node') || 
               repoNameLower.includes('express') || repoNameLower.includes('server')) {
        return 'backend';
    } else if (repoNameLower.includes('portfolio') || repoNameLower.includes('website')) {
        return 'web';
    } else {
        return 'other';
    }
}

/**
 * Determine technologies used in a project based on repository
 * @param {Object} repo The repository object from GitHub API
 * @returns {Array} Array of technology names
 */
function getProjectTechnologies(repo) {
    const technologies = [];
    
    // Add language as primary technology
    if (repo.language) {
        technologies.push(repo.language);
    }
    
    // Add common technologies based on repository name and description
    const nameLower = repo.name.toLowerCase();
    const descLower = (repo.description || '').toLowerCase();
    const combinedText = nameLower + ' ' + descLower;
    
    if (combinedText.includes('react')) technologies.push('React');
    if (combinedText.includes('node')) technologies.push('Node.js');
    if (combinedText.includes('express')) technologies.push('Express');
    if (combinedText.includes('mongodb')) technologies.push('MongoDB');
    if (combinedText.includes('web3') || combinedText.includes('ethereum')) technologies.push('Web3.js');
    if (combinedText.includes('solidity') || combinedText.includes('smart contract')) technologies.push('Solidity');
    if (combinedText.includes('css')) technologies.push('CSS3');
    if (combinedText.includes('html')) technologies.push('HTML5');
    
    // Ensure we have at least some technologies
    if (technologies.length === 0) {
        technologies.push('JavaScript', 'HTML5', 'CSS3');
    }
    
    return technologies;
}

/**
 * Fallback to sample projects if GitHub projects can't be fetched
 */
function getLocalProjects() {
    return [
        {
            title: "DecentraVote: Blockchain Voting Platform",
            description: "A secure, transparent voting system using Ethereum smart contracts to ensure vote integrity and prevent tampering. Features real-time vote counting and immutable results.",
            tags: ["Solidity", "React", "Web3.js", "Ethereum"],
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIGZpbGw9IiM4ZTQ0ZWYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8cG9seWdvbiBwb2ludHM9IjEwMCw1MCAxNTAsNTAgMTY1LDg1IDEzNSwxMjAgODUsMTIwIDY1LDg1IiBvcGFjaXR5PSIwLjMiLz4KICAgIDxwb2x5Z29uIHBvaW50cz0iMTAwLDY1IDE0MCw2NSAxNTAsOTAgMTI1LDExNSA4NSwxMTUgNzAsOTAiIG9wYWNpdHk9IjAuNSIvPgogICAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iOTAiIHI9IjE1IiBvcGFjaXR5PSIwLjgiLz4KICA8L2c+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIHN0eWxlPSJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMjRweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGZpbGw6ICNmZmY7IHRleHQtYW5jaG9yOiBtaWRkbGU7IGRvbWluYW50LWJhc2VsaW5lOiBtaWRkbGU7Ij5EZWNlbnRyYVZvdGU8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI4MCUiIHN0eWxlPSJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTZweDsgZmlsbDogI2E5YTliOTsgdGV4dC1hbmNob3I6IG1pZGRsZTsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsiPkJsb2NrY2hhaW4gVm90aW5nIFBsYXRmb3JtPC90ZXh0Pgo8L3N2Zz4=",
            demo_url: "#",
            repo_url: "#",
            category: "blockchain"
        },
        {
            title: "CryptoPortfolio Tracker",
            description: "An all-in-one cryptocurrency portfolio tracker that allows users to monitor their investments across multiple exchanges and wallets. Features include price alerts and performance analytics.",
            tags: ["React", "Node.js", "MongoDB", "CoinGecko API"],
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8cGF0aCBkPSJNMTAgODBMNjAgMzBMOTAgNTBMMTIwIDIwTDE4MCA4MEgxMFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNiNWZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjMwIiByPSI4IiBmaWxsPSIjM2I1ZmZmIi8+CiAgICA8Y2lyY2xlIGN4PSI5MCIgY3k9IjUwIiByPSI4IiBmaWxsPSIjM2I1ZmZmIi8+CiAgICA8Y2lyY2xlIGN4PSIxMjAiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzNiNWZmZiIvPgogICAgPGNpcmNsZSBjeD0iMTgwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiMzYjVmZmYiLz4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiMzYjVmZmYiLz4KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiM4ZTQ0ZWYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CiAgICA8dGV4dCB4PSIxNTAiIHk9IjEwMCIgc3R5bGU9ImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogYm9sZDsgZmlsbDogI2ZmZjsgdGV4dC1hbmNob3I6IG1pZGRsZTsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsiPiQ8L3RleHQ+CiAgPC9nPgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBzdHlsZT0iZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBmaWxsOiAjZmZmOyB0ZXh0LWFuY2hvcjogbWlkZGxlOyBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlOyI+Q3J5cHRvUG9ydGZvbGlvPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iODAlIiBzdHlsZT0iZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDE2cHg7IGZpbGw6ICNhOWE5Yjk7IHRleHQtYW5jaG9yOiBtaWRkbGU7IGRvbWluYW50LWJhc2VsaW5lOiBtaWRkbGU7Ij5Qb3J0Zm9saW8gVHJhY2tlcjwvdGV4dD4KPC9zdmc+",
            demo_url: "#",
            repo_url: "#",
            category: "web"
        },
        {
            title: "ArtifactChain: NFT Marketplace",
            description: "A decentralized marketplace for artists to mint, sell, and trade NFTs with low gas fees and user-friendly interface. Supports multiple blockchain networks.",
            tags: ["Solidity", "React", "IPFS", "Metamask"],
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8cmVjdCB4PSI3MCIgeT0iMzAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI5MCIgc3Ryb2tlPSIjOGU0NGVmIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KICAgIDxyZWN0IHg9IjgwIiB5PSI0MCIgd2lkdGg9IjkwIiBoZWlnaHQ9IjkwIiBzdHJva2U9IiM3ZGVkZmYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgogICAgPHJlY3QgeD0iNjAiIHk9IjIwIiB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHN0cm9rZT0iIzNiNWZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CiAgICA8Y2lyY2xlIGN4PSIxMDUiIGN5PSI2NSIgcj0iMjAiIGZpbGw9IiM4ZTQ0ZWYiIGZpbGwtb3BhY2l0eT0iMC4zIi8+CiAgPC9nPgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBzdHlsZT0iZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBmaWxsOiAjZmZmOyB0ZXh0LWFuY2hvcjogbWlkZGxlOyBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlOyI+QXJ0aWZhY3RDaGFpbjwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjgwJSIgc3R5bGU9ImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxNnB4OyBmaWxsOiAjYTlhOWI5OyB0ZXh0LWFuY2hvcjogbWlkZGxlOyBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlOyI+TkZUIE1hcmtldHBsYWNlPC90ZXh0Pgo8L3N2Zz4=",
            demo_url: "#",
            repo_url: "#",
            category: "blockchain"
        },
        {
            title: "DeFi Yield Optimizer",
            description: "An automated yield farming strategy tool that helps users maximize their returns by auto-compounding and rebalancing across various DeFi protocols.",
            tags: ["JavaScript", "Smart Contracts", "Web3", "DeFi"],
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8cGF0aCBkPSJNMTIwLDQwIEw4MCw0MCBMODAsODAgTDQwLDgwIEw0MCwxMjAgTDgwLDEyMCBMODAsMTYwIEwxMjAsMTYwIEwxMjAsMTIwIEwxNjAsMTIwIEwxNjAsODAgTDEyMCw4MCBaIiBmaWxsPSIjM2I1ZmZmIiBvcGFjaXR5PSIwLjMiLz4KICAgIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiM4ZTQ0ZWYiLz4KICAgIDx0ZXh0IHg9IjEwMCIgeT0iMTA1IiBzdHlsZT0iZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDE4cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBmaWxsOiAjZmZmOyB0ZXh0LWFuY2hvcjogbWlkZGxlOyBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlOyI+JCQ8L3RleHQ+CiAgPC9nPgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBzdHlsZT0iZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBmaWxsOiAjZmZmOyB0ZXh0LWFuY2hvcjogbWlkZGxlOyBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlOyI+RGVGaSBZaWVsZCBPcHRpbWl6ZXI8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI4MCUiIHN0eWxlPSJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTZweDsgZmlsbDogI2E5YTliOTsgdGV4dC1hbmNob3I6IG1pZGRsZTsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsiPkF1dG8tQ29tcG91bmRpbmcgU3RyYXRlZ2llczwvdGV4dD4KPC9zdmc+",
            demo_url: "#",
            repo_url: "#",
            category: "blockchain"
        },
        {
            title: "Social Media Dashboard",
            description: "A responsive dashboard that aggregates and displays analytics from multiple social media platforms in one unified interface.",
            tags: ["Vue.js", "Firebase", "CSS Grid", "Social APIs"],
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzNiNWZmZiIgb3BhY2l0eT0iMC4yIiByeD0iMyIgcnk9IjMiLz4KICAgIDxyZWN0IHg9IjEwMCIgeT0iMTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzhlNDRlZiIgb3BhY2l0eT0iMC4yIiByeD0iMyIgcnk9IjMiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI4MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjN2RlZGZmIiBvcGFjaXR5PSIwLjIiIHJ4PSIzIiByeT0iMyIvPgogICAgPHJlY3QgeD0iMTAwIiB5PSI4MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjM2I1ZmZmIiBvcGFjaXR5PSIwLjIiIHJ4PSIzIiByeT0iMyIvPgogICAgPGxpbmUgeDE9IjUwIiB5MT0iMzAiIHgyPSI1MCIgeTI9IjUwIiBzdHJva2U9IiMzYjVmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGxpbmUgeDE9IjQwIiB5MT0iNDAiIHgyPSI2MCIgeTI9IjQwIiBzdHJva2U9IiMzYjVmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iMTQwIiBjeT0iNDAiIHI9IjEwIiBmaWxsPSIjOGU0NGVmIi8+CiAgICA8bGluZSB4MT0iNTAiIHkxPSIxMTAiIHgyPSI1MCIgeTI9IjkwIiBzdHJva2U9IiM3ZGVkZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iMTQwIiBjeT0iMTEwIiByPSIxMCIgZmlsbD0iIzNiNWZmZiIvPgogIDwvZz4KICA8dGV4dCB4PSI1MCUiIHk9IjY1JSIgc3R5bGU9ImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogYm9sZDsgZmlsbDogI2ZmZjsgdGV4dC1hbmNob3I6IG1pZGRsZTsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsiPlNvY2lhbCBEYXNoYm9hcmQ8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI4MCUiIHN0eWxlPSJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTZweDsgZmlsbDogI2E5YTliOTsgdGV4dC1hbmNob3I6IG1pZGRsZTsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsiPkFuYWx5dGljcyBQbGF0Zm9ybTwvdGV4dD4KPC9zdmc+",
            demo_url: "#",
            repo_url: "#",
            category: "web"
        },
        {
            title: "SmartContract Audit Tool",
            description: "An automated tool that scans Solidity smart contracts for common security vulnerabilities and suggests optimizations for gas efficiency.",
            tags: ["Python", "Solidity", "Security", "Blockchain"],
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8cGF0aCBkPSJNNjYsMTIwIEwxMDAsNjAgTDE0MCwxMjAgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOGU0NGVmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxwYXRoIGQ9Ik02NiwxMjAgTDEwMCwxODAgTDE0MCwxMjAgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2I1ZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEyMCIgcj0iMTIiIGZpbGw9IiM3ZGVkZmYiLz4KICAgIDxwYXRoIGQ9Ik0xMDAsNjAgTDEwMCwxODAiIHN0cm9rZT0iIzNiNWZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0Ii8+CiAgICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI2MCIgcj0iNSIgZmlsbD0iIzhlNDRlZiIvPgogICAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTgwIiByPSI1IiBmaWxsPSIjOGU0NGVmIi8+CiAgICA8Y2lyY2xlIGN4PSI2NiIgY3k9IjEyMCIgcj0iNSIgZmlsbD0iIzNiNWZmZiIvPgogICAgPGNpcmNsZSBjeD0iMTQwIiBjeT0iMTIwIiByPSI1IiBmaWxsPSIjM2I1ZmZmIi8+CiAgPC9nPgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBzdHlsZT0iZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBmaWxsOiAjZmZmOyB0ZXh0LWFuY2hvcjogbWlkZGxlOyBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlOyI+U21hcnRDb250cmFjdCBBdWRpdDwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjgwJSIgc3R5bGU9ImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxNnB4OyBmaWxsOiAjZmZmOyB0ZXh0LWFuY2hvcjogbWlkZGxlOyBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlOyI+U2VjdXJpdHkgVG9vbDwvdGV4dD4KPC9zdmc+",
            demo_url: "#",
            repo_url: "#",
            category: "tools"
        }
    ];
}

/**
 * Render projects in the projects grid
 * @param {Array} projects - Array of project objects to render in the projects grid
 */
function renderProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Clear loading state and any existing projects
    projectsGrid.innerHTML = '';
    
    if (!projects || projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>No projects found.</p>
            </div>
        `;
        return;
    }
    
    // For each project, create a project card
    projects.forEach((project, index) => {
        const tags = project.tags || project.technologies || [];
        const demoLink = project.demo_url || project.demoLink || '#';
        const repoLink = project.repo_url || project.codeLink || '#';
        const category = project.category || 'other';
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.category = category;
        
        // Apply staggered animation delay based on index
        projectCard.style.animationDelay = `${index * 150}ms`;
        projectCard.dataset.cardIndex = index;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src = window.defaultProjectImage || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWUyNCIvPgogIDxnIGZpbGw9IiMzYjVmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjUwIiBvcGFjaXR5PSIwLjIiLz4KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iMzAiIG9wYWNpdHk9IjAuMyIvPgogIDwvZz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgc3R5bGU9ImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogYm9sZDsgZmlsbDogI2ZmZjsgdGV4dC1hbmNob3I6IG1pZGRsZTsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsiPldlYjMgUHJvamVjdDwvdGV4dD4KPC9zdmc+c2c+'; this.classList.add('fallback-image');">
                <span class="project-category">${category}</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${tags.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links-container">
                    <a href="${demoLink}" class="project-link demo" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-eye"></i> Live Demo
                    </a>
                    <a href="${repoLink}" class="project-link code" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-code"></i> Source Code
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Add fade-in animation after a short delay
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }, 100);
    
    // Add ripple effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Set up project filtering functionality
 * @param {Array} projects - Array of project objects to create filters for
 */
function setupFilters(projects) {
    if (!projects || projects.length === 0) return;
    
    // Find the filter container
    const filterContainer = document.querySelector('.project-filters');
    if (!filterContainer) return;
    
    // Clear existing filter buttons (except 'All')
    const existingButtons = filterContainer.querySelectorAll('.filter-btn:not([data-filter="all"])');
    existingButtons.forEach(btn => btn.remove());
    
    // Get unique categories from projects
    const categories = [...new Set(projects.map(project => project.category).filter(Boolean))];
    
    // Make sure we have an "all" button first
    let allButton = filterContainer.querySelector('.filter-btn[data-filter="all"]');
    if (!allButton) {
        allButton = document.createElement('button');
        allButton.className = 'filter-btn active';
        allButton.dataset.filter = 'all';
        allButton.textContent = 'All';
        filterContainer.appendChild(allButton);
    }
    
    // Add a button for each category
    categories.forEach(category => {
        // Don't add duplicate buttons
        if (filterContainer.querySelector(`.filter-btn[data-filter="${category}"]`)) return;
        
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.dataset.filter = category;
        
        // Capitalize first letter of category and make it more readable
        const displayName = category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
        button.textContent = displayName;
        filterContainer.appendChild(button);
    });
    
    // Add click event listeners to filter buttons
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.dataset.filter;
            
            // Filter projects
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    // Show all cards with a fade animation
                    card.style.display = '';
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 50);
                } else if (card.dataset.category === filter) {
                    // Show matching cards with a fade animation
                    card.style.display = '';
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 50);
                } else {
                    // Hide non-matching cards
                    card.classList.remove('fade-in');
                    // After the fade-out animation completes, hide the card completely
                    setTimeout(() => {
                        if (!card.classList.contains('fade-in')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

/**
 * Add hover effects to project cards
 */
function addProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add subtle hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            
            // Brighten image
            const image = card.querySelector('.project-image img');
            if (image) {
                image.style.filter = 'brightness(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            
            // Reset image brightness
            const image = card.querySelector('.project-image img');
            if (image) {
                image.style.filter = '';
            }
        });
    });
    
    console.log('Project hover effects initialized');
} 