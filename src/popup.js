import { TwitterLogo, WassieLogo } from "../components/logos.js";

// Set the SVGs as the innerHTML of the wrappers
document.getElementById("twitter-logo-wrapper").innerHTML = TwitterLogo("#000");
document.getElementById("wassie-logo-wrapper").innerHTML = WassieLogo("#000");

let isEnabled;

let enabledButton = document.getElementById('enabled-toggle');
let enabledImage = document.getElementById('enabled-status-icon');
let enabledLabel = enabledButton.querySelector('span');

// Load the state from storage when the popup is opened
chrome.storage.sync.get(['enabled'], function(result) {
    isEnabled = result.hasOwnProperty('enabled') ? result.enabled : true;
    enabledButton.classList.toggle('enabled', isEnabled);
    enabledImage.src = isEnabled ? "images/enabled.png" : "images/disabled.png";
    enabledLabel.textContent = isEnabled ? "Enabled" : "Disabled";
});

// Add event listener to toggle enabled status and image
enabledButton.addEventListener('click', function() {
    isEnabled = !isEnabled;
    enabledButton.classList.toggle('enabled', isEnabled);
    enabledImage.src = isEnabled ? "images/enabled.png" : "images/disabled.png";
    enabledLabel.textContent = isEnabled ? "Enabled" : "Disabled";
    chrome.storage.sync.set({enabled: isEnabled});
});