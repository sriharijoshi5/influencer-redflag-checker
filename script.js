document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#report-form");
    const handleInput = document.querySelector("#handle");
    const reasonSelect = document.querySelector("#reason");
  
    if (!form || !handleInput || !reasonSelect) {
      console.error("Missing form or input elements in the DOM.");
      return;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const influencerHandle = handleInput.value.trim();
      const selectedReason = reasonSelect.value;
  
      if (!influencerHandle || !selectedReason) {
        alert("Please fill in both handle and reason.");
        return;
      }
  
      try {
        const res = await fetch("https://influencer-redflag-checker.onrender.com/report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            handle: influencerHandle,
            reason: selectedReason,
          }),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Unknown error");
        }
  
        const data = await res.json();
        console.log("✅ Report submitted", data);
        alert("Thanks for reporting!");
  
        form.reset();
      } catch (err) {
        console.error("❌ Failed to submit report", err);
        alert("Something went wrong: " + err.message);
      }
    });

    async function loadReports() {
        try {
          const res = await fetch("https://influencer-redflag-checker.onrender.com/reports");
          const reports = await res.json();
      
          const reportsList = document.querySelector("#reports-list");
          reportsList.innerHTML = "";
      
          reports.forEach((report) => {
            const li = document.createElement("li");
            li.className = "bg-gray-800 p-3 rounded-md";
            li.innerText = `@${report.handle} — ${report.reason}`;
            reportsList.appendChild(li);
          });
        } catch (err) {
          console.error("❌ Failed to load reports", err);
        }
      }
      
      loadReports(); // run on page load
      
  });
  