/**
 * Tab Cleaner - Content Script
 * Handles user interaction and visual feedback for duplicate tabs
 */

class TabCleanerContent {
  constructor() {
    this.init();
  }

  init() {
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    this.addVisualIndicator();
  }

  handleMessage(message, sender, sendResponse) {
    if (message.action === 'askConfirmation') {
      const confirmed = confirm(
        chrome.i18n.getMessage('duplicatesFoundConfirm', [message.count.toString()])
      );
      sendResponse({ confirmed });
      return true; // Keep message channel open for async response
    }
  }

  addVisualIndicator() {
    // Add visual indicator for duplicate tabs if needed
    if (this.isDuplicateTab()) {
      this.showDuplicateWarning();
    }
  }

  isDuplicateTab() {
    // This would need to be implemented based on your duplicate detection logic
    // For now, returning false as the main logic is in background script
    return false;
  }

  showDuplicateWarning() {
    const warning = document.createElement('div');
    warning.id = 'tab-cleaner-warning';
    warning.className = 'tab-cleaner-duplicate-warning';
    warning.textContent = '🔁 Bu sekme zaten açık!';
    
    document.body.appendChild(warning);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      warning.remove();
    }, 5000);
  }
}

// Initialize content script only if in a valid context
if (typeof chrome !== 'undefined' && chrome.runtime) {
  new TabCleanerContent();
}
