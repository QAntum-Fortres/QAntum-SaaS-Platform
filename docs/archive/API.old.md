# 📖 QANTUM API Reference

Complete documentation for all public methods.

---

## Table of Contents

- [QAntum (Core)](#misterwind-core)
- [PlaywrightProfessor](#playwrightprofessor)
- [SelectorBridge](#selectorbridge)
- [SupervisorAgent](#supervisoragent)
- [LearningMemory](#learningmemory)

---

## QAntum (Core)

The main class for browser automation.

### Constructor

```javascript
const QAntum = require('./qantum-core.js');
const mm = new QAntum(options);
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `headless` | boolean | `false` | Run browser without GUI |
| `aiEnabled` | boolean | `false` | Enable AI self-healing |

---

### Methods

#### `initialize()`

Start the browser.

```javascript
await mm.initialize();
```

**Returns:** `Promise<QAntum>` - The instance for chaining

---

#### `goto(url)`

Navigate to a URL.

```javascript
await mm.goto('https://example.com');
```

**Parameters:**
- `url` (string) - The URL to navigate to

**Returns:** `Promise<QAntum>`

---

#### `click(selector)`

Click an element.

```javascript
await mm.click('#submit-button');
await mm.click('.btn-primary');
await mm.click('Sign In');  // By text
```

**Parameters:**
- `selector` (string) - CSS selector, XPath, or text

**Returns:** `Promise<QAntum>`

---

#### `type(selector, text)`

Type text into an input field.

```javascript
await mm.type('#email', 'user@example.com');
await mm.type('[name="password"]', 'secret123');
```

**Parameters:**
- `selector` (string) - Element selector
- `text` (string) - Text to type

**Returns:** `Promise<QAntum>`

---

#### `screenshot(name)`

Take a screenshot.

```javascript
const filepath = await mm.screenshot('login-page');
// Saved to: screenshots/login-page_2025-12-27T10-30-00.png
```

**Parameters:**
- `name` (string) - Screenshot name prefix

**Returns:** `Promise<string>` - Path to saved file

---

#### `wait(ms)`

Wait for specified milliseconds.

```javascript
await mm.wait(2000); // Wait 2 seconds
```

**Parameters:**
- `ms` (number) - Milliseconds to wait

**Returns:** `Promise<QAntum>`

---

#### `getTitle()`

Get the page title.

```javascript
const title = await mm.getTitle();
console.log(title); // "Google"
```

**Returns:** `Promise<string>`

---

#### `getUrl()`

Get the current URL.

```javascript
const url = await mm.getUrl();
console.log(url); // "https://google.com"
```

**Returns:** `Promise<string>`

---

#### `close()`

Close the browser.

```javascript
await mm.close();
```

**Returns:** `Promise<QAntum>`

---

## PlaywrightProfessor

Modern browser automation with Playwright.

### Constructor

```javascript
const { PlaywrightProfessor } = require('./playwright-professor.js');
const professor = new PlaywrightProfessor(options);
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `headless` | boolean | `true` | Run without GUI |
| `browserType` | string | `'chromium'` | 'chromium', 'firefox', 'webkit' |
| `device` | string | `null` | Device to emulate (e.g., 'iPhone 12') |
| `recordVideo` | boolean | `false` | Record video |
| `tracing` | boolean | `true` | Enable trace collection |

---

### Methods

#### `initialize()`

Start the browser and enable tracing.

```javascript
await professor.initialize();
```

---

#### `goto(url)`

Navigate to URL with auto-wait.

```javascript
await professor.goto('https://github.com');
```

---

#### `smartClick(role, name)`

Click using accessible role (most stable).

```javascript
await professor.smartClick('button', 'Submit');
await professor.smartClick('link', 'Sign up');
await professor.smartClick('checkbox', 'I agree');
```

**Parameters:**
- `role` (string) - ARIA role: 'button', 'link', 'textbox', 'checkbox', etc.
- `name` (string) - Accessible name or text

---

#### `smartType(role, name, text)`

Type into an input by role.

```javascript
await professor.smartType('textbox', 'Email', 'user@example.com');
```

---

#### `clickByText(text)`

Click element by visible text.

```javascript
await professor.clickByText('Continue');
```

---

#### `close(saveTrace)`

Close browser and optionally save trace.

```javascript
await professor.close(true); // Save trace
// View trace: npx playwright show-trace traces/session-xxx.zip
```

---

## SelectorBridge

Convert Selenium selectors to Playwright.

### Static Methods

#### `convert(seleniumSelector)`

Convert a single selector.

```javascript
const { SelectorBridge } = require('./playwright-professor.js');

const result = SelectorBridge.convert('#submit-btn');
console.log(result[0].playwright);
// "page.locator('#submit-btn')"
```

---

#### `convertSeleniumCode(code)`

Convert Selenium code to Playwright.

```javascript
const selenium = `
await driver.findElement(By.linkText('Sign up')).click();
await driver.findElement(By.name('email')).sendKeys('test@test.com');
`;

const playwright = SelectorBridge.convertSeleniumCode(selenium);
console.log(playwright);
// await page.getByRole('link', { name: 'Sign up' }).click();
// await page.locator('[name="email"]').fill('test@test.com');
```

---

## SupervisorAgent

Watches tests and fixes mistakes instantly.

```javascript
const SupervisorAgent = require('./supervisor-agent.js');
const supervisor = new SupervisorAgent();

// Watch your test execution
supervisor.watch(async () => {
    await mm.goto('https://example.com');
    await mm.click('#button');
});
```

---

## LearningMemory

Self-learning memory that remembers fixes.

```javascript
const LearningMemory = require('./learning-memory.js');
const memory = new LearningMemory();

// Store a fix
memory.rememberFix({
    selector: '#old-button',
    newSelector: '[data-testid="submit"]',
    context: 'Login page'
});

// Get recommendation
const fix = memory.getSuggestion('#old-button');
```

---

## Examples

### Full Test Example

```javascript
const QAntum = require('./qantum-core.js');

(async () => {
    const mm = new QAntum({ headless: false });
    await mm.initialize();
    
    // Go to Google
    await mm.goto('https://google.com');
    
    // Search
    await mm.type('[name="q"]', 'QANTUM QA');
    await mm.click('input[name="btnK"]');
    
    // Wait for results
    await mm.wait(2000);
    
    // Screenshot
    await mm.screenshot('search-results');
    
    // Verify
    const title = await mm.getTitle();
    console.log('Search results for:', title);
    
    await mm.close();
})();
```

### Playwright Modern Test

```javascript
const { PlaywrightProfessor } = require('./playwright-professor.js');

(async () => {
    const professor = new PlaywrightProfessor({
        headless: false,
        device: 'iPhone 12'  // Mobile testing
    });
    
    await professor.initialize();
    await professor.goto('https://github.com');
    await professor.smartClick('link', 'Sign up');
    await professor.close(true);
})();
```

---

## Error Handling

All methods may throw errors. Always use try-catch:

```javascript
try {
    await mm.click('#nonexistent');
} catch (error) {
    console.error('Click failed:', error.message);
    await mm.screenshot('error-state');
}
```

---

## Need Help?

- 📖 [Quick Start Guide](./QUICK-START.md)
- 💬 [GitHub Issues](https://github.com/papica777-eng/QA-Framework/issues)
- 💰 [Buy Pro License](https://revolut.me/dimitar7776)
