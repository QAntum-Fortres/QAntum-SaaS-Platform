# 🚀 Quick Start Guide

Get up and running with QANTUM in under 5 minutes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Your First Test](#your-first-test)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Prerequisites

Before installing QANTUM, ensure you have:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | 18.0+ | `node --version` |
| npm | 8.0+ | `npm --version` |
| Git | Any | `git --version` |

### Optional (for browser testing)

| Tool | Purpose |
|------|---------|
| Chrome | Selenium/Playwright tests |
| Firefox | Cross-browser testing |
| Docker | Isolated environments |

---

## Installation

### Option 1: Clone from GitHub (Recommended)

```bash
# Clone the repository
git clone https://github.com/papica777-eng/QA-Framework.git

# Navigate to directory
cd QA-Framework

# Install dependencies
npm install

# Verify installation
npm run validate
```

### Option 2: npm (Coming Soon)

```bash
npm install qantum
```

### Verify Installation

```bash
# Check all modules load correctly
node -e "const mm = require('./index.js'); console.log('Version:', mm.VERSION); console.log('Modules:', mm.getModuleStatus());"
```

Expected output:
```
Version: 15.1.0
Modules: { chronos: true, apiSensei: true, omniscient: true, ... }
```

---

## Your First Test

### Example 1: API Testing with API Sensei

Create a file `my-first-api-test.js`:

```javascript
const mm = require('./index.js');

async function main() {
    console.log('🥋 Starting API Sensei demo...\n');
    
    // Create API Sensei instance
    const api = mm.createAPISensei({ 
        baseURL: 'https://jsonplaceholder.typicode.com' 
    });
    
    // GET request
    console.log('📡 Testing GET /posts/1...');
    const post = await api.get('/posts/1');
    console.log('✅ Status:', post.status);
    console.log('📝 Title:', post.data.title);
    
    // POST request
    console.log('\n📡 Testing POST /posts...');
    const newPost = await api.post('/posts', {
        title: 'Test Post',
        body: 'Created by QANTUM',
        userId: 1
    });
    console.log('✅ Created post ID:', newPost.data.id);
    
    // Print report
    console.log('\n📊 Test Report:');
    api.printReport();
}

main().catch(console.error);
```

Run it:
```bash
node my-first-api-test.js
```

### Example 2: Browser Automation

Create a file `my-first-browser-test.js`:

```javascript
const mm = require('./index.js');
const { chromium } = require('playwright');

async function main() {
    console.log('🎭 Starting browser test...\n');
    
    // Launch browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // Navigate
    await page.goto('https://www.google.com');
    console.log('✅ Opened Google');
    
    // Take screenshot
    await page.screenshot({ path: 'screenshots/google.png' });
    console.log('📸 Screenshot saved');
    
    // Close
    await browser.close();
    console.log('\n✅ Test completed!');
}

main().catch(console.error);
```

### Example 3: Using CHRONOS for Predictions

```javascript
const mm = require('./index.js');

async function main() {
    console.log('⏰ Starting CHRONOS Engine...\n');
    
    // Create CHRONOS instance
    const chronos = mm.createChronos();
    
    // Initialize (loads historical data)
    await chronos.initialize();
    console.log('✅ CHRONOS initialized');
    
    // Get predictions
    const predictions = await chronos.predictFailures({ hours: 24 });
    
    console.log('\n🔮 Predictions for next 24 hours:');
    predictions.forEach(p => {
        console.log(`  - ${p.test}: ${(p.probability * 100).toFixed(0)}% chance of failure`);
        console.log(`    Reason: ${p.reason}`);
    });
}

main().catch(console.error);
```

---

## Common Use Cases

### REST API Testing

```javascript
const api = mm.createAPISensei({ baseURL: 'https://api.example.com' });

// With authentication
api.setBearerToken('your-token');

// GET with query params
await api.get('/users', { params: { page: 1, limit: 10 } });

// POST with body
await api.post('/users', { name: 'John', email: 'john@example.com' });

// PUT update
await api.put('/users/1', { name: 'John Updated' });

// DELETE
await api.delete('/users/1');
```

### GraphQL Testing

```javascript
const api = mm.createAPISensei({ baseURL: 'https://api.example.com/graphql' });

const query = `
    query GetUser($id: ID!) {
        user(id: $id) {
            name
            email
        }
    }
`;

const result = await api.graphql(query, { id: '1' });
```

### Security Scanning

```javascript
const scanner = mm.createSecurityScanner({
    targetURL: 'https://your-app.com'
});

// Quick scan (common vulnerabilities)
const quickReport = await scanner.quickScan();

// Full scan (all tests)
const fullReport = await scanner.fullScan();

// Export report
scanner.exportReport('security-report.html', 'html');
```

### Voice Testing

```javascript
const voice = mm.createVoice();

// English commands
await voice.processCommand(page, 'navigate to google.com');
await voice.processCommand(page, 'type "hello world" in search box');
await voice.processCommand(page, 'click search button');

// Bulgarian commands 🇧🇬
await voice.processCommand(page, 'отвори google.com');
await voice.processCommand(page, 'напиши "тест" в полето за търсене');
```

---

## Troubleshooting

### Common Issues

#### "Module not found" error

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

#### Chrome/Playwright not working

```bash
# Install Playwright browsers
npx playwright install
```

#### Zombie browser processes

```bash
# Kill all browser processes
npm run clean:processes
```

#### TypeScript errors

```bash
# Check types
npm run typecheck

# Rebuild
npm run build
```

### Debug Mode

Enable verbose logging:

```javascript
// Set environment variable
process.env.qantum_DEBUG = 'true';

const mm = require('./index.js');
```

Or:

```bash
qantum_DEBUG=true node my-test.js
```

---

## Next Steps

Now that you have QANTUM running:

1. **Explore the API** - See [API.md](API.md) for all available methods
2. **Try Voice Testing** - Run `npm run demo:nexus`
3. **Set up CHRONOS** - Start collecting test patterns
4. **Add Security Scans** - Integrate into your CI/CD

### Recommended Reading

- [API Reference](API.md) - Full documentation
- [CHRONOS Engine Guide](CHRONOS.md) - Prediction setup
- [API Sensei Guide](API-SENSEI.md) - Advanced API testing
- [Security Scanner Guide](SECURITY.md) - DAST configuration

---

## Getting Help

- 📖 [Full Documentation](https://github.com/papica777-eng/QA-Framework/docs)
- 🐛 [Report Issues](https://github.com/papica777-eng/QA-Framework/issues)
- 💬 [Discussions](https://github.com/papica777-eng/QA-Framework/discussions)

---

**Happy Testing! 🧪**
