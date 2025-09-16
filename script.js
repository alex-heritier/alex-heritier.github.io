// script.js - simple client-side interactions (refined)

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const closeBtn = document.getElementById('close-popup');
  const subscribeBtn = document.querySelector('.subscribe-btn');

  if (!popup || !closeBtn) {
    return; // Page without popup
  }

  const SHOW_DELAY_MS = 3000;
  const DISMISS_DAYS = 7;
  const STORAGE_KEY = 'hcmcPopupSeenAt';
  const now = Date.now();
  const lastSeen = Number(localStorage.getItem(STORAGE_KEY) || 0);
  const dismissedRecently = now - lastSeen < DISMISS_DAYS * 24 * 60 * 60 * 1000;

  function hideAndRemember() {
    popup.classList.add('hidden');
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }

  if (!dismissedRecently) {
    setTimeout(() => {
      popup.classList.remove('hidden');
    }, SHOW_DELAY_MS);
  }

  closeBtn.addEventListener('click', () => {
    hideAndRemember();
  });

  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      alert('Thanks for subscribing! Hot jobs will hit your inbox soon.');
      hideAndRemember();
    });
  }

  // Close when clicking outside modal-content
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      hideAndRemember();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideAndRemember();
    }
  });
});