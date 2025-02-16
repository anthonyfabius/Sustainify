document.addEventListener("DOMContentLoaded", function(){
  const mainScreen = document.getElementById("main-screen");
  const altScreen = document.getElementById("alternatives-screen");
  const findAltBtn = document.getElementById("find-alternatives");
  const backBtn = document.getElementById("back-button");
  const alternativesList = document.getElementById("alternatives-list");

  // Getting current product name
  chrome.storage.local.get("detectedProduct", (data) => {
    let productText = "No product detected";
    if (data.detectedProduct) {
      productText = data.detectedProduct;
    }
    document.getElementById("product-name").innerText = productText;
  });

  // Retrieve from config.json
  async function getApiKey() {
    const response = await fetch(chrome.runtime.getURL("config.json"));
    const config = await response.json();
    return config.apiKey;
  }

  //? Alter to allow for including links
  async function getAlternatives(productName) {
    const apiKey = await getApiKey();
    const url = "https://api.openai.com/v1/chat/completions";

    const requestBody = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that provides sustainable alternatives for products.
          The product names will be very verbose. You are to get the general product.
          The user will ask you to list 3 alternatives. Have these alternatives also be general. No specific products.`
        },
        {
          role: "user",
          content: `Give me 3 eco-friendly alternatives for "${productName}". Provide the output in the following format:

          Alternative 1: [Alterative 1 Name]
          Brief sentence or two about why it's better.

          Alternative 2: [Alterative 2 Name]
          Brief sentence or two about why it's better.

          Alternative 3: [Alterative 3 Name]
          Brief sentence or two about why it's better.`
        }
      ],
      temperature: 0.7
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Switch to Alternatives
  findAltBtn.addEventListener("click", function() {
    mainScreen.style.display = "none";
    altScreen.style.display = "block";

    chrome.storage.local.get("detectedProduct", async (data) =>{
      let productName = data.detectedProduct || "Unknown Product";

      if (productName === "Unknown Product" || productName === "No product detected"){
        alternativesList.innerHTML = "<p>Unknown Product. Please try again.</p>";
        return;
      }

      alternativesList.innerHTML = "<p>Loading alternatives...</p>";
      try {
        const alternatives = await getAlternatives(productName);
        alternativesList.innerHTML = `<p>${alternatives.replace(/\n/g, "<br>")}</p>`

        //? Get for first alternative
      } catch (error) {
        console.error("Error fetching alternatives:", error);
        alternativesList.innerHTML = "<p>Failed to load alternatives. Please try again.</p>";
      }
    });
  });

  // Go back to Main Screen
  backBtn.addEventListener("click", function() {
    mainScreen.style.display = "block";
    altScreen.style.display = "none";
  });

});