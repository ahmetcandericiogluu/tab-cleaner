chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "askConfirmation") {
    const userConfirmed = confirm(
      `${message.count} tekrarlayan sekme bulundu. Kapatılsın mı?`
    );
    sendResponse({ confirmed: userConfirmed });
  }
});
