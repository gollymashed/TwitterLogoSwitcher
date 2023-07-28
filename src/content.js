import { TwitterLogo, WassieLogo, OriginalLogo } from '../components/logos';

let isEnabled;
let selectedLogo;

function generateLogo() {
    if (isEnabled) {
        if (selectedLogo === 'wassie') {
            return WassieLogo(getLogoColor());
        }
        return TwitterLogo('#1DA1F2');
    } else {
        return OriginalLogo();
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

function generateFavicon() {
    if (isEnabled) {
        if (selectedLogo === 'wassie') {
            return chrome.runtime.getURL('images/wassie.ico');
        } else {
            return `https://abs.twimg.com/favicons/twitter.ico`;
        }
    } else {
        return `https://abs.twimg.com/favicons/twitter.3.ico`;
    }
}

function updateSelection() {
    changeLoadingLogo();
    changeHomeLogo();
    changeFavicon();
    changeSiteTitle();
}

function changeLoadingLogo() {
    const loadingLogo = document.querySelector('#placeholder svg');
    if (loadingLogo) {
        const newLogo = loadingLogo.cloneNode(true);
        const newLogoContent = generateLogo();
        newLogo.innerHTML = newLogoContent;
        loadingLogo.outerHTML = newLogo.outerHTML;
    }
}

function changeHomeLogo() {
    const homeLogoLink = document.querySelector('a[href="/home"]');
    if (homeLogoLink) {
        const newLogo = homeLogoLink.querySelector('svg').cloneNode(true);
        const newLogoContent = generateLogo();
        newLogo.innerHTML = newLogoContent;
        homeLogoLink.querySelector('svg').outerHTML = newLogo.outerHTML;
    }
}

function changeFavicon() {
    const faviconLink = document.querySelector('link[rel="shortcut icon"]');
    if (faviconLink) {
        faviconLink.href = generateFavicon();
    }
}

function changeSiteTitle() {
    const siteTitle = document.querySelector('title');
    if (siteTitle) {
        if (siteTitle.textContent.endsWith('/ X')) {
            replaceTitleString('/ X');
        } else if (siteTitle.textContent.endsWith('/ Wasser')) {
            replaceTitleString('/ Wasser');
        } else if (siteTitle.textContent.endsWith('/ Twitter')) {
            replaceTitleString('/ Twitter');
        }
    }
}

function replaceTitleString(StringToReplace) {
    const title = document.querySelector('title');
    if (title) {
        const titleString = title.textContent;
        const newTitleString = titleString.substring(
            0,
            titleString.length - StringToReplace.length
        );
        const newTitleEnding = isEnabled
            ? selectedLogo === 'wassie'
                ? '/ Wasser'
                : '/ Twitter'
            : '/ X';
        title.textContent = newTitleString + newTitleEnding;
    }
}

// Load the state from storage
chrome.storage.sync.get(['enabled', 'selectedLogo'], function (result) {
    isEnabled = result.hasOwnProperty('enabled') ? result.enabled : true;
    selectedLogo = result.hasOwnProperty('selectedLogo') ? result.selectedLogo : 'twitter';
    updateSelection();
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
            updateSelection();
        }
    }
});
