//-------------------------------------------------------------
// i2ai Website Chat Widget
// Externe JS — veilig voor Hostinger Website Builder
//-------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

  const webhookUrl = "https://n8n.in2ai.nl/webhook/97a2d468-6ac3-4942-b56e-93af0f7ffb81/chat";

  //-------------------------------------------------------------
  // Inject CSS
  //-------------------------------------------------------------
  const css = `
    #i2ai-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      background: radial-gradient(circle at 30% 0%, #38bdf8, #0f172a 65%);
      border-radius: 999px;
      box-shadow: 0 12px 28px rgba(0,0,0,0.45);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
    }
    #i2ai-launcher:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 16px 32px rgba(0,0,0,0.6);
    }
    #i2ai-launcher svg {
      filter: drop-shadow(0 0 8px rgba(56,189,248,0.6));
    }
    #i2ai-chat {
      position: fixed;
      bottom: 104px;
      right: 24px;
      width: 380px;
      max-width: 95vw;
      height: 520px;
      max-height: 80vh;
      background: #050608;
      border-radius: 18px;
      border: 1px solid rgba(148,163,184,0.3);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 999999;
    }
    #i2ai-chat-header {
      padding: 14px 16px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #262a33;
      background: rgba(56,189,248,0.2);
    }
    #i2ai-avatar {
      width: 30px;
      height: 30px;
      border-radius: 999px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 10px;
    }
    #i2ai-messages {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      color: white;
      font-size: 14px;
    }
    #i2ai-input-area {
      padding: 8px;
      background: #0e1014;
      display: flex;
      gap: 8px;
    }
    #i2ai-input {
      flex: 1;
      padding: 8px;
      background: #020617;
      border: 1px solid #334155;
      color: white;
      border-radius: 6px;
    }
    #i2ai-send {
      background: #38bdf8;
      border: none;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      color: #020617;
      font-weight: bold;
    }
    .i2ai-msg {
      padding: 8px 10px;
      border-radius: 10px;
      margin-bottom: 6px;
      max-width: 80%;
    }
    .i2ai-msg.user {
      background: #38bdf8;
      color: #020617;
      margin-left: auto;
    }
    .i2ai-msg.bot {
      background: #1e293b;
      color: #e2e8f0;
      margin-right: auto;
    }
  `;

  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);

  //-------------------------------------------------------------
  // Inject HTML widget
  //-------------------------------------------------------------
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div id="i2ai-launcher">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="13" rx="3" ry="3"
          stroke="#e5e7eb" stroke-width="1.4"/>
        <path d="M7 9h7M7 13h4"
          stroke="#e5e7eb" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M10 18.5c2.5 0 4.2-.9 5.2-2.4"
          stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    </div>

    <div id="i2ai-chat">
      <div id="i2ai-chat-header">
        <div id="i2ai-avatar">i</div>
        <div style="color:white;font-weight:bold;">i2ai Assistant</div>
        <button id="i2ai-chat-close"
          style="margin-left:auto;background:none;border:none;color:white;font-size:18px;cursor:pointer;">×</button>
      </div>

      <div id="i2ai-messages"></div>

      <div id="i2ai-input-area">
        <input id="i2ai-input" placeholder="Typ hier..." />
        <button id="i2ai-send">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  //-------------------------------------------------------------
  // Logic
  //-------------------------------------------------------------
  const launcher = document.getElementById("i2ai-launcher");
  const chat = document.getElementById("i2ai-chat");
  const closeBtn = document.getElementById("i2ai-chat-close");
  const messagesEl = document.getElementById("i2ai-messages");
  const inputEl = document.getElementById("i2ai-input");
  const sendBtn = document.getElementById("i2ai-send");

  launcher.addEventListener("click", () => {
    chat.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    chat.style.display = "none";
  });

  function addMessage(text, from) {
    const msg = document.createElement("div");
    msg.className = "i2ai-msg " + from;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");
    inputEl.value = "";

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: text })
      });

      const data = await res.json();
      const reply =
        data.output ||
        data.response ||
        data.message ||
        "Er ging iets mis.";

      addMessage(reply, "bot");

    } catch (e) {
      addMessage("Server fout: ik kon geen verbinding maken.", "bot");
      console.error("i2ai widget error:", e);
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  addMessage("Hoi! Ik ben i2ai. Waar kan ik je mee helpen?", "bot");
});