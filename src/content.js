import { TwitterLogo, WassieLogo } from '../components/logos';

let isEnabled;
let selectedLogo;
let originalLogo = null;

function generateLogo(colour) {
    if (selectedLogo === 'twitter') {
        return TwitterLogo(getLogoColor());
    } else if (selectedLogo === 'wassie') {
        return WassieLogo(getLogoColor());
    } else {
        return originalLogo;
    }
}

function getLogoColor() {
    const computedStyle = window.getComputedStyle(document.body);
    const backgroundColor = computedStyle.backgroundColor;

    if (backgroundColor === 'rgb(255, 255, 255)') {
        return '#242e36';
    } else if (backgroundColor === 'rgb(0, 0, 0)') {
        return '#d6d9db';
    } else if (backgroundColor === 'rgb(21, 32, 43)') {
        return '#d6d9db';
    }
    return '#242e36';
}

function setLogo() {
    if (!originalLogo) {
        const homeLogoLink = document.querySelector('a[href="/home"]');
        if (homeLogoLink) {
            originalLogo = homeLogoLink.querySelector('svg').outerHTML;
        }
    }
    if (isEnabled) {
        changeLoadingLogo();
        changeHomeLogo();
        changeFavicon();
    } else {
        restoreOriginalLogo();
    }
}

function changeHomeLogo() {
    const homeLogoLink = document.querySelector('a[href="/home"]');
    if (homeLogoLink) {
        const newLogo = homeLogoLink.querySelector('svg').cloneNode(true);
        const newLogoContent = generateLogo(getLogoColor());
        newLogo.innerHTML = newLogoContent;
        homeLogoLink.querySelector('svg').outerHTML = newLogo.outerHTML;
    }
}

function changeLoadingLogo() {
    const loadingLogo = document.querySelector('#placeholder svg');
    if (loadingLogo) {
        const newLogo = loadingLogo.cloneNode(true);
        const newLogoContent = generateLogo(getLogoColor());
        newLogo.innerHTML = newLogoContent;
        loadingLogo.outerHTML = newLogo.outerHTML;
    }
}

function changeFavicon() {
    const faviconLink = document.querySelector('link[rel="shortcut icon"]');
    if (faviconLink) {
        faviconLink.href = 'https://abs.twimg.com/favicons/twitter.ico';
    }
}

function restoreOriginalLogo() {
    const homeLogoLink = document.querySelector('a[href="/home"]');
    if (homeLogoLink) {
        homeLogoLink.querySelector('svg').outerHTML = originalLogo;
    }
    const loadingLogo = document.querySelector('#placeholder svg');
    if (loadingLogo) {
        loadingLogo.outerHTML = originalLogo;
    }
    const faviconLink = document.querySelector('link[rel="shortcut icon"]');
    if (faviconLink) {
        faviconLink.href = 'https://abs.twimg.com/favicons/twitter.ico';
    }
}

// Load the state from storage
chrome.storage.sync.get(['enabled', 'selectedLogo'], function (result) {
    isEnabled = result.hasOwnProperty('enabled') ? result.enabled : true;
    selectedLogo = result.hasOwnProperty('selectedLogo') ? result.selectedLogo : 'twitter';
    setLogo();
});

// Listen for changes in storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        if (key === 'enabled' || key === 'selectedLogo') {
            let storageChange = changes[key];
            if (key === 'enabled') {
                isEnabled = storageChange.newValue;
            } else if (key === 'selectedLogo') {
                selectedLogo = storageChange.newValue;
            }
            setLogo();
        }
    }
});
