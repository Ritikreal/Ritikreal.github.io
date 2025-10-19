(function () {
  function navigateWithSlide(targetUrl, direction = 'forward') {
    document.documentElement.classList.remove('page-in');
    document.documentElement.classList.add('page-out');

    const delay = 420;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, delay);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-transition]');
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    const dir = a.getAttribute('data-transition') === 'slide-back' ? 'back' : 'forward';
    navigateWithSlide(href, dir);
  });

  window.addEventListener('load', () => {
    document.documentElement.classList.add('page-in');
    document.documentElement.classList.remove('page-out');

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (document.body.classList.contains('notes-page')) initNotes();
  });

  function initNotes() {
    const key = 'rithwik-notes-v1';
    const area = document.getElementById('notearea');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    if (!area) return;

    const saved = localStorage.getItem(key);
    if(saved) area.value = saved;

    if(saveBtn) saveBtn.addEventListener('click', () => {
      localStorage.setItem(key, area.value);
      saveBtn.textContent = 'Saved ✓';
      setTimeout(() => (saveBtn.textContent = 'Save'), 1200);
    });

    if(clearBtn) clearBtn.addEventListener('click', () => {
      area.value = '';
      localStorage.removeItem(key);
    });

    let to;
    area.addEventListener('input', () => {
      clearTimeout(to);
      to = setTimeout(() => {
        localStorage.setItem(key, area.value);
      }, 700);
    });
  }
})();
