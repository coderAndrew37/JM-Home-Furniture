document.addEventListener("DOMContentLoaded", () => {
  const leadMagnetButton = document.getElementById("leadMagnetButton");
  const leadMagnetModal = document.getElementById("leadMagnetModal");
  const leadMagnetForm = document.getElementById("leadMagnetForm");
  const leadMagnetEmail = document.getElementById("leadMagnetEmail");
  const leadMagnetClose = document.getElementById("leadMagnetClose");
  const leadMagnetMessage = document.createElement("p"); // Modal-specific message
  const leadMagnetMainMessage = document.getElementById(
    "leadMagnetMainMessage"
  ); // Main page message container

  leadMagnetMessage.classList.add("text-sm", "mt-4");
  leadMagnetForm.appendChild(leadMagnetMessage); // Append message container to form

  // Show modal
  leadMagnetButton.addEventListener("click", () => {
    leadMagnetModal.classList.remove("hidden");
  });

  // Close modal
  leadMagnetClose.addEventListener("click", () => {
    leadMagnetModal.classList.add("hidden");
    resetModalState();
  });

  // Submit email
  leadMagnetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = leadMagnetEmail.value;
    leadMagnetMessage.textContent = ""; // Clear previous messages in modal
    leadMagnetEmail.disabled = true; // Disable input during submission
    const submitButton = leadMagnetForm.querySelector("button[type='submit']");
    submitButton.textContent = "Sending..."; // Indicate progress

    try {
      const response = await fetch("/api/leads/download-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success message inside the modal
        leadMagnetMessage.textContent =
          result.message || "The guide has been emailed to you!";
        leadMagnetMessage.classList.remove("text-red-600");
        leadMagnetMessage.classList.add("text-green-600");

        // Update main page message
        leadMagnetMainMessage.textContent =
          "The guide has been emailed to you successfully!";
        leadMagnetMainMessage.classList.remove("hidden");
        leadMagnetMainMessage.classList.remove("text-red-600");
        leadMagnetMainMessage.classList.add("text-green-600");

        // Close modal after success
        setTimeout(() => {
          leadMagnetModal.classList.add("hidden");
          resetModalState();
        }, 1000); // Delay for better user experience
      } else {
        // Display error message inside the modal
        leadMagnetMessage.textContent =
          result.message || "Something went wrong. Please try again.";
        leadMagnetMessage.classList.add("text-red-600");
      }
    } catch (error) {
      // Handle unexpected errors
      leadMagnetMessage.textContent =
        "An error occurred. Please try again later.";
      leadMagnetMessage.classList.add("text-red-600");
    } finally {
      submitButton.textContent = "Send Me the Guide"; // Reset button text
      leadMagnetEmail.disabled = false; // Re-enable input
    }
  });

  function resetModalState() {
    leadMagnetEmail.value = ""; // Clear email input
    leadMagnetMessage.textContent = ""; // Clear modal message
    const submitButton = leadMagnetForm.querySelector("button[type='submit']");
    submitButton.textContent = "Send Me the Guide"; // Reset button text
  }
});
