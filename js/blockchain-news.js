/**
 * Blockchain News API Integration
 * Fetches and displays the latest blockchain news in the news section
 */

// Global variable to store the current date
let currentNewsDate = new Date().toDateString();

// Function to fetch news from the Crypto News API (free tier)
async function fetchBlockchainNews() {
    try {
        // CryptoCompare News API - Free tier with specific categories for Web3, Ethereum, and Blockchain news
        const apiUrl = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=Blockchain,Cryptocurrency,Ethereum,Web3&sortOrder=latest';
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Save the fetch timestamp to localStorage
        localStorage.setItem('lastNewsFetchTime', new Date().toISOString());
        localStorage.setItem('lastNewsFetchDate', new Date().toDateString());
        
        return data.Data; // The actual news items
    } catch (error) {
        console.error('Error fetching blockchain news:', error);
        return [];
    }
}

// Function to filter news to prioritize Web3, Ethereum, and Blockchain topics
function filterRelevantNews(newsItems) {
    // Keywords to prioritize
    const priorityKeywords = ['web3', 'ethereum', 'blockchain', 'crypto', 'defi', 'nft', 'smart contract'];
    
    // First, find items that explicitly mention our priority keywords in the title
    const priorityNews = newsItems.filter(item => {
        const title = item.title.toLowerCase();
        return priorityKeywords.some(keyword => title.includes(keyword));
    });
    
    // If we have enough priority news, return those; otherwise, return all news
    return priorityNews.length >= 6 ? priorityNews : newsItems;
}

// Function to display news in the news section
async function displayBlockchainNews() {
    const newsContainer = document.querySelector('.news-container');
    
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    
    // Add loading indicator
    newsContainer.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-pulse"></i> Loading latest blockchain news...</div>';
    
    // Check if we need to fetch new data
    const shouldFetchNews = checkIfNewsFetchNeeded();
    
    // Get news items - either from cache or fresh fetch
    let newsItems;
    if (shouldFetchNews) {
        newsItems = await fetchBlockchainNews();
        
        // Cache the news data
        if (newsItems && newsItems.length > 0) {
            localStorage.setItem('cachedNewsData', JSON.stringify(newsItems));
        }
    } else {
        // Try to get from cache
        const cachedNews = localStorage.getItem('cachedNewsData');
        newsItems = cachedNews ? JSON.parse(cachedNews) : await fetchBlockchainNews();
    }
    
    if (!newsItems || newsItems.length === 0) {
        newsContainer.innerHTML = '<div class="news-error">Unable to load news at this time. Please check back later.</div>';
        return;
    }
    
    // Filter for most relevant Web3/Ethereum/Blockchain news
    const relevantNews = filterRelevantNews(newsItems);
    
    // Clear loading indicator
    newsContainer.innerHTML = '';
    
    // Display up to 6 news items
    const maxNewsItems = Math.min(6, relevantNews.length);
    
    for (let i = 0; i < maxNewsItems; i++) {
        const item = relevantNews[i];
        
        // Format date
        const publishDate = new Date(item.published_on * 1000); // API provides timestamp in seconds
        const formattedDate = publishDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Trim body text for excerpt
        const excerpt = item.body.length > 120 ? item.body.substring(0, 120) + '...' : item.body;
        
        // Create news item HTML
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-date">${formattedDate}</div>
            <div class="news-image-container">
                <img src="${item.imageurl}" alt="${item.title}" class="news-image" onerror="this.src='assets/images/blockchain-news-fallback.jpg'">
            </div>
            <h3>${item.title}</h3>
            <p>${excerpt}</p>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-link">Read full article <i class="fas fa-long-arrow-alt-right"></i></a>
        `;
        
        newsContainer.appendChild(newsItem);
    }
    
    // Update current news date
    currentNewsDate = new Date().toDateString();
}

// Check if we need to fetch new news data
function checkIfNewsFetchNeeded() {
    // Get the last fetch time from localStorage
    const lastFetchTime = localStorage.getItem('lastNewsFetchTime');
    const lastFetchDate = localStorage.getItem('lastNewsFetchDate');
    
    // If no last fetch time, we definitely need to fetch
    if (!lastFetchTime) {
        return true;
    }
    
    const now = new Date();
    const lastFetch = new Date(lastFetchTime);
    
    // Check if it's a new day compared to last fetch
    if (lastFetchDate !== now.toDateString()) {
        return true;
    }
    
    // Check if it's been more than 30 minutes since last fetch
    const timeDiff = now - lastFetch;
    const minutesDiff = timeDiff / (1000 * 60);
    
    return minutesDiff > 30;
}

// Function to check if date has changed and refresh news if needed
function checkDateAndRefresh() {
    const todayDate = new Date().toDateString();
    
    // If date has changed since last check, refresh the news
    if (currentNewsDate !== todayDate) {
        console.log('Date changed, refreshing news...');
        displayBlockchainNews();
    }
}

// Initialize the news section when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display blockchain news immediately
    displayBlockchainNews();
    
    // Check for updates every 30 minutes
    setInterval(displayBlockchainNews, 30 * 60 * 1000);
    
    // Also check if the date has changed every hour
    setInterval(checkDateAndRefresh, 60 * 60 * 1000);
}); 