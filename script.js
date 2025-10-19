(function () {
  function navigateWithSlide(targetUrl) {
    document.documentElement.classList.remove('page-in');
    document.documentElement.classList.add('page-out');
    setTimeout(() => { window.location.href = targetUrl; }, 420);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-transition]');
    if (!a) return;
    e.preventDefault();
    navigateWithSlide(a.getAttribute('href'));
  });

  window.addEventListener('load', () => {
    document.documentElement.classList.add('page-in');
    const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
    if (document.body.classList.contains('notes-page')) initNotes();
    const intro = document.getElementById('intro'); if (intro) setTimeout(()=>intro.remove(), 2400);
    initCat();
  });

  function initNotes() {
    const key = 'rithwik-notes-v1';
    const area = document.getElementById('notearea');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    if (!area) return;
    try { const saved = localStorage.getItem(key); if (saved) area.value = saved; } catch (e){}
    if (saveBtn) saveBtn.addEventListener('click', ()=>{ localStorage.setItem(key, area.value); saveBtn.textContent='Saved ✓'; setTimeout(()=>saveBtn.textContent='Save',1100); });
    if (clearBtn) clearBtn.addEventListener('click', ()=>{ area.value=''; localStorage.removeItem(key); });
    let to; area.addEventListener('input', ()=>{ clearTimeout(to); to = setTimeout(()=>{ localStorage.setItem(key, area.value); },700); });
    // audio toggle on notes page
    const audio = document.getElementById('bgAudio'); const toggle = document.getElementById('toggleAudio');
    if (toggle && audio) {
      let playing = false;
      toggle.addEventListener('click', ()=>{
        playing = !playing;
        if (playing) { audio.play().catch(()=>{}); toggle.textContent='🔊 Audio On'; } else { audio.pause(); toggle.textContent='🔇 Audio Off'; }
      });
    }
  }

  // pixel cat interaction
  function initCat(){
    const cat = document.getElementById('pixel-cat');
    if(!cat) return;
    cat.addEventListener('mouseenter', ()=>{ cat.classList.add('bounce'); setTimeout(()=>cat.classList.remove('bounce'),600); });
    cat.addEventListener('click', ()=>{ cat.classList.add('bounce'); setTimeout(()=>cat.classList.remove('bounce'),600); alert('Hiii Prapthiii'); });
  }
})();
