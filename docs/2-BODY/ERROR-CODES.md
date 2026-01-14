# 🔢 QANTUM Error Codes Reference

Complete reference for all error codes with causes and solutions.

---

## Error Code Format

```
MM-[CATEGORY][NUMBER]
```

| Category | Range | Description |
|----------|-------|-------------|
| `1XX` | 100-199 | Initialization Errors |
| `2XX` | 200-299 | Configuration Errors |
| `3XX` | 300-399 | Network/API Errors |
| `4XX` | 400-499 | Authentication/License Errors |
| `5XX` | 500-599 | Browser/Playwright Errors |
| `6XX` | 600-699 | File System Errors |
| `7XX` | 700-799 | Memory/Performance Errors |
| `8XX` | 800-899 | Test Execution Errors |
| `9XX` | 900-999 | Internal/Unknown Errors |

---

## 1XX - Initialization Errors

### MM-101: Module Not Initialized

**Message:** `Module must be initialized before use`

**Cause:** Calling methods before `.initialize()`

**Solution:**
```javascript
// ❌ Wrong
const chronos = mm.createChronos();
await chronos.predict();  // Error!

// ✅ Correct
const chronos = mm.createChronos();
await chronos.initialize();
await chronos.predict();
```

---

### MM-102: Dependencies Missing

**Message:** `Required dependency not found: [name]`

**Cause:** npm install didn't complete

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### MM-103: Invalid Node.js Version

**Message:** `Node.js 18+ required, found: [version]`

**Cause:** Using old Node.js

**Solution:**
```bash
# Install Node.js 20 LTS
nvm install 20
nvm use 20
```

---

### MM-104: Initialization Timeout

**Message:** `Initialization timed out after [n]ms`

**Cause:** Slow system or network

**Solution:**
```javascript
const mm = require('./index.js');
const chronos = mm.createChronos({
    initTimeout: 60000  // Increase to 60 seconds
});
await chronos.initialize();
```

---

## 2XX - Configuration Errors

### MM-201: Invalid Configuration

**Message:** `Invalid configuration: [details]`

**Cause:** Wrong config structure

**Solution:**
```javascript
// Check config matches expected schema
const config = {
    baseURL: 'https://api.example.com',  // Required
    timeout: 5000,  // Optional, default 10000
    retries: 3      // Optional, default 0
};
```

---

### MM-202: Missing Required Field

**Message:** `Missing required configuration: [field]`

**Cause:** Required field not provided

**Solution:**
```javascript
// Provide all required fields
const config = {
    baseURL: 'https://api.example.com',  // REQUIRED
    apiKey: process.env.API_KEY          // REQUIRED if auth needed
};
```

---

### MM-203: Invalid Type

**Message:** `Expected [type] for [field], got [actual]`

**Cause:** Wrong data type

**Solution:**
```javascript
// ❌ Wrong
const config = { timeout: "5000" };  // String

// ✅ Correct  
const config = { timeout: 5000 };    // Number
```

---

### MM-204: Environment Variable Missing

**Message:** `Environment variable not set: [name]`

**Cause:** .env file missing or incomplete

**Solution:**
```bash
# Create .env file
cp .env.example .env

# Edit and add required values
qantum_LICENSE=MM-XXXX-XXXX-XXXX
API_KEY=your-api-key
```

---

## 3XX - Network/API Errors

### MM-301: Connection Refused

**Message:** `ECONNREFUSED: Connection refused to [url]`

**Cause:** Server not running or blocked

**Pre-made Solution:**
```javascript
async function withRetry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.code === 'ECONNREFUSED' && i < retries - 1) {
                console.log(`Connection refused, retry ${i + 1}/${retries}...`);
                await new Promise(r => setTimeout(r, delay * (i + 1)));
            } else throw error;
        }
    }
}
```

---

### MM-302: Request Timeout

**Message:** `Request timed out after [n]ms`

**Cause:** Server too slow

**Solution:**
```javascript
const api = mm.createAPISensei({
    baseURL: 'https://api.example.com',
    timeout: 30000  // Increase timeout
});
```

---

### MM-303: DNS Resolution Failed

**Message:** `ENOTFOUND: DNS lookup failed for [host]`

**Cause:** Invalid domain or no internet

**Solution:**
```bash
# Check DNS resolution
nslookup api.example.com

# Check internet
ping 8.8.8.8

# Use IP if DNS broken
const api = mm.createAPISensei({
    baseURL: 'http://192.168.1.100:3000'
});
```

---

### MM-304: SSL Certificate Error

**Message:** `UNABLE_TO_VERIFY_LEAF_SIGNATURE`

**Cause:** Invalid or self-signed certificate

**Solution:**
```javascript
// For testing only - not recommended for production!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Better: Add certificate
const https = require('https');
const agent = new https.Agent({
    ca: fs.readFileSync('./ca-cert.pem')
});
```

---

### MM-305: Rate Limited

**Message:** `429 Too Many Requests`

