document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('dex-search');
  const dietFilter = document.getElementById('diet-filter');
  const habitatFilter = document.getElementById('habitat-filter');
  const sizeFilter = document.getElementById('size-filter');
  const resetButton = document.getElementById('reset-filters');
  const cards = Array.from(document.querySelectorAll('.dex-card'));
  const emptyState = document.querySelector('.empty-state');

  const filterCards = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const dietValue = dietFilter.value;
    const habitatValue = habitatFilter.value;
    const sizeValue = sizeFilter.value;

    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesDiet = dietValue === 'all' || card.dataset.diet === dietValue;
      const matchesHabitat = habitatValue === 'all' || card.dataset.habitat === habitatValue;
      const matchesSize = sizeValue === 'all' || card.dataset.size === sizeValue;

      const textBlob = [
        card.dataset.name,
        card.querySelector('.dex-description')?.textContent || '',
        card.querySelector('.dex-ability')?.textContent || '',
        Array.from(card.querySelectorAll('.dex-tags li'))
          .map((tag) => tag.textContent)
          .join(' '),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = searchTerm.length === 0 || textBlob.includes(searchTerm);
      const isVisible = matchesDiet && matchesHabitat && matchesSize && matchesSearch;

      card.hidden = !isVisible;
      card.setAttribute('aria-hidden', String(!isVisible));

      if (isVisible) {
        visibleCount += 1;
      }
    });

    emptyState.hidden = visibleCount !== 0;
  };

  searchInput.addEventListener('input', filterCards);
  dietFilter.addEventListener('change', filterCards);
  habitatFilter.addEventListener('change', filterCards);
  sizeFilter.addEventListener('change', filterCards);

  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    dietFilter.value = 'all';
    habitatFilter.value = 'all';
    sizeFilter.value = 'all';
    filterCards();
    searchInput.focus();
  });

  filterCards();
});
