import "./fetchContent.js";
import "./contact.js";
import "./newsletter.js";
import "./leads.js";
import "./animations.js";
import "./authButton.js";
import "./carousel.js";
import "./search.js";
import "./menuToggle.js"; // Import the new menuToggle functionality
import { updateCartQuantity } from "../data/cart.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";
import "./utils/smoothScroll.js";

document.addEventListener("DOMContentLoaded", () => {
  updateCartQuantity();
  initAddToCartListeners();
});
