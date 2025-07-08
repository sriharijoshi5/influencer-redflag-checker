document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#report-form"); // Your form's ID
    const handleInput = document.querySelector("#handle");
    const reasonSelect = document.querySelector("#reason");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const influencerHandle = handleInput.value;
      const selectedReason = reasonSelect.value;
  
      try {
        const res = await fetch("http://localhost:4000/report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            handle: influencerHandle,
            reason: selectedReason,
          }),
        });
  
        const data = await res.json();
        console.log("✅ Report submitted", data);
        alert("Thanks for reporting!");
  
        form.reset(); // optional
      } catch (err) {
        console.error("❌ Failed to submit report", err);
        alert("Something went wrong");
      }
    });
  });
  