const overlay = document.querySelector("[data-modal]");
const openButton = document.querySelector("[data-modal-open]");
const dialog = overlay.querySelector(".glass-modal");

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable() {
  return Array.from(dialog.querySelectorAll(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null,
  );
}

function openModal() {
  overlay.hidden = false;
  // aria-modal="true" promises the rest of the page is inert — make it so.
  openButton.setAttribute("inert", "");
  const focusable = getFocusable();
  (focusable[0] || dialog).focus();
}

function closeModal() {
  overlay.hidden = true;
  openButton.removeAttribute("inert");
  openButton.focus();
}

// Keep Tab / Shift+Tab cycling within the dialog instead of escaping to the
// (now inert) background.
function trapTab(event) {
  const focusable = getFocusable();
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (!dialog.contains(active)) {
    event.preventDefault();
    first.focus();
    return;
  }

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

openButton.addEventListener("click", openModal);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.closest("[data-modal-close]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (overlay.hidden) return;
  if (event.key === "Escape") {
    closeModal();
  } else if (event.key === "Tab") {
    trapTab(event);
  }
});
