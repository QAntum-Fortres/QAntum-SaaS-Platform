# 🐛 Known Issues & Workarounds

## Current Known Issues

This document tracks known issues in QANTUM with their workarounds.

---

## 🔴 Critical Issues

### No critical issues at this time

---

## 🟡 Medium Priority Issues

### ISSUE-001: Playwright Browser Caching on Windows

**Status:** 🟡 Workaround Available  
**Affected:** Windows 10/11  
**Version:** All

**Description:**  
Playwright browser binaries may not be found after update.

**Workaround:**
```bash
# Clear Playwright cache
rmdir /s /q %USERPROFILE%\.cache\ms-playwright

# Reinstall browsers
npx playwright install
```

---

### ISSUE-002: Memory Leak in Long-Running Sessions

**Status:** 🟡 Workaround Available  
**Affected:** Sessions > 1 hour  
**Version:** < 15.1

**Description:**  
Browser instances may accumulate memory over time.

**Workaround:**
```javascript
// Restart browser every N tests
const MAX_TESTS_PER_BROWSER = 50;
let testCount = 0;
let browser;

async function getCleanBrowser() {
    if (testCount >= MAX_TESTS_PER_BROWSER || !browser) {
        if (browser) await browser.close();
        browser = await chromium.launch();
        testCount = 0;
    }
    testCount++;
    return browser;
}
```

---

### ISSUE-003: ESLint v9 Flat Config Compatibility

**Status:** 🟡 Workaround Available  
**Affected:** ESLint 9.x  
**Version:** All

**Description:**  
ESLint 9 uses new flat config format.

**Workaround:**
```bash
# Use legacy config flag
ESLINT_USE_FLAT_CONFIG=false npm run lint

# Or update to flat config format
# See: https://eslint.org/docs/latest/use/configure/migration-guide
```

---

### ISSUE-004: Rate Limiting on Free API Tests

**Status:** 🟡 Workaround Available  
**Affected:** Free tier  
**Version:** All

**Description:**  
Free tier has 10 API tests per day limit.

**Workaround:**
```javascript
// Cache API results
const cache = new Map();
const CACHE_TTL = 3600000; // 1 hour

async function cachedAPITest(url) {
    const key = url;
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.result;
    }
    
    const result = await mm.testAPI(url);
    cache.set(key, { result, timestamp: Date.now() });
    return result;
}
```

---

## 🟢 Low Priority Issues

### ISSUE-005: Console Colors on Windows PowerShell

**Status:** 🟢 Cosmetic  
**Affected:** Windows PowerShell  
**Version:** All

**Description:**  
Some ANSI colors may not render correctly in PowerShell.

**Workaround:**
```powershell
# Enable Virtual Terminal Processing
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$env:FORCE_COLOR = "1"
```

---

### ISSUE-006: TypeScript Definitions Incomplete

**Status:** 🟢 In Progress  
**Affected:** TypeScript users  
**Version:** All

**Description:**  
Some TypeScript type definitions are generic.

**Workaround:**
```typescript
// Add custom type augmentation
declare module 'qantum' {
    interface PredictionResult {
        riskScore: number;
        predictedFailures: string[];
        recommendation: string;
    }
}
```

---

### ISSUE-007: Docker Image Size

**Status:** 🟢 Optimization Needed  
**Affected:** Docker deployments  
**Version:** All

**Description:**  
Docker image is larger than optimal (~800MB).

**Workaround:**
```dockerfile
# Use Alpine-based image
FROM node:20-alpine

# Only copy production files
COPY package*.json ./
RUN npm ci --only=production
COPY index.js .
COPY sovereign-core/ sovereign-core/
# Skip test files, docs, examples
```

---

## 📋 Fixed Issues (Changelog)

### ✅ Fixed in v15.1.0

- Fixed: Chronos prediction accuracy regression
- Fixed: API Sensei timeout handling
- Fixed: Memory leak in visual diff engine

### ✅ Fixed in v15.0.0

- Fixed: Self-healing selector cache corruption
- Fixed: Voice command recognition on Mac
- Fixed: Security scanner false positives

---

## 🆕 Reporting New Issues

### Before Reporting

1. ✅ Check this document for known issues
2. ✅ Search [GitHub Issues](https://github.com/papica777-eng/QA-Framework/issues)
3. ✅ Update to latest version
4. ✅ Collect debug info (see below)

### Collect Debug Information

```bash
# Generate debug report
node -e "
const os = require('os');
const pkg = require('./package.json');
console.log('QANTUM Debug Report');
console.log('========================');
console.log('Version:', pkg.version);
console.log('Node.js:', process.version);
console.log('Platform:', os.platform(), os.arch());
console.log('OS:', os.release());
console.log('Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024), 'GB');
console.log('Free:', Math.round(os.freemem() / 1024 / 1024 / 1024), 'GB');
console.log('CPUs:', os.cpus().length);
"
```

### Report Template

```markdown
**Environment:**
- OS: Windows 11 / macOS 14 / Ubuntu 22.04
- Node.js: 20.x
- QANTUM: 15.1.0

**Description:**
What happened?

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
What should have happened?

**Actual Behavior:**
What actually happened?

**Error Output:**
\`\`\`
Paste error here
\`\`\`

**Workaround Found:**
Did you find a workaround?
```

---

## 🔗 Related Documentation

- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Error Codes Reference](./ERROR-CODES.md)
- [GitHub Issues](https://github.com/papica777-eng/QA-Framework/issues)

---

*Last updated: December 2025*
