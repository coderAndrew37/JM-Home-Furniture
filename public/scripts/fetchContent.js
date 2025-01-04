// fetchContent.js
import { baseUrl } from "./constants.js";
import { testimonials, faqs } from "../data/data.js";
import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";
document.addEventListener("DOMContentLoaded", () => {
  // Testimonials Section
  const testimonialsContainer = document.querySelector("#testimonials .grid");
  if (testimonialsContainer) {
    testimonials.forEach((testimonial) => {
      const testimonialHTML = `
        <div class="bg-idcAccent p-6 rounded-lg shadow-lg hover:bg-idcHighlight hover:text-black transition">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mx-auto mb-4" loading="lazy">
          <p class="text-idcText mb-4">"${testimonial.message}"</p>
          <p class="text-idcHighlight font-bold hover:text-black">– ${testimonial.name}</p>
        </div>
      `;
      testimonialsContainer.innerHTML += testimonialHTML;
    });
  }

  // FAQs Section
  const faqsContainer = document.querySelector("#faqs .space-y-4");
  if (faqsContainer) {
    faqs.forEach((faq, index) => {
      const faqHTML = `
      <div class="border border-gray-300 rounded-lg">
        <button
          class="w-full text-left px-4 py-3 flex justify-between items-center font-bold text-idcPrimary"
          data-index="${index}"
        >
          <span>${faq.question}</span>
          <svg
            class="w-5 h-5 text-idcPrimary transform transition-transform duration-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <div
          class="hidden px-4 py-3 text-idcText transition-all duration-300"
          id="faq-answer-${index}"
        >
          ${faq.answer}
        </div>
      </div>
    `;
      faqsContainer.innerHTML += faqHTML;
    });

    // Add toggle functionality
    const faqButtons = faqsContainer.querySelectorAll("button");
    faqButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon = button.querySelector("svg");

        // Toggle visibility of the answer
        answer.classList.toggle("hidden");

        // Rotate the icon
        icon.classList.toggle("rotate-180");
      });
    });
  }

  const featuredProductsContainer = document.querySelector(
    "#featured-products .grid"
  );

  async function fetchFeaturedProducts() {
    try {
      const response = await fetch(`${baseUrl}/api/products?limit=12`); // Fetch 6 featured products
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        renderFeaturedProducts(data.products);
      } else {
        featuredProductsContainer.innerHTML = `
          <p class="text-center text-lg text-idcText">
            No featured products available at the moment.
          </p>`;
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
      featuredProductsContainer.innerHTML = `
        <p class="text-center text-lg text-idcText text-red-600">
          Failed to load products. Please try again later.
        </p>`;
    }
  }

  function renderFeaturedProducts(products) {
    featuredProductsContainer.innerHTML = products
      .map((product) => generateProductHTML(product))
      .join("");
    // Initialize Add-to-Cart buttons
    initAddToCartListeners(); // Attach listeners after rendering
  }

  function generateProductHTML(product) {
    return `
    <div class="product-container bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105">
      <img
        class="w-full h-48 object-cover rounded-lg mb-4"
        src="${product.image}"
        alt="${product.name}"
      />
      <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">
        ${product.name}
      </h3>
      <div class="flex items-center mb-4">
        <img
          class="w-20 h-5"
          src="images/ratings/rating-${product.rating.stars}.png"
          alt="${product.rating.stars * 10} stars"
        />
        <span class="ml-2 text-sm text-idcText">
          (${product.rating.count} reviews)
        </span>
      </div>
      <p class="text-xl font-semibold text-idcHighlight">
        ${formatCurrency(product.priceCents)}
      </p>
      <div class="added-to-cart hidden text-green-600 text-center font-bold mb-4">
        Added to Cart!
      </div>
      <button
        class="js-add-to-cart w-full mt-4 px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg hover:bg-opacity-90"
        data-product-id="${product._id}"
      >
        Add to Cart
      </button>
    </div>
  `;
  }

  fetchFeaturedProducts();
});
