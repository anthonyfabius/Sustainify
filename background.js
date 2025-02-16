chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "PRODUCT_DETECTED") {
    // Store product name is storage
    chrome.storage.local.set({detectedProduct: message.productName})
  }
});