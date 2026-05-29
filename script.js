// ======================================================
// YnotHost - Script Premium V3
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // MOBILE TOP BAR HIDE ON SCROLL
  // ==========================================

  let lastScroll = 0;

  window.addEventListener("scroll", () => {

    const currentScroll =
      window.pageYOffset ||
      document.documentElement.scrollTop;

    if (currentScroll > lastScroll && currentScroll > 80) {

      document.body.classList.add("scroll-down");

    } else {

      document.body.classList.remove("scroll-down");

    }

    lastScroll = currentScroll <= 0
      ? 0
      : currentScroll;

  });

  // ==========================================
  // BACK TO TOP
  // ==========================================

  const backToTop =
    document.querySelector(".back-to-top");

  if (backToTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 500) {

        backToTop.classList.add("show");

      } else {

        backToTop.classList.remove("show");

      }

    });

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }

  // ==========================================
  // SCROLL ANIMATION
  // ==========================================

  const animatedElements =
    document.querySelectorAll(
      ".animate-element"
    );

  if (animatedElements.length) {

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "animate-in"
              );

            }

          });

        },

        {
          threshold: 0.15
        }

      );

    animatedElements.forEach((element) => {

      observer.observe(element);

    });

  }

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  const loadingScreen =
    document.getElementById(
      "loading-screen"
    );

  if (loadingScreen) {

    window.addEventListener("load", () => {

      loadingScreen.style.opacity = "0";

      setTimeout(() => {

        loadingScreen.style.display =
          "none";

      }, 500);

    });

  }

});