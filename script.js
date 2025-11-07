window.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("output");
  const cmdInput = document.getElementById("cmdInput");
  const promptForm = document.getElementById("promptForm");
  const runBtn = document.getElementById("runBtn");
  const chipEls = [...document.querySelectorAll(".chip")];
  const panels = [...document.querySelectorAll(".panel")];
  const hero = document.getElementById("panel-hero");

  const panelMap = {
    about: "about",
    projects: "projects",
    resume: "resume",
    notes: "notes",
    tools: "tools",
    contact: "contact",
    hero: null,
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  function appendLine(text = "", cls = "") {
    const p = document.createElement("p");
    if (cls) p.className = cls;
    p.textContent = text;
    outputEl.appendChild(p);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  async function typeLine(text, speed = 10, cls = "") {
    const p = document.createElement("p");
    if (cls) p.className = cls;
    outputEl.appendChild(p);
    let i = 0;
    return new Promise((resolve) => {
      function tick() {
        p.textContent = text.slice(0, i++);
        outputEl.scrollTop = outputEl.scrollHeight;
        if (i <= text.length) setTimeout(tick, speed);
        else resolve();
      }
      tick();
    });
  }

  const responses = {
    help: `Available commands:
  help — list commands
  about — about me
  projects — list projects
  resume — show resume
  notes — show notes
  tools — show tech
  contact — contact info
  clear — clear terminal
  open <page> — open page like notes.html`,
  };

  function hideAllPanels() {
    panels.forEach((p) => (p.hidden = true));
    hero?.classList.remove("active");
  }

  function showPanel(id) {
    hideAllPanels();
    if (!id || id === "hero") {
      hero?.classList.add("active");
      return;
    }
    const target = document.getElementById(id);
    if (target) target.hidden = false;
  }

  async function execute(cmdRaw) {
    const raw = (cmdRaw || "").trim();
    if (!raw) return;
    const echo = document.createElement("p");
    echo.innerHTML = `<span class="cmd inline">➜</span> <span class="mono">${escapeHtml(
      raw
    )}</span>`;
    outputEl.appendChild(echo);

    const [cmd, ...args] = raw.split(" ");
    const arg = args.join(" ").toLowerCase();

    if (cmd === "clear") {
      outputEl.innerHTML = "";
      return;
    }

    if (cmd === "open") {
      if (!arg) return appendLine("Usage: open <page>", "muted");
      if (panelMap[arg] !== undefined) {
        showPanel(arg);
        await typeLine(`Opening ${arg} panel...`, 10, "muted");
      } else {
        window.open(`${arg}.html`, "_blank");
      }
      return;
    }

    if (responses[cmd]) {
      await typeLine(responses[cmd], 10, "muted");
      return;
    }

    if (panelMap[cmd] !== undefined) {
      showPanel(cmd);
      await typeLine(`Opened ${cmd} panel.`, 10, "muted");
      return;
    }

    appendLine(`Command not found: ${cmd}`, "muted");
  }

  chipEls.forEach((chip) =>
    chip.addEventListener("click", () => execute(chip.dataset.cmd))
  );

  promptForm.addEventListener("submit", (e) => {
    e.preventDefault();
    execute(cmdInput.value);
    cmdInput.value = "";
  });

  runBtn.addEventListener("click", (e) => {
    e.preventDefault();
    execute(cmdInput.value);
    cmdInput.value = "";
  });

  const resumeBtn = document.getElementById("downloadResume");
  const notesBtn = document.getElementById("openNotesGUI");
  resumeBtn?.addEventListener("click", () =>
    window.open("resume.pdf", "_blank")
  );
  notesBtn?.addEventListener("click", () =>
    window.open("notes.html", "_blank")
  );

  (async function intro() {
    await typeLine("rithwik@portfolio: welcome", 12, "muted");
    await typeLine("Type help to list commands.", 10, "muted");
  })();

  cmdInput?.focus();
});
