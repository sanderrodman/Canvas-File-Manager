// var pdfUrl;

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     if (msg.action === "getPdfUrl") {
//         sendResponse({ pdfUrl: pdfUrl });
//     }
// });

// chrome.webRequest.onHeadersReceived.addListener(
    
//     (details) => {
//         console.log("onHeadersReceived");
//         console.log(details);
//         if (details.responseHeaders?.some(h => h.value?.includes("application/pdf"))) {
//             console.log(details);
//             pdfUrl = details.url;
//         }
//     },

//     {urls: ["https://*.edu/courses/*/files/*"]}
// );
