import { TwitterLogo, WassieLogo } from '../components/logos.js';

// Set the SVGs as the innerHTML of the buttons
document.getElementById('twitter-logo-button').innerHTML = TwitterLogo('#000');
document.getElementById('wassie-logo-button').innerHTML = WassieLogo('#000');

// Event listener for the enabled toggle button
document.getElementById('enabled-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
});

// Event listeners for the logo buttons
['twitter-logo-button', 'wassie-logo-button'].forEach(function(id) {
    document.getElementById(id).addEventListener('click', function() {
        // Do something when the logo button is clicked
    });
});
