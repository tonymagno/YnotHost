// YnotHost - script.js V2
// Interações leves, sem duplicações e compatível com o novo visual

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const mainHeader = document.querySelector(".main-header");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sectionsToAnimate = document.querySelectorAll(
    ".hero-text, .hero-image, .feature-item, .plan, .model, section h2, section > .container > p"
  );
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================
     Smooth scroll
  ========================== */
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        16;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  });

  /* =========================
     Scroll reveal
  ========================== */
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionsToAnimate.forEach((element) => {
      element.classList.add("animate-element");
      observer.observe(element);
    });
  } else {
    sectionsToAnimate.forEach((element) => {
      element.classList.add("animate-in");
    });
  }

  /* =========================
     Header shadow on scroll
  ========================== */
  const updateHeaderState = () => {
    if (!mainHeader) return;

    if (window.scrollY > 10) {
      mainHeader.classList.add("is-scrolled");
    } else {
      mainHeader.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  /* =========================
     Back to top
  ========================== */
  const backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Voltar ao topo");
  backToTop.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(backToTop);

  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  /* =========================
     WhatsApp tracking
  ========================== */
  const trackEvent = (eventName, eventData = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventData);
    }
  };

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const card = link.closest(".plan");
      const model = link.closest(".model");

      const itemName =
        card?.querySelector("h3")?.textContent?.trim() ||
        model?.querySelector("h3")?.textContent?.trim() ||
        "WhatsApp CTA";

      trackEvent("whatsapp_click", {
        item_name: itemName,
        page_path: window.location.pathname,
      });
    });
  });

  /* =========================
     External model clicks
  ========================== */
  document.querySelectorAll(".model a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    link.addEventListener("click", () => {
      const modelTitle = link.querySelector("h3")?.textContent?.trim() || "Model";
      trackEvent("model_click", {
        model_name: modelTitle,
        page_path: window.location.pathname,
      });
    });
  });

  /* =========================
     Footer year
  ========================== */
  const currentYear = document.querySelector(".footer-bottom-content p");
  if (currentYear) {
    currentYear.innerHTML = `&copy; ${new Date().getFullYear()} YnotHost - Todos os direitos reservados.`;
  }

  /* =========================
     Keyboard accessibility
  ========================== */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && backToTop.classList.contains("show")) {
      backToTop.focus();
    }
  });
});

/* =========================================================
   Helpers globais
========================================================= */

function isMobile() {
  return window.innerWidth <= 768;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function debounce(fn, delay = 200) {
  let timer;

  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit = 200) {
  let lastCall = 0;

  return function throttled(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}
/* ==========================================
   TOP BAR MOBILE PREMIUM
========================================== */

window.addEventListener("scroll", () => {

  if (window.scrollY > 120) {
    document.body.classList.add("scroll-down");
  } else {
    document.body.classList.remove("scroll-down");
  }

});