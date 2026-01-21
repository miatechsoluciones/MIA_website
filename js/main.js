document.addEventListener("DOMContentLoaded", () => {
  // URL Cleanup: Hide .html extension in the address bar
  if (window.location.pathname.endsWith(".html")) {
    const newPath = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState({}, document.title, newPath);
  }

  // Mobile Menu Toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler) {
    navbarToggler.addEventListener("click", () => {
      navbarCollapse.classList.toggle("show");
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
          // Close mobile menu if open
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            navbarCollapse.classList.remove("show");
          }
        }
      }
    });
  });

  // Contact Form Handling (Bundling Logic)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;

      submitBtn.innerText = "Enviando...";
      submitBtn.disabled = true;

      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());

      try {
        const res = await fetch(
          "https://proimetn8n.miatech.cloud/webhook/0ad3cadb-f293-4f9e-9483-39e545765f01",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );

        const statusEl = document.getElementById("form-status");
        if (res.ok) {
          if (statusEl) {
            statusEl.innerText =
              "¡Mensaje enviado con éxito! Nos contactaremos pronto.";
            statusEl.style.color = "var(--brand-green)";
          }
          form.reset();
        } else {
          throw new Error("Error en servidor");
        }
      } catch (error) {
        console.error("Error:", error);
        const statusEl = document.getElementById("form-status");
        if (statusEl) {
          statusEl.innerText =
            "Error al enviar. Intenta nuevamente o contáctanos por WhatsApp.";
          statusEl.style.color = "red";
        }
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});
