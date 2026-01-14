# 🚀 QANTUM - Quick Start Guide

**Get your first AI-powered test running in 5 minutes!**

---

## Prerequisites

Before you start, make sure you have:

- ✅ Node.js 18+ installed ([download](https://nodejs.org))
- ✅ Chrome browser installed
- ✅ (Optional) Ollama for AI features ([download](https://ollama.ai))

---

## Step 1: Install QANTUM

```bash
# Clone the repository
git clone https://github.com/papica777-eng/QA-Framework.git
cd QA-Framework

# Install dependencies
npm install
```

**Test it:** Run `npm --version` - should show 8+

---

## Step 2: Run Your First Test

Create a file called `my-first-test.js`:

```javascript
const QAntum = require('./qantum-core.js');

(async () => {
    // Initialize
    const mm = new QAntum();
    await mm.initialize();
    
    // Open Google
    await mm.goto('https://google.com');
    
    // Take screenshot
    await mm.screenshot('my-first-test');
    
    // Close
    await mm.close();
    
    console.log('✅ Test passed!');
})();
```

**Run it:**
```bash
node my-first-test.js
```

**Expected output:**
```
✅ Test passed!
Screenshot saved: screenshots/my-first-test-[timestamp].png
```

---

## Step 3: Enable AI Features (Optional)

For self-healing and smart element detection:

```bash
# Install Ollama
# Windows: Download from https://ollama.ai

# Pull the vision model
ollama pull llava

# Verify it's running
ollama list
```

Now your tests will automatically:
- 🔧 Self-heal broken selectors
- 👁️ Use vision AI to find elements
- 🧠 Learn from failures

---

## Step 4: Use Playwright Professor Mode

For modern web apps (React, Vue, Angular):

```javascript
const { PlaywrightProfessor } = require('./playwright-professor.js');

(async () => {
    const professor = new PlaywrightProfessor({ headless: false });
    await professor.initialize();
    
    // Navigate
    await professor.goto('https://github.com');
    
    // Smart click using role-based locator
    await professor.smartClick('link', 'Sign up');
    
    // Close with trace
    await professor.close(true);
})();
```

**Advantages:**
- Auto-waiting (no more flaky tests!)
- Shadow DOM support
- 3x faster than Selenium

---

## Common Commands

| Action | Code |
|--------|------|
| Open URL | `await mm.goto('https://example.com')` |
| Click | `await mm.click('#button')` |
| Type | `await mm.type('#input', 'text')` |
| Screenshot | `await mm.screenshot('name')` |
| Wait | `await mm.wait(2000)` |

---

## Troubleshooting

### "ChromeDriver not found"
```bash
npm install chromedriver --save
```

### "Ollama connection refused"
```bash
# Start Ollama service
ollama serve
```

### "Element not found"
Enable AI self-healing:
```javascript
const mm = new QAntum({ aiEnabled: true });
```

---

## Next Steps

- 📖 [API Documentation](./API.md)
- 🎯 [Examples](../examples/)
- 💬 [Get Support](https://github.com/papica777-eng/QA-Framework/issues)

---

## Need Help?

- 📧 Create an issue on GitHub
- 💰 [Buy Pro License](https://revolut.me/dimitar7776) for priority support

---

**Happy Testing! 🎉**

*QANTUM v9.0 - The Never-Fail Engine*
