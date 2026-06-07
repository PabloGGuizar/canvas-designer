// Canvas Designer — Service Worker (MV3)

// Migrate from sync to local to avoid quota limits
// Wrapped in try/catch for Firefox compatibility (storage.sync may not be available
// when the extension is not published/signed on AMO)
chrome.storage.local.get(['migratedToLocal'], (res) => {
  if (!res.migratedToLocal) {
    try {
      chrome.storage.sync.get(['cdTemplates', 'styleLibrary', 'cdSettings'], (syncData) => {
        if (chrome.runtime.lastError) {
          // Firefox without sync access: just mark migration as done
          chrome.storage.local.set({ migratedToLocal: true });
          return;
        }
        const payload = { migratedToLocal: true };
        if (syncData.cdTemplates) payload.cdTemplates = syncData.cdTemplates;
        if (syncData.styleLibrary) payload.styleLibrary = syncData.styleLibrary;
        if (syncData.cdSettings) payload.cdSettings = syncData.cdSettings;
        chrome.storage.local.set(payload);
      });
    } catch (e) {
      // storage.sync not available (Firefox unpublished extension)
      chrome.storage.local.set({ migratedToLocal: true });
    }
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  const builderUrl = chrome.runtime.getURL('builder/builder.html');

  // Check if builder tab is already open
  const tabs = await chrome.tabs.query({ url: builderUrl });
  if (tabs.length > 0) {
    chrome.tabs.update(tabs[0].id, { active: true });
    chrome.windows.update(tabs[0].windowId, { focused: true });
  } else {
    chrome.tabs.create({ url: builderUrl });
  }
});

// Relay messages between content scripts and builder tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_STYLE_LIBRARY') {
    chrome.storage.local.get('styleLibrary', (result) => {
      sendResponse({ library: result.styleLibrary || null });
    });
    return true; // async
  }

  if (message.type === 'SAVE_STYLE_LIBRARY') {
    chrome.storage.local.set({ styleLibrary: message.library }, () => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.type === 'GET_TEMPLATES') {
    chrome.storage.local.get('cdTemplates', (result) => {
      // Return existing templates or a default empty array
      sendResponse({ templates: result.cdTemplates || [] });
    });
    return true;
  }

  if (message.type === 'SAVE_TEMPLATES') {
    chrome.storage.local.set({ cdTemplates: message.templates }, () => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.type === 'GET_SETTINGS') {
    chrome.storage.local.get('cdSettings', (result) => {
      sendResponse({ settings: result.cdSettings || {} });
    });
    return true;
  }

  if (message.type === 'SAVE_SETTINGS') {
    chrome.storage.local.set({ cdSettings: message.settings }, () => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.type === 'OPEN_BUILDER') {
    const builderUrl = chrome.runtime.getURL('builder/builder.html');
    chrome.tabs.query({ url: builderUrl }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { active: true });
        chrome.windows.update(tabs[0].windowId, { focused: true });
      } else {
        chrome.tabs.create({ url: builderUrl });
      }
      sendResponse({ ok: true });
    });
    return true;
  }
});
