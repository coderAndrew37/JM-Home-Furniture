import { baseUrl } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".js-contact-form");
  const spinnerContainer = document.querySelector(".spinner-container");
  const formMessage = document.querySelector(".form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Reset messages and show spinner
      if (spinnerContainer) spinnerContainer.style.display = "flex";
      if (formMessage) {
        formMessage.style.display = "none";
        formMessage.textContent = "";
        formMessage.className = "form-message";
      }

      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());

      // Client-side validation
      const { name, email, message } = formObject;
      if (!name || !email || !message) {
        if (spinnerContainer) spinnerContainer.style.display = "none";
        if (formMessage) {
          formMessage.style.display = "block";
          formMessage.className = "form-message error";
          formMessage.textContent =
            "All fields are required. Please try again.";
        }
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/api/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });

        const result = await response.json();

        // Hide spinner and display success or error messages
        if (spinnerContainer) spinnerContainer.style.display = "none";
        if (formMessage) {
          formMessage.style.display = "block";
          if (response.ok) {
            formMessage.className = "form-message success";
            formMessage.textContent =
              result.message || "Message sent successfully!";
            contactForm.reset();
          } else {
            formMessage.className = "form-message error";
            formMessage.textContent =
              result.error || "Failed to send the message. Please try again.";
          }
        }
      } catch (error) {
        console.error("Error submitting the form:", error);

        // Hide spinner and show a generic error message
        if (spinnerContainer) spinnerContainer.style.display = "none";
        if (formMessage) {
          formMessage.style.display = "block";
          formMessage.className = "form-message error";
          formMessage.textContent =
            "Unable to send the message. Please check your connection and try again.";
        }
      }
    });
  }
});
