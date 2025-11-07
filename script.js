document.addEventListener("DOMContentLoaded", () => {
  const cmdInput = document.getElementById("cmdInput");
  const output = document.getElementById("output");
  const form = document.getElementById("promptForm");
  const panels = document.querySelectorAll(".panel");
  const chips = document.querySelectorAll(".chip");

  const commands = {
    help: () => printOutput("Commands: help, about, projects, resume, notes, tools, contact, clear, exit"),
    about: () => showPanel("about"),
    projects: () => showPanel("projects"),
    resume: () => showPanel("resume"),
    notes: () => showPanel("notes"),
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

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      cmdInput.value = chip.dataset.cmd;
      form.dispatchEvent(new Event("submit"));
    });
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

  // EXIT Command logic (placeholder)
  function exitCommand() {
    printOutput("<span class='muted'>Exiting system...</span>");
  }
});
