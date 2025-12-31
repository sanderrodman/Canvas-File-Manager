// popup.js
document.addEventListener("DOMContentLoaded", () => {
    const pdfButton = document.getElementById("pdf-button");
    if (!pdfButton) return;

    pdfButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;

        // Ask content script for PDF info
        chrome.tabs.sendMessage(tabId, { action: "getPDFInfo" }, (response) => {
        if (!response) {
            console.error("No response from content script");
            return;
        }

        const { pdfUrl, course, fileName } = response;
        if (!pdfUrl || !course || !fileName) {
            console.error("Missing PDF info:", response);
            return;
        }

        // Send download request to service worker
        chrome.runtime.sendMessage(
            { action: "downloadFile", url: pdfUrl, course, fileName },
            (response) => {
                if (!response || !response.downloadId) {
                    console.error("Download failed", response?.error);
                return;
            }

            const downloadId = response.downloadId;
                // Wait for download to complete
            const listener = (delta) => {
            if (delta.id === downloadId && delta.state?.current === "complete") {
                chrome.downloads.onChanged.removeListener(listener);
                // Open the file after download is finished
                chrome.downloads.open(downloadId);
            }
            };

            chrome.downloads.onChanged.addListener(listener);


          }
        );


      });
    });
  });
});