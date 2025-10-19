# Privacy Policy - Tab Cleaner Chrome Extension

**Last updated: October 19, 2025**

## Overview

Tab Cleaner is committed to protecting your privacy. This privacy policy explains how our Chrome extension handles your data and what information we do and do not collect.

## Data Collection

### What We DO NOT Collect
- ❌ **Personal Information**: We do not collect names, emails, or any personal identifiers
- ❌ **Browsing History**: We do not store or transmit your browsing history
- ❌ **Website Content**: We do not read or store webpage content
- ❌ **User Analytics**: We do not track user behavior or usage statistics
- ❌ **Cookies or Local Storage**: We do not store persistent data on your device
- ❌ **Network Requests**: We do not send any data to external servers

### What We DO Access (Locally Only)
- ✅ **Tab URLs**: Only to identify duplicate tabs (processed locally, never stored)
- ✅ **Tab Titles**: Only for duplicate detection (processed locally, never stored)
- ✅ **Active Tab Information**: Only to determine where to show confirmation dialogs

## How We Use Information

All data processing happens **entirely on your local device**:

1. **Duplicate Detection**: We temporarily compare tab URLs to find duplicates
2. **URL Normalization**: We remove tracking parameters (utm_source, fbclid, etc.) for better matching
3. **User Confirmation**: We show notifications asking for permission before closing tabs
4. **Tab Management**: We close duplicate tabs only after user confirmation

**Important**: No data leaves your browser or device at any time.

## Data Storage

- **Zero Persistent Storage**: We do not store any data permanently
- **No Cloud Storage**: No data is sent to or stored on external servers
- **Temporary Processing**: Tab information is only held in memory during the duplicate detection process
- **Automatic Cleanup**: All temporary data is immediately discarded after processing

## Permissions Explained

Our extension requests the following permissions for legitimate functionality:

### Required Permissions
- **`tabs`**: Access tab information to detect duplicates
- **`notifications`**: Show confirmation dialogs to users
- **`scripting`**: Execute confirmation prompts on web pages
- **`activeTab`**: Determine the current active tab for UI purposes
- **`<all_urls>`**: Work on all websites (no data is collected from websites)

### Why These Permissions Are Necessary
- We need tab access to compare URLs for duplicate detection
- Notifications are used for user-friendly confirmation dialogs
- Scripting allows us to show confirmation prompts that work on all tab types
- These permissions enable core functionality while maintaining privacy

## Third-Party Services

- **None**: We do not use any third-party services, analytics, or tracking tools
- **No External APIs**: We do not communicate with any external servers
- **No Advertisements**: We do not display ads or use advertising networks

## Data Security

- **Local Processing**: All operations happen locally on your device
- **No Network Communication**: Zero data transmission over the internet
- **Open Source**: Our code is available for public review and audit
- **Minimal Attack Surface**: No external dependencies or network requests

## Children's Privacy

Our extension does not knowingly collect any information from users under 13 years of age. Since we don't collect any personal information at all, our extension is safe for users of all ages.

## Changes to Privacy Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last updated" date at the top of this document. Continued use of the extension after changes constitutes acceptance of the updated policy.

## Compliance

This extension complies with:
- **Chrome Web Store Developer Program Policies**
- **General Data Protection Regulation (GDPR)**
- **California Consumer Privacy Act (CCPA)**
- **Children's Online Privacy Protection Act (COPPA)**

## Contact Information

If you have questions about this privacy policy or our data practices:

- **GitHub Issues**: [Create an issue](../../issues) in our repository
- **Email**: [Your contact email if you want to provide one]
- **Source Code**: Available for review at [GitHub repository link]

## Transparency Commitment

We believe in complete transparency:
- Our source code is open and available for review
- This privacy policy clearly states our data practices
- We welcome security audits and privacy reviews
- We commit to never changing our core privacy principles

## Summary

**In simple terms**: Tab Cleaner works entirely on your device, never collects or transmits any personal data, and only accesses tab information temporarily to help you manage duplicate tabs. Your privacy is completely protected.

---

**Tab Cleaner Team**  
*Committed to privacy-first browser extensions*
