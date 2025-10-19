function ensureToastStyles() {
  if (document.getElementById("tc-toast-style")) return;
  const style = document.createElement("style");
  style.id = "tc-toast-style";
  style.textContent = `
  @keyframes tc-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  #tc-toast {
    position: fixed;
    right: 20px;
    bottom: 20px;
    max-width: 340px;
    background: #1e1e1e;
    color: #f3f4f6;
    padding: 14px 18px;
    border-radius: 10px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
    z-index: 2147483647;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    line-height: 1.4;
    animation: tc-fade-in 0.25s ease-out;
    border-left: 5px solid #3b82f6; /* default blue */
  }
  #tc-toast.success { border-color: #22c55e; }
  #tc-toast.warning { border-color: #f97316; }
  #tc-toast.info    { border-color: #3b82f6; }
  #tc-toast .tc-close {
    position: absolute;
    top: 6px;
    right: 10px;
    cursor: pointer;
    font-weight: bold;
    opacity: 0.7;
    color: #f3f4f6;
    font-size: 16px;
    transition: opacity 0.2s;
  }
  #tc-toast .tc-close:hover {
    opacity: 1;
  }
  `;
  document.documentElement.appendChild(style);
}

function showToast(message, kind = "info") {
  ensureToastStyles();
  removeToast();

  const box = document.createElement("div");
  box.id = "tc-toast";
  box.className = kind;
  box.textContent = message; // 🔹 Parantez içi yazı kaldırıldı

  const closeBtn = document.createElement("span");
  closeBtn.className = "tc-close";
  closeBtn.textContent = "×";
  closeBtn.title = "Kapat";
  closeBtn.addEventListener("click", () => {
    removeToast();
    chrome.runtime.sendMessage({ action: "toastClosed" });
  });

  box.appendChild(closeBtn);
  document.documentElement.appendChild(box);
}

function removeToast() {
  document.getElementById("tc-toast")?.remove();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "askConfirmation") {
    const userConfirmed = confirm(
      `${message.count} tekrarlayan sekme bulundu. Kapatılsın mı?`
    );
    sendResponse({ confirmed: userConfirmed });
  }
});
