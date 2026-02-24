document.addEventListener("DOMContentLoaded", () => {

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('cmd') === 'services') {
    handleCommand('services');
  }
  
  const commandOutput = document.getElementById("command-output");
  let activeInput = null;

  const commands = {
    p: () => {
      window.open("https://p.nir.rip", "_blank");
      return "Opening <a href='https://p.nir.rip' class='cmd-link' target='_blank'>p.nir.rip</a>...";
    },
    status: () => {
      window.open("https://status.nir.rip", "_blank");
      return "Checking <a href='https://status.nir.rip' class='cmd-link' target='_blank'>system status</a>...";
    },
    lab: () => {
      window.open("https://lab.nir.rip/", "_blank");
      return "Accessing <a href='https://lab.nir.rip/' class='cmd-link' target='_blank'>Lab & Research</a>...";
    },

    about:
      () => `I enjoy computers, astronomy, dabble in math/physics. I tend to learn by doing, and share what I learn.
matrix: <a href="https://matrix.to/#/@nir:matrix.nir.rip" class="cmd-link">@nir:matrix.nir.rip</a> | email: <a href="mailto:ly@nir.rip" class="cmd-link">ly@nir.rip</a> | github: <a href="https://github.com/nir659" class="cmd-link">@nir659</a>`,

    ls: () => `Type or click a command to navigate:
<a href="https://p.nir.rip" class="cmd-link" target="_blank">p</a>        - Portfolio
<a href="https://nir.rip/services" class="cmd-link">services</a> - Services I run
<a href="https://lab.nir.rip" class="cmd-link" target="_blank">lab</a>      - Docs and research
<a href="https://status.nir.rip" class="cmd-link" target="_blank">status</a>   - Status page`,

    services: () => `nir.rip/
├── <a href="https://nir.rip" class="cmd-link">nir.rip</a>           # Personal lab and index
├── <a href="https://lab.nir.rip" class="cmd-link" target="_blank">lab.nir.rip</a>       # Writeups, notes, and research
├── <a href="https://status.nir.rip" class="cmd-link" target="_blank">status.nir.rip</a>    # Public uptime for exposed services
├── <a href="https://matrix.nir.rip" class="cmd-link" target="_blank">matrix.nir.rip</a>    # Self-hosted messaging
└── <a href="https://mail.nir.rip" class="cmd-link" target="_blank">mail.nir.rip</a>      # Self-hosted email (SMTP/IMAP)`,

    secret: () =>
      "V2hhdCBhcmUgeW91IGRvaW5nIGhlcmUhIFUybHVZMlVnZVc5MUozSmxJSE52SUhCbGNuTnBjM1JsYm5RZ2ZpQm9kSFJ3Y3pvdkwzQmhjM1JsWW1sdUxtTnZiUzl5WVhjdldHZFZSR2hqUzFBPQ==",
  };
  function createInputLine() {
    if (activeInput) {
      const promptSpan = activeInput.previousElementSibling;
      if (promptSpan && promptSpan.parentElement) {
        const staticPrompt = document.createElement("div");
        staticPrompt.className = "terminal-line";
        staticPrompt.textContent = "guest@nir:~$ ";
        promptSpan.parentElement.parentNode.replaceChild(
          staticPrompt,
          promptSpan.parentElement,
        );
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
