async function checkInfluencer() {
    const handle = document.getElementById('handleInput').value.toLowerCase().trim();
  
    const data = {
      "financewithshady": {
        "name": "Finance With Shady",
        "red_flags": [
          "🚩 32% fake followers",
          "🚩 Generic course",
          "🚩 No refund policy"
        ]
      },
      "fakecoach123": {
        "name": "Fake Coach 123",
        "red_flags": [
          "🚩 WhatsApp-only access for ₹50K",
          "🚩 Overhyped testimonials",
          "🚩 No backend logic lol"
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
  