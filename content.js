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
    let titleElement = document.querySelector("#itemTitle");
    if (titleElement) productName = titleElement.innerText.replace("Details about ", "").trim();
  }

  // Etsy
  else if (window.location.hostname.includes("etsy.com")) {
    let titleElement = document.querySelector("h1[data-buy-box-listing-title]");
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