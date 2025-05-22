// Register context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'add-tasklogger-task',
    title: 'Add to Task Logger',
    contexts: ['selection']
  });
  // Register a command for keyboard shortcut
  chrome.commands.getAll(commands => {
    const hasShortcut = commands.some(cmd => cmd.name === 'add-selected-to-tasklogger');
    if (!hasShortcut) {
      // The shortcut is defined in manifest.json, so nothing to do here
    }
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'add-tasklogger-task' && info.selectionText) {
    const newTask = {
      id: crypto.randomUUID(),
      text: info.selectionText,
      createdAt: new Date().toISOString()
    };
    chrome.storage.local.get(['tasks'], (result) => {
      const tasks = result.tasks ? result.tasks : [];
      tasks.push(newTask);
      chrome.storage.local.set({ tasks }, () => {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon16.png',
          title: 'Task Logger',
          message: 'Task added from context menu!'
        });
      });
    });
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'add-selected-to-tasklogger') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.id) return;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString(),
      }, (results) => {
        const selectedText = results && results[0] && results[0].result;
        if (selectedText && selectedText.trim()) {
          const newTask = {
            id: crypto.randomUUID(),
            text: selectedText.trim(),
            createdAt: new Date().toISOString()
          };
          chrome.storage.local.get(['tasks'], (result) => {
            const tasks = result.tasks ? result.tasks : [];
            tasks.push(newTask);
            chrome.storage.local.set({ tasks }, () => {
              chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon16.png',
                title: 'Task Logger',
                message: 'Task added from keyboard shortcut!'
              });
            });
          });
        } else {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon16.png',
            title: 'Task Logger',
            message: 'No text selected!'
          });
        }
      });
    });
  }
});
