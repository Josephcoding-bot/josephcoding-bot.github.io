const links = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section")];

// Highlight the section the visitor has reached.
function updateNavigation() {
  const marker = window.innerHeight * 0.35;
  let currentId = sections[0].id;

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) {
      currentId = section.id;
    }
  }

  // Ensure the last section is selected at the bottom of the page.
  const atBottom =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 4;

  if (atBottom) {
    currentId = sections[sections.length - 1].id;
  }

  for (const link of links) {
    const isActive = link.getAttribute("href") === `#${currentId}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

// Limit scroll updates to one per animation frame.
let updatePending = false;

window.addEventListener(
  "scroll",
  () => {
    if (updatePending) return;

    updatePending = true;

    requestAnimationFrame(() => {
      updateNavigation();
      updatePending = false;
    });
  },
  { passive: true },
);

window.addEventListener("resize", updateNavigation);
updateNavigation();

// Move the subtle spotlight with the mouse.
const finePointer = window.matchMedia("(pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener(
  "pointermove",
  (event) => {
    if (!finePointer.matches || reducedMotion.matches) return;

    document.documentElement.style.setProperty(
      "--mouse-x",
      `${event.clientX}px`,
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      `${event.clientY}px`,
    );
  },
  { passive: true },
);
