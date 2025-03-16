/**
 * Ethereum Animation Functionality
 * Adds dynamic Ethereum-themed animations to the website
 */

document.addEventListener('DOMContentLoaded', () => {
    initEthereumAnimations();
    initSmartContractAnimation();
});

/**
 * Initialize all Ethereum animations
 */
function initEthereumAnimations() {
    // Generate floating Ethereum logos
    generateEthLogos();
    
    // Generate gas fee particles
    generateGasParticles();
    
    // Generate Ethereum hex codes
    generateEthHexCodes();
    
    // Add animation classes to elements
    applyEthereumClasses();
    
    // Setup gas price animation
    setupGasPriceAnimation();
}

/**
 * Generate floating Ethereum logos in the background
 */
function generateEthLogos() {
    const container = document.querySelector('.background-container');
    if (!container) return;
    
    // Create multiple Ethereum logos
    const logoCount = window.innerWidth < 768 ? 4 : 8;
    
    for (let i = 0; i < logoCount; i++) {
        const logo = document.createElement('div');
        logo.className = 'eth-logo';
        
        // Set random positions
        logo.style.left = `${Math.random() * 100}%`;
        logo.style.top = `${Math.random() * 100}%`;
        
        // Set random sizes
        const size = 20 + Math.random() * 40;
        logo.style.width = `${size}px`;
        logo.style.height = `${size * 1.6}px`;
        
        // Set random animation delays
        logo.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(logo);
    }
}

/**
 * Generate gas particles flowing upward
 */
function generateGasParticles() {
    const container = document.querySelector('.background-container');
    if (!container) return;
    
    // Create gas particles
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const gas = document.createElement('div');
        gas.className = 'eth-gas';
        
        // Set random positions
        gas.style.left = `${Math.random() * 100}%`;
        gas.style.top = `${Math.random() * 100}%`;
        
        // Set random sizes
        const size = 2 + Math.random() * 3;
        gas.style.width = `${size}px`;
        gas.style.height = `${size}px`;
        
        // Set random animation delays
        gas.style.animationDelay = `${Math.random() * 10}s`;
        
        // Set random durations
        gas.style.animationDuration = `${5 + Math.random() * 10}s`;
        
        container.appendChild(gas);
    }
}

/**
 * Generate Ethereum hexadecimal codes in background
 */
function generateEthHexCodes() {
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;
    
    // Ethereum addresses and transaction hashes
    const ethHexStrings = [
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
        '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
    ];
    
    // Add hex codes to selected sections
    sections.forEach((section, index) => {
        // Only add to every second section to avoid clutter
        if (index % 2 !== 0) return;
        
        const hexCount = window.innerWidth < 768 ? 3 : 5;
        
        for (let i = 0; i < hexCount; i++) {
            const hex = document.createElement('div');
            hex.className = 'eth-hex';
            
            // Set random positions within the section
            hex.style.left = `${Math.random() * 90 + 5}%`;
            hex.style.top = `${Math.random() * 90 + 5}%`;
            
            // Set random delays
            hex.style.animationDelay = `${Math.random() * 8}s`;
            
            // Set random ethereum hex string
            const randomHex = ethHexStrings[Math.floor(Math.random() * ethHexStrings.length)];
            hex.setAttribute('data-hex', randomHex);
            
            // Add to section
            section.appendChild(hex);
        }
    });
}

/**
 * Apply Ethereum animation classes to various elements
 */
function applyEthereumClasses() {
    // Add smart contract animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('smart-contract');
    });
    
    // Add ethereum glow effect to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('eth-glow');
    });
    
    // Add Ethereum stack animation to selected images
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.classList.add('eth-stack');
    }
    
    // Add Ethereum transaction animation to timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.classList.add('eth-transaction');
    });
    
    // Add Ethereum button animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('eth-button');
    });
}

/**
 * Setup the gas price animation indicator
 */
function setupGasPriceAnimation() {
    // Add a gas price indicator to the header
    const header = document.querySelector('.navbar');
    if (!header) return;
    
    const gasPrice = document.createElement('div');
    gasPrice.className = 'gas-price-animation';
    
    // Set random gas prices and update them periodically
    const updateGasPrice = () => {
        const price = Math.floor(Math.random() * 100) + 20;
        gasPrice.textContent = `${price} Gwei`;
    };
    
    // Initial gas price
    updateGasPrice();
    
    // Update gas price every 10 seconds
    setInterval(updateGasPrice, 10000);
    
    // Add to header
    header.appendChild(gasPrice);
}

/**
 * Initialize Smart Contract Animation
 */
function initSmartContractAnimation() {
    const contractAnimation = document.querySelector('.eth-smart-contract-animation');
    if (!contractAnimation) return;
    
    // Get gas counter element
    const gasCounter = document.querySelector('.gas-counter');
    if (!gasCounter) return;
    
    // Simulate gas usage counting up
    let gasUsed = 0;
    const maxGas = 3500000; // 3.5 million gas (typical for complex contract)
    const gasIncrement = 25000; // Gas increment per step
    
    // Function to format gas number with commas
    const formatGas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    // Update gas counter animation
    const gasInterval = setInterval(() => {
        gasUsed += gasIncrement;
        
        if (gasUsed >= maxGas) {
            gasUsed = maxGas;
            clearInterval(gasInterval);
            
            // Change status to "Confirmed" after deployment completes
            setTimeout(() => {
                const statusText = document.querySelector('.status-text');
                if (statusText) {
                    statusText.textContent = 'Contract Confirmed';
                }
                
                // Add contract execution animation
                animateContractExecution();
            }, 1000);
        }
        
        gasCounter.textContent = formatGas(gasUsed);
    }, 100);
    
    // Generate random Ethereum address for contract
    const ethAddressChars = '0123456789abcdef';
    let ethAddress = '0x';
    
    for (let i = 0; i < 40; i++) {
        ethAddress += ethAddressChars.charAt(Math.floor(Math.random() * ethAddressChars.length));
    }
    
    // Update contract address
    const contractAddress = document.querySelector('.contract-address');
    if (contractAddress) {
        contractAddress.textContent = ethAddress;
    }
}

/**
 * Animate contract execution after deployment
 */
function animateContractExecution() {
    // Add "function execution" animation
    const codeContainer = document.querySelector('.contract-code');
    if (!codeContainer) return;
    
    // Add a new function call being executed
    setTimeout(() => {
        const executionLine = document.createElement('div');
        executionLine.className = 'code-line typing-effect';
        executionLine.innerHTML = '    <span class="comment">// Executing contract function...</span>';
        codeContainer.appendChild(executionLine);
        
        setTimeout(() => {
            const resultLine = document.createElement('div');
            resultLine.className = 'code-line typing-effect';
            resultLine.innerHTML = '    <span class="keyword">event</span> <span class="variable">ProjectAdded</span>(string _name, uint256 _id);';
            codeContainer.appendChild(resultLine);
        }, 1500);
    }, 1000);
} 