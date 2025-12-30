const pdfButton = document.createElement("button");
pdfButton.textContent = "Open PDF";
pdfButton.id = "pdf-float-btn";

Object.assign(pdfButton.style, {
  position: "fixed",
  top: "14px",
  right: "24px",
  zIndex: "9999",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
});

pdfButton.addEventListener("mouseenter", () => {
  pdfButton.style.backgroundColor = "#0056b3";
});
pdfButton.addEventListener("mouseleave", () => {
  pdfButton.style.backgroundColor = "#007bff";
});

// document.body.appendChild(pdfButton);

let currentUrl = null;

// in progress
chrome.webRequest.onHeadersReceived.addListener(
    (details) => {details.url},
    {urls: ["https://*.edu/courses/*/files/*"]}
);

// in progress
pdfButton.addEventListener("click", () => {

  chrome.runtime.sendMessage({ action: "isDevOpen" }, (response) => {

      if (response.isDevOpen) {

        pdfUrl = response.pdfUrl;
        window.close()

        window.open(pdfUrl, "_blank");
        return;

    }
  });
});

