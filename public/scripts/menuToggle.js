document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");
  const pageOverlay = document.createElement("div");
  pageOverlay.className =
    "menu-overlay hidden fixed inset-0 bg-black bg-opacity-50 z-40";
  document.body.appendChild(pageOverlay);

  const menuTimeline = gsap.timeline({ paused: true });
  menuTimeline.fromTo(
    mobileNav,
    { x: "100%" }, // Start off-screen on the right
    { x: "0%", duration: 0.3, ease: "power2.out" }
  );

  // Toggle sidebar menu visibility
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("menu-open");
    isOpen ? menuTimeline.play() : menuTimeline.reverse();
    pageOverlay.classList.toggle("hidden", !isOpen);
    mobileMenuButton.setAttribute("aria-expanded", isOpen);
    document.body.classList.toggle("overflow-hidden", isOpen); // Prevent scrolling
  });

  // Close menu when overlay is clicked
  pageOverlay.addEventListener("click", closeMenu);

  // Close menu when a link is clicked
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  function closeMenu() {
    mobileNav.classList.remove("menu-open");
    menuTimeline.reverse();
    pageOverlay.classList.add("hidden");
    mobileMenuButton.setAttribute("aria-expanded", false);
    document.body.classList.remove("overflow-hidden");
  }
});
