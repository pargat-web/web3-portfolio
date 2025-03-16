# Web3 Custom Alert System Implementation Guide

This guide explains how to implement the custom alert system throughout your Web3 portfolio website.

## Files Created

1. `js/alerts.js` - Contains all alert functionality
2. `css/alerts.css` - Contains all alert styling
3. `alert-demo.html` - Demo page to showcase all alert types

## Integration Steps

### 1. File References (Completed)

These files have been added to your `index.html`:

```html
<!-- In the head section -->
<link rel="stylesheet" href="css/alerts.css">

<!-- At the end of the body, with other scripts -->
<script src="js/alerts.js"></script>
```

### 2. Using the Alert System

The following functions are available:

#### Basic Alerts

```javascript
// Success alert
showSuccessAlert('Operation completed successfully!', 'Success', 5000);

// Error alert
showErrorAlert('Something went wrong. Please try again.', 'Error', 5000);

// Warning alert
showWarningAlert('This action cannot be undone.', 'Warning', 5000);

// Info alert
showInfoAlert('Your transaction is being processed.', 'Information', 5000);
```

The parameters are:
- Message (required)
- Title (optional, defaults to the alert type)
- Duration in ms (optional, defaults to 5000ms)

#### Confirm Dialog

```javascript
showConfirmAlert('Are you sure you want to proceed?', 'Confirm')
  .then(confirmed => {
    if (confirmed) {
      // User clicked Confirm
      // Execute your action here
    } else {
      // User clicked Cancel
      // Handle cancellation here
    }
  });
```

#### Advanced Custom Alert

For more customization options:

```javascript
showAlert({
    type: 'success', // 'success', 'error', 'warning', or 'info'
    title: 'Custom Title',
    message: 'This is a custom alert with advanced options',
    duration: 8000, // milliseconds
    dismissible: true // whether user can dismiss it manually
});
```

### 3. Replacing Existing Alerts

The native `alert()` function has been overridden to use our custom alerts. Any existing code using `alert()` will automatically use our styled alerts.

Example:
```javascript
// This will now show a custom styled alert
alert('This message will use the custom alert system');
```

### 4. Implementation Areas

Replace alerts in the following areas:

1. **Form Submissions**: Show success or error alerts after form submission
2. **Connection Events**: Show alerts when wallet connection succeeds or fails
3. **Transaction Events**: Show alerts for transaction status updates
4. **Error Handling**: Replace any try/catch blocks that use alerts

### 5. Example Implementation

```javascript
// Example: Wallet Connection
document.querySelector('.connect-wallet-btn').addEventListener('click', async function() {
    try {
        // Connect wallet logic
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        // Show success alert
        showSuccessAlert(`Wallet connected: ${account.substring(0, 6)}...${account.substring(38)}`, 'Connected');
        
        // Update UI
        // ...
    } catch (error) {
        // Show error alert
        showErrorAlert(error.message || 'Failed to connect wallet', 'Connection Error');
    }
});

// Example: Form Submission
document.querySelector('#contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // Form submission logic
        // ...
        
        // Show success alert
        showSuccessAlert('Your message has been sent!', 'Thank You');
        
        // Reset form
        this.reset();
    } catch (error) {
        // Show error alert
        showErrorAlert('Failed to send message. Please try again.', 'Error');
    }
});
```

## Testing

Open the `alert-demo.html` file in your browser to test all alert types and functionality.

## Browser Compatibility

This alert system is compatible with all modern browsers including:
- Chrome, Firefox, Safari, Edge
- Mobile browsers on iOS and Android

## Customization

You can customize the alert appearance by modifying the CSS variables in `alerts.css` if needed to better match your site's theme. 