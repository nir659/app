document.addEventListener("DOMContentLoaded", () => {
  const commandOutput = document.getElementById("command-output");
  let activeInput = null;

  const commands = {
    pgp: () => {
      window.open("/GAhbMNZYJv.txt", "_blank");
    },
    status: () => {
      window.open("https://status.nir.rip", "_blank");
    },
    about: () => `I'm like a computer, but mostly for useless information.
This is a personal lab for things I run and occasionally document. 
I care about computers, astronomy, and music.
I like understanding systems by breaking them, then rebuilding them properly.
Nothing here is a product, roadmap, or promise. If you want something, ask.`,
    contact: () => `matrix: @nir:matrix.nir.rip | email: nir@nir.rip | discord: n.ir | github: @nir659`,
    lab: () => {
      window.open("https://lab.nir.rip/", "_blank");
    },
    ls: () => `Type a command to get started:
contact  - Contact me
services - Services I run
lab      - Docs and research
pgp      - PGP public key
status   - Status page
secwet   - ...?`,
services: () => `=================== Public Services ===================
nir.rip     - Personal lab and index
lab.nir.rip - Writeups, notes, and experiments
status      - Public uptime for exposed services
matrix      - Self-hosted messaging
mail        - Self-hosted email (SMTP/IMAP)
play        - Personal Minecraft server
======================= Homelab =======================
Networking & Edge       Compute & Storage
- OpenWRT               - Proxmox / PBS
- Pi-hole               - TrueNAS
- Wireguard
Data & Services         Observability
- PostgreSQL            - Prometheus
- Vaultwarden           - Grafana
- Jellyfin               - Loki
- Arr stack
`,
    secwet: () =>
      "V2hhdCBhcmUgeW91IGRvaW5nIGhlcmUhIFUybHVZMlVnZVc5MUozSmxJSE52SUhCbGNuTnBjM1JsYm5RZ2ZpQm9kSFJ3Y3pvdkwzQmhjM1JsWW1sdUxtTnZiUzl5WVhjdldHZFZSR2hqUzFBPQ==",
  };

  function createInputLine() {
    if (activeInput) {
      const promptSpan = activeInput.previousElementSibling;
      if (promptSpan && promptSpan.parentElement) {
        const staticPrompt = document.createElement("div");
        staticPrompt.className = "terminal-line";
        staticPrompt.textContent = "guest@nir:~$ ";
        promptSpan.parentElement.parentNode.replaceChild(staticPrompt, promptSpan.parentElement);
      }
    }

    const newInputLine = document.createElement("div");
    newInputLine.className = "terminal-line";
    newInputLine.style.display = "flex";

    const promptSpan = document.createElement("span");
    promptSpan.className = "terminal-prompt";
    promptSpan.textContent = "guest@nir:~$ ";

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.id = "command-input";
    inputElement.maxLength = 20;

    inputElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const command = inputElement.value.trim().toLowerCase();
        inputElement.value = "";
        handleCommand(command);
      }
    });

    newInputLine.appendChild(promptSpan);
    newInputLine.appendChild(inputElement);
    commandOutput.appendChild(newInputLine);

    activeInput = inputElement;
    inputElement.focus();

    commandOutput.scrollTop = commandOutput.scrollHeight;
  }

  function handleCommand(rawCommand) {
    if (activeInput) {
      const promptSpan = activeInput.previousElementSibling;
      if (promptSpan) {
        promptSpan.nextSibling.remove();
        promptSpan.textContent = `guest@nir:~$ ${rawCommand}`;
      }
    } else {
      const commandLine = document.createElement("div");
      commandLine.className = "terminal-line";
      commandLine.textContent = `guest@nir:~$ ${rawCommand}`;
      commandOutput.appendChild(commandLine);
    }

    const sanitizedCommand = rawCommand.replace(/[^a-z0-9]/gi, "");
    const result = commands[sanitizedCommand]
      ? commands[sanitizedCommand]()
      : "Command not found. Try 'ls' for available commands.";

    if (result != null) {
      const output = document.createElement("div");
      output.className = "terminal-line";
      output.innerHTML = result.replace(/\n/g, "<br>");
      commandOutput.appendChild(output);
    }
    createInputLine();

    commandOutput.scrollTop = commandOutput.scrollHeight;
  }

  createInputLine();
  handleCommand("about");
  handleCommand("ls");

  document.querySelector(".terminal").addEventListener("click", (e) => {
    if (activeInput && e.target !== activeInput) {
      activeInput.focus();
    }
  });
});
