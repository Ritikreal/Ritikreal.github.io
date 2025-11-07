document.addEventListener("DOMContentLoaded", () => {
  const cmdInput = document.getElementById("cmdInput");
  const output = document.getElementById("output");
  const form = document.getElementById("promptForm");
  const panels = document.querySelectorAll(".panel");

  const commands = {
    help: () => printOutput("Commands: help, about, projects, resume, tools, contact, clear, exit"),
    about: () => showPanel("about"),
    projects: () => showPanel("projects"),
    resume: () => showPanel("resume"),
    tools: () => showPanel("tools"),
    contact: () => showPanel("contact"),
    clear: () => (output.innerHTML = ""),
    exit: exitCommand
  };

  form.addEventListener("submit", e => {
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

  function printOutput(html) {
    output.innerHTML += `<div>${html}</div>`;
    output.scrollTop = output.scrollHeight;
  }

  function showPanel(id) {
    panels.forEach(p => p.hidden = true);
    const panel = document.getElementById(id);
    if (panel) {
      panel.hidden = false;
      panel.scrollIntoView({ behavior: "smooth" });
    } else {
      printOutput(`<span class="muted">Panel not found: ${id}</span>`);
    }
  }

  // Exit Command
  function exitCommand() {
    printOutput("<span class='muted'>System shutting down...</span>");
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position:fixed; inset:0; background:black; z-index:9999;
      display:flex; align-items:center; justify-content:center;
      font-family:monospace; font-size:32px; color:#00ff9f;
    `;
    document.body.appendChild(overlay);

    let countdown = 5;
    const interval = setInterval(() => {
      overlay.textContent = `Shutting down in ${countdown--}...`;
      if (countdown < 0) {
        clearInterval(interval);
        // Flash phase
        let flashes = 0;
        const flashInt = setInterval(() => {
          overlay.style.background = `hsl(${Math.random() * 360},100%,50%)`;
          flashes++;
          if (flashes > 30) {
            clearInterval(flashInt);
            overlay.style.background = "black";
            overlay.textContent = "Goodbye.";
          }
        }, 100);
      }
    }, 1000);
  }
});
