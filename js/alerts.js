/**
 * Custom Alert System
 * Beautiful styled alerts with web3/blockchain aesthetic
 */

// Create the alert container if it doesn't exist
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.custom-alert-container')) {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'custom-alert-container';
        document.body.appendChild(alertContainer);
    }
});

// Alert counter for unique IDs
let alertCounter = 0;

/**
 * Show a custom alert
 * @param {Object} options - Alert options
 * @param {string} options.type - Alert type: 'success', 'error', 'warning', 'info'
 * @param {string} options.title - Alert title
 * @param {string} options.message - Alert message
 * @param {number} options.duration - Duration in ms (default: 5000)
 * @param {boolean} options.dismissible - Whether alert can be dismissed manually (default: true)
 */
function showAlert(options) {
    // Default options
    const defaults = {
        type: 'info',
        title: '',
        message: '',
        duration: 5000,
        dismissible: true
    };

    // Merge defaults with provided options
    const settings = {...defaults, ...options};
    
    // Create alert container if it doesn't exist
    if (!document.querySelector('.custom-alert-container')) {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'custom-alert-container';
        document.body.appendChild(alertContainer);
    }
    
    // Get container
    const container = document.querySelector('.custom-alert-container');
    
    // Create alert ID
    const alertId = `alert-${Date.now()}-${alertCounter++}`;
    
    // Get appropriate icon based on alert type
    let icon = '';
    switch(settings.type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'info':
        default:
            icon = '<i class="fas fa-info-circle"></i>';
            break;
    }
    
    // Create alert HTML
    const alertHtml = `
        <div class="custom-alert ${settings.type}" id="${alertId}">
            <div class="custom-alert-icon">${icon}</div>
            <div class="custom-alert-content">
                ${settings.title ? `<div class="custom-alert-title">${settings.title}</div>` : ''}
                <div class="custom-alert-message">${settings.message}</div>
            </div>
            ${settings.dismissible ? `<button class="custom-alert-close" aria-label="Close alert"><i class="fas fa-times"></i></button>` : ''}
            <div class="custom-alert-progress"></div>
        </div>
    `;
    
    // Add alert to container
    container.insertAdjacentHTML('beforeend', alertHtml);
    
    // Get the alert element
    const alertElement = document.getElementById(alertId);
    
    // Show the alert with animation
    setTimeout(() => {
        alertElement.classList.add('show');
    }, 10);
    
    // Set up close button if dismissible
    if (settings.dismissible) {
        const closeButton = alertElement.querySelector('.custom-alert-close');
        closeButton.addEventListener('click', () => {
            closeAlert(alertId);
        });
    }
    
    // Auto close after duration
    if (settings.duration > 0) {
        setTimeout(() => {
            closeAlert(alertId);
        }, settings.duration);
    }
    
    // Return alert ID so it can be closed programmatically
    return alertId;
}

/**
 * Close an alert by ID
 * @param {string} alertId - The ID of the alert to close
 */
function closeAlert(alertId) {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
        alertElement.classList.add('hide');
        setTimeout(() => {
            alertElement.remove();
        }, 400); // Match the CSS animation duration
    }
}

/**
 * Show a success alert
 * @param {string} message - The alert message
 * @param {string} title - The alert title (optional)
 * @param {number} duration - Duration in ms (default: 5000)
 */
function showSuccessAlert(message, title = 'Success', duration = 5000) {
    return showAlert({
        type: 'success',
        title: title,
        message: message,
        duration: duration
    });
}

/**
 * Show an error alert
 * @param {string} message - The alert message
 * @param {string} title - The alert title (optional)
 * @param {number} duration - Duration in ms (default: 5000)
 */
function showErrorAlert(message, title = 'Error', duration = 5000) {
    return showAlert({
        type: 'error',
        title: title,
        message: message,
        duration: duration
    });
}

/**
 * Show a warning alert
 * @param {string} message - The alert message
 * @param {string} title - The alert title (optional)
 * @param {number} duration - Duration in ms (default: 5000)
 */
function showWarningAlert(message, title = 'Warning', duration = 5000) {
    return showAlert({
        type: 'warning',
        title: title,
        message: message,
        duration: duration
    });
}

/**
 * Show an info alert
 * @param {string} message - The alert message
 * @param {string} title - The alert title (optional)
 * @param {number} duration - Duration in ms (default: 5000)
 */
function showInfoAlert(message, title = 'Information', duration = 5000) {
    return showAlert({
        type: 'info',
        title: title,
        message: message,
        duration: duration
    });
}

/**
 * Override the default browser alert function
 * @param {string} message - The alert message
 */
window.nativeAlert = window.alert;
window.alert = function(message) {
    showInfoAlert(message);
};

/**
 * Create a confirm dialog and return a promise
 * @param {string} message - The confirm message
 * @param {string} title - The confirm title (optional)
 * @returns {Promise} A promise that resolves to boolean (true if confirmed, false if cancelled)
 */
function showConfirmAlert(message, title = 'Confirm') {
    return new Promise((resolve) => {
        // Create modal backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'custom-alert-backdrop';
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.right = '0';
        backdrop.style.bottom = '0';
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        backdrop.style.backdropFilter = 'blur(5px)';
        backdrop.style.zIndex = '9998';
        backdrop.style.display = 'flex';
        backdrop.style.alignItems = 'center';
        backdrop.style.justifyContent = 'center';
        document.body.appendChild(backdrop);
        
        // Create confirm dialog
        const dialog = document.createElement('div');
        dialog.className = 'custom-alert-dialog';
        dialog.style.backgroundColor = 'var(--card-bg)';
        dialog.style.borderRadius = 'var(--radius-md)';
        dialog.style.padding = '20px';
        dialog.style.width = '350px';
        dialog.style.maxWidth = '90vw';
        dialog.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.25)';
        dialog.style.border = '1px solid rgba(0, 255, 189, 0.15)';
        dialog.style.zIndex = '9999';
        
        // Add title and message
        dialog.innerHTML = `
            <h3 style="margin-top: 0; color: var(--text-color); font-size: 1.2rem;">${title}</h3>
            <p style="color: var(--text-muted); margin-bottom: 20px;">${message}</p>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button class="cancel-btn" style="background: transparent; border: 1px solid var(--text-muted); color: var(--text-muted); padding: 8px 15px; border-radius: var(--radius-md); cursor: pointer; font-size: 0.9rem; transition: all 0.3s ease;">Cancel</button>
                <button class="confirm-btn" style="background: var(--gradient-primary); border: none; color: var(--dark-bg); padding: 8px 15px; border-radius: var(--radius-md); cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s ease;">Confirm</button>
            </div>
        `;
        
        backdrop.appendChild(dialog);
        
        // Add event listeners
        const cancelBtn = dialog.querySelector('.cancel-btn');
        const confirmBtn = dialog.querySelector('.confirm-btn');
        
        cancelBtn.addEventListener('click', () => {
            backdrop.remove();
            resolve(false);
        });
        
        confirmBtn.addEventListener('click', () => {
            backdrop.remove();
            resolve(true);
        });
        
        // Add hover effects
        cancelBtn.addEventListener('mouseover', () => {
            cancelBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        cancelBtn.addEventListener('mouseout', () => {
            cancelBtn.style.backgroundColor = 'transparent';
        });
        
        confirmBtn.addEventListener('mouseover', () => {
            confirmBtn.style.transform = 'translateY(-2px)';
            confirmBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        confirmBtn.addEventListener('mouseout', () => {
            confirmBtn.style.transform = 'translateY(0)';
            confirmBtn.style.boxShadow = 'none';
        });
    });
} 