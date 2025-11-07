/* script.js
   Terminal + GUI logic for hybrid portfolio.
   Commands supported: help, about, projects, resume, notes, tools, contact, open <page>, clear
*/

(() => {
  const output = document.getElementById('output');
  const cmdInput = document.getElementById('cmdInput');
  const promptForm = document.getElementById('promptForm');
  const chips = Array.from(document.querySelectorAll('.chip'));
  const panels = Array.from(document.querySelectorAll('.panel'));
  const hero = document.getElementById('panel-hero');
  const panelArea = document.getElementById('panel-area');

  // map of commands -> panel id
  const panelsMap = {
    about: 'about',
    projects: 'projects',
    resume: 'resume',
    notes: 'notes',
    tools: 'tools',
    contact: 'contact',
    hero: null
  };

  // utility: print to terminal output with optional delay (typing-like)
  function appendLine(text = '', cls = '') {
    const p = document.createElement('p');
    if (cls) p.className = cls;
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }

  function typeLine(text, speed = 18, cls = '') {
    return new Promise(resolve => {
      const p = document.createElement('p');
      if (cls) p.className = cls;
      output.appendChild(p);
      let i = 0;
      function tick() {
        p.textContent = text.slice(0, i++);
        output.scrollTop = output.scrollHeight;
        if (i <= text.length) setTimeout(tick, speed);
        else resolve();
      }
      tick();
    });
  }

  // focus on input initially
  cmdInput.focus();

  // commands
  const commands = {
    help: async () => {
      await typeLine('Available commands: help, about, projects, resume, notes, tools, contact, open <page>, clear', 8);
      appendLine('Try: open projects  — or click a chip on the left.', 'muted');
    },
    about: async () => {
      showPanel('about');
      await typeLine('Opening: about', 10, 'muted');
    },
    projects: async () => {
      showPanel('projects');
      await typeLine('Opening: projects', 10, 'muted');
    },
    resume: async () => {
      showPanel('resume');
      await typeLine('Opening: resume', 10, 'muted');
    },
    notes: async () => {
      showPanel('notes');
      await typeLine('Opening: notes', 10, 'muted');
    },
    tools: async () => {
      showPanel('tools');
      await typeLine('Opening: tools', 10, 'muted');
    },
    contact: async () => {
      showPanel('contact');
      await typeLine('Opening: contact', 10, 'muted');
    },
    clear: async () => {
      output.innerHTML = '';
      await typeLine('Cleared.', 6, 'muted');
    },
    open: async (arg) => {
      if (!arg) { appendLine('Usage: open <page> — e.g. open notes', 'muted'); return; }
      const page = arg.trim().toLowerCase();
      if (panelsMap[page] !== undefined) {
        // If it maps to null, show hero
        showPanel(page === 'hero' ? 'hero' : page);
        await typeLine(`Opening: ${page}`, 10, 'muted');
      } else {
        // try to open external file if exists (notes.html etc.)
        const candidate = `${page}.html`;
        appendLine(`Trying to open ${candidate}...`, 'muted');
        // open in new tab - GitHub Pages will serve file if present
        window.open(candidate, '_blank', 'noopener');
      }
    }
  };

  // parse input
  async function handleCommand(raw) {
    const trimmed = (raw || '').trim();
    if (!trimmed) return;
    // show command in terminal
    const cmdLine = document.createElement('p');
    cmdLine.innerHTML = `<span class="cmd inline">➜</span> <span class="mono">${escapeHtml(trimmed)}</span>`;
    output.appendChild(cmdLine);
    output.scrollTop = output.scrollHeight;

    const parts = trimmed.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    if (commands[cmd]) {
      try {
        await commands[cmd](arg);
      } catch (e) {
        appendLine('Error executing command', 'muted');
      }
    } else {
      appendLine(`Command not found: ${cmd}  — type help.`, 'muted');
    }
  }

  // basic html escape
  function escapeHtml(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

  // attach chips
  chips.forEach(c => {
    c.addEventListener('click', async (e) => {
      const cmd = c.dataset.cmd;
      // simulate enter
      cmdInput.value = cmd;
      await submitPrompt();
      cmdInput.value = '';
      cmdInput.focus();
    });
  });

  // submit handler
  async function submitPrompt() {
    const v = cmdInput.value;
    await handleCommand(v);
  }

  promptForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitPrompt();
    cmdInput.value = '';
    cmdInput.focus();
  });

  // show/hide panels
  function hideAllPanels() {
    panels.forEach(p => p.hidden = true);
    hero.classList.remove('active');
  }

  function showPanel(id) {
    hideAllPanels();
    if (id === 'hero') {
      hero.classList.add('active');
      hero.scrollIntoView({behavior:'smooth'});
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    target.hidden = false;
    target.scrollIntoView({behavior:'smooth', block:'start'});
    // focus for accessibility
    setTimeout(()=> target.focus(), 300);
  }

  // keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdInput.focus();
    }
    // Arrow up to focus input
    if (e.key === 'Escape') {
      cmdInput.blur();
    }
  });

  // quick bind GUI buttons
  document.getElementById('downloadResume').addEventListener('click', () => {
    // link to resume file expected in repo as resume.pdf
    const url = 'resume.pdf';
    window.open(url, '_blank', 'noopener');
  });
  document.getElementById('openNotesGUI').addEventListener('click', ()=> {
    // try to open notes.html
    window.open('notes.html', '_blank', 'noopener');
  });

  // Small demonstration of helpful initial output (non-annoying)
  (async function intro(){
    await typeLine('rithwik@portfolio: welcome', 12, 'muted');
    await typeLine('Type help to list commands — CLI + GUI hybrid enabled.', 10, 'muted');
  })();
})();
