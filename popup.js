document.addEventListener("DOMContentLoaded", function(){
  const mainScreen = document.getElementById("main-screen");
  const altScreen = document.getElementById("alternatives-screen");
  const findAltBtn = document.getElementById("find-alternatives");
  const backBtn = document.getElementById("back-button");

  // Getting current product name
  chrome.storage.local.get("detectedProduct", (data) => {
    let productText = "No product detected";
    if (data.detectedProduct) {
      productText = data.detectedProduct;
    }
    document.getElementById("product-name").innerText = productText;
  });

  // Switch to Alternatives
  findAltBtn.addEventListener("click", function() {
    mainScreen.style.display = "none";
    altScreen.style.display = "block";
    
    //TODO: Ai call for alternatives, also helper functions for links
  });

  // Go back to Main Screen
  backBtn.addEventListener("click", function() {
    mainScreen.style.display = "block";
    altScreen.style.display = "none";
  });

});