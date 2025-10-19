/**
 * Tab Cleaner - Chrome Extension Background Script
 * Detects and removes duplicate tabs with user confirmation
 */

class TabCleaner {
  constructor() {
    this.EMPTY_TAB_URLS = new Set([
      'about:blank',
      'chrome://newtab/',
      'chrome://new-tab-page/',
      'edge://newtab/',
      'moz-extension://'
    ]);
    
    this.NOTIFICATION_CONFIG = {
      type: 'basic',
      iconUrl: 'icons/48.png',
      title: 'Tab Cleaner'
    };
    
    this.init();
  }

  init() {
    chrome.commands.onCommand.addListener(this.handleCommand.bind(this));
  }

  async handleCommand(command) {
    if (command === 'clean_duplicate_tabs') {
      await this.cleanDuplicateTabs();
    }
  }

  async cleanDuplicateTabs() {
    try {
      const duplicates = await this.findDuplicateTabs();
      
      if (duplicates.length === 0) {
        return this.showNotification(chrome.i18n.getMessage('noDuplicatesFound'));
      }

      const confirmed = await this.getUserConfirmation(duplicates.length);
      
      if (!confirmed) {
        return; // Silent cancel - no notification
      }

      await this.closeTabs(duplicates);
      this.showNotification(chrome.i18n.getMessage('duplicatesClosed', [duplicates.length.toString()]));
      
    } catch (error) {
      // Silent error handling for production
      // Don't show error notification for common issues
      if (!error.message?.includes('Cannot access')) {
        this.showNotification(chrome.i18n.getMessage('unexpectedError'));
      }
    }
  }

  async findDuplicateTabs() {
    const tabs = await chrome.tabs.query({});
    const seenUrls = new Map();
    const duplicates = [];

    for (const tab of tabs) {
      const normalizedUrl = this.normalizeUrl(tab.url);
      const key = this.isEmptyTab(tab.url) ? '__EMPTY_TAB__' : normalizedUrl;

      if (seenUrls.has(key)) {
        duplicates.push(tab);
      } else {
        seenUrls.set(key, tab);
      }
    }

    return duplicates;
  }

  normalizeUrl(url) {
    if (!url) return '';
    
    try {
      const urlObj = new URL(url);
      // Remove common tracking parameters
      const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid'];
      trackingParams.forEach(param => urlObj.searchParams.delete(param));
      
      return urlObj.href;
    } catch {
      return url || '';
    }
  }

  isEmptyTab(url) {
    if (!url) return true;
    
    return Array.from(this.EMPTY_TAB_URLS).some(emptyUrl => 
      url === emptyUrl || url.startsWith(emptyUrl) || url.startsWith('data:')
    );
  }

  async getUserConfirmation(count) {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Always use notification-based confirmation for better reliability
    return new Promise((resolve) => {
      const notificationId = `tab-cleaner-confirm-${Date.now()}`;
      
      chrome.notifications.create(notificationId, {
        type: 'basic',
        iconUrl: 'icons/48.png',
        title: 'Tab Cleaner',
        message: chrome.i18n.getMessage('duplicatesFoundConfirm', [count.toString()]),
        buttons: [
          { title: chrome.i18n.getMessage('closeButton') },
          { title: chrome.i18n.getMessage('cancelButton') }
        ]
      });

      const handleNotificationClick = (clickedId, buttonIndex) => {
        if (clickedId === notificationId) {
          chrome.notifications.clear(notificationId);
          chrome.notifications.onButtonClicked.removeListener(handleNotificationClick);
          chrome.notifications.onClicked.removeListener(handleDirectClick);
          
          if (typeof buttonIndex === 'number') {
            resolve(buttonIndex === 0); // 0 = Kapat, 1 = İptal
          } else {
            resolve(true); // Direct click = confirm
          }
        }
      };

      const handleDirectClick = (clickedId) => {
        if (clickedId === notificationId) {
          chrome.notifications.clear(notificationId);
          chrome.notifications.onButtonClicked.removeListener(handleNotificationClick);
          chrome.notifications.onClicked.removeListener(handleDirectClick);
          resolve(true);
        }
      };

      chrome.notifications.onButtonClicked.addListener(handleNotificationClick);
      chrome.notifications.onClicked.addListener(handleDirectClick);

      // Auto-cancel after 10 seconds
      setTimeout(() => {
        chrome.notifications.clear(notificationId);
        chrome.notifications.onButtonClicked.removeListener(handleNotificationClick);
        chrome.notifications.onClicked.removeListener(handleDirectClick);
        resolve(false);
      }, 10000);
    });
  }

  async closeTabs(tabs) {
    const tabIds = tabs.map(tab => tab.id);
    
    // Close tabs in batches to avoid overwhelming the browser
    const batchSize = 10;
    for (let i = 0; i < tabIds.length; i += batchSize) {
      const batch = tabIds.slice(i, i + batchSize);
      await chrome.tabs.remove(batch);
      
      // Small delay between batches
      if (i + batchSize < tabIds.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  showNotification(message) {
    chrome.notifications.create({
      ...this.NOTIFICATION_CONFIG,
      message
    });
  }
}

// Initialize the Tab Cleaner
new TabCleaner();
