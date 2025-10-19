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

    const isEmpty =
      !url ||
      url === "about:blank" ||
      url === "chrome://newtab/" ||
      url.startsWith("data:");

    const key = isEmpty ? "__EMPTY_TAB__" : url;

    if (seenUrls.has(key)) {
      duplicates.push(tab);
    } else {
      seenUrls.set(key, tab);
    }
  }

  if (duplicates.length === 0) {
    return chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/48.png",
      title: "Tab Cleaner",
      message: "Tekrarlayan sekme bulunamadı 🎉",
    });
  }

  // 🔹 Aktif sekme (confirm göstereceğimiz sekme)
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab) return;

  const isActiveTabEmpty =
    !activeTab.url ||
    activeTab.url === "about:blank" ||
    activeTab.url === "chrome://newtab/" ||
    activeTab.url.startsWith("data:");

  let confirmed = false;

  // 🧠 Eğer aktif sekme inject edilebilir değilse → fallback confirm penceresi
  if (isActiveTabEmpty) {
    confirmed = confirm(`${duplicates.length} tekrarlayan sekme bulundu. Kapatılsın mı?`);
  } else {
    // 🔹 Inject edilebiliyorsa normal şekilde popup göster
    const response = await chrome.scripting
      .executeScript({
        target: { tabId: activeTab.id },
        func: (count) =>
          confirm(`${count} tekrarlayan sekme bulundu. Kapatılsın mı?`),
        args: [duplicates.length],
      })
      .catch(() => [{ result: false }]);

    confirmed = response && response[0] && response[0].result;
  }

  if (!confirmed) {
    return chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/48.png",
      title: "Tab Cleaner",
      message: "İşlem iptal edildi ❌",
    });
  }

  // 🔹 Duplicate tableri kapat
  for (const tab of duplicates) {
    await chrome.tabs.remove(tab.id);
  }

  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/48.png",
    title: "Tab Cleaner",
    message: `${duplicates.length} tekrarlayan sekme kapatıldı ✅`,
  });
}

// 🔹 URL temizleyici
function cleanUrl(url) {
  try {
    if (!url) return "";
    const u = new URL(url);
    return u.href;
  } catch {
    return url || "";
  }
}
