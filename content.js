const logo = document.getElementById('logo');

if (logo) {
    logo.src = chrome.runtime.getURL('images/old-logo.png');
}
