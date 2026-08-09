(() => {
  'use strict';

  // Mobile navigation
  const btn = document.querySelector('.burger');
  const menu = document.getElementById('mn');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Work portfolio filters
  const filters = Array.from(document.querySelectorAll('.filter-btn[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.work-card[data-cat]'));
  const countEl = document.getElementById('work-result-count');

  if (filters.length && cards.length) {
    const knownFilters = new Set(filters.map((button) => button.dataset.filter));

    const applyFilter = (requestedFilter, updateUrl = true) => {
      const filter = knownFilters.has(requestedFilter) ? requestedFilter : 'all';
      let visibleCount = 0;

      filters.forEach((button) => {
        const active = button.dataset.filter === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      cards.forEach((card) => {
        const categories = (card.dataset.cat || '')
          .split(/\s+/)
          .map((value) => value.trim())
          .filter(Boolean);
        const show = filter === 'all' || categories.includes(filter);

        // Use both mechanisms so author CSS, older browsers, or cached styles
        // cannot accidentally keep filtered cards visible.
        card.hidden = !show;
        card.classList.toggle('is-hidden', !show);
        card.style.display = show ? '' : 'none';
        card.setAttribute('aria-hidden', show ? 'false' : 'true');
        if (show) visibleCount += 1;
      });

      if (countEl) {
        const label = filter === 'all'
          ? 'All work'
          : filters.find((button) => button.dataset.filter === filter)?.textContent.trim() || filter;
        countEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} · ${label}`;
      }

      if (updateUrl && window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete('filter');
        else url.searchParams.set('filter', filter);
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      }
    };

    filters.forEach((button) => {
      button.type = 'button';
      button.addEventListener('click', () => applyFilter(button.dataset.filter));
    });

    const initial = new URLSearchParams(window.location.search).get('filter') || 'all';
    applyFilter(initial, false);
  }
})();
