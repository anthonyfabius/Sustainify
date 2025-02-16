// Detects product name
function getProductName() {
  let productName = "";

  // Amazon
  if (window.location.hostname.includes("amazon.com")) {
    let titleElement = document.getElementById("productTitle");
    if (titleElement) productName = titleElement.innerText.trim();
  }

  // Ebay
  else if (window.location.hostname.includes("ebay.com")) {
    let titleElement = document.querySelector("h1.x-item-title__mainTitle span");
    if (titleElement) productName = titleElement.innerText.trim();
  }

  // Etsy
  else if (window.location.hostname.includes("etsy.com")) {
    let titleElement = document.querySelector("h1[data-buy-box-listing-title]");
    if (titleElement) productName = titleElement.innerText.trim();
  }

  // Walmart
  else if (window.location.hostname.includes("walmart.com")) {
    let titleElement = document.querySelector("h1#main-title");
    if (titleElement) productName = titleElement.innerText.trim();
  }

  // Target
  else if (window.location.hostname.includes("target.com")) {
      let titleElement = document.querySelector("h1#pdp-product-title-id");
      if (titleElement) productName = titleElement.innerText.trim();
  }

  return productName; //? If product name is too long shorten
}

let product = getProductName();
if (!product){
  chrome.storage.local.set({detectedProduct: "No product detected"});
} else {
  chrome.runtime.sendMessage({action: "PRODUCT_DETECTED", productName: product});
}