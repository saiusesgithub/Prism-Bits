document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.cybr-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.style.filter = 'invert(1)';
      setTimeout(() => {
        btn.style.filter = 'none';
      }, 100);
    });
  }
});
