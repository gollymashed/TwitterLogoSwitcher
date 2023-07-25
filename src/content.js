import { TwitterLogo, WassieLogo } from "../components/logos";

function generateLogo(colour) {
  return WassieLogo(colour);
}

function getLogoColor() {
  const computedStyle = window.getComputedStyle(document.body);
  const backgroundColor = computedStyle.backgroundColor;

  if (backgroundColor === "rgb(255, 255, 255)") {
    return "#242e36";
  } else if (backgroundColor === "rgb(0, 0, 0)") {
    return "#d6d9db";
  } else if (backgroundColor === "rgb(21, 32, 43)") {
    return "#d6d9db";
  }
  return "#242e36";
}

function changeHomeLogo() {
  const homeLogoLink = document.querySelector('a[href="/home"]');
  if (homeLogoLink) {
    const newLogo = homeLogoLink.querySelector("svg").cloneNode(true);
    const newLogoContent = generateLogo(getLogoColor());
    newLogo.innerHTML = newLogoContent;
    homeLogoLink.querySelector("svg").outerHTML = newLogo.outerHTML;
  }
}

function changeLoadingLogo() {
  const loadingLogo = document.querySelector("#placeholder svg");
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
    faviconLink.href = "https://abs.twimg.com/favicons/twitter.ico";
  }
}

function activateLogoChange() {
  console.log("de-x activated.");
  changeLoadingLogo();
  changeHomeLogo();
  changeFavicon();
}

activateLogoChange();
