chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Tab updated.");

  if (tab.url) {
    console.log("URL changed to " + tab.url + ".");
    if (tab.url.includes("twitter.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"],
      });
    }
  }
});
