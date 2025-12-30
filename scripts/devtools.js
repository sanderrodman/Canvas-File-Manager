let lastPdfUrl = null;

chrome.devtools.network.onRequestFinished.addListener((request) => {
  if (request.response.content.mimeType === "application/pdf") {
    lastPdfUrl = request.request.url;
    console.log("PDF detected:", lastPdfUrl);
  }
});


chrome.runtime.onMessage.addListener({ action: "isDevOpen" }, (response) => {
  if (msg.action === "isDevOpen") {
    sendResponse({ 
        isDevOpen: true,
        pdfUrl: lastPdfUrl
    });
  }
});


// chrome.webRequest.onCompleted.addListener(
//   callback: function,
//   filter: RequestFilter,
//   extraInfoSpec?: OnCompletedOptions[],
// )