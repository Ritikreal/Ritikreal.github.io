
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const cmdInput = document.getElementById("cmdInput");
  const form = document.getElementById("promptForm");
  const contentPanels = document.querySelectorAll(".panel");
  const terminal = document.getElementById("terminal");

  // Utility — print with typing effect
  const typeLine = (text, speed = 20) => {
    return new Promise((resolve) => {
      const line = document.createElement("p");
      output.appendChild(line);
      let i = 0;
      const interval = setInterval(() => {
        line.textContent = text.slice(0, i++);
        terminal.scrollTop = terminal.scrollHeight;
        if (i > text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  const printLine = (text = "") => {
    const p = document.createElement("p");
    p.textContent = text;
    output.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
  };

  // Startup animation
  async function bootSequence() {
    output.innerHTML = "";
    await typeLine("Initializing terminal environment...");
    await typeLine("Loading modules...");
    await typeLine("Establishing neural link with user session...");
    await typeLine(" ");
    await typeLine("█▀█ █ ▀█▀ █ █ █ █▄ █ █");
    await typeLine("█▀▀ █  █  █▀█ █ █ ▀█ █");
    await typeLine(" ");
    await typeLine("Welcome, Rithwik. Type 'help' for available commands.");
    printLine("─────────────────────────────────────");
  }

  // Command definitions
  const commands = {
    help: () => {
      printLine("Available commands:");
      printLine("  about      — About me");
      printLine("  projects   — My projects");
      printLine("  resume     — Education & experience");
      printLine("  tools      — Tools I use");
      printLine("  contact    — Reach me");
      printLine("  clear      — Clear terminal");
      printLine("  exit       — Shutdown sequence");
    },

    about: () => showPanel("about"),
    projects: () => showPanel("projects"),
    resume: () => showPanel("resume"),
    tools: () => showPanel("tools"),
    contact: () => showPanel("contact"),

    clear: () => (output.innerHTML = ""),

    exit: async () => {
      await typeLine("Initiating system shutdown...");
      await typeLine("Saving session logs...");
      await typeLine("Powering down interface in 5...");
      await countdownExit();
    },
  };

  // Panel control
  function showPanel(name) {
    contentPanels.forEach((p) => (p.hidden = p.dataset.panel !== name));
    printLine(`Opening ${name}...`);
  }

  // Handle command submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cmd = cmdInput.value.trim().toLowerCase();
    if (!cmd) return;
    printLine(`➜ ${cmd}`);
    cmdInput.value = "";

    if (commands[cmd]) {
      commands[cmd]();
    } else {
      printLine(`Command not found: ${cmd}`);
    }
  });

  // Exit animation
  async function countdownExit() {
    const overlay = document.createElement("div");
    overlay.id = "exitScreen";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.background = "black";
    overlay.style.color = "#00ff9f";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "3000";
    overlay.style.fontFamily = "ui-monospace";
    overlay.style.fontSize = "32px";
    document.body.appendChild(overlay);

    for (let i = 5; i > 0; i--) {
      overlay.textContent = `Shutting down in ${i}...`;
      await new Promise((r) => setTimeout(r, 1000));
    }

    overlay.textContent = "Power off complete.";
    await new Promise((r) => setTimeout(r, 800));

    // Fade to black
    overlay.style.transition = "background 1s ease-in-out";
    overlay.style.background = "black";
    overlay.textContent = "";
  }

  // Start system
  bootSequence();
});
