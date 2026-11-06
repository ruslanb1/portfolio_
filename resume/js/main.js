// Просмотр изображений портфолио. Независимый файл, без сторонних JS библиотек.
(() => {
  'use strict';
  const modal = document.getElementById('documentModal');
  const modalImage = document.getElementById('modalImage');
  const closeButton = modal?.querySelector('.close-modal');
  if (!modal || !modalImage || !closeButton) return;
  let previousFocus = null;
  let previousOverflow = '';

  function openModal(source, description = 'Увеличенный документ') {
    if (!source) return;
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    modalImage.alt = description;
    modalImage.src = source;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modalImage.removeAttribute('src');
    document.body.style.overflow = previousOverflow;
    if (previousFocus?.focus) previousFocus.focus();
  }

  document.querySelectorAll('[data-modal-src]').forEach(card => {
    const open = () => openModal(card.dataset.modalSrc, card.querySelector('img')?.alt || 'Документ');
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') closeModal();
  });
  const printButton = document.querySelector('.print-button');
  if (printButton) printButton.addEventListener('click', () => window.print());
})();
