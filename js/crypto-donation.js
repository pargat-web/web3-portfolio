/**
 * Ethereum Donation Functionality
 * Allows users to connect their wallet and donate ETH
 */

document.addEventListener("DOMContentLoaded", function () {
    const connectButtons = document.querySelectorAll(".connect-wallet-btn");
    const donateButtons = document.querySelectorAll(".donate-eth-btn");
    const walletAddress = "0x3928438261eB4EaAAD4B8e747BD4F8d729317c51";
    let userAccount = null;

    // Function to connect to MetaMask or other Web3 provider
    async function connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                userAccount = accounts[0];
                
                // Update all connect wallet buttons
                connectButtons.forEach(button => {
                    button.innerHTML = `<i class="fas fa-link"></i> Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
                    button.classList.add("connected");
                    button.disabled = true;
                });
                
                // Enable donate buttons
                donateButtons.forEach(button => {
                    button.disabled = false;
                });
                
                // Listen for account changes
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                
            } catch (error) {
                console.error("User rejected the request", error);
            }
        } else {
            alert("Web3 wallet not detected! Please install MetaMask or another Ethereum wallet to use this feature.");
        }
    }

    // Handle account changes
    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected their wallet
            resetWalletConnection();
        } else if (accounts[0] !== userAccount) {
            userAccount = accounts[0];
            // Update all connect wallet buttons
            connectButtons.forEach(button => {
                button.innerHTML = `<i class="fas fa-link"></i> Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
            });
        }
    }

    // Reset wallet connection state
    function resetWalletConnection() {
        userAccount = null;
        connectButtons.forEach(button => {
            button.innerHTML = `<i class="fas fa-wallet"></i> Connect Wallet`;
            button.classList.remove("connected");
            button.disabled = false;
        });
        
        donateButtons.forEach(button => {
            button.disabled = true;
        });
    }

    // Function to send Ethereum donation
    async function donateEther() {
        if (!window.ethereum || !userAccount) {
            alert("Please connect your wallet first.");
            return;
        }

        const amountInEth = prompt("Enter the amount of ETH you want to donate:");
        
        if (!amountInEth || isNaN(amountInEth) || parseFloat(amountInEth) <= 0) {
            alert("Please enter a valid amount greater than 0.");
            return;
        }

        try {
            // Convert ETH to Wei using string manipulation (without external libraries)
            // 1 ETH = 10^18 Wei
            const ethValue = parseFloat(amountInEth);
            const weiValue = ethValue * 1000000000000000000; // 10^18
            const weiHex = '0x' + Math.floor(weiValue).toString(16);
            
            // Disable buttons during transaction
            donateButtons.forEach(button => {
                button.disabled = true;
                button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing...`;
            });
            
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: userAccount,
                    to: walletAddress,
                    value: weiHex,
                    gas: '0x5208', // 21000 gas
                }],
            });
            
            // Show success animation
            showTransactionSuccess(ethValue);
            
            // Reset buttons after transaction
            setTimeout(() => {
                donateButtons.forEach(button => {
                    button.disabled = false;
                    button.innerHTML = `<i class="fab fa-ethereum"></i> Donate ETH`;
                });
            }, 3000);
            
        } catch (error) {
            console.error("Transaction failed", error);
            alert(`Transaction failed: ${error.message}`);
            
            // Reset buttons on error
            donateButtons.forEach(button => {
                button.disabled = false;
                button.innerHTML = `<i class="fab fa-ethereum"></i> Donate ETH`;
            });
        }
    }
    
    // Show transaction success animation
    function showTransactionSuccess(amount) {
        // Create success notification element
        const notification = document.createElement('div');
        notification.className = 'eth-tx-success';
        notification.innerHTML = `
            <div class="eth-tx-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="eth-tx-details">
                <h4>Transaction Sent!</h4>
                <p>You donated ${amount} ETH</p>
                <p class="eth-tx-hash">Thank you for your support!</p>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }

    // Add event listeners to all buttons
    connectButtons.forEach(button => {
        button.addEventListener("click", connectWallet);
    });
    
    donateButtons.forEach(button => {
        button.addEventListener("click", donateEther);
    });
}); 