// === script.js ===
// Terminal Portfolio Logic — by GPT-5
document.addEventListener("DOMContentLoaded", () => {
  const cmdInput = document.getElementById("cmdInput");
  const output = document.getElementById("output");
  const form = document.getElementById("promptForm");
  const panels = document.querySelectorAll(".panel");
  const chips = document.querySelectorAll(".chip");

  const commands = {
    help: () =>
      printOutput(
        "Commands: <span class='cmd'>help</span>, <span class='cmd'>about</span>, <span class='cmd'>projects</span>, <span class='cmd'>resume</span>, <span class='cmd'>tools</span>, <span class='cmd'>contact</span>, <span class='cmd'>clear</span>, <span class='cmd'>exit</span>"
      ),

    about: () => showPanel("about"),
    projects: () => showPanel("projects"),
    resume: () => showPanel("resume"),
    notes: () => showPanel("notes"),
    tools: () => showPanel("tools"),
    contact: () => showPanel("contact"),

    clear: () => (output.innerHTML = ""),
    exit: () => exitSequence(),
  };

  // === FORM HANDLING ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cmd = cmdInput.value.trim().toLowerCase();
    if (!cmd) return;

    printOutput(`<span class="cmd-line">➜ ${cmd}</span>`);

    if (commands[cmd]) {
      commands[cmd]();
    } else {
      printOutput(`<span class="muted">Unknown command: ${cmd}</span>`);
    }

    cmdInput.value = "";
  });

  // === CHIP SHORTCUTS ===
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      cmdInput.value = chip.dataset.cmd;
      form.dispatchEvent(new Event("submit"));
    });
  });

  // === OUTPUT FUNCTION ===
  function printOutput(html) {
    const line = document.createElement("div");
    line.classList.add("terminal-line");
    line.innerHTML = html;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  // === PANEL HANDLING ===
  function showPanel(id) {
    panels.forEach((p) => (p.hidden = true));
    const panel = document.getElementById(id);
    if (panel) {
      panel.hidden = false;
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
      printOutput(`<span class='muted'>Opened panel: ${id}</span>`);
    } else {
      printOutput(`<span class='muted'>Panel not found: ${id}</span>`);
    }
  }

  // === EXIT COMMAND ===
  function exitSequence() {
    printOutput("<span class='muted'>Shutting down terminal...</span>");
    setTimeout(() => {
      document.body.style.background = "black";
      document.body.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:black;color:#00ff9f;font-family:monospace;font-size:18px;">
          <pre>
          SYSTEM OFFLINE...
          <br><br>
          <span style="color:#555;">Press F5 to reboot</span>
          </pre>
        </div>`;
    }, 1500);
  }

  // === STARTUP EFFECT ===
  bootSequence();

  function bootSequence() {
    const bootMessages = [
      "Initializing Rithwik Portfolio v1.0...",
      "Loading modules…",
      "Setting up terminal environment…",
      "Connecting to UI renderer…",
      "System ready.",
      "Type 'help' to begin.",
    ];

    let delay = 0;
    output.innerHTML = "";
    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        printOutput(`<span class="muted">${msg}</span>`);
        if (i === bootMessages.length - 1)
          printOutput(`<span class="cmd">rithwik@portfolio ➜</span>`);
      }, (delay += 600));
    });
  }
});
