
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('twitter.com')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['/src/contentScript.js']
        });

        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['/styles/style.css']
        });
    }
});