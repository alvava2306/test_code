// ==========================================================
// VentaPro — interacciones de la landing
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  // --- Año en el footer ---
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // --- Sombra del header al hacer scroll ---
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Menú móvil ---
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // --- Contadores animados ---
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString("es-MX");
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // --- Aparición al hacer scroll ---
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll("[data-count]").forEach(animateCount);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    counters.forEach((el) => (el.textContent = Number(el.dataset.count).toLocaleString("es-MX")));
  }

  // --- Formulario de contacto ---
  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = form.nombre;
    const email = form.email;
    let valid = true;

    [nombre, email].forEach((f) => f.classList.remove("is-invalid"));
    if (!nombre.value.trim()) { nombre.classList.add("is-invalid"); valid = false; }
    if (!emailRe.test(email.value.trim())) { email.classList.add("is-invalid"); valid = false; }

    message.className = "form__message";
    if (!valid) {
      message.textContent = "Revisa tu nombre y correo electrónico.";
      message.classList.add("is-error");
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Enviando…";

    try {
      // TODO: reemplaza esta simulación por tu endpoint real, por ejemplo:
      // await fetch("https://tu-api.com/leads", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      await new Promise((r) => setTimeout(r, 900));
      console.log("Lead capturado:", data);

      message.textContent = `¡Gracias, ${data.nombre}! Te contactaremos muy pronto.`;
      message.classList.add("is-success");
      form.reset();
    } catch (err) {
      message.textContent = "Ocurrió un error. Intenta de nuevo.";
      message.classList.add("is-error");
    } finally {
      button.disabled = false;
      button.textContent = "Solicitar demo";
    }
  });
});
