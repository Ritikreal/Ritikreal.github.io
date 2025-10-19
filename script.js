// script.js
// Handles slide transitions and notes localStorage

(function () {
  // small helper: perform transition and navigate
  function navigateWithSlide(targetUrl, direction = 'forward') {
    // direction not used visually here but could be expanded
    document.documentElement.classList.remove('page-in');
    document.documentElement.classList.add('page-out');

    // wait for animation to finish then navigate
    const delay = 420; // must match CSS --anim-duration
    setTimeout(() => {
      window.location.href = targetUrl;
    }, delay);
  }

  // attach transition links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-transition]');
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    // if going back to index, we can animate back as well
    const dir = a.getAttribute('data-transition') === 'slide-back' ? 'back' : 'forward';
    navigateWithSlide(href, dir);
  });

  // when page loads, run enter animation
  window.addEventListener('load', () => {
    // ensure body has page-in for CSS
    document.documentElement.classList.add('page-in');
    document.documentElement.classList.remove('page-out');

    // set year if present
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // initialize notes page logic if on notes.html
    if (document.body.classList.contains('notes-page')) {
      initNotes();
    }
  });

  // Notes logic
  function initNotes() {
    const key = 'rithwik-notes-v1';
    const area = document.getElementById('notearea');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    if (!area) return;

    // load saved content
    try {
      const saved = localStorage.getItem(key);
      if (saved) area.value = saved;
    } catch (err) {
      console.warn('Could not read localStorage:', err);
    }

    // save handler
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        try {
          localStorage.setItem(key, area.value);
          saveBtn.textContent = 'Saved ✓';
          setTimeout(() => (saveBtn.textContent = 'Save'), 1200);
        } catch (err) {
          console.error('save failed', err);
        }
      });
    }

    // clear handler
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        area.value = '';
        try {
          localStorage.removeItem(key);
        } catch (err) {}
      });
    }

    // also autosave after small pause when user stops typing
    let to;
    area.addEventListener('input', () => {
      clearTimeout(to);
      to = setTimeout(() => {
        try {
          localStorage.setItem(key, area.value);
        } catch (err) {}
      }, 700);
    });
  }
})();
