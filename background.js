chrome.commands.onCommand.addListener(async (command) => {
  if (command === "clean_duplicate_tabs") {
    await handleDuplicateTabs();
  }
});

async function handleDuplicateTabs() {
  const tabs = await chrome.tabs.query({});
  const seenUrls = new Map();
  const duplicates = [];

  for (const tab of tabs) {
    const url = cleanUrl(tab.url);
    if (seenUrls.has(url)) {
      duplicates.push(tab);
    } else {
      seenUrls.set(url, tab);
    }
  }

  if (duplicates.length === 0) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/48.png",
      title: "Tab Cleaner",
      message: "Tekrarlayan sekme bulunamadı 🎉"
    });
    return;
  }

  // 🔹 Highlight CSS
  for (const tab of duplicates) {
    try {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["styles.css"]
      });
    } catch (e) {
      console.warn("Highlight eklenemedi:", e);
    }
  }

  // 🔹 Aktif sekmede content.js'i manuel enjekte et
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ["content.js"]
    });
  } catch (e) {
    console.warn("content.js inject edilemedi:", e);
  }

  // 🔹 Onay iste
  const response = await chrome.tabs.sendMessage(activeTab.id, {
    action: "askConfirmation",
    count: duplicates.length
  }).catch(() => null);

  if (!response || !response.confirmed) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/48.png",
      title: "Tab Cleaner",
      message: "İşlem iptal edildi ❌"
    });
    return;
  }

  // 🔹 Duplicate tableri kapat
  for (const tab of duplicates) {
    await chrome.tabs.remove(tab.id);
  }

  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/48.png",
    title: "Tab Cleaner",
    message: `${duplicates.length} tekrarlayan sekme kapatıldı ✅`
  });
}

function cleanUrl(url) {
  try {
    const u = new URL(url);
    return u.href;
  } catch {
    return url;
  }
}
