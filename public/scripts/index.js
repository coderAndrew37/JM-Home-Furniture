import "./fetchContent.js";
import "./contact.js";
import "./modal.js";
import "./newsletter.js";
import "./leads.js";
import "./animations.js";
import "./authButton.js";
import { updateCartQuantity } from "../data/cart.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  // Update cart quantity on page load
  updateCartQuantity();

  // Initialize Add-to-Cart buttons
  initAddToCartListeners();
  // Smooth scroll effect
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar Elements
  const mobileMenuButton = document.getElementById("mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");

  // Menu toggle functionality with smooth transition
  mobileMenuButton.addEventListener("click", () => {
    if (mobileNav.classList.contains("hidden")) {
      mobileNav.classList.remove("hidden");
      mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    } else {
      mobileNav.style.maxHeight = "0px";
      setTimeout(() => mobileNav.classList.add("hidden"), 300);
    }
  });

  // Prevent navbar items from disappearing on large screens
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      mobileNav.classList.remove("hidden");
      mobileNav.style.maxHeight = "none";
    } else if (!mobileNav.classList.contains("hidden")) {
      mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    }
  });

  // Close menu when a link is clicked (mobile only)
  const navLinks = document.querySelectorAll("#mobile-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        mobileNav.style.maxHeight = "0px";
        setTimeout(() => mobileNav.classList.add("hidden"), 300);
      }
    });
  });
});
