# 🔧 Troubleshooting Guide

## Table of Contents

- [Quick Fixes](#-quick-fixes)
- [Installation Issues](#-installation-issues)
- [Runtime Errors](#-runtime-errors)
- [Browser/Playwright Issues](#-browserplaywright-issues)
- [API Testing Issues](#-api-testing-issues)
- [Performance Issues](#-performance-issues)
- [Docker Issues](#-docker-issues)
- [License Issues](#-license-issues)
- [Getting Help](#-getting-help)

---

## ⚡ Quick Fixes

### Run Diagnostic Script

```bash
# Check system health
node -e "const mm = require('./index.js'); mm.runDiagnostics().then(r => console.log(r));"
```

### Reset Everything

```bash
# Clean slate - removes all generated files
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Kill zombie processes
npm run clean:processes
```

---

## 📦 Installation Issues

### Error: `npm ERR! ERESOLVE unable to resolve dependency tree`

**Cause:** Conflicting peer dependencies

**Solution:**
```bash
# Force install (safe for this project)
npm install --legacy-peer-deps

# Or use force flag
npm install --force
```

---

### Error: `Module not found: 'playwright'`

**Cause:** Playwright browsers not installed

**Solution:**
```bash
# Install Playwright browsers
npx playwright install

# Or install specific browser
npx playwright install chromium
```

---

### Error: `EACCES: permission denied`

**Cause:** No write permissions

**Solution:**
```bash
# Linux/Mac
sudo chown -R $USER:$USER .

# Or use npm with proper permissions
npm config set prefix ~/.npm-global
```

---

### Error: `ENOENT: no such file or directory, open 'package.json'`

**Cause:** Wrong directory

**Solution:**
```bash
# Make sure you're in the project root
cd QA-Framework
ls package.json  # Should exist
npm install
```

---

## 🔴 Runtime Errors

### Error: `TypeError: Cannot read properties of undefined`

**Cause:** Missing initialization or configuration

**Pre-made Solution:**
```javascript
// ❌ Wrong - using before initialization
const mm = require('./index.js');
const result = await mm.chronos.predict();  // Error!

// ✅ Correct - initialize first
const mm = require('./index.js');
const chronos = mm.createChronos();
await chronos.initialize();
const result = await chronos.predict();
```

---

### Error: `ECONNREFUSED` or `Network Error`

**Cause:** Target server unreachable

**Pre-made Solution:**
```javascript
// Add retry and fallback
const mm = require('./index.js');

async function safeRequest(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await mm.api.get(url);
        } catch (error) {
            if (i === retries - 1) throw error;
            console.log(`Retry ${i + 1}/${retries}...`);
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
}
```

---

### Error: `TimeoutError: waiting for selector`

**Cause:** Element not found in time

**Pre-made Solution:**
```javascript
// Use smart waiting with fallback
async function safeClick(page, selector, options = {}) {
    const { timeout = 10000, fallbackSelector = null } = options;
    
    try {
        await page.waitForSelector(selector, { timeout });
        await page.click(selector);
    } catch (error) {
        if (fallbackSelector) {
            console.log(`Primary selector failed, trying fallback...`);
            await page.click(fallbackSelector);
        } else {
            throw new Error(`Element not found: ${selector}\nTip: Check if page loaded correctly`);
        }
    }
}
```

---

### Error: `ReferenceError: regeneratorRuntime is not defined`

**Cause:** Async/await not transpiled

**Solution:**
```bash
# Make sure you're using Node.js 18+
node --version  # Should be 18.x or higher

# If using older Node, add to your script:
require('regenerator-runtime/runtime');
```

---

### Error: `JavaScript heap out of memory`

**Cause:** Memory leak or large data

**Solution:**
```bash
# Increase Node.js memory
node --max-old-space-size=4096 your-script.js

# Or set environment variable
export NODE_OPTIONS="--max-old-space-size=4096"
```

**Pre-made Solution for large datasets:**
```javascript
// Process in chunks
async function processLargeData(items, chunkSize = 100) {
    const results = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        const chunkResults = await Promise.all(chunk.map(processItem));
        results.push(...chunkResults);
        
        // Force garbage collection hint
        if (global.gc) global.gc();
    }
    return results;
}
```

---

## 🌐 Browser/Playwright Issues

### Error: `Browser closed unexpectedly`

**Cause:** Browser crash or timeout

**Pre-made Solution:**
```javascript
// Auto-recovery browser wrapper
class ResilientBrowser {
    constructor() {
        this.browser = null;
        this.maxRetries = 3;
    }
    
    async launch() {
        for (let i = 0; i < this.maxRetries; i++) {
            try {
                const { chromium } = require('playwright');
                this.browser = await chromium.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-dev-shm-usage']
                });
                return this.browser;
            } catch (error) {
                console.log(`Browser launch failed (${i + 1}/${this.maxRetries})`);
                if (i === this.maxRetries - 1) throw error;
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }
    
    async withPage(fn) {
        const browser = await this.launch();
        const page = await browser.newPage();
        try {
            return await fn(page);
        } finally {
            await browser.close();
        }
    }
}

// Usage
const rb = new ResilientBrowser();
await rb.withPage(async (page) => {
    await page.goto('https://example.com');
    // ... your tests
});
```

---

### Error: `net::ERR_CONNECTION_REFUSED`

**Cause:** Target site down or blocked

**Pre-made Solution:**
```javascript
// Health check before testing
async function ensureSiteAvailable(url, timeout = 5000) {
    const axios = require('axios');
    try {
        await axios.get(url, { timeout });
        return true;
    } catch (error) {
        console.error(`Site ${url} is not available`);
        console.log('Possible causes:');
        console.log('  1. Site is down');
        console.log('  2. VPN/Firewall blocking');
        console.log('  3. Wrong URL');
        return false;
    }
}

// Use before tests
if (!await ensureSiteAvailable('https://your-site.com')) {
    console.log('⚠️ Skipping tests - site unavailable');
    process.exit(0);
}
```

---

### Error: `Chromium revision is not downloaded`

**Solution:**
```bash
# Download all browsers
npx playwright install

# Or just Chromium
npx playwright install chromium

# Set custom browser path (if needed)
export PLAYWRIGHT_BROWSERS_PATH=/path/to/browsers
```

---

## 🔌 API Testing Issues

### Error: `401 Unauthorized`

**Cause:** Missing or invalid authentication

**Pre-made Solution:**
```javascript
// Auto-refresh token wrapper
class AuthenticatedAPI {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.credentials = config.credentials;
        this.token = null;
        this.tokenExpiry = null;
    }
    
    async getToken() {
        if (this.token && this.tokenExpiry > Date.now()) {
            return this.token;
        }
        
        const response = await fetch(`${this.baseURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.credentials)
        });
        
        const data = await response.json();
        this.token = data.token;
        this.tokenExpiry = Date.now() + (data.expiresIn * 1000) - 60000; // Refresh 1 min early
        return this.token;
    }
    
    async request(method, endpoint, data = null) {
        const token = await this.getToken();
        return fetch(`${this.baseURL}${endpoint}`, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null
        });
    }
}
```

---

### Error: `429 Too Many Requests`

**Cause:** Rate limiting

**Pre-made Solution:**
```javascript
// Rate limiter with queue
class RateLimitedAPI {
    constructor(requestsPerSecond = 10) {
        this.queue = [];
        this.processing = false;
        this.interval = 1000 / requestsPerSecond;
    }
    
    async request(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.processQueue();
        });
    }
    
    async processQueue() {
        if (this.processing || this.queue.length === 0) return;
        this.processing = true;
        
        while (this.queue.length > 0) {
            const { fn, resolve, reject } = this.queue.shift();
            try {
                const result = await fn();
                resolve(result);
            } catch (error) {
                if (error.response?.status === 429) {
                    // Exponential backoff
                    const retryAfter = error.response.headers['retry-after'] || 60;
                    console.log(`Rate limited. Waiting ${retryAfter}s...`);
                    await new Promise(r => setTimeout(r, retryAfter * 1000));
                    this.queue.unshift({ fn, resolve, reject }); // Retry
                } else {
                    reject(error);
                }
            }
            await new Promise(r => setTimeout(r, this.interval));
        }
        
        this.processing = false;
    }
}
```

---

### Error: `CORS Error`

**Cause:** Cross-origin request blocked

**Solutions:**
```javascript
// Option 1: Use proxy in tests
const proxy = 'http://localhost:3001/proxy?url=';
const response = await fetch(proxy + encodeURIComponent(targetUrl));

// Option 2: Run with CORS disabled (testing only!)
// Start Chrome with: --disable-web-security

// Option 3: Use server-side requests (recommended)
// Make API calls from Node.js, not browser
```

---

## ⚡ Performance Issues

### Slow Test Execution

**Pre-made Solution:**
```javascript
// Parallel test runner
async function runTestsParallel(tests, concurrency = 5) {
    const results = [];
    const running = new Set();
    
    for (const test of tests) {
        if (running.size >= concurrency) {
            await Promise.race(running);
        }
        
        const promise = runTest(test).then(result => {
            running.delete(promise);
            results.push(result);
        });
        
        running.add(promise);
    }
    
    await Promise.all(running);
    return results;
}
```

---

### High Memory Usage

**Pre-made Solution:**
```javascript
// Memory-efficient test runner
async function runWithMemoryLimit(tests, maxMemoryMB = 512) {
    for (const test of tests) {
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        
        if (used > maxMemoryMB) {
            console.log(`Memory limit reached (${used.toFixed(0)}MB). Forcing GC...`);
            if (global.gc) {
                global.gc();
            } else {
                console.warn('Run with --expose-gc for memory management');
            }
        }
        
        await test();
    }
}

// Run with: node --expose-gc your-script.js
```

---

## 🐳 Docker Issues

### Error: `Cannot connect to Docker daemon`

**Solution:**
```bash
# Start Docker service
sudo systemctl start docker

# Or on Mac
open -a Docker

# Verify
docker info
```

---

### Error: `Image build failed`

**Pre-made Solution - Multi-stage build:**
```dockerfile
# Use this optimized Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('./index.js').healthCheck()" || exit 1

CMD ["node", "index.js"]
```

---

## 🔐 License Issues

### Error: `License validation failed`

**Causes & Solutions:**

| Error | Cause | Solution |
|-------|-------|----------|
| `INVALID_FORMAT` | Wrong key format | Check format: `MM-XXXX-XXXX-XXXX` |
| `EXPIRED` | License expired | Renew at revolut.me/dimitar7776 |
| `NETWORK_ERROR` | Can't reach server | Check internet, try offline mode |
| `DOMAIN_MISMATCH` | Wrong domain | Contact for domain update |

**Offline Fallback:**
```javascript
// Use with .env file
// qantum_LICENSE=MM-XXXX-XXXX-XXXX
// qantum_OFFLINE=true

const mm = require('./index.js');
const license = process.env.qantum_LICENSE;
const offline = process.env.qantum_OFFLINE === 'true';

const config = { 
    licenseKey: license,
    offlineMode: offline  // Skip online validation
};
```

---

## 🆘 Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Search [GitHub Issues](https://github.com/papica777-eng/QA-Framework/issues)
3. ✅ Run diagnostics: `npm run validate`
4. ✅ Check you're using latest version

### Collect Debug Information

```bash
# Generate debug report
node -e "
const os = require('os');
const pkg = require('./package.json');
console.log('=== QANTUM Debug Report ===');
console.log('Version:', pkg.version);
console.log('Node:', process.version);
console.log('OS:', os.platform(), os.release());
console.log('Memory:', Math.round(os.freemem() / 1024 / 1024), 'MB free');
console.log('CPUs:', os.cpus().length);
" > debug-report.txt
```

### Contact Support

- **GitHub Issues:** https://github.com/papica777-eng/QA-Framework/issues
- **Email:** papica777.eng@gmail.com
- **Priority Support:** Available for commercial license holders

---

## 📋 Error Code Reference

| Code | Description | Solution |
|------|-------------|----------|
| `MM001` | Module not initialized | Call `.initialize()` first |
| `MM002` | Invalid configuration | Check config object structure |
| `MM003` | Network timeout | Increase timeout or check connection |
| `MM004` | Authentication failed | Verify credentials |
| `MM005` | Rate limit exceeded | Use rate limiter wrapper |
| `MM006` | Browser crash | Use ResilientBrowser wrapper |
| `MM007` | Memory exceeded | Increase heap size or use chunks |
| `MM008` | License invalid | Check license format and status |
| `MM009` | File not found | Verify paths are correct |
| `MM010` | Permission denied | Check file/folder permissions |

---

*Last updated: December 2025*
