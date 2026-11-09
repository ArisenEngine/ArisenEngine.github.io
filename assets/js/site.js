(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileNavigation = window.matchMedia("(max-width: 900px)");

  root.classList.add("js");

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const setNavigation = (open, restoreFocus = false) => {
    if (!navToggle || !nav) return;
    const expanded = mobileNavigation.matches && open;
    const collapsed = mobileNavigation.matches && !expanded;
    // Return focus before making the mobile links inert. Opacity and pointer-events
    // alone leave a collapsed menu in the keyboard and accessibility navigation.
    if (collapsed && (restoreFocus || nav.contains(document.activeElement))) {
      navToggle.focus();
    }
    body.classList.toggle("nav-open", expanded);
    navToggle.setAttribute("aria-expanded", String(expanded));
    nav.inert = collapsed;
    if (collapsed) nav.setAttribute("aria-hidden", "true");
    else nav.removeAttribute("aria-hidden");
  };

  if (navToggle && nav) {
    setNavigation(false);

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setNavigation(!isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setNavigation(false);
    });

    document.addEventListener("keydown", (event) => {
      if (navToggle.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") {
        event.preventDefault();
        setNavigation(false, true);
        return;
      }
      if (event.key !== "Tab" || !mobileNavigation.matches) return;
      const links = [...nav.querySelectorAll("a[href]")];
      const first = navToggle;
      const last = links[links.length - 1] || first;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    mobileNavigation.addEventListener("change", () => {
      setNavigation(false);
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
