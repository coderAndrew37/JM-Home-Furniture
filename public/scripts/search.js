import { baseUrl } from "./constants.js";
import { formatCurrency } from "./utils/currency.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchBar = document.getElementById("search-bar");
  const searchInput = document.getElementById("search-input");
  const closeSearchButton = document.getElementById("close-search");
  const suggestionsList = document.getElementById("search-suggestions");
  const searchLoader = document.getElementById("search-loader");
  const featuredProductsContainer = document.querySelector(
    "#featured-products .grid"
  );

  // Toggle search bar
  searchButton.addEventListener("click", () => {
    searchBar.style.transform = "translateY(100px)";
    searchInput.focus();
  });

  closeSearchButton.addEventListener("click", () => {
    searchBar.style.transform = "translateY(-100px)";
    clearSuggestions();
    searchInput.value = "";
  });

  // Live search suggestions
  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();

    if (query.length < 2) {
      clearSuggestions();
      return;
    }

    try {
      searchLoader.classList.remove("hidden");
      const response = await fetch(
        `${baseUrl}/api/products/suggestions?q=${query}`
      );
      const suggestions = await response.json();

      if (suggestions && suggestions.length > 0) {
        renderSuggestions(suggestions);
      } else {
        renderNoResults();
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      renderError();
    } finally {
      searchLoader.classList.add("hidden");
    }
  });

  // Handle Enter key for search
  searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query.length < 2) return;
      await searchProducts(query);
    }
  });

  // Render suggestions
  function renderSuggestions(suggestions) {
    clearSuggestions();
    suggestions.forEach((product) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.className =
        "p-3 hover:bg-idcHighlight text-idcPrimary cursor-pointer rounded-lg";
      suggestionItem.textContent = product.name;
      suggestionItem.addEventListener("click", () => {
        searchProducts(product.name);
      });
      suggestionsList.appendChild(suggestionItem);
    });
    suggestionsList.classList.remove("hidden");
  }

  // Render no results
  function renderNoResults() {
    clearSuggestions();
    const noResultsItem = document.createElement("li");
    noResultsItem.className = "p-3 text-idcText bg-idcBackground rounded-lg";
    noResultsItem.textContent = "No results found.";
    suggestionsList.appendChild(noResultsItem);
    suggestionsList.classList.remove("hidden");
  }

  // Render error message
  function renderError() {
    clearSuggestions();
    const errorItem = document.createElement("li");
    errorItem.className = "p-3 text-red-600 bg-idcBackground rounded-lg";
    errorItem.textContent = "Error fetching suggestions.";
    suggestionsList.appendChild(errorItem);
    suggestionsList.classList.remove("hidden");
  }

  // Clear suggestions
  function clearSuggestions() {
    suggestionsList.innerHTML = "";
    suggestionsList.classList.add("hidden");
  }

  // Search and display products
  async function searchProducts(query) {
    try {
      searchLoader.classList.remove("hidden");
      const response = await fetch(`${baseUrl}/api/products/search?q=${query}`);
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        renderSearchedProducts(data.products);
      } else {
        featuredProductsContainer.innerHTML = `
          <p class="text-center text-lg text-idcText">
            No products found for "${query}".
          </p>`;
      }
    } catch (error) {
      console.error("Error during product search:", error);
      featuredProductsContainer.innerHTML = `
        <p class="text-center text-lg text-idcText text-red-600">
          Failed to load search results. Please try again.
        </p>`;
    } finally {
      searchLoader.classList.add("hidden");
    }
  }

  // Render searched products
  function renderSearchedProducts(products) {
    featuredProductsContainer.innerHTML = products
      .map((product) => generateProductHTML(product))
      .join("");
  }

  function generateProductHTML(product) {
    return `
      <div class="product-container bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105">
        <img class="w-full h-48 object-cover rounded-lg mb-4" src="${
          product.image
        }" alt="${product.name}" />
        <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">${
          product.name
        }</h3>
        <p class="text-xl font-semibold text-idcHighlight">${formatCurrency(
          product.priceCents
        )}</p>
        <button class="js-add-to-cart w-full mt-4 px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg hover:bg-opacity-90" data-product-id="${
          product._id
        }">Add to Cart</button>
      </div>`;
  }
});
