/* =========================================================
   PetLar — Interações
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Navbar: sombra/blur ao rolar ---------- */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 30);
    backToTop.classList.toggle("show", y > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // pequeno atraso escalonado para elementos irmãos
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- FAQ acordeão ---------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fecha todos
      faqItems.forEach((other) => {
        other.classList.remove("active");
        other.querySelector(".faq-answer").style.maxHeight = null;
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // Abre o clicado (se não estava aberto)
      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Formulário de contato (demonstrativo) ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");

    if (!name.value.trim() || !email.value.trim()) {
      note.style.color = "#e0413f";
      note.textContent = "Por favor, preencha nome e e-mail.";
      return;
    }

    note.style.color = "#22a35a";
    note.textContent = `Obrigado, ${name.value.split(" ")[0]}! Recebemos sua solicitação. 🐾`;
    form.reset();

    setTimeout(() => (note.textContent = ""), 5000);
  });

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
