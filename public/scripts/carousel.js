document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
      slide.classList.toggle("opacity-100", i === index);
      slide.classList.toggle("opacity-0", i !== index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  document.getElementById("next").addEventListener("click", nextSlide);
  document.getElementById("prev").addEventListener("click", prevSlide);

  // Auto-slide every 7 seconds
  setInterval(nextSlide, 7000);
});