**Cause:** API rate limit hit

**Pre-made Solution:**
```javascript
const { RateLimiter } = require('./utils/rate-limiter');
const limiter = new RateLimiter({ 
    maxRequests: 100, 
    perSeconds: 60 
});

await limiter.schedule(() => api.get('/endpoint'));
```

---

## 4XX - Authentication/License Errors

### MM-401: Authentication Failed

**Message:** `Authentication failed: Invalid credentials`

**Cause:** Wrong username/password/token

**Solution:**
```javascript
// Check credentials
const api = mm.createAPISensei({
    baseURL: 'https://api.example.com',
    headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`  // Check this
    }
});
```

---

### MM-402: Token Expired

**Message:** `Token expired at [timestamp]`

**Cause:** JWT or session expired

**Pre-made Solution:**
```javascript
class TokenManager {
    constructor(refreshFn) {
        this.token = null;
        this.expiry = 0;
        this.refreshFn = refreshFn;
    }
    
    async getToken() {
        if (Date.now() >= this.expiry - 60000) {
            const { token, expiresIn } = await this.refreshFn();
            this.token = token;
            this.expiry = Date.now() + expiresIn * 1000;
        }
        return this.token;
    }
}
```

---

### MM-403: License Invalid

**Message:** `License validation failed: [reason]`

**Causes & Solutions:**

| Reason | Solution |
|--------|----------|
| `INVALID_FORMAT` | Format: `MM-XXXX-XXXX-XXXX` |
| `EXPIRED` | Renew license |
| `NOT_FOUND` | Check for typos |
| `DOMAIN_MISMATCH` | Contact support |

---

### MM-404: License Expired

**Message:** `License expired on [date]`

**Solution:**
```bash
# Renew at
https://revolut.me/dimitar7776

# Or contact
papica777.eng@gmail.com
```

---

### MM-405: Permission Denied

**Message:** `Permission denied for feature: [feature]`

**Cause:** Feature not in license tier

**Solution:**
```javascript
// Check license tier
const mm = require('./index.js');
console.log(mm.getLicenseInfo());
// { tier: 'free', features: ['audit', 'checkLinks'] }

// Upgrade to Pro for all features
```

---

## 5XX - Browser/Playwright Errors

### MM-501: Browser Launch Failed

**Message:** `Failed to launch browser: [reason]`

**Pre-made Solution:**
```javascript
async function launchBrowserSafe() {
    const { chromium } = require('playwright');
    
    try {
        return await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });
    } catch (error) {
        console.error('Browser launch failed:', error.message);
        console.log('Trying with minimal settings...');
        
        return await chromium.launch({
            headless: true,
            args: ['--no-sandbox']
        });
    }
}
```

---

### MM-502: Browser Crashed

**Message:** `Browser closed unexpectedly`

**Pre-made Solution:**
```javascript
class BrowserPool {
    constructor(size = 2) {
        this.browsers = [];
        this.size = size;
    }
    
    async getBrowser() {
        // Return existing healthy browser or create new
        for (const browser of this.browsers) {
            if (browser.isConnected()) return browser;
        }
        
        const { chromium } = require('playwright');
        const browser = await chromium.launch({ headless: true });
        this.browsers.push(browser);
        
        if (this.browsers.length > this.size) {
            const old = this.browsers.shift();
            await old.close().catch(() => {});
        }
        
        return browser;
    }
}
```

---

### MM-503: Element Not Found

**Message:** `Element not found: [selector]`

**Pre-made Solution:**
```javascript
async function findElement(page, selectors, timeout = 10000) {
    // Try multiple selectors
    const selectorList = Array.isArray(selectors) ? selectors : [selectors];
    
    for (const selector of selectorList) {
        try {
            await page.waitForSelector(selector, { timeout: timeout / selectorList.length });
            return await page.$(selector);
        } catch (e) {
            continue;
        }
    }
    
    throw new Error(`Element not found. Tried: ${selectorList.join(', ')}`);
}

// Usage
const button = await findElement(page, [
    '[data-testid="submit"]',
    'button[type="submit"]',
    '.submit-btn',
    '#submit'
]);
```

---

### MM-504: Navigation Timeout

**Message:** `Navigation timeout after [n]ms`

**Solution:**
```javascript
await page.goto('https://example.com', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'  // Instead of 'networkidle'
});
```

---

### MM-505: Screenshot Failed

**Message:** `Screenshot failed: [reason]`

**Pre-made Solution:**
```javascript
async function safeScreenshot(page, path) {
    try {
        await page.screenshot({ path, fullPage: true });
    } catch (error) {
        // Fallback to viewport only
        try {
            await page.screenshot({ path, fullPage: false });
        } catch (e) {
            console.warn('Screenshot failed:', e.message);
            return null;
        }
    }
    return path;
}
```

---

## 6XX - File System Errors

### MM-601: File Not Found

**Message:** `ENOENT: File not found: [path]`

**Pre-made Solution:**
```javascript
const fs = require('fs').promises;
const path = require('path');

