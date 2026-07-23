const overlay = document.querySelector('[data-modal]');
const openButton = document.querySelector('[data-modal-open]');

function openModal() {
  overlay.hidden = false;
  overlay.querySelector('button').focus();
}

function closeModal() {
  overlay.hidden = true;
  openButton.focus();
}

openButton.addEventListener('click', openModal);

overlay.addEventListener('click', (event) => {
  if (event.target === overlay || event.target.closest('[data-modal-close]')) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !overlay.hidden) {
    closeModal();
  }
});
