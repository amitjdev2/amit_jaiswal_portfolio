const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "☰";
}));

// Gentle 3D tilt on pointer devices; disabled for touch and reduced-motion preferences.
const card = document.querySelector("#tilt-card");
if (card && window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const visual = card.closest(".hero-visual");
  visual.addEventListener("pointermove", event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.transform = `rotateY(${x * 16 - 4}deg) rotateX(${-y * 10 + 3}deg)`;
  });
  visual.addEventListener("pointerleave", () => {
    card.style.transform = "rotateY(-8deg) rotateX(4deg)";
  });
}

// Reveal sections as they enter view.
const revealTargets = document.querySelectorAll(".section-heading, .about-copy, .about-note, .skill-card, .timeline-item, .project-card, .education-card");
revealTargets.forEach(el => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add("visible"));
}
