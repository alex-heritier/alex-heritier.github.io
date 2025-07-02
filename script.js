// script.js - simple client-side interactions

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const closeBtn = document.getElementById('close-popup');
  const subscribeBtn = document.querySelector('.subscribe-btn');

  // Show pop-up after 3 seconds
  setTimeout(() => {
    popup.classList.remove('hidden');
  }, 3000);

  // Close pop-up handler
  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  // Subscribe button (dummy action)
  subscribeBtn.addEventListener('click', () => {
    alert('Thanks for subscribing! Hot jobs will hit your inbox soon.');
    popup.classList.add('hidden');
  });
});