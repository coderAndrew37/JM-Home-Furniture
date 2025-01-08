// animations.js

// Initialize GSAP and ScrollTrigger
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Navbar Animation
  // Navbar Animation (excluding mobile-nav to avoid conflicts)
  gsap.from("header > div:not(#mobile-nav)", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power2.out",
  });

  // Hero Section Animation
  gsap.from("#hero h1", {
    duration: 1.2,
    x: -50,
    opacity: 0,
    ease: "power2.out",
  });

  gsap.from("#hero p", {
    duration: 1.5,
    delay: 0.5,
    x: 50,
    opacity: 0,
    ease: "power2.out",
  });

  gsap.from("#hero img", {
    duration: 1.5,
    delay: 0.8,
    scale: 0.8,
    opacity: 0,
    ease: "power3.out",
  });

  // Section Animations - ScrollTrigger
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power2.out",
    });
  });

  // Service Cards Animation
  gsap.from("#services .grid > div", {
    scrollTrigger: {
      trigger: "#services",
      start: "top 75%",
    },
    stagger: 0.3,
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "elastic.out(1, 0.5)",
  });

  // Portfolio Animation
  gsap.from("#projects .grid > div", {
    scrollTrigger: {
      trigger: "#projects",
      start: "top 75%",
    },
    stagger: 0.3,
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
  });

  // Button Hover Animations
  const buttons = document.querySelectorAll("button, a");

  buttons.forEach((button) => {
    gsap.set(button, { transformOrigin: "center" });
    button.addEventListener("mouseenter", () => {
      gsap.to(button, { scale: 1.1, duration: 0.2, ease: "power1.out" });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: "power1.out" });
    });
  });
});
