let cachedFileData = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse)  =>  {
    if (message.action === "getDownloadId") {
        const path = message.path
        const pdfUrl = message.pdfUrl

        if (!path || !pdfUrl) {
            sendResponse({ error: "Missing File info" });
        }
        else {
            chrome.downloads.download(
                { url: pdfUrl, filename: path, saveAs: false, conflictAction: "overwrite" },
                (downloadId) => {
                    if (chrome.runtime.lastError) {
                        sendResponse({ error: chrome.runtime.lastError.message });
                    } else {
                        sendResponse({ downloadId: downloadId });
                    }
                }
            );
        }

        return true;
    }

    if (message.action === "getContentData") {
        cachedFileData = message.data;
        chrome.action.openPopup().catch(() => {});
        return false;
    }

    // When popup opens, it can ask for the cached data
    if (message.action === "getPopupData") {
        sendResponse(cachedFileData);
        return false;
    }
});

async function notifyTab(tabId) {
    try {
        const tab = await chrome.tabs.get(tabId);
        if (tab.url?.includes(".edu/courses/")) {
            // Check if tab is fully loaded before messaging
            if (tab.status === 'complete') {
                await chrome.tabs.sendMessage(tabId, { action: "tabSwitchCanvas" });
            }
        }
    } catch (e) {}
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    notifyTab(activeInfo.tabId);
});