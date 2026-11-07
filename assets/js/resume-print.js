(() => {
  const layout = document.getElementById("resume-print-layout");
  if (!layout) return;

  const requireElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Resume print source is missing: ${selector}`);
    return element;
  };

  const printDocument = layout.content.firstElementChild.cloneNode(true);
  for (const slot of printDocument.querySelectorAll("[data-print-source]")) {
    const copy = requireElement(slot.dataset.printSource).cloneNode(true);
    copy.removeAttribute("id");
    copy.removeAttribute("aria-hidden");
    for (const element of copy.querySelectorAll("[id]")) {
      element.removeAttribute("id");
    }
    for (const element of copy.querySelectorAll(".reveal, .is-visible")) {
      element.classList.remove("reveal", "is-visible");
    }
    copy.classList.remove("reveal", "is-visible");
    slot.appendChild(copy);
  }

  printDocument.querySelector(".pdf-name-row .accent-text")?.remove();
  printDocument.querySelector("[data-print-name]").textContent =
    requireElement(".resume-hero-copy .eyebrow").textContent.split("/")[0].trim();

  const publicPage = new URL(requireElement('link[rel="canonical"]').href);
  if (publicPage.protocol !== "https:") {
    throw new Error("The resume canonical URL must use HTTPS.");
  }
  for (const link of printDocument.querySelectorAll("a[href]")) {
    link.href = new URL(link.getAttribute("href"), publicPage).href;
  }

  const labels = {
    LANGUAGES: "语言",
    GRAPHICS: "图形",
    ENGINE: "引擎",
    PROFILING: "性能分析",
    PLATFORM: "平台",
    BUILD: "构建",
    WORKFLOW: "AI 工作流",
  };
  for (const label of printDocument.querySelectorAll(".skill-list dt")) {
    const translated = labels[label.textContent.trim()];
    if (translated) label.textContent = translated;
  }

  printDocument.dataset.ready = "true";
  document.body.appendChild(printDocument);
  document.body.classList.add("resume-print-ready");
})();
