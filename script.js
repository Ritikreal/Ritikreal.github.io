window.addEventListener("DOMContentLoaded", () => {
  const outputEl=document.getElementById("output"), cmdInput=document.getElementById("cmdInput"), promptForm=document.getElementById("promptForm");
  const randomJokeEl=document.getElementById("randomJoke");
  const engineeringFactEl=document.getElementById("engineeringFact");
  const engineeringFacts=[
    "ESP32 boards combine Wi-Fi and Bluetooth in one microcontroller platform.",
    "I²C uses two signal lines: SDA for data and SCL for the clock.",
    "SPI commonly uses separate clock, data-in, data-out and chip-select signals.",
    "A pull-up resistor lets an open-drain or open-collector signal return to logic HIGH.",
    "A capacitor's voltage cannot change instantaneously in an ideal RC circuit.",
    "UART communication does not require a shared clock line.",
    "LoRa is designed for long-range, low-power wireless communication.",
    "MQTT uses a publish/subscribe model instead of direct device-to-device messaging.",
    "A watchdog timer can reset a microcontroller when software stops responding.",
    "PWM can control average power by changing the duty cycle of a digital signal.",
    "ADC resolution determines how many discrete levels an analog input can represent.",
    "GPIO pins can often be configured as digital inputs or outputs.",
    "Debouncing prevents a mechanical button from being interpreted as many presses.",
    "STM32 microcontrollers are built around ARM Cortex-M cores across many families.",
    "A voltage divider converts an input voltage into a predictable fraction of it.",
    "Ohm's law relates voltage, current and resistance: V = I × R.",
    "Ground provides the reference point for voltage measurements in a circuit.",
    "LoRaWAN adds a network layer around LoRa radio links for low-power IoT devices.",
    "Git tracks changes to files so project history can be inspected and recovered.",
    "Linux permissions commonly distinguish the file owner, group and other users.",
    "A process is a running instance of a program with its own execution context.",
    "DNS translates human-readable domain names into IP addresses.",
    "TCP provides ordered, reliable delivery of data between endpoints.",
    "UDP trades delivery guarantees for lower protocol overhead and simpler communication.",
    "A PCB ground plane can provide a low-impedance return path and help with signal integrity.",
    "KiCad can be used for schematic capture and PCB layout in the same project.",
    "PlatformIO can manage embedded project environments, libraries and builds.",
    "A thermistor changes resistance with temperature and can be used for temperature sensing.",
    "A Hall-effect sensor can detect magnetic fields without mechanical contact.",
    "A relay provides electrically controlled switching between circuits."
  ];
  const linuxJokes=[
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. and then the package manager asked for my trust.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. which is how a quick fix became a weekend project.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. because apparently \"stable\" is a relative term.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. while the terminal watched silently.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. and yes, I checked the wiki.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. then I opened another terminal to investigate.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. at least the error message was honest.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. so naturally I changed three unrelated settings.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. and somehow it was a permissions issue.",
  "Linux rule #1: if it works, don't update it. Linux rule #2: update it anyway. which was definitely part of the plan.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" and then the package manager asked for my trust.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" which is how a quick fix became a weekend project.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" because apparently \"stable\" is a relative term.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" while the terminal watched silently.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" and yes, I checked the wiki.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" then I opened another terminal to investigate.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" at least the error message was honest.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" so naturally I changed three unrelated settings.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" and somehow it was a permissions issue.",
  "Arch users don't say \"I don't know\". They say \"let me check the wiki.\" which was definitely part of the plan.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" and then the package manager asked for my trust.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" which is how a quick fix became a weekend project.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" because apparently \"stable\" is a relative term.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" while the terminal watched silently.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" and yes, I checked the wiki.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" then I opened another terminal to investigate.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" at least the error message was honest.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" so naturally I changed three unrelated settings.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" and somehow it was a permissions issue.",
  "sudo is just a polite way of saying \"please let me break this with permission.\" which was definitely part of the plan.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" and then the package manager asked for my trust.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" which is how a quick fix became a weekend project.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" because apparently \"stable\" is a relative term.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" while the terminal watched silently.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" and yes, I checked the wiki.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" then I opened another terminal to investigate.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" at least the error message was honest.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" so naturally I changed three unrelated settings.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" and somehow it was a permissions issue.",
  "Pacman: \"Proceed with installation?\" Me: \"I have absolutely no idea what I'm doing.\" which was definitely part of the plan.",
  "My Linux setup is stable. I am the unstable component. and then the package manager asked for my trust.",
  "My Linux setup is stable. I am the unstable component. which is how a quick fix became a weekend project.",
  "My Linux setup is stable. I am the unstable component. because apparently \"stable\" is a relative term.",
  "My Linux setup is stable. I am the unstable component. while the terminal watched silently.",
  "My Linux setup is stable. I am the unstable component. and yes, I checked the wiki.",
  "My Linux setup is stable. I am the unstable component. then I opened another terminal to investigate.",
  "My Linux setup is stable. I am the unstable component. at least the error message was honest.",
  "My Linux setup is stable. I am the unstable component. so naturally I changed three unrelated settings.",
  "My Linux setup is stable. I am the unstable component. and somehow it was a permissions issue.",
  "My Linux setup is stable. I am the unstable component. which was definitely part of the plan.",
  "The terminal said command not found, so I found the command. The command found my free time. and then the package manager asked for my trust.",
  "The terminal said command not found, so I found the command. The command found my free time. which is how a quick fix became a weekend project.",
  "The terminal said command not found, so I found the command. The command found my free time. because apparently \"stable\" is a relative term.",
  "The terminal said command not found, so I found the command. The command found my free time. while the terminal watched silently.",
  "The terminal said command not found, so I found the command. The command found my free time. and yes, I checked the wiki.",
  "The terminal said command not found, so I found the command. The command found my free time. then I opened another terminal to investigate.",
  "The terminal said command not found, so I found the command. The command found my free time. at least the error message was honest.",
  "The terminal said command not found, so I found the command. The command found my free time. so naturally I changed three unrelated settings.",
  "The terminal said command not found, so I found the command. The command found my free time. and somehow it was a permissions issue.",
  "The terminal said command not found, so I found the command. The command found my free time. which was definitely part of the plan.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. and then the package manager asked for my trust.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. which is how a quick fix became a weekend project.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. because apparently \"stable\" is a relative term.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. while the terminal watched silently.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. and yes, I checked the wiki.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. then I opened another terminal to investigate.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. at least the error message was honest.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. so naturally I changed three unrelated settings.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. and somehow it was a permissions issue.",
  "Linux troubleshooting: 10% fixing, 90% reading an error message like it's ancient scripture. which was definitely part of the plan.",
  "I installed one package and accidentally became the maintainer of my own problems. and then the package manager asked for my trust.",
  "I installed one package and accidentally became the maintainer of my own problems. which is how a quick fix became a weekend project.",
  "I installed one package and accidentally became the maintainer of my own problems. because apparently \"stable\" is a relative term.",
  "I installed one package and accidentally became the maintainer of my own problems. while the terminal watched silently.",
  "I installed one package and accidentally became the maintainer of my own problems. and yes, I checked the wiki.",
  "I installed one package and accidentally became the maintainer of my own problems. then I opened another terminal to investigate.",
  "I installed one package and accidentally became the maintainer of my own problems. at least the error message was honest.",
  "I installed one package and accidentally became the maintainer of my own problems. so naturally I changed three unrelated settings.",
  "I installed one package and accidentally became the maintainer of my own problems. and somehow it was a permissions issue.",
  "I installed one package and accidentally became the maintainer of my own problems. which was definitely part of the plan.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. and then the package manager asked for my trust.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. which is how a quick fix became a weekend project.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. because apparently \"stable\" is a relative term.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. while the terminal watched silently.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. and yes, I checked the wiki.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. then I opened another terminal to investigate.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. at least the error message was honest.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. so naturally I changed three unrelated settings.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. and somehow it was a permissions issue.",
  "Arch Linux is a rolling release. So is my list of things I need to fix. which was definitely part of the plan.",
  "Nothing builds character like a broken bootloader before class. and then the package manager asked for my trust.",
  "Nothing builds character like a broken bootloader before class. which is how a quick fix became a weekend project.",
  "Nothing builds character like a broken bootloader before class. because apparently \"stable\" is a relative term.",
  "Nothing builds character like a broken bootloader before class. while the terminal watched silently.",
  "Nothing builds character like a broken bootloader before class. and yes, I checked the wiki.",
  "Nothing builds character like a broken bootloader before class. then I opened another terminal to investigate.",
  "Nothing builds character like a broken bootloader before class. at least the error message was honest.",
  "Nothing builds character like a broken bootloader before class. so naturally I changed three unrelated settings.",
  "Nothing builds character like a broken bootloader before class. and somehow it was a permissions issue.",
  "Nothing builds character like a broken bootloader before class. which was definitely part of the plan.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. and then the package manager asked for my trust.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. which is how a quick fix became a weekend project.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. because apparently \"stable\" is a relative term.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. while the terminal watched silently.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. and yes, I checked the wiki.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. then I opened another terminal to investigate.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. at least the error message was honest.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. so naturally I changed three unrelated settings.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. and somehow it was a permissions issue.",
  "Linux doesn't waste RAM. It simply gives every byte something to think about. which was definitely part of the plan.",
  "My dotfiles have more versions than my actual projects. and then the package manager asked for my trust.",
  "My dotfiles have more versions than my actual projects. which is how a quick fix became a weekend project.",
  "My dotfiles have more versions than my actual projects. because apparently \"stable\" is a relative term.",
  "My dotfiles have more versions than my actual projects. while the terminal watched silently.",
  "My dotfiles have more versions than my actual projects. and yes, I checked the wiki.",
  "My dotfiles have more versions than my actual projects. then I opened another terminal to investigate.",
  "My dotfiles have more versions than my actual projects. at least the error message was honest.",
  "My dotfiles have more versions than my actual projects. so naturally I changed three unrelated settings.",
  "My dotfiles have more versions than my actual projects. and somehow it was a permissions issue.",
  "My dotfiles have more versions than my actual projects. which was definitely part of the plan.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. and then the package manager asked for my trust.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. which is how a quick fix became a weekend project.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. because apparently \"stable\" is a relative term.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. while the terminal watched silently.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. and yes, I checked the wiki.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. then I opened another terminal to investigate.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. at least the error message was honest.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. so naturally I changed three unrelated settings.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. and somehow it was a permissions issue.",
  "I came for Linux customization and stayed because I forgot how the old setup worked. which was definitely part of the plan.",
  "Wayland: smooth graphics, mysterious adventures. and then the package manager asked for my trust.",
  "Wayland: smooth graphics, mysterious adventures. which is how a quick fix became a weekend project.",
  "Wayland: smooth graphics, mysterious adventures. because apparently \"stable\" is a relative term.",
  "Wayland: smooth graphics, mysterious adventures. while the terminal watched silently.",
  "Wayland: smooth graphics, mysterious adventures. and yes, I checked the wiki.",
  "Wayland: smooth graphics, mysterious adventures. then I opened another terminal to investigate.",
  "Wayland: smooth graphics, mysterious adventures. at least the error message was honest.",
  "Wayland: smooth graphics, mysterious adventures. so naturally I changed three unrelated settings.",
  "Wayland: smooth graphics, mysterious adventures. and somehow it was a permissions issue.",
  "Wayland: smooth graphics, mysterious adventures. which was definitely part of the plan.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" and then the package manager asked for my trust.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" which is how a quick fix became a weekend project.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" because apparently \"stable\" is a relative term.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" while the terminal watched silently.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" and yes, I checked the wiki.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" then I opened another terminal to investigate.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" at least the error message was honest.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" so naturally I changed three unrelated settings.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" and somehow it was a permissions issue.",
  "X11: \"I have been here forever.\" Wayland: \"I know.\" which was definitely part of the plan.",
  "Fish shell makes commands look fancy. Bash makes me remember them. and then the package manager asked for my trust.",
  "Fish shell makes commands look fancy. Bash makes me remember them. which is how a quick fix became a weekend project.",
  "Fish shell makes commands look fancy. Bash makes me remember them. because apparently \"stable\" is a relative term.",
  "Fish shell makes commands look fancy. Bash makes me remember them. while the terminal watched silently.",
  "Fish shell makes commands look fancy. Bash makes me remember them. and yes, I checked the wiki.",
  "Fish shell makes commands look fancy. Bash makes me remember them. then I opened another terminal to investigate.",
  "Fish shell makes commands look fancy. Bash makes me remember them. at least the error message was honest.",
  "Fish shell makes commands look fancy. Bash makes me remember them. so naturally I changed three unrelated settings.",
  "Fish shell makes commands look fancy. Bash makes me remember them. and somehow it was a permissions issue.",
  "Fish shell makes commands look fancy. Bash makes me remember them. which was definitely part of the plan.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. and then the package manager asked for my trust.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. which is how a quick fix became a weekend project.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. because apparently \"stable\" is a relative term.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. while the terminal watched silently.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. and yes, I checked the wiki.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. then I opened another terminal to investigate.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. at least the error message was honest.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. so naturally I changed three unrelated settings.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. and somehow it was a permissions issue.",
  "One missing dependency can turn a five-minute task into an archaeological expedition. which was definitely part of the plan.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. and then the package manager asked for my trust.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. which is how a quick fix became a weekend project.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. because apparently \"stable\" is a relative term.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. while the terminal watched silently.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. and yes, I checked the wiki.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. then I opened another terminal to investigate.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. at least the error message was honest.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. so naturally I changed three unrelated settings.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. and somehow it was a permissions issue.",
  "Git and Linux together: because apparently one source of confusion wasn't enough. which was definitely part of the plan.",
  "The best Linux command is the one that works on the first try. Rare drop. and then the package manager asked for my trust.",
  "The best Linux command is the one that works on the first try. Rare drop. which is how a quick fix became a weekend project.",
  "The best Linux command is the one that works on the first try. Rare drop. because apparently \"stable\" is a relative term.",
  "The best Linux command is the one that works on the first try. Rare drop. while the terminal watched silently.",
  "The best Linux command is the one that works on the first try. Rare drop. and yes, I checked the wiki.",
  "The best Linux command is the one that works on the first try. Rare drop. then I opened another terminal to investigate.",
  "The best Linux command is the one that works on the first try. Rare drop. at least the error message was honest.",
  "The best Linux command is the one that works on the first try. Rare drop. so naturally I changed three unrelated settings.",
  "The best Linux command is the one that works on the first try. Rare drop. and somehow it was a permissions issue.",
  "The best Linux command is the one that works on the first try. Rare drop. which was definitely part of the plan.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. and then the package manager asked for my trust.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. which is how a quick fix became a weekend project.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. because apparently \"stable\" is a relative term.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. while the terminal watched silently.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. and yes, I checked the wiki.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. then I opened another terminal to investigate.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. at least the error message was honest.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. so naturally I changed three unrelated settings.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. and somehow it was a permissions issue.",
  "Terminal productivity is mostly opening the terminal and staring at it confidently. which was definitely part of the plan."
];
  const minecraftJokes=[
  "Minecraft inventory management is just unpaid warehouse logistics. and somehow I still forgot where I put the crafting table.",
  "Minecraft inventory management is just unpaid warehouse logistics. so naturally I returned home with more dirt.",
  "Minecraft inventory management is just unpaid warehouse logistics. which is basically a normal Tuesday in survival.",
  "Minecraft inventory management is just unpaid warehouse logistics. and the creeper still got the last word.",
  "Minecraft inventory management is just unpaid warehouse logistics. so I called that a successful expedition.",
  "Minecraft inventory management is just unpaid warehouse logistics. and my storage chest remained a historical archive.",
  "Minecraft inventory management is just unpaid warehouse logistics. because apparently I needed another stack of cobblestone.",
  "Minecraft inventory management is just unpaid warehouse logistics. which was not in the tutorial.",
  "Minecraft inventory management is just unpaid warehouse logistics. and then it became a redstone project.",
  "Minecraft inventory management is just unpaid warehouse logistics. so I went back underground.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. and somehow I still forgot where I put the crafting table.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. so naturally I returned home with more dirt.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. which is basically a normal Tuesday in survival.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. and the creeper still got the last word.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. so I called that a successful expedition.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. and my storage chest remained a historical archive.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. because apparently I needed another stack of cobblestone.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. which was not in the tutorial.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. and then it became a redstone project.",
  "I went mining for diamonds and came back with 47 stacks of things I didn't need. so I went back underground.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" and somehow I still forgot where I put the crafting table.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" so naturally I returned home with more dirt.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" which is basically a normal Tuesday in survival.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" and the creeper still got the last word.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" so I called that a successful expedition.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" and my storage chest remained a historical archive.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" because apparently I needed another stack of cobblestone.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" which was not in the tutorial.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" and then it became a redstone project.",
  "Creeper: \"ssssss.\" Me: \"please respect the quiet hours.\" so I went back underground.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. and somehow I still forgot where I put the crafting table.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. so naturally I returned home with more dirt.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. which is basically a normal Tuesday in survival.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. and the creeper still got the last word.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. so I called that a successful expedition.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. and my storage chest remained a historical archive.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. because apparently I needed another stack of cobblestone.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. which was not in the tutorial.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. and then it became a redstone project.",
  "Minecraft teaches patience. Especially when the one block you need is at the bottom of a ravine. so I went back underground.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. and somehow I still forgot where I put the crafting table.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. so naturally I returned home with more dirt.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. which is basically a normal Tuesday in survival.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. and the creeper still got the last word.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. so I called that a successful expedition.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. and my storage chest remained a historical archive.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. because apparently I needed another stack of cobblestone.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. which was not in the tutorial.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. and then it became a redstone project.",
  "I built a house in Minecraft and immediately decided it needed a basement, then a secret basement. so I went back underground.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. and somehow I still forgot where I put the crafting table.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. so naturally I returned home with more dirt.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. which is basically a normal Tuesday in survival.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. and the creeper still got the last word.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. so I called that a successful expedition.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. and my storage chest remained a historical archive.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. because apparently I needed another stack of cobblestone.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. which was not in the tutorial.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. and then it became a redstone project.",
  "Every Minecraft player has a chest called \"misc\" containing the entire history of civilization. so I went back underground.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. and somehow I still forgot where I put the crafting table.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. so naturally I returned home with more dirt.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. which is basically a normal Tuesday in survival.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. and the creeper still got the last word.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. so I called that a successful expedition.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. and my storage chest remained a historical archive.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. because apparently I needed another stack of cobblestone.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. which was not in the tutorial.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. and then it became a redstone project.",
  "Finding diamonds: exciting. Finding the crafting table you placed five minutes ago: legendary. so I went back underground.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. and somehow I still forgot where I put the crafting table.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. so naturally I returned home with more dirt.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. which is basically a normal Tuesday in survival.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. and the creeper still got the last word.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. so I called that a successful expedition.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. and my storage chest remained a historical archive.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. because apparently I needed another stack of cobblestone.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. which was not in the tutorial.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. and then it became a redstone project.",
  "I don't get lost in Minecraft. I create unscheduled exploration routes. so I went back underground.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. and somehow I still forgot where I put the crafting table.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. so naturally I returned home with more dirt.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. which is basically a normal Tuesday in survival.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. and the creeper still got the last word.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. so I called that a successful expedition.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. and my storage chest remained a historical archive.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. because apparently I needed another stack of cobblestone.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. which was not in the tutorial.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. and then it became a redstone project.",
  "Villager trading is basically negotiating with someone who only speaks in grunts. so I went back underground.",
  "Skeleton aim is better than mine and I have a mouse. and somehow I still forgot where I put the crafting table.",
  "Skeleton aim is better than mine and I have a mouse. so naturally I returned home with more dirt.",
  "Skeleton aim is better than mine and I have a mouse. which is basically a normal Tuesday in survival.",
  "Skeleton aim is better than mine and I have a mouse. and the creeper still got the last word.",
  "Skeleton aim is better than mine and I have a mouse. so I called that a successful expedition.",
  "Skeleton aim is better than mine and I have a mouse. and my storage chest remained a historical archive.",
  "Skeleton aim is better than mine and I have a mouse. because apparently I needed another stack of cobblestone.",
  "Skeleton aim is better than mine and I have a mouse. which was not in the tutorial.",
  "Skeleton aim is better than mine and I have a mouse. and then it became a redstone project.",
  "Skeleton aim is better than mine and I have a mouse. so I went back underground.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. and somehow I still forgot where I put the crafting table.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. so naturally I returned home with more dirt.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. which is basically a normal Tuesday in survival.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. and the creeper still got the last word.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. so I called that a successful expedition.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. and my storage chest remained a historical archive.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. because apparently I needed another stack of cobblestone.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. which was not in the tutorial.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. and then it became a redstone project.",
  "The creeper wasn't behind me. I was behind the creeper. For about half a second. so I went back underground.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. and somehow I still forgot where I put the crafting table.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. so naturally I returned home with more dirt.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. which is basically a normal Tuesday in survival.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. and the creeper still got the last word.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. so I called that a successful expedition.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. and my storage chest remained a historical archive.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. because apparently I needed another stack of cobblestone.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. which was not in the tutorial.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. and then it became a redstone project.",
  "Minecraft nights are a reminder that torches are cheaper than therapy. so I went back underground.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. and somehow I still forgot where I put the crafting table.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. so naturally I returned home with more dirt.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. which is basically a normal Tuesday in survival.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. and the creeper still got the last word.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. so I called that a successful expedition.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. and my storage chest remained a historical archive.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. because apparently I needed another stack of cobblestone.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. which was not in the tutorial.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. and then it became a redstone project.",
  "Redstone is electricity, except the electrician is a sleep-deprived player. so I went back underground.",
  "I mined straight down and learned a valuable lesson about geological planning. and somehow I still forgot where I put the crafting table.",
  "I mined straight down and learned a valuable lesson about geological planning. so naturally I returned home with more dirt.",
  "I mined straight down and learned a valuable lesson about geological planning. which is basically a normal Tuesday in survival.",
  "I mined straight down and learned a valuable lesson about geological planning. and the creeper still got the last word.",
  "I mined straight down and learned a valuable lesson about geological planning. so I called that a successful expedition.",
  "I mined straight down and learned a valuable lesson about geological planning. and my storage chest remained a historical archive.",
  "I mined straight down and learned a valuable lesson about geological planning. because apparently I needed another stack of cobblestone.",
  "I mined straight down and learned a valuable lesson about geological planning. which was not in the tutorial.",
  "I mined straight down and learned a valuable lesson about geological planning. and then it became a redstone project.",
  "I mined straight down and learned a valuable lesson about geological planning. so I went back underground.",
  "My Minecraft base has everything except an organized storage system. and somehow I still forgot where I put the crafting table.",
  "My Minecraft base has everything except an organized storage system. so naturally I returned home with more dirt.",
  "My Minecraft base has everything except an organized storage system. which is basically a normal Tuesday in survival.",
  "My Minecraft base has everything except an organized storage system. and the creeper still got the last word.",
  "My Minecraft base has everything except an organized storage system. so I called that a successful expedition.",
  "My Minecraft base has everything except an organized storage system. and my storage chest remained a historical archive.",
  "My Minecraft base has everything except an organized storage system. because apparently I needed another stack of cobblestone.",
  "My Minecraft base has everything except an organized storage system. which was not in the tutorial.",
  "My Minecraft base has everything except an organized storage system. and then it became a redstone project.",
  "My Minecraft base has everything except an organized storage system. so I went back underground.",
  "Nether travel: the fastest way to discover how much you value your original portal. and somehow I still forgot where I put the crafting table.",
  "Nether travel: the fastest way to discover how much you value your original portal. so naturally I returned home with more dirt.",
  "Nether travel: the fastest way to discover how much you value your original portal. which is basically a normal Tuesday in survival.",
  "Nether travel: the fastest way to discover how much you value your original portal. and the creeper still got the last word.",
  "Nether travel: the fastest way to discover how much you value your original portal. so I called that a successful expedition.",
  "Nether travel: the fastest way to discover how much you value your original portal. and my storage chest remained a historical archive.",
  "Nether travel: the fastest way to discover how much you value your original portal. because apparently I needed another stack of cobblestone.",
  "Nether travel: the fastest way to discover how much you value your original portal. which was not in the tutorial.",
  "Nether travel: the fastest way to discover how much you value your original portal. and then it became a redstone project.",
  "Nether travel: the fastest way to discover how much you value your original portal. so I went back underground.",
  "I went into a cave for coal and returned three hours later with a new personality. and somehow I still forgot where I put the crafting table.",
  "I went into a cave for coal and returned three hours later with a new personality. so naturally I returned home with more dirt.",
  "I went into a cave for coal and returned three hours later with a new personality. which is basically a normal Tuesday in survival.",
  "I went into a cave for coal and returned three hours later with a new personality. and the creeper still got the last word.",
  "I went into a cave for coal and returned three hours later with a new personality. so I called that a successful expedition.",
  "I went into a cave for coal and returned three hours later with a new personality. and my storage chest remained a historical archive.",
  "I went into a cave for coal and returned three hours later with a new personality. because apparently I needed another stack of cobblestone.",
  "I went into a cave for coal and returned three hours later with a new personality. which was not in the tutorial.",
  "I went into a cave for coal and returned three hours later with a new personality. and then it became a redstone project.",
  "I went into a cave for coal and returned three hours later with a new personality. so I went back underground.",
  "Beds in the Nether are a very aggressive alarm clock. and somehow I still forgot where I put the crafting table.",
  "Beds in the Nether are a very aggressive alarm clock. so naturally I returned home with more dirt.",
  "Beds in the Nether are a very aggressive alarm clock. which is basically a normal Tuesday in survival.",
  "Beds in the Nether are a very aggressive alarm clock. and the creeper still got the last word.",
  "Beds in the Nether are a very aggressive alarm clock. so I called that a successful expedition.",
  "Beds in the Nether are a very aggressive alarm clock. and my storage chest remained a historical archive.",
  "Beds in the Nether are a very aggressive alarm clock. because apparently I needed another stack of cobblestone.",
  "Beds in the Nether are a very aggressive alarm clock. which was not in the tutorial.",
  "Beds in the Nether are a very aggressive alarm clock. and then it became a redstone project.",
  "Beds in the Nether are a very aggressive alarm clock. so I went back underground.",
  "Endermen don't steal blocks. They borrow them without returning them. and somehow I still forgot where I put the crafting table.",
  "Endermen don't steal blocks. They borrow them without returning them. so naturally I returned home with more dirt.",
  "Endermen don't steal blocks. They borrow them without returning them. which is basically a normal Tuesday in survival.",
  "Endermen don't steal blocks. They borrow them without returning them. and the creeper still got the last word.",
  "Endermen don't steal blocks. They borrow them without returning them. so I called that a successful expedition.",
  "Endermen don't steal blocks. They borrow them without returning them. and my storage chest remained a historical archive.",
  "Endermen don't steal blocks. They borrow them without returning them. because apparently I needed another stack of cobblestone.",
  "Endermen don't steal blocks. They borrow them without returning them. which was not in the tutorial.",
  "Endermen don't steal blocks. They borrow them without returning them. and then it became a redstone project.",
  "Endermen don't steal blocks. They borrow them without returning them. so I went back underground.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. and somehow I still forgot where I put the crafting table.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. so naturally I returned home with more dirt.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. which is basically a normal Tuesday in survival.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. and the creeper still got the last word.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. so I called that a successful expedition.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. and my storage chest remained a historical archive.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. because apparently I needed another stack of cobblestone.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. which was not in the tutorial.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. and then it became a redstone project.",
  "Minecraft logic: punch a tree, build a computer. Fair enough. so I went back underground."
];
  if(engineeringFactEl){
    const factIndex=Math.floor(Math.random()*engineeringFacts.length);
    engineeringFactEl.textContent=engineeringFacts[factIndex];
  }

  const randomJokes=[...linuxJokes,...minecraftJokes];
  if(randomJokeEl){
    const previous=Number(sessionStorage.getItem("portfolioJokeIndex"));
    let index=Math.floor(Math.random()*randomJokes.length);
    if(randomJokes.length>1 && Number.isInteger(previous) && index===previous){
      index=(index+1)%randomJokes.length;
    }
    sessionStorage.setItem("portfolioJokeIndex",String(index));
    randomJokeEl.textContent=randomJokes[index];
  }


  const githubStatusEl=document.getElementById("githubStatus");
  const githubActivityEl=document.getElementById("githubActivity");
  const localTimeEl=document.getElementById("localTime");

  function updateLocalTime(){
    if(!localTimeEl)return;
    localTimeEl.textContent=new Intl.DateTimeFormat("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,timeZone:"Asia/Kolkata"}).format(new Date());
  }
  updateLocalTime();
  setInterval(updateLocalTime,1000);

  async function loadGitHubActivity(){
    if(!githubActivityEl)return;
    try{
      const res=await fetch("https://api.github.com/users/Ritikreal/events/public?per_page=6",{headers:{Accept:"application/vnd.github+json"}});
      if(!res.ok)throw new Error("GitHub unavailable");
      const events=await res.json();
      githubStatusEl.textContent="ONLINE";
      const useful=events.filter(e=>["PushEvent","CreateEvent","IssuesEvent","PullRequestEvent"].includes(e.type)).slice(0,4);
      if(!useful.length){
        githubActivityEl.innerHTML='<div class="activity-item"><span class="activity-dot"></span><span class="muted">No recent public activity found.</span></div>';
        return;
      }
      githubActivityEl.innerHTML="";
      useful.forEach(e=>{
        const row=document.createElement("div");
        row.className="activity-item";
        const repoName=e.repo?.name||"GitHub";
        let action="Activity";
        if(e.type==="PushEvent")action=(e.payload?.commits?.length||1)+" commit"+((e.payload?.commits?.length||1)>1?"s":"")+" pushed";
        if(e.type==="CreateEvent")action="Created "+(e.payload?.ref_type||"repository");
        if(e.type==="IssuesEvent")action=(e.payload?.action||"updated")+" issue";
        if(e.type==="PullRequestEvent")action=(e.payload?.action||"updated")+" pull request";
        const when=new Date(e.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short"});
        row.innerHTML='<span class="activity-dot"></span><strong>'+escapeHtml(repoName)+'</strong><span class="muted small">'+escapeHtml(action)+' · '+escapeHtml(when)+'</span>';
        githubActivityEl.appendChild(row);
      });
    }catch{
      if(githubStatusEl)githubStatusEl.textContent="UNAVAILABLE";
      githubActivityEl.innerHTML='<div class="activity-item"><span class="activity-dot"></span><span class="muted">GitHub activity could not be loaded right now.</span></div>';
    }
  }
  loadGitHubActivity();

  const panels=[...document.querySelectorAll(".panel")], hero=document.getElementById("panel-hero");
  const panelMap={about:"about",projects:"projects",resume:"resume",notes:"notes",tools:"tools",lab:"lab",contact:"contact",setup:"setup",buildlog:"buildlog",learning:"learning",personal:"personal",hero:null};
  const commands=["help","about","projects","project","resume","notes","note","tools","lab","contact","setup","buildlog","learning","personal","status","now","stack","timeline","hardware","neofetch","whoami","uptime","coffee","fortune","matrix","linux","minecraft","sudo","ls","shortcuts","milestones","clear","open"];
  const history=[]; let historyIndex=0;
  function escapeHtml(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function appendLine(t="",cls=""){const p=document.createElement("p");p.className=cls;p.textContent=t;outputEl.appendChild(p);outputEl.scrollTop=outputEl.scrollHeight;}
  async function typeLine(t,speed=8,cls=""){const p=document.createElement("p");p.className=cls;outputEl.appendChild(p);for(let i=0;i<=t.length;i++){p.textContent=t.slice(0,i);await new Promise(r=>setTimeout(r,speed));}outputEl.scrollTop=outputEl.scrollHeight;}
  function hideAll(){panels.forEach(p=>p.hidden=true);hero?.classList.remove("active");}
  function showPanel(id){
    hideAll();
    if(!id||id==="hero"){
      hero?.classList.add("active");
      if(hero && window.matchMedia("(prefers-reduced-motion: no-preference)").matches){
        hero.classList.remove("active-enter");
        requestAnimationFrame(()=>hero.classList.add("active-enter"));
      }
      return;
    }
    const panel=document.getElementById(id);
    panel?.removeAttribute("hidden");
    if(panel && window.matchMedia("(prefers-reduced-motion: no-preference)").matches){
      panel.classList.remove("active-enter");
      requestAnimationFrame(()=>panel.classList.add("active-enter"));
    }
    if(panel&&window.matchMedia("(max-width:900px)").matches){
      requestAnimationFrame(()=>panel.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"}));
    }
  }
  function renderLab(kind){
    const c=document.getElementById("lab-console"); if(!c)return;
    if(kind==="ohm"){c.innerHTML='<div class="lab-tool"><strong>OHM\'S LAW</strong><label>Voltage <input id="lv" type="number" value="5" step=".1"></label><label>Resistance <input id="lr" type="number" value="220"></label><button class="btn" id="lo">Calculate current</button><div id="lres" class="lab-result">I = 22.73 mA</div></div>';document.getElementById("lo").onclick=()=>{const v=+document.getElementById("lv").value,r=+document.getElementById("lr").value;document.getElementById("lres").textContent=r>0?"I = "+(v/r*1000).toFixed(2)+" mA":"R must be greater than 0";};}
    if(kind==="binary"){c.innerHTML='<div class="lab-tool"><strong>BINARY LAB</strong><label>Decimal <input id="ld" type="number" value="42"></label><div id="lres" class="lab-result">101010₂ · 0x2A</div></div>';document.getElementById("ld").oninput=e=>{const n=Math.trunc(+e.target.value);document.getElementById("lres").textContent=Number.isFinite(n)?n.toString(2)+"₂ · 0x"+n.toString(16).toUpperCase():"—";};}
    if(kind==="logic"){c.innerHTML='<div class="lab-tool"><strong>LOGIC GATES</strong><div class="logic-row"><button id="la">A: 0</button><button id="lb">B: 0</button></div><div id="lres" class="lab-result">AND 0 · OR 0 · XOR 0 · NAND 1</div></div>';let a=0,b=0;const u=()=>document.getElementById("lres").textContent="AND "+(a&b)+" · OR "+(a|b)+" · XOR "+(a^b)+" · NAND "+(1-(a&b));document.getElementById("la").onclick=e=>{a^=1;e.target.textContent="A: "+a;u();};document.getElementById("lb").onclick=e=>{b^=1;e.target.textContent="B: "+b;u();};}
    if(kind==="rc"){c.innerHTML='<div class="lab-tool"><strong>RC CHARGE</strong><div class="signal"><span id="signal-dot"></span></div><div class="muted small">A tiny visual approximation of capacitor charging.</div></div>';document.getElementById("signal-dot").animate([{transform:"translateX(0)"},{transform:"translateX(100%)"}],{duration:1600,iterations:Infinity,easing:"ease-in-out"});}
  }
  document.querySelectorAll(".lab-card").forEach(x=>x.onclick=()=>renderLab(x.dataset.lab));
  document.querySelectorAll("[data-cmd]").forEach(x=>x.addEventListener("click",()=>execute(x.dataset.cmd)));
  const responses={help:"Available commands:
  help · about · projects · resume · notes · tools · lab · contact
  setup · buildlog · learning · personal
  now · stack · timeline · hardware · neofetch
  whoami · uptime · coffee · fortune · matrix · linux · minecraft · sudo · ls
  shortcuts · milestones · clear · open <page>
  Tab autocomplete · ↑↓ command history · Ctrl+K focus"};
  async function execute(raw){
    raw=(raw||"").trim();if(!raw)return;
    const echo=document.createElement("p");echo.innerHTML='<span class="cmd inline">➜</span> <span class="mono">'+escapeHtml(raw)+"</span>";outputEl.appendChild(echo);
    const parts=raw.split(/\s+/);let cmd=parts[0].toLowerCase(),arg=parts.slice(1).join(" ").toLowerCase();
    const aliases={project:"projects",note:"notes"};cmd=aliases[cmd]||cmd;
    if(cmd==="clear"){outputEl.innerHTML="";return;}
    if(cmd==="open"){if(arg==="notes"||arg==="note"){sessionStorage.setItem("portfolioPageTransition","notes");document.body.classList.add("page-leaving");setTimeout(()=>{window.location.href="notes.html";},320);return;}if(panelMap[arg]!==undefined){showPanel(arg);await typeLine("Opening "+arg+" panel...");}else appendLine("Try: open projects · open lab · open contact","muted");return;}
    if(cmd==="lab"){showPanel("lab");await typeLine("Opening ECE Lab...");return;}
    if(cmd==="status"){
  showPanel("projects");
  await typeLine("BUILD STATUS","8","cmd");
  appendLine("HomeCore V2     ACTIVE BUILD · more to build","muted");
  appendLine("Vivian          ACTIVE BUILD · more to build","muted");
  appendLine("GYMPRO          ACTIVE BUILD · more to build","muted");
  appendLine("MediKiosk+      READY · open to changes","muted");
  appendLine("Soil Network    COMPLETED · ready","muted");
  appendLine("Neko.Buddy      ON HOLD · paused","muted");
  return;
}
if(cmd==="now"){showPanel("hero");await typeLine("Currently building: HomeCore V2 · Vivian · GYMPRO");await typeLine("University: Under 25 Club · Makerspace Club");return;}
    if(cmd==="stack"){showPanel("tools");await typeLine("ECE stack: ESP32 · STM32 · C/C++ · Rust · TypeScript · WebAssembly · Linux");return;}
    if(cmd==="timeline"){showPanel("projects");await typeLine("Embedded systems → IoT → Linux → software → experimental engineering");return;}
    if(cmd==="hardware"){showPanel("projects");await typeLine("Hardware desk: ESP32 · STM32 · Raspberry Pi · sensors · LoRaWAN");return;}
    if(cmd==="neofetch"){await typeLine("rithwik@portfolio","8","cmd");["OS        Arch Linux","Focus     ECE × Embedded × Software","Shell     fish","Projects  GYMPRO · Neko.Buddy · Vivian · HomeCore V2 · MediKiosk+"].forEach(x=>appendLine(x,"muted"));return;}
    if(cmd==="whoami"){await typeLine("rithwik — ECE student, builder, Linux enjoyer, petrol head.");return;}
    if(cmd==="uptime"){await typeLine("portfolio uptime: always on · human uptime: depends on caffeine.");return;}
    if(cmd==="coffee"){await typeLine("coffee.service: active (running) ☕");return;}
    if(cmd==="fortune"){const f=["Build it. Break it. Learn why.","The bug is probably one line above.","Check the logs before blaming the hardware.","If it works, document it before touching it."];await typeLine(f[Math.floor(Math.random()*f.length)]);return;}
    if(cmd==="matrix"){await typeLine("There is no matrix. There is only CSS.");return;}
    if(cmd==="linux"){await typeLine("Linux mode: enabled. Arch + Hyprland + fish + Kitty.");return;}
    if(cmd==="minecraft"){await typeLine("Minecraft mode: enabled. Inventory still unorganized.");return;}
    if(cmd==="sudo"){await typeLine("Nice try. This terminal has no root privileges.");return;}
    if(cmd==="ls"){await typeLine("about  projects  setup  buildlog  learning  personal  notes  lab  resume");return;}
    if(cmd==="shortcuts"){await typeLine("↑↓ history · Tab autocomplete · Ctrl+K focus · Enter run");return;}
    if(cmd==="milestones"){showPanel("buildlog");await typeLine("Milestones: DSATM · Soil Health Network · HomeCore V2 · MediKiosk+ · University Clubs");return;}
    if(responses[cmd]){await typeLine(responses[cmd],6,"muted");return;}
    if(cmd==="notes"){window.location.href="notes.html";return;}if(panelMap[cmd]!==undefined){showPanel(cmd);await typeLine("Opened "+cmd+" panel.",8,"muted");return;}
    appendLine("Command not found: "+cmd,"muted");
  }
  promptForm.addEventListener("submit",e=>{e.preventDefault();if(cmdInput.value.trim())history.push(cmdInput.value.trim());historyIndex=history.length;execute(cmdInput.value);cmdInput.value="";});
  document.getElementById("runBtn")?.addEventListener("click",e=>{e.preventDefault();promptForm.requestSubmit();});
  cmdInput.addEventListener("keydown",e=>{
    if(e.key==="Tab"){e.preventDefault();const v=cmdInput.value.toLowerCase().trim();const m=commands.find(c=>c.startsWith(v)&&c!==v);if(m)cmdInput.value=m+(m==="open"?" ":"");}
    if(e.key==="ArrowUp"){e.preventDefault();if(history.length){historyIndex=Math.max(0,historyIndex-1);cmdInput.value=history[historyIndex]||"";}}
    if(e.key==="ArrowDown"){e.preventDefault();if(history.length){historyIndex=Math.min(history.length,historyIndex+1);cmdInput.value=history[historyIndex]||"";}}
  });
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();cmdInput.focus();cmdInput.select();}});
  document.getElementById("portfolioBrand")?.addEventListener("click",()=>showPanel("hero"));
  document.getElementById("downloadResume")?.addEventListener("click",()=>window.open("resume.html","_blank"));
  document.getElementById("openNotesGUI")?.addEventListener("click",()=>window.open("notes.html","_blank"));
  (async()=>{await typeLine("rithwik@portfolio: welcome",10,"muted");await typeLine("Type help to list commands.",8,"muted");})();cmdInput.focus();
});

/* =========================================================
   ZERO-STYLE MOTION + LOADER
   Strictly additive: no existing portfolio UI is rewritten.
========================================================= */
(function initZeroMotion(){
  const ready=()=>document.body.classList.add("motion-ready");

  function runLoader(){
    const loader=document.getElementById("zero-loader");
    const count=document.getElementById("zero-loader-count");
    const bar=document.getElementById("zero-loader-bar");
    const status=document.getElementById("zero-loader-status");
    if(!loader||!count||!bar)return;
    const duration=5600;
    const started=performance.now();
    const labels=[[0,"INITIALIZING"],[22,"LOADING ASSETS"],[48,"BUILDING INTERFACE"],[72,"STARTING EXPERIENCE"],[91,"ALMOST THERE"]];
    const tick=(now)=>{
      const progress=Math.min(1,(now-started)/duration);
      const eased=progress<.5?2*progress*progress:1-Math.pow(-2*progress+2,2)/2;
      const n=Math.min(100,Math.floor(eased*100));
      count.textContent=String(n).padStart(2,"0");
      bar.style.width=n+"%";
      const current=labels.reduce((a,x)=>eased*100>=x[0]?x:a,labels[0]);
      status.textContent=current[1];
      if(progress<1){requestAnimationFrame(tick);return}
      count.textContent="100";status.textContent="READY";bar.style.width="100%";
      setTimeout(()=>{loader.classList.add("is-done");setTimeout(()=>loader.remove(),900)},460);
    };
    requestAnimationFrame(tick);
  }

  function installMotion(){
    ready();
    const targets=document.querySelectorAll(
      ".hero,.workspace-strip,.workspace-block,.panel-area,.project,.lab-card,.note,.setupGrid>div,.buildlog .log-entry,.tech,.footer,.footer-chips,.live-status,.activity-card,.now-card,.milestones-card,.shortcuts-card,.fact-card,.joke-card"
    );
    targets.forEach((el,i)=>{
      el.classList.add("motion-reveal");
      if(i%4===1)el.dataset.motionDelay="1";
      if(i%4===2)el.dataset.motionDelay="2";
      if(i%4===3)el.dataset.motionDelay="3";
    });
    document.querySelectorAll(".hero,.workspace-block,.project,.lab-card,.activity-card,.now-card,.milestones-card").forEach(el=>el.classList.add("motion-sweep"));

    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:"0px 0px -8% 0px"});
    targets.forEach(el=>observer.observe(el));

    const hero=document.querySelector(".hero");
    if(hero&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
      hero.classList.add("zero-parallax");
      let raf=0;
      window.addEventListener("scroll",()=>{
        if(raf)return;
        raf=requestAnimationFrame(()=>{
          const y=Math.min(window.scrollY,500);
          hero.style.transform="translate3d(0,"+(y*.035)+"px,0)";
          raf=0;
        });
      },{passive:true});
    }
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{runLoader();installMotion()},{once:true});
  else{runLoader();installMotion();}
})();
