// Canvas Designer — Service Worker (MV3)

// ── Helpers ──────────────────────────────────────────────────────────────────
function buildScriptRegistration(pattern) {
  return {
    id: 'custom_' + pattern.replace(/[^a-z0-9]/gi, '_'),
    matches: [pattern],
    js: ['content/content_script.js', 'content/content_script_panel.js'],
    css: ['content/rce_panel.css'],
    runAt: 'document_idle',
  };
}

// Re-register custom URL content scripts on startup (persists across restarts)
chrome.storage.local.get('cdSettings', async (res) => {
  const urls = res.cdSettings?.customUrls || [];
  for (const pattern of urls) {
    try {
      await chrome.scripting.registerContentScripts([buildScriptRegistration(pattern)]);
    } catch (e) { /* already registered from a prior session */ }
  }
});

// Migrate from sync to local to avoid quota limits
chrome.storage.local.get(['migratedToLocal'], (res) => {
  if (!res.migratedToLocal) {
    chrome.storage.sync.get(['cdTemplates', 'styleLibrary', 'cdSettings'], (syncData) => {
      const payload = { migratedToLocal: true };
      if (syncData.cdTemplates) payload.cdTemplates = syncData.cdTemplates;
      if (syncData.styleLibrary) payload.styleLibrary = syncData.styleLibrary;
      if (syncData.cdSettings) payload.cdSettings = syncData.cdSettings;
      
      chrome.storage.local.set(payload);
    });
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

  if (message.type === 'ADD_CUSTOM_URL') {
    const pattern = message.pattern;
    chrome.permissions.request({ origins: [pattern] }, async (granted) => {
      if (!granted) { sendResponse({ ok: false, error: 'permission_denied' }); return; }
      try {
        await chrome.scripting.registerContentScripts([buildScriptRegistration(pattern)]);
      } catch (e) { /* already registered */ }
      chrome.storage.local.get('cdSettings', (res) => {
        const s = res.cdSettings || {};
        const urls = s.customUrls || [];
        if (!urls.includes(pattern)) urls.push(pattern);
        chrome.storage.local.set({ cdSettings: { ...s, customUrls: urls } }, () => {
          sendResponse({ ok: true });
        });
      });
    });
    return true;
  }

  if (message.type === 'REMOVE_CUSTOM_URL') {
    const pattern = message.pattern;
    const id = 'custom_' + pattern.replace(/[^a-z0-9]/gi, '_');
    chrome.scripting.unregisterContentScripts({ ids: [id] }, () => {
      chrome.permissions.remove({ origins: [pattern] }, () => {
        chrome.storage.local.get('cdSettings', (res) => {
          const s = res.cdSettings || {};
          const urls = (s.customUrls || []).filter(u => u !== pattern);
          chrome.storage.local.set({ cdSettings: { ...s, customUrls: urls } }, () => {
            sendResponse({ ok: true });
          });
        });
      });
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
