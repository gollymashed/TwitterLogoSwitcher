function generateLogo(colour) {
    return generateWassieLogo(colour);
}

function generateTwitterLogo(colour) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 248 204">
    <path fill="${colour}" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
    </svg>`;
}

function generateWassieLogo(colour) {
    return `<svg id="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1280"><defs><style>.cls-1{stroke-linecap:round;}.cls-1,.cls-2,.cls-3{stroke-width:60px;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke:${colour};stroke-miterlimit:10;}.cls-1,.cls-2,.cls-4,.cls-5,.cls-6{fill:none;}.cls-4{stroke-width:59px;}.cls-5{stroke-width:50px;}.cls-6{stroke-width:40px;}</style></defs><path class="cls-1" d="m954.27,344.88c-15.17-49.06-33.88-89.48-55.15-118.17-45.47-61.34-148.06-152.29-311.98-167.09-163.92-14.81-250.82,51.78-286.59,81.43-154.4,127.96-171.14,374.47-186.13,629.24-22.21,377.54-57.75,462.26-58.17,463.21"/><path class="cls-2" d="m996.41,663.48c0-73.01-5.67-142.43-15.93-204.74"/><path class="cls-1" d="m987.95,1233.5s8.84-76.17,10.58-193.53"/><path class="cls-6" d="m1225.28,989.09s-49.68,24.55-226.27,37.27c-157.45,11.34-248.22-5.19-282.02-11.02"/><path class="cls-5" d="m1231.6,986.02c11.04-33.83-80.38-146.35-203.92-286.35-116.16-131.64-197.56-211.52-272.48-216.68-74.92-5.15-156.61,100.25-206.32,128.39s-103.26,52.68-50.9,115.61c52.35,62.94,165.74,234.82,179.1,263.51,13.35,28.69,42.2,34.22,82.47,28.13,40.27-6.09,125.64-33.99,235.87-36.47,132.26-2.97,226.57,33.33,236.2,3.85Z"/><path class="cls-3" d="m759.22,482.2c16.14,29.45,43.81,85.3,18.36,64.96-25.71-20.54-55.95-53.32-66.13-64.6-1.97-2.19-1.4-5.61,1.18-7.03,4.91-2.71,13.36-6.17,24.02-5.75,17.27.67,18.66,5.27,22.57,12.41Z"/><path class="cls-4" d="m947.38,455.75c-46.45,5.4-90.09-15.38-93.09-38.44-3-23.06,30.63-49.97,76.76-54.78,27.37-2.85,88.41,1.07,94.17,34.59,5.77,33.53-36.52,53.81-77.84,58.62Z"/><path class="cls-4" d="m416.35,363.65c-67.59,10.8-98.35,38.64-98.35,64.81,0,26.17,50.76,52.21,98.35,46.05,47.59-6.16,102.58-43.55,102.58-68.48,0-24.93-40.19-52.35-102.58-42.38Z"/></svg>`}

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

function activateLogoChange() {
    console.log('de-x activated.');
    changeLoadingLogo();
    changeHomeLogo();
    changeFavicon();
}

activateLogoChange();
