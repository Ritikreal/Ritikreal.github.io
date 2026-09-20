window.addEventListener("DOMContentLoaded", () => {
  const outputEl=document.getElementById("output"), cmdInput=document.getElementById("cmdInput"), promptForm=document.getElementById("promptForm");
  const panels=[...document.querySelectorAll(".panel")], hero=document.getElementById("panel-hero");
  const panelMap={about:"about",projects:"projects",resume:"resume",notes:"notes",tools:"tools",lab:"lab",contact:"contact",hero:null};
  const commands=["help","about","projects","project","resume","notes","note","tools","lab","contact","now","stack","timeline","hardware","neofetch","clear","open"];
  const history=[]; let historyIndex=0;
  function escapeHtml(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function appendLine(t="",cls=""){const p=document.createElement("p");p.className=cls;p.textContent=t;outputEl.appendChild(p);outputEl.scrollTop=outputEl.scrollHeight;}
  async function typeLine(t,speed=8,cls=""){const p=document.createElement("p");p.className=cls;outputEl.appendChild(p);for(let i=0;i<=t.length;i++){p.textContent=t.slice(0,i);await new Promise(r=>setTimeout(r,speed));}outputEl.scrollTop=outputEl.scrollHeight;}
  function hideAll(){panels.forEach(p=>p.hidden=true);hero?.classList.remove("active");}
  function showPanel(id){
    hideAll();
    if(!id||id==="hero"){hero?.classList.add("active");return;}
    const panel=document.getElementById(id);
    panel?.removeAttribute("hidden");
    if(panel&&window.matchMedia("(max-width:900px)").matches){
      requestAnimationFrame(()=>panel.scrollIntoView({behavior:"smooth",block:"start"}));
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
  const responses={help:"Available commands:\n  help · about · projects · resume · notes · tools · lab · contact\n  now · stack · timeline · hardware · neofetch · clear\n  open <page> · Tab autocomplete · ↑↓ command history · Ctrl+K focus"};
  async function execute(raw){
    raw=(raw||"").trim();if(!raw)return;
    const echo=document.createElement("p");echo.innerHTML='<span class="cmd inline">➜</span> <span class="mono">'+escapeHtml(raw)+"</span>";outputEl.appendChild(echo);
    const parts=raw.split(/\s+/);let cmd=parts[0].toLowerCase(),arg=parts.slice(1).join(" ").toLowerCase();
    const aliases={project:"projects",note:"notes"};cmd=aliases[cmd]||cmd;
    if(cmd==="clear"){outputEl.innerHTML="";return;}
    if(cmd==="open"){if(panelMap[arg]!==undefined){showPanel(arg);await typeLine("Opening "+arg+" panel...");}else appendLine("Try: open projects · open lab · open contact","muted");return;}
    if(cmd==="lab"){showPanel("lab");await typeLine("Opening ECE Lab...");return;}
    if(cmd==="now"){showPanel("hero");await typeLine("Currently building: GYMPRO · Neko.Buddy · AyurLife");await typeLine("University: Under 25 Club · Makerspace Club");return;}
    if(cmd==="stack"){showPanel("tools");await typeLine("ECE stack: ESP32 · STM32 · C/C++ · Rust · TypeScript · WebAssembly · Linux");return;}
    if(cmd==="timeline"){showPanel("projects");await typeLine("Embedded systems → IoT → Linux → software → experimental engineering");return;}
    if(cmd==="hardware"){showPanel("projects");await typeLine("Hardware desk: ESP32 · STM32 · Raspberry Pi · sensors · LoRaWAN");return;}
    if(cmd==="neofetch"){await typeLine("rithwik@portfolio","8","cmd");["OS        Arch Linux","Focus     ECE × Embedded × Software","Shell     fish","Projects  GYMPRO · Neko.Buddy · AyurLife"].forEach(x=>appendLine(x,"muted"));return;}
    if(responses[cmd]){await typeLine(responses[cmd],6,"muted");return;}
    if(panelMap[cmd]!==undefined){showPanel(cmd);await typeLine("Opened "+cmd+" panel.",8,"muted");return;}
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
  document.getElementById("downloadResume")?.addEventListener("click",()=>window.open("resume.pdf","_blank"));
  document.getElementById("openNotesGUI")?.addEventListener("click",()=>window.open("notes.html","_blank"));
  (async()=>{await typeLine("rithwik@portfolio: welcome",10,"muted");await typeLine("Type help to list commands.",8,"muted");})();cmdInput.focus();
});