async function ensureFile(filePath, defaultContent = '') {
    try {
        await fs.access(filePath);
    } catch {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, defaultContent);
    }
}
```

---

### MM-602: Permission Denied

**Message:** `EACCES: Permission denied: [path]`

**Solution:**
```bash
# Linux/Mac
chmod 755 ./path/to/file

# Or run as owner
sudo chown -R $USER:$USER .
```

---

### MM-603: Disk Full

**Message:** `ENOSPC: No space left on device`

**Solution:**
```bash
# Check disk space
df -h

# Clean up
npm run clean
rm -rf logs/* coverage/*
```

---

## 7XX - Memory/Performance Errors

### MM-701: Out of Memory

**Message:** `JavaScript heap out of memory`

**Solution:**
```bash
# Increase memory
node --max-old-space-size=4096 script.js

# Or in package.json
"scripts": {
    "start": "node --max-old-space-size=4096 index.js"
}
```

---

### MM-702: Stack Overflow

**Message:** `Maximum call stack size exceeded`

**Cause:** Infinite recursion

**Pre-made Solution:**
```javascript
// Add recursion limit
function safeRecursion(fn, maxDepth = 1000) {
    let depth = 0;
    
    return function recursiveWrapper(...args) {
        if (depth >= maxDepth) {
            throw new Error(`MM-702: Max recursion depth (${maxDepth}) exceeded`);
        }
        depth++;
        try {
            return fn.apply(this, args);
        } finally {
            depth--;
        }
    };
}
```

---

### MM-703: Event Loop Blocked

**Message:** `Event loop blocked for [n]ms`

**Pre-made Solution:**
```javascript
// Break up heavy computation
async function heavyComputation(items) {
    const BATCH_SIZE = 100;
    const results = [];
    
    for (let i = 0; i < items.length; i += BATCH_SIZE) {
        const batch = items.slice(i, i + BATCH_SIZE);
        results.push(...batch.map(process));
        
        // Yield to event loop
        await new Promise(setImmediate);
    }
    
    return results;
}
```

---

## 8XX - Test Execution Errors

### MM-801: Test Timeout

**Message:** `Test timed out after [n]ms`

**Solution:**
```javascript
// Increase test timeout
describe('My Tests', () => {
    jest.setTimeout(60000);  // 60 seconds
    
    test('slow test', async () => {
        // ...
    });
});
```

---

### MM-802: Assertion Failed

**Message:** `Assertion failed: expected [x] but got [y]`

**Debug Solution:**
```javascript
// Enhanced assertion with context
function assertWithContext(actual, expected, context = '') {
    if (actual !== expected) {
        console.error('=== ASSERTION FAILED ===');
        console.error('Context:', context);
        console.error('Expected:', JSON.stringify(expected, null, 2));
        console.error('Actual:', JSON.stringify(actual, null, 2));
        console.error('Stack:', new Error().stack);
        throw new Error(`MM-802: ${context}: expected ${expected}, got ${actual}`);
    }
}
```

---

### MM-803: Flaky Test Detected

**Message:** `Test [name] is flaky: passed [x]/[y] runs`

**Pre-made Solution:**
```javascript
// Retry flaky tests
async function runWithRetry(testFn, retries = 3) {
    let lastError;
    
    for (let i = 0; i < retries; i++) {
        try {
            await testFn();
            return { success: true, attempts: i + 1 };
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${i + 1}/${retries} failed`);
        }
    }
    
    throw lastError;
}
```

---

## 9XX - Internal Errors

### MM-901: Internal Error

**Message:** `Internal error: [details]`

**Action:** Report to GitHub issues with full stack trace

---

### MM-999: Unknown Error

**Message:** `Unknown error occurred`

**Pre-made Solution:**
```javascript
// Global error handler
process.on('uncaughtException', (error) => {
    console.error('=== UNCAUGHT EXCEPTION ===');
    console.error('Code: MM-999');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    // Log to file
    const fs = require('fs');
    fs.appendFileSync('error.log', `
[${new Date().toISOString()}] MM-999
${error.stack}
---
`);
    
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('=== UNHANDLED REJECTION ===');
    console.error('Code: MM-999');
    console.error('Reason:', reason);
});
```

---

## Quick Reference Table

| Code | Error | Quick Fix |
|------|-------|-----------|
| MM-101 | Not initialized | Call `.initialize()` |
| MM-102 | Dependencies | `npm install` |
| MM-201 | Config invalid | Check schema |
| MM-301 | Connection refused | Check server |
| MM-302 | Timeout | Increase timeout |
| MM-305 | Rate limited | Add rate limiter |
| MM-401 | Auth failed | Check credentials |
| MM-403 | License invalid | Check format |
| MM-501 | Browser failed | Add --no-sandbox |
| MM-503 | Element not found | Add fallback selectors |
| MM-601 | File not found | Check path |
| MM-701 | Out of memory | Increase heap |

---

*For detailed solutions, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)*
