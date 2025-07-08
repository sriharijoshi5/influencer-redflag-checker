async function checkInfluencer() {
    const handle = document.getElementById('handleInput').value.toLowerCase().trim();
  
    const data = {
        "financewithshady": {
          name: "Finance With Shady",
          red_flags: [
            "🚩 32% fake followers",
            "🚩 Generic recycled content",
            "🚩 No refund policy"
          ]
        },
        "fakecoach123": {
          name: "Fake Coach 123",
          red_flags: [
            "🚩 ₹50K for WhatsApp-only access",
            "🚩 Too many testimonials with same wording",
            "🚩 No proof of concept or case study"
          ]
        },
        "ecomguru": {
          name: "Ecom Guru",
          red_flags: [
            "🚩 Claims 10x ROI with no spend cap",
            "🚩 Screenshot testimonials only",
            "🚩 Course upsells every week"
          ]
        }
      };
      
  
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (data[handle]) {
      const flags = data[handle].red_flags.map(flag => `<li>${flag}</li>`).join('');
      resultDiv.innerHTML = `<h2>${data[handle].name}</h2><ul>${flags}</ul>`;
    } else {
      resultDiv.innerHTML = `<p>No known red flags for <b>${handle}</b> — but stay cautious!</p>`;
    }
  }
  