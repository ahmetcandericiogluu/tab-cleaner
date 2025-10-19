# Tab Cleaner - Chrome Extension

A professional Chrome extension that automatically detects and removes duplicate tabs with user confirmation. Features smart URL normalization and tracking parameter removal.

## Features

- 🔍 **Smart Duplicate Detection** - Identifies duplicate tabs across all windows
- 🧹 **URL Normalization** - Removes tracking parameters (utm_source, fbclid, etc.)
- 🔔 **Notification-based Confirmation** - Works on all tab types including empty tabs
- ⚡ **Batch Processing** - Efficiently closes multiple tabs in groups
- 🎨 **Modern UI** - Clean notifications with dark mode support
- ⌨️ **Keyboard Shortcut** - Alt+Shift+D (Cmd+Shift+D on Mac)
- 🛡️ **Error Handling** - Robust error management with silent failures

## Installation

### From Source
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The Tab Cleaner icon will appear in your extensions toolbar

### From Chrome Web Store
*Coming soon...*

## Usage

### Keyboard Shortcut
- **Windows/Linux**: `Alt + Shift + D`
- **Mac**: `Cmd + Shift + D`

### How it Works
1. Press the keyboard shortcut
2. Extension scans all open tabs for duplicates
3. If duplicates found, shows notification with "Close" and "Cancel" buttons
4. Click "Close" or the notification itself to confirm
5. Duplicate tabs are closed automatically

### What Counts as Duplicate?
- Same URL after normalization
- Empty tabs (about:blank, chrome://newtab/, etc.) are grouped together
- URLs with different tracking parameters are considered duplicates

## Technical Details

### Architecture
- **Background Script**: Service worker handling tab management
- **Content Script**: User interaction and visual feedback
- **Manifest V3**: Latest Chrome extension standard
- **Class-based Design**: Professional code organization

### Permissions Required
- `tabs` - Access tab information
- `notifications` - Show confirmation dialogs
- `scripting` - Execute confirmation scripts
- `activeTab` - Access current tab
- `<all_urls>` - Work on all websites

### Browser Compatibility
- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)

## Development

### File Structure
```
tab-cleaner/
├── manifest.json          # Extension configuration
├── background.js          # Main logic and tab management
├── content.js             # User interaction handling
├── style.css              # Visual feedback styles
├── icons/                 # Extension icons
│   ├── 16.png
│   ├── 32.png
│   ├── 48.png
│   └── 128.png
└── README.md              # This file
```

### Key Classes
- `TabCleaner` - Main background script class
- `TabCleanerContent` - Content script handler

### Configuration
The extension includes several configurable constants:
- `EMPTY_TAB_URLS` - URLs considered as empty tabs
- `NOTIFICATION_CONFIG` - Default notification settings
- Batch size for tab closing (default: 10)

## Privacy

This extension:
- ✅ Works entirely locally - no data sent to external servers
- ✅ Only accesses tab URLs and titles for duplicate detection
- ✅ Does not store or track user browsing data
- ✅ Open source - you can review all code

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.1.0
- Professional code refactoring with class-based architecture
- Notification-based confirmation system
- Enhanced error handling
- Tracking parameter removal
- Modern CSS with dark mode support
- Mac keyboard shortcut support

### v1.0.0
- Initial release
- Basic duplicate tab detection
- Keyboard shortcut support

## Support

If you encounter any issues or have suggestions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include Chrome version and extension version

## Roadmap

- [ ] Popup UI for settings and statistics
- [ ] Automatic cleaning at intervals
- [ ] Domain whitelist functionality
- [ ] Undo feature for closed tabs
- [ ] Export/import settings
- [ ] Chrome Web Store publication

---

Made with ❤️ for a cleaner browsing experience
