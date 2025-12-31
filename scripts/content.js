function getPDFInfo() {
    const pdfUrl = document.querySelector("#content > div:nth-child(2) > span > a")?.href;
    const course = document.querySelector("#breadcrumbs > ol > li:nth-child(2) > a > span")?.textContent;
    const fileName = document.querySelector("#content > h2")?.textContent;
    return { pdfUrl, course, fileName };
}


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "getPDFInfo") {
        sendResponse(getPDFInfo());
    }
});
