(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  root.classList.add("js");

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeNavigation = () => {
    if (!navToggle) return;
    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      body.classList.toggle("nav-open", !isOpen);
      navToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNavigation();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNavigation();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeNavigation();
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-glow]").forEach((surface) => {
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const paintGlow = () => {
      surface.style.setProperty("--glow-x", `${nextX}px`);
      surface.style.setProperty("--glow-y", `${nextY}px`);
      frame = 0;
    };

    surface.addEventListener(
      "pointermove",
      (event) => {
        if (reduceMotion.matches || event.pointerType === "touch") return;
        const bounds = surface.getBoundingClientRect();
        nextX = event.clientX - bounds.left;
        nextY = event.clientY - bounds.top;
        if (!frame) frame = requestAnimationFrame(paintGlow);
      },
      { passive: true }
    );
  });

  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });
})();
