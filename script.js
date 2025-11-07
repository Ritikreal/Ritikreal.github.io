document.addEventListener("DOMContentLoaded", () => {
  const cmdInput = document.getElementById("cmdInput");
  const output = document.getElementById("output");
  const form = document.getElementById("promptForm");
  const panels = document.querySelectorAll(".panel");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const shutdownScreen = document.getElementById("shutdownScreen");

  // Commands
  const commands = {
    help: () => printOutput("Commands: help, about, projects, resume, tools, contact, clear, exit"),
    about: () => showPanel("about"),
    projects: () => showPanel("projects"),
    resume: () => showPanel("resume"),
    tools: () => showPanel("tools"),
    contact: () => showPanel("contact"),
    clear: () => (output.innerHTML = ""),
    exit: exitSequence
  };

  // Submit terminal commands
  form.addEventListener("submit", e => {
    e.preventDefault();
    const cmd = cmdInput.value.trim().toLowerCase();
    if (!cmd) return;
    printOutput(`<span class="cmd-line">➜ ${cmd}</span>`);
    if (commands[cmd]) commands[cmd]();
    else printOutput(`<span class="muted">Unknown command: ${cmd}</span>`);
    cmdInput.value = "";
  });

  // Chips
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      cmdInput.value = chip.dataset.cmd;
      form.dispatchEvent(new Event("submit"));
    });
  });

  // Print helper
  function printOutput(html) {
    output.innerHTML += `<div>${html}</div>`;
    output.scrollTop = output.scrollHeight;
  }

  // Panel visibility
  function showPanel(id) {
    panels.forEach(p => p.hidden = true);
    const panel = document.getElementById(id);
    if (panel) {
      panel.hidden = false;
      panel.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Side Menu
  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
  closeMenu.addEventListener("click", closeSideMenu);
  overlay.addEventListener("click", closeSideMenu);
  function closeSideMenu() {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Exit / shutdown cinematic
  function exitSequence() {
    printOutput("<span class='muted'>System shutdown initiated...</span>");
    setTimeout(() => {
      shutdownScreen.classList.add("visible");
      let count = 5;
      const countdown = setInterval(() => {
        shutdownScreen.textContent = count;
        count--;
        if (count < 0) {
          clearInterval(countdown);
          shutdownScreen.textContent = "Goodbye.";
          setTimeout(() => {
            shutdownScreen.style.opacity = 0;
          }, 1000);
        }
      }, 1000);
    }, 1000);
  }
});
