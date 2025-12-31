chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "downloadFile") {
        if (!message.url || !message.fileName || !message.course) {
            sendResponse({ error: "Missing download info" });
        return;
        }

    const safeCourse = sanitizeName(message.course);
    const safeFileName = sanitizeName(message.fileName);
    const path = `Canvas Files/${safeCourse}/${safeFileName}.pdf`;

    chrome.downloads.download(
        { url: message.url, filename: path, saveAs: false },
        (downloadId) => {
        if (chrome.runtime.lastError) {
            sendResponse({ error: chrome.runtime.lastError.message });
        } else {
            sendResponse({ downloadId });
        }
      }
    );

    return true; // async response
  }
});

function sanitizeName(name) {
    return name.replace(/[\/\\:*?"<>|]/g, "-");
}


chrome.webNavigation.onCompleted.addListener(() => {
    chrome.action.openPopup();
},
{
    url: [{urlMatches: "^https://canvas\\.[^/]+\\.edu/courses/.*/files/.*"}]
});


// chrome.runtime.sendMessage(
//   { action: "downloadFile", url: pdfUrl, course, fileName },
//   (response) => {
//     if (!response || !response.downloadId) {
//       console.error("Download failed", response?.error);
//       return;
//     }

//     const downloadId = response.downloadId;

//     // Wait for download to complete
//     const listener = (delta) => {
//       if (delta.id === downloadId && delta.state?.current === "complete") {
//         chrome.downloads.onChanged.removeListener(listener);
//         // Open the file after download is finished
//         chrome.downloads.open(downloadId);
//       }
//     };

//     chrome.downloads.onChanged.addListener(listener);
//   }
// );
