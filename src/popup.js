import { TwitterLogo, WassieLogo } from '../components/logos.js';

// Set the SVGs as the innerHTML of the wrappers
document.getElementById('twitter-logo-content').innerHTML = TwitterLogo('#fff');
document.getElementById('wassie-logo-content').innerHTML = WassieLogo('#fff');

const logoRadios = document.querySelectorAll('input[name="logo"]');

let isEnabled;

const enabledButton = document.getElementById('enabled-toggle');
const enabledImage = document.getElementById('enabled-status-icon');
const enabledLabel = enabledButton.querySelector('h4');

chrome.storage.sync.get(['enabled'], function (result) {
    isEnabled = result.hasOwnProperty('enabled') ? result.enabled : true;
    enabledButton.classList.toggle('enabled', isEnabled);
    enabledImage.src = isEnabled ? 'images/enabled.png' : 'images/disabled.png';
    enabledLabel.textContent = isEnabled ? 'Enabled' : 'Disabled';
});

enabledButton.addEventListener('click', function () {
    isEnabled = !isEnabled;
    enabledButton.classList.toggle('enabled', isEnabled);
    enabledImage.src = isEnabled ? 'images/enabled.png' : 'images/disabled.png';
    enabledLabel.textContent = isEnabled ? 'Enabled' : 'Disabled';
    chrome.storage.sync.set({ enabled: isEnabled });
});

chrome.storage.sync.get(['selectedLogo'], function (result) {
    let selectedLogo = result.hasOwnProperty('selectedLogo') ? result.selectedLogo : 'twitter';
    document.querySelector(`input[value="${selectedLogo}"]`).checked = true;
    disableAllLogoRadios();
    document
        .querySelector(`input[value="${selectedLogo}"]`)
        .parentElement.classList.toggle('enabled', true);
});

function disableAllLogoRadios() {
    logoRadios.forEach(function (radio) {
        radio.parentElement.classList.toggle('enabled', false);
    });
}

logoRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (this.checked) {
            chrome.storage.sync.set({ selectedLogo: this.value });
            disableAllLogoRadios();
            this.parentElement.classList.toggle('enabled', true);
        }
    });
});
