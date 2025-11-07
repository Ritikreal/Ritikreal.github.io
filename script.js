/* script.js
 Robust terminal + GUI logic for the provided index.html
 Commands supported:
   help, about, projects, resume, notes, tools, contact, clear, open <page>
*/

(() => {
  // Elements (match ids/classes in your HTML)
  const outputEl = document.getElementById('output');
  const cmdInput = document.getElementById('cmdInput');
  const promptForm = document.getElementById('promptForm');
  const runBtn = document.getElementById('runBtn');
  const chipEls = Array.from(document.querySelectorAll('.chip'));
  const panels = Array.from(document.querySelectorAll('.panel'));
  const hero = document.getElementById('panel-hero');

  // map command -> panel id (null means hero)
  const panelMap = {
    about: 'about',
    projects: 'projects',
    resume: 'resume',
    notes: 'notes',
    tools: 'tools',
    contact: 'contact',
    hero: null
  };

  // small helper: append line
  function appendLine(text = '', cls = '') {
    const p = document.createElement('p');
    if (cls) p.className = cls;
    p.textContent = text;
    outputEl.appendChild(p);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  // typing effect (returns Promise)
  function typeLine(text, speed = 14, cls = '') {
    return new Promise(resolve => {
      const p = document.createElement('p');
      if (cls) p.className = cls;
      outputEl.appendChild(p);
      let i = 0;
      function tick() {
        p.textContent = text.slice(0, i++);
        outputEl.scrollTop = outputEl.scrollHeight;
        if (i <= text.length) setTimeout(tick, speed);
        else resolve();
      }
      tick();
    });
  }

  // commands content
  const responses = {
    help: `Available commands:
  help           - show this help
  about          - about me
  projects       - list projects
  resume         - summary / download
  notes          - open notes page
  tools          - tech & tools
  contact        - contact info
  open <page>    - open notes.html or other file
  clear          - clear terminal`,
    about: `Hi, I'm Rithwik — creator of tools and neat UI. I like minimal UX, embedded systems, and fast tooling.`,
    projects: `Projects:
 - Terminal Portfolio (this site)
 - Soil Health Sensor (ESP32 + LoRa)
 - Compiler Playground`,
    resume: `Resume: add resume.pdf to repo root to enable download button.`,
    notes: `Notes: create notes.html in repo to open it with 'open notes'`,
    tools: `Tools: Node, Git, Docker, ESP32, LoRa, Vim, Arch`,
    contact: `Email: your.email@example.com
GitHub: https://github.com/yourusername`
  };

  // Show a panel (id or 'hero')
  function hideAllPanels() {
    panels.forEach(p => p.hidden = true);
    if (hero) hero.classList.remove('active');
  }

  function showPanel(id) {
    hideAllPanels();
    if (!id || id === 'hero') {
      if (hero) {
        hero.classList.add('active');
        hero.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    const target = document.getElementById(id);
    if (!target) {
      appendLine(`Panel not found: ${id}`, 'muted');
      return;
    }
    target.hidden = false;
    setTimeout(() => target.focus && target.focus(), 200);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Execute command string
  async function execute(raw) {
    const cmdRaw = (raw || '').trim();
    if (!cmdRaw) return;
    // echo the typed command
    const echo = document.createElement('p');
    echo.innerHTML = `<span class="cmd inline">➜</span> <span class="mono">${escapeHtml(cmdRaw)}</span>`;
    outputEl.appendChild(echo);
    outputEl.scrollTop = outputEl.scrollHeight;

    // parse
    const parts = cmdRaw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    if (cmd === 'clear') {
      outputEl.innerHTML = '';
      return;
    }

    if (cmd === 'open') {
      if (!arg) {
        appendLine('Usage: open <page> (example: open notes)', 'muted');
        return;
      }
      // try to show panel first if known
      if (panelMap[arg] !== undefined) {
        showPanel(arg);
        await typeLine(`Opening panel: ${arg}`, 10, 'muted');
        return;
      }
      // otherwise try to open an external file like notes.html
      const candidate = `${arg}.html`;
      appendLine(`Attempting to open ${candidate}...`, 'muted');
      // open in new tab (GitHub Pages will serve it if present)
      window.open(candidate, '_blank', 'noopener');
      return;
    }

    if (responses[cmd]) {
      // show panel if it exists
      if (panelMap[cmd] !== undefined) {
        showPanel(cmd);
      }
      // typing effect for response
      await typeLine(responses[cmd], 10, 'muted');
      return;
    }

    appendLine(`Command not found: ${cmd}  — type help.`, 'muted');
  }

  // basic escape
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
  }

  // wire chips
  chipEls.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const c = btn.dataset.cmd;
      // set input (visual) then run
      if (cmdInput) cmdInput.value = c;
      await execute(c);
      if (cmdInput) { cmdInput.value = ''; cmdInput.focus(); }
    });
  });

  // form submit / run button
  if (promptForm) {
    promptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!cmdInput) return;
      const v = cmdInput.value;
      await execute(v);
      cmdInput.value = '';
      cmdInput.focus();
    });
  }
  if (runBtn) {
    runBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (!cmdInput) return;
      const v = cmdInput.value;
      await execute(v);
      cmdInput.value = '';
      cmdInput.focus();
    });
  }

  // keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    // focus input with Ctrl/Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdInput && cmdInput.focus();
    }
    // Escape blurs input
    if (e.key === 'Escape') cmdInput && cmdInput.blur();
  });

  // GUI buttons (resume/notes)
  const resumeBtn = document.getElementById('downloadResume');
  const notesBtn = document.getElementById('openNotesGUI');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      window.open('resume.pdf', '_blank', 'noopener');
    });
  }
  if (notesBtn) {
    notesBtn.addEventListener('click', () => {
      window.open('notes.html', '_blank', 'noopener');
    });
  }

  // initial welcome lines with subtle typing
  (async function intro() {
    try {
      await typeLine('rithwik@portfolio: welcome', 12, 'muted');
      await typeLine('Type help to list commands — CLI + GUI hybrid enabled.', 10, 'muted');
    } catch (e) {
      // fail silently
      console.warn('intro typing failed', e);
    }
  })();

  // ensure cmdInput exists and focus
  setTimeout(()=> { if (cmdInput) cmdInput.focus(); }, 400);
})();
