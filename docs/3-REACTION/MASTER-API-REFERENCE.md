# 🧠 QANTUM v15.1 - THE CHRONOS ENGINE

## Master API Reference

> **The Complete Developer's Guide to Every Module, Method, and Edge Case**

---

## 📋 Table of Contents

1. [🕐 Chronos Engine](#-chronos-engine)
2. [🥋 API Sensei](#-api-sensei)
3. [👁️ Omniscient (Hive Mind)](#️-omniscient-hive-mind)
4. [👑 Sovereign Agent](#-sovereign-agent)
5. [🛡️ Neuro Sentinel](#️-neuro-sentinel)
6. [🔗 Nexus Engine](#-nexus-engine)
7. [⚛️ Quantum Core](#️-quantum-core)
8. [🎭 Playwright Professor](#-playwright-professor)
9. [🏭 Factory Functions](#-factory-functions)
10. [📊 TypeScript Types](#-typescript-types)
11. [⚠️ Error Handling](#️-error-handling)
12. [🔧 Configuration Reference](#-configuration-reference)

---

## 🕐 Chronos Engine

*"Perpetual Heuristic Evolution & Predictive Adaptation"*

The Chronos Engine is the brain of QANTUM - it learns from every test execution and predicts future failures before they happen.

### Import

```javascript
const { createChronos, QAntumChronos } = require('qantum');
```

### Constructor

```javascript
const chronos = createChronos(config);
// or
const chronos = new QAntumChronos(config);
```

#### Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dataDir` | `string` | `'./chronos-data'` | Directory for learning data storage |
| `autoLearn` | `boolean` | `true` | Enable automatic learning from executions |
| `predictOnInit` | `boolean` | `true` | Generate predictions on initialization |
| `saveInterval` | `number` | `60000` | Auto-save interval in ms (0 to disable) |
| `lookAheadSteps` | `number` | `5` | N-step look-ahead for strategic decisions |
| `simulationSamples` | `number` | `10` | Monte Carlo simulation samples |

---

### Methods

#### `learnFromExecution(executionContext)`

Records test execution results and updates the learning matrix.

```javascript
await chronos.learnFromExecution({
  success: false,
  task: 'login-test',
  domain: 'e-commerce',
  framework: 'playwright',
  usedStrategy: 'ID',
  failureReason: 'Element not found',
  healedWith: 'DATA_TESTID',
  duration: 1500
});
```

**Returns:** `{ learned: boolean, matrixUpdated: boolean, chronosUpdated: boolean }`

##### Edge Case Examples

```javascript
// Edge Case 1: Empty execution context
await chronos.learnFromExecution({});
// Returns: { learned: true, matrixUpdated: false, chronosUpdated: false }

// Edge Case 2: Success without strategy
await chronos.learnFromExecution({
  success: true,
  task: 'simple-test'
});
// Learns success but doesn't update selector strategy

// Edge Case 3: Failure without healing
await chronos.learnFromExecution({
  success: false,
  usedStrategy: 'XPATH',
  failureReason: 'Timeout'
});
// Records failure pattern, recommends alternatives next time
```

---

#### `predictFuture(element, context)`

Predicts future changes for an element using Monte Carlo simulations.

```javascript
const predictions = chronos.predictFuture(
  { selector: '#login-btn', type: 'button' },
  { domain: 'banking', framework: 'react' }
);

console.log(predictions);
// {
//   elementSimulations: [...],
//   globalPredictions: [...],
//   riskAssessment: { level: 'MEDIUM', breakdown: {...} },
//   recommendations: [...]
// }
```

##### Edge Case Examples

```javascript
// Edge Case 1: Unknown element type
const result = chronos.predictFuture({ selector: 'custom-element' });
// Uses default heuristics, lower confidence

// Edge Case 2: High-risk selector (class-based)
const result = chronos.predictFuture(
  { selector: '.btn-primary', type: 'button' }
);
// Returns HIGH risk - recommends switching to data-testid

// Edge Case 3: Shadow DOM element
const result = chronos.predictFuture(
  { selector: '>>> .shadow-element', shadowRoot: true }
);
// Applies shadow DOM mutation patterns
```

---

#### `makeStrategicDecision(context, availableOptions)`

Makes optimal decisions using N-Step Look-ahead (MPC + MCTS algorithms).

```javascript
const decision = await chronos.makeStrategicDecision(
  { 
    domain: 'e-commerce',
    framework: 'angular',
    pageType: 'checkout'
  },
  [
    { type: 'ID', selector: '#pay-btn', speed: 5 },
    { type: 'DATA_TESTID', selector: '[data-testid="pay"]', speed: 10 },
    { type: 'XPATH', selector: '//button[text()="Pay"]', speed: 15 }
  ]
);

console.log(decision.action);
// { type: 'DATA_TESTID', ... } - slower but survives 8/8 future worlds
```

##### Edge Case Examples

```javascript
// Edge Case 1: Single option available
const decision = await chronos.makeStrategicDecision(context, [
  { type: 'ID', selector: '#only-option' }
]);
// Returns the only option with 100% confidence

// Edge Case 2: All options high-risk
const decision = await chronos.makeStrategicDecision(context, [
  { type: 'XPATH', selector: '//div[3]/span' },
  { type: 'CSS_PATH', selector: 'div > span:nth-child(2)' }
]);
// Returns least-bad option with warning

// Edge Case 3: Empty options array
const decision = await chronos.makeStrategicDecision(context, []);
// Throws: 'No available options for strategic decision'
```

---

#### `getOptimalStrategy(context)`

Returns the best strategy for a given context based on learned patterns.

```javascript
const strategy = chronos.getOptimalStrategy({
  domain: 'healthcare',
  framework: 'vue',
  elementType: 'input'
});

// Returns:
// {
//   selector: { primary: 'DATA_TESTID', confidence: 0.94, ... },
//   wait: { primary: 'NETWORK_IDLE', ... },
//   healing: { primary: 'FALLBACK_CHAIN', ... }
// }
```

---

#### `getHealthStatus()`

Returns health status of all internal components.

```javascript
const health = chronos.getHealthStatus();
// {
//   chronos: { status: 'HEALTHY', healthScore: 1.0 },
//   simulator: { status: 'HEALTHY', healthScore: 1.0 },
//   matrix: { status: 'HEALTHY', healthScore: 1.0 },
//   singularity: { status: 'HEALTHY', healthScore: 1.0 }
// }
```

---

#### `saveState()` / `loadState()`

Persist and restore learned knowledge.

```javascript
// Save current learning state
await chronos.saveState();

// Load previously saved state
await chronos.loadState();
```

---

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `lessonLearned` | `{ task, strategy, outcome }` | Emitted after learning from execution |
| `predictionsGenerated` | `Prediction[]` | Emitted when new predictions are generated |
| `strategicDecision` | `{ action, survivalScore }` | Emitted after making a strategic decision |
| `componentRepaired` | `{ component, repairType }` | Emitted when self-healing kicks in |

```javascript
chronos.on('lessonLearned', (lesson) => {
  console.log(`Learned: ${lesson.task} - ${lesson.outcome}`);
});

chronos.on('predictionsGenerated', (predictions) => {
  predictions.forEach(p => console.log(`⚠️ ${p.message}`));
});
```

---

## 🥋 API Sensei

*"Master the Art of API Testing"*

Complete REST & GraphQL testing solution with fluent chainable API.

### Import

```javascript
const { createApiSensei, APISensei } = require('qantum');
```

### Constructor

```javascript
const api = createApiSensei({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

#### Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseURL` / `baseUrl` | `string` | `''` | Base URL for all requests |
| `timeout` | `number` | `30000` | Request timeout in ms |
| `retries` | `number` | `3` | Number of retry attempts |
| `retryDelay` | `number` | `1000` | Delay between retries in ms |
| `headers` | `object` | `{}` | Default headers for all requests |

---

### Authentication Methods

#### `setBasicAuth(username, password)`

```javascript
api.setBasicAuth('user', 'pass123');
```

#### `setBearerToken(token)`

```javascript
api.setBearerToken('eyJhbGciOiJIUzI1NiIs...');
```

#### `setApiKey(key, headerName?)`

```javascript
api.setApiKey('sk-abc123', 'X-API-Key');
// or with custom header
api.setApiKey('secret', 'Authorization');
```

#### `setJWT(token)`

```javascript
api.setJWT('eyJhbGciOiJIUzI1NiIs...');
```

##### Edge Case Examples

```javascript
// Edge Case 1: Empty token
api.setBearerToken('');
// Sets header as "Bearer " - may cause 401

// Edge Case 2: Token with Bearer prefix already
api.setBearerToken('Bearer eyJ...');
// Results in "Bearer Bearer eyJ..." - WRONG!
// Use: api.setBearerToken('eyJ...'); without prefix

// Edge Case 3: Switching auth mid-session
api.setBasicAuth('user', 'pass');
await api.get('/protected');
api.setBearerToken('new-token'); // Replaces Basic auth
await api.get('/protected'); // Uses Bearer now
```

---

### HTTP Methods

#### `get(endpoint, options?)`

```javascript
const response = await api.get('/users', {
  params: { page: 1, limit: 10 },
  headers: { 'Accept': 'application/json' }
});
```

#### `post(endpoint, body, options?)`

```javascript
const response = await api.post('/users', {
  name: 'John',
  email: 'john@example.com'
});
```

#### `put(endpoint, body, options?)`

```javascript
const response = await api.put('/users/123', {
  name: 'John Updated'
});
```

#### `patch(endpoint, body, options?)`

```javascript
const response = await api.patch('/users/123', {
  status: 'active'
});
```

#### `delete(endpoint, options?)`

```javascript
const response = await api.delete('/users/123');
```

---

### Response Object

All HTTP methods return a standardized response:

```typescript
interface APIResponse {
  success: boolean;           // true if status 2xx
  status: number;             // HTTP status code
  statusText: string;         // 'OK', 'Not Found', etc.
  headers: object;            // Response headers
  data: any;                  // Parsed response body
  responseTime: number;       // Time in ms
  request: {
    method: string;
    url: string;
    headers: object;
    body?: any;
  };
  error?: string;             // Error message if failed
}
```

##### Edge Case Examples

```javascript
// Edge Case 1: Non-JSON response
const html = await api.get('/page.html');
// data will be raw string, not parsed

// Edge Case 2: Empty response body (204 No Content)
const deleted = await api.delete('/users/123');
// { success: true, status: 204, data: '' }

// Edge Case 3: Server error with JSON body
const error = await api.post('/invalid', {});
// { success: false, status: 500, data: { error: 'message' } }

// Edge Case 4: Network timeout
const timeout = await api.get('/slow-endpoint', { timeout: 100 });
// { success: false, error: 'Request timeout', responseTime: 100 }

// Edge Case 5: Invalid JSON response
const broken = await api.get('/broken-json');
// data will be raw string when JSON.parse fails
```

---

### Validation Methods

#### `validateSchema(response, schema)`

Validate response against JSON Schema.

```javascript
const schema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' }
  }
};

const validation = api.validateSchema(response, schema);
// { valid: true, errors: [] }
// or
// { valid: false, errors: ['email: must be valid email format'] }
```

---

### Chainable Assertions (Fluent API)

```javascript
await api
  .get('/users/123')
  .expect(200)
  .expectHeader('Content-Type', /json/)
  .expectBody({ id: 123 })
  .expectResponseTime(500);
```

##### Edge Case Examples

```javascript
// Edge Case 1: Multiple status codes acceptable
await api.get('/resource')
  .expect([200, 201, 204]); // Passes if any match

// Edge Case 2: Partial body match
await api.get('/user')
  .expectBody({ name: 'John' }); // Ignores other fields

// Edge Case 3: Regex header match
await api.get('/data')
  .expectHeader('X-Request-ID', /^[a-f0-9-]{36}$/);
```

---

### Metrics

```javascript
const metrics = api.getMetrics();
// {
//   totalRequests: 150,
//   successfulRequests: 142,
//   failedRequests: 8,
//   avgResponseTime: 234,
//   responseTimes: [...]
// }
```

---

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `request:start` | `{ method, url, options }` | Before request is sent |
| `request:complete` | `APIResponse` | After successful response |
| `request:error` | `{ error, request }` | On request failure |

---

## 👁️ Omniscient (Hive Mind)

*"Вижда бъдещето. Предотвратява грешките преди да се случат."*

Multi-agent system with Future Minding capabilities.

### Import

```javascript
const { HiveMind, FutureMindingEngine, CollectiveIntelligence } = require('qantum');
```

### Constructor

```javascript
const hive = new HiveMind({
  agentCount: 3,
  mutualOversight: true,
  futureMinding: true
});
```

---

### Methods

#### `predictFuture(metrics, agentStates)`

Analyzes current state and predicts future problems.

```javascript
const predictions = hive.predictFuture({
  memory: [{ heapUsed: 100 }, { heapUsed: 150 }, ...],
  responseTime: [200, 250, 300, 400],
  errorRate: [0, 1, 3, 5]
}, agentStates);

// Returns predictions like:
// [{
//   pattern: 'MEMORY_LEAK_PATTERN',
//   message: 'Memory leak detected - crash likely in 5-10 minutes',
//   severity: 'critical',
//   preventiveAction: 'TRIGGER_GC_AND_ALERT',
//   confidence: 0.87
// }]
```

##### Known Patterns Detected

| Pattern | Trigger | Severity | Action |
|---------|---------|----------|--------|
| `MEMORY_LEAK_PATTERN` | Heap growing >5%/cycle | Critical | Trigger GC |
| `RESPONSE_DEGRADATION` | Response time >2x baseline | High | Scale up |
| `ERROR_RATE_SPIKE` | Increasing errors >5% | Critical | Circuit breaker |
| `CONNECTION_EXHAUSTION` | Pool >80% used | High | Cleanup idle |
| `DISK_SPACE_CRITICAL` | Disk >90% full | Critical | Cleanup temp |

##### Edge Case Examples

```javascript
// Edge Case 1: Insufficient data points
const result = hive.predictFuture({
  memory: [{ heapUsed: 100 }] // Only 1 data point
});
// Returns empty predictions - needs minimum 10 points

// Edge Case 2: Conflicting signals
const result = hive.predictFuture({
  memory: [100, 90, 80, 70], // Decreasing (good)
  errorRate: [1, 2, 4, 8]   // Increasing (bad)
});
// Returns error rate warning but not memory warning

// Edge Case 3: All metrics healthy
const result = hive.predictFuture({
  memory: [100, 100, 100],
  responseTime: [200, 200, 200],
  errorRate: [0, 0, 0]
});
// Returns: [] (no predictions needed)
```

---

#### `deployAgent(type, config)`

Deploys a specialized agent.

```javascript
const sentinel = hive.deployAgent('SENTINEL', {
  watchInterval: 5000,
  alertThreshold: 0.8
});

const guardian = hive.deployAgent('GUARDIAN', {
  protectAgainst: ['XSS', 'SQL_INJECTION']
});

const oracle = hive.deployAgent('ORACLE', {
  predictionHorizon: '24h'
});
```

##### Agent Types

| Type | Purpose | Capabilities |
|------|---------|--------------|
| `SENTINEL` | Monitoring | Real-time health checks, anomaly detection |
| `GUARDIAN` | Security | Threat detection, vulnerability scanning |
| `ORACLE` | Prediction | Future state prediction, risk assessment |

---

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `prediction` | `Prediction` | New prediction generated |
| `agentConflict` | `{ agents, reason }` | Agents have conflicting opinions |
| `cascadeRisk` | `{ risk, affectedAgents }` | Cascade failure risk detected |

---

## 👑 Sovereign Agent

*"Autonomous Discovery & Security-Aware Testing"*

AI Test Writer that crawls, analyzes, and generates tests automatically.

### Import

```javascript
const { SovereignAgent, ApplicationMapper, SecurityEngine } = require('qantum');
```

### Constructor

```javascript
const sovereign = new SovereignAgent({
  maxDepth: 3,
  maxPages: 50,
  securityEnabled: true
});
```

---

### Methods

#### `scanApplication(baseUrl, options?)`

Crawls and maps entire application structure.

```javascript
const appMap = await sovereign.scanApplication('https://example.com', {
  maxDepth: 3,
  maxPages: 50,
  followExternalLinks: false
});

// Returns:
// {
//   baseUrl: 'https://example.com',
//   pages: ['/', '/about', '/contact', ...],
//   forms: [{ action: '/login', type: 'login', fields: [...] }],
//   links: [...],
//   flows: [{ name: 'User Login', steps: [...] }]
// }
```

##### Edge Case Examples

```javascript
// Edge Case 1: SPA with client-side routing
const spa = await sovereign.scanApplication('https://spa-app.com');
// May miss routes - use with Playwright for full discovery

// Edge Case 2: Authentication required
const protected = await sovereign.scanApplication('https://app.com/dashboard');
// Returns only publicly accessible pages
// Solution: Pass cookies in options

// Edge Case 3: Rate limiting
const limited = await sovereign.scanApplication('https://api-heavy.com');
// May get blocked - use delay option
```

---

#### `generateTests(appMap)`

Generates complete test suite from application map.

```javascript
const tests = sovereign.generateTests(appMap);

// Returns:
// {
//   pageObjects: { ... },  // Page Object Model files
//   testCases: [...],      // Individual test cases
//   testSuite: '...',      // Complete test file
//   securityTests: [...]   // Security-focused tests
// }
```

---

#### `identifyFormType(fields, action, html)`

Automatically identifies form purpose.

```javascript
const type = sovereign.identifyFormType(
  [{ name: 'email' }, { name: 'password' }],
  '/auth/login',
  '<form>...</form>'
);
// Returns: 'login'
```

##### Detected Form Types

| Type | Detection Criteria |
|------|-------------------|
| `login` | Has username/email + password fields |
| `registration` | Has confirm_password or action contains 'signup' |
| `search` | Has field named 'q', 's', or 'search' |
| `contact` | Has email + message fields |
| `checkout` | Has card/cvv fields or action contains 'payment' |
| `profile` | Action contains 'profile' or 'settings' |
| `generic` | Default when no pattern matches |

---

### SecurityEngine

Built-in security scanner that runs during functional tests.

```javascript
const security = new SecurityEngine();

// XSS Testing
const xssResults = await security.testXSS(page, formSelector);

// SQL Injection Testing
const sqlResults = await security.testSQLInjection(page, inputSelector);

// Full Security Scan
const fullReport = await security.fullScan(page, url);
```

##### Edge Case Examples

```javascript
// Edge Case 1: WAF blocking payloads
const results = await security.testXSS(page, '#input');
// Some payloads may be blocked - check for WAF signatures

// Edge Case 2: CSRF tokens
const results = await security.testCSRF(page, '/api/action');
// If token changes per request, will report false positive

// Edge Case 3: Rate limiting during security tests
const results = await security.fullScan(page, url, {
  delayBetweenTests: 1000 // 1 second between payloads
});
```

---

## 🛡️ Neuro Sentinel

*"Testing is Dead. Long Live Autonomous Resilience."*

World's first living immune system for software - self-healing shadow cloning.

### Import

```javascript
const { 
  NeuroSentinel,
  ShadowCloneEngine,
  ChaosEngine,
  GeneticSelfRepairEngine 
} = require('qantum');
```

### ShadowCloneEngine

Creates isolated mirror environments for testing.

```javascript
const shadows = new ShadowCloneEngine({
  maxClones: 5,
  basePort: 9000
});

// Create shadow environment
const clone = await shadows.createShadowClone(
  'https://production.com',
  'test-clone-1'
);

// clone.url = 'http://localhost:9001'
// Run dangerous tests without affecting production!
```

##### Edge Case Examples

```javascript
// Edge Case 1: Docker not available
const clone = await shadows.createShadowClone(url, 'test');
// Falls back to simulated environment (limited functionality)

// Edge Case 2: Max clones reached
// Already have 5 clones
const clone = await shadows.createShadowClone(url, 'sixth');
// Throws: 'Maximum shadow clones reached'

// Edge Case 3: Source environment unreachable
const clone = await shadows.createShadowClone('https://offline.com', 'test');
// Creates clone but health check will fail
```

---

### ChaosEngine

Injects controlled chaos to test resilience.

```javascript
const chaos = new ChaosEngine();

// Simulate network latency
await chaos.injectLatency(page, { min: 100, max: 500 });

// Simulate random failures
await chaos.injectFailures(page, { rate: 0.1 }); // 10% failure rate

// Simulate resource exhaustion
await chaos.exhaustMemory(page, { target: '80%' });

// Combined chaos scenario
await chaos.runChaosScenario(page, 'BLACK_FRIDAY_LOAD');
```

---

### GeneticSelfRepairEngine

Uses genetic algorithms to evolve test repairs.

```javascript
const healer = new GeneticSelfRepairEngine();

// Register failing test
const repaired = await healer.evolveRepair({
  test: 'login.spec.js',
  failure: 'Element #login-btn not found',
  context: { page, originalSelector: '#login-btn' }
});

// repaired.newSelector = '[data-testid="login-button"]'
// repaired.confidence = 0.94
// repaired.mutations = ['ID → DATA_TESTID']
```

---

## 🔗 Nexus Engine

*"Video-to-Test • Voice Testing • Self-Evolving Tests"*

### Import

```javascript
const { 
  createNexus,
  VideoToTestAI,
  ScreenshotToTestAI,
  PredictiveBugDetector,
  VoiceTestingEngine,
  SelfEvolvingTestEngine 
} = require('qantum');
```

---

### VideoToTestAI

Record your screen and generate complete Playwright tests.

```javascript
const video = new VideoToTestAI();

// Start recording
await video.startRecording(page);

// ... interact with your app ...
await page.click('#login');
await page.fill('#email', 'test@example.com');

// Stop and generate test
const testCode = await video.stopRecording();
// Returns complete Playwright test file
```

---

### ScreenshotToTestAI

Take a screenshot, AI suggests tests automatically.

```javascript
const screenshot = new ScreenshotToTestAI();

const analysis = await screenshot.analyzeScreenshot('login-page.png');
// {
//   elements: [{ type: 'button', text: 'Sign In', selector: '...' }, ...],
//   suggestedTests: ['Login with valid credentials', 'Login with invalid password', ...]
// }

const testCode = screenshot.generateFullTestSuite(analysis, 'login');
```

---

### VoiceTestingEngine

Just SPEAK and tests execute! Supports Bulgarian and English.

```javascript
const voice = new VoiceTestingEngine();

// English commands
await voice.processCommand(page, 'go to google.com');
await voice.processCommand(page, 'click the search button');
await voice.processCommand(page, 'type "hello" in search field');

// Bulgarian commands (Български)
await voice.processCommand(page, 'отвори google.com');
await voice.processCommand(page, 'кликни на бутон');
await voice.processCommand(page, 'напиши "hello" в полето за търсене');
```

##### Supported Voice Commands

| Action | English | Bulgarian |
|--------|---------|-----------|
| Navigate | `go to`, `open`, `navigate to` | `отвори`, `отиди на` |
| Click | `click`, `press`, `tap` | `кликни`, `натисни` |
| Type | `type`, `enter`, `write` | `напиши`, `въведи` |
| Wait | `wait`, `pause` | `изчакай`, `чакай` |
| Assert | `verify`, `check`, `expect` | `провери`, `очаквай` |

---

### SelfEvolvingTestEngine

Tests that fix themselves when UI changes!

```javascript
const evolve = new SelfEvolvingTestEngine();

await evolve.runWithEvolution(page, async (p) => {
  // If #old-button fails, it tries alternatives automatically!
  await p.click('#old-button');
}, 'my-test');

// After failure, it learns and updates selectors
const stats = evolve.getEvolutionStats();
// { testsHealed: 15, selectorsEvolved: 42, successRate: 0.98 }
```

##### Edge Case Examples

```javascript
// Edge Case 1: Element completely removed
await evolve.runWithEvolution(page, async (p) => {
  await p.click('#removed-element');
});
// Tries alternatives, if none work: marks test for human review

// Edge Case 2: Element moved to different page
await evolve.runWithEvolution(page, async (p) => {
  await p.click('#moved-button');
});
// Detects navigation change, suggests test update

// Edge Case 3: Multiple similar elements
await evolve.runWithEvolution(page, async (p) => {
  await p.click('.generic-button');
});
// Tries to find most unique alternative selector
```

---

## ⚛️ Quantum Core

*"Natural Language Tests • AI Test Generation • Visual AI"*

### Import

```javascript
const { 
  QAntumQuantum,
  NaturalLanguageEngine,
  AITestGenerator,
  VisualAIEngine,
  AutoDiscoveryEngine 
} = require('qantum');
```

---

### NaturalLanguageEngine

Write tests in plain Bulgarian or English!

```javascript
const quantum = new QAntumQuantum();

// Bulgarian test
const bgTest = `
Отвори google.com
Напиши "QANTUM" в полето за търсене
Кликни на бутон Търсене
Изчакай 2 секунди
Провери че страницата съдържа "резултати"
`;

const { steps, code } = quantum.parseNaturalLanguageTest(bgTest);
console.log(code); // Generated Playwright code!

// Execute directly
await quantum.runNaturalLanguageTest(page, bgTest);
```

##### Supported Actions

| English | Bulgarian | Generated Action |
|---------|-----------|------------------|
| `open URL` | `отвори URL` | `page.goto(URL)` |
| `click ELEMENT` | `кликни ELEMENT` | `page.click(selector)` |
| `type TEXT in FIELD` | `напиши TEXT в FIELD` | `page.fill(selector, TEXT)` |
| `wait N seconds` | `изчакай N секунди` | `page.waitForTimeout(N*1000)` |
| `verify TEXT` | `провери TEXT` | `expect(page).toContainText(TEXT)` |
| `take screenshot` | `направи снимка` | `page.screenshot()` |

---

### AITestGenerator

Generate tests from source code automatically.

```javascript
const generator = new AITestGenerator();

// From code string
const result = quantum.generateTestsFromCode(`
class UserService {
  async createUser(data) { ... }
  async deleteUser(id) { ... }
  async updateUser(id, data) { ... }
}
`, 'user-service.js');

// From file
const result = quantum.generateTestsFromFile('./src/services/user.js');

// result.tests contains generated test code
// result.coverage shows what's covered
```

---

### VisualAIEngine

Semantic visual testing (not pixel-perfect).

```javascript
// Capture baseline
await quantum.captureVisualBaseline(page, 'homepage');

// Later: compare with baseline
const diff = await quantum.compareVisual(page, 'homepage');
// {
//   match: false,
//   semanticChanges: ['Button color changed', 'New banner added'],
//   layoutChanges: ['Footer moved down'],
//   confidence: 0.87
// }

// Update baseline if changes are intentional
await quantum.updateVisualBaseline(page, 'homepage');
```

---

### AutoDiscoveryEngine

Zero-config test discovery from any URL.

```javascript
const discovery = await quantum.discoverTests(page, 'https://example.com');

// Returns:
// {
//   pages: [...],
//   forms: [...],
//   userFlows: [
//     { name: 'Login Flow', steps: [...] },
//     { name: 'Purchase Flow', steps: [...] }
//   ],
//   apiEndpoints: [...],
//   suggestedTests: [...]
// }
```

---

## 🎭 Playwright Professor

*"PhD-level Automation Excellence"*

Multi-engine platform with Selenium migration support.

### Import

```javascript
const PlaywrightProfessor = require('qantum').PlaywrightProfessor;
// or
const professor = require('qantum/playwright-professor');
```

---

### SelectorBridge

Convert Selenium selectors to Playwright.

```javascript
const { SelectorBridge } = require('qantum');

// Single conversion
const conversions = SelectorBridge.convert('#login-btn');
// [{
//   strategy: 'id',
//   playwright: "page.locator('#login-btn')",
//   alternative: "page.getByTestId('login-btn')",
//   confidence: 0.9
// }]

// Batch conversion
const results = SelectorBridge.convertBatch([
  '#login-btn',
  '.submit-button',
  "//div[@class='modal']//button",
  '[name="email"]'
]);

// Full Selenium code conversion
const playwrightCode = SelectorBridge.convertSeleniumCode(`
driver.findElement(By.id('email')).sendKeys('test@example.com');
driver.findElement(By.css('.submit')).click();
`);
// Returns Playwright-compatible code
```

##### Conversion Confidence Levels

| Selenium | Playwright | Confidence |
|----------|------------|------------|
| `By.id('x')` | `page.locator('#x')` | 0.9 |
| `By.name('x')` | `page.locator('[name="x"]')` | 0.85 |
| `By.css('.x')` | `page.locator('.x')` | 0.7 |
| `By.xpath('//...')` | `page.locator('xpath=...')` | 0.6 |
| `By.linkText('x')` | `page.getByRole('link', {name: 'x'})` | 0.95 |

---

### Device Emulation

```javascript
const professor = new PlaywrightProfessor();

// Built-in device presets
await professor.emulateDevice(page, 'iPhone 14');
await professor.emulateDevice(page, 'Pixel 5');
await professor.emulateDevice(page, 'iPad Pro');

// Custom viewport
await professor.setViewport(page, {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 2
});
```

---

### Network Interception

```javascript
// Mock API responses
await professor.mockAPI(page, '/api/users', {
  status: 200,
  body: [{ id: 1, name: 'Mock User' }]
});

// Block resources
await professor.blockResources(page, ['*.png', '*.gif', 'analytics.js']);

// Simulate offline
await professor.goOffline(page);
await professor.goOnline(page);

// Simulate slow network
await professor.throttleNetwork(page, '3G');
```

---

## 🏭 Factory Functions

Quick access to all modules via factory pattern.

```javascript
const mm = require('qantum');

// Create instances with default config
const chronos = mm.createChronos();
const api = mm.createApiSensei({ baseURL: 'https://api.example.com' });
const nexus = mm.createNexus();
const quantum = mm.createQuantum();
const voice = mm.createVoiceEngine();
const evolving = mm.createEvolvingEngine();
const sovereign = mm.createSovereign();
const sentinel = mm.createNeuroSentinel();

// Access classes directly
const { 
  QAntumChronos,
  APISensei,
  QAntumQuantum,
  SovereignAgent,
  NeuroSentinel,
  VoiceTestingEngine
} = mm;
```

---

## 📊 TypeScript Types

Full TypeScript support included.

```typescript
import type {
  // Chronos Types
  ChronosConfig,
  ExecutionContext,
  Prediction,
  StrategicDecision,
  
  // API Sensei Types
  APIConfig,
  APIResponse,
  AuthStrategy,
  
  // Common Types
  Selector,
  TestResult,
  HealthStatus
} from 'qantum';

// Example usage
const config: ChronosConfig = {
  dataDir: './data',
  autoLearn: true,
  lookAheadSteps: 5
};

const chronos = createChronos(config);
```

### Key Interfaces

```typescript
interface APIConfig {
  baseURL?: string;
  baseUrl?: string;  // Alias
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

interface APIResponse<T = any> {
  success: boolean;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: T;
  responseTime: number;
  error?: string;
}

interface ChronosConfig {
  dataDir?: string;
  autoLearn?: boolean;
  predictOnInit?: boolean;
  saveInterval?: number;
  lookAheadSteps?: number;
  simulationSamples?: number;
}

interface Prediction {
  id: string;
  pattern: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  preventiveAction: string;
  timeToImpact: string;
}

interface StrategicDecision {
  action: {
    type: string;
    selector: string;
    confidence: number;
  };
  evaluation: {
    survivalScore: number;
    strategicValue: number;
  };
  alternatives: any[];
  reasoning: string;
}
```

---

## ⚠️ Error Handling

All modules follow consistent error patterns.

### Error Types

```javascript
const { QAntumError, ConfigError, ValidationError } = require('qantum');

try {
  const chronos = createChronos({ lookAheadSteps: -1 });
} catch (error) {
  if (error instanceof ConfigError) {
    console.log('Invalid configuration:', error.field, error.message);
  }
}

try {
  await api.post('/users', invalidData);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.errors);
  }
}
```

### Error Recovery Pattern

```javascript
const result = await api.get('/users').catch(error => ({
  success: false,
  error: error.message,
  retryable: error.retryable ?? false
}));

if (!result.success && result.retryable) {
  // Retry logic
}
```

---

## 🔧 Configuration Reference

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `qantum_SILENT` | `false` | Suppress console output |
| `qantum_DATA_DIR` | `./qantum-data` | Default data directory |
| `qantum_LOG_LEVEL` | `info` | Log level (debug, info, warn, error) |
| `qantum_TIMEOUT` | `30000` | Default timeout in ms |

### Global Configuration

```javascript
const mm = require('qantum');

mm.configure({
  silent: false,
  dataDir: './my-data',
  logLevel: 'debug',
  defaultTimeout: 60000
});
```

---

## 📝 Complete Examples

### Example 1: Full E2E Test with Chronos

```javascript
const { createChronos, createApiSensei } = require('qantum');
const { chromium } = require('playwright');

async function runTest() {
  // Initialize
  const chronos = createChronos();
  const api = createApiSensei({ baseURL: 'https://api.example.com' });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Get optimal strategy
    const strategy = chronos.getOptimalStrategy({
      domain: 'e-commerce',
      pageType: 'checkout'
    });
    
    // Navigate
    await page.goto('https://shop.example.com');
    
    // Use recommended selector strategy
    const selector = strategy.selector.primary === 'DATA_TESTID' 
      ? '[data-testid="add-to-cart"]'
      : '#add-to-cart';
    
    await page.click(selector);
    
    // Verify via API
    const cart = await api.get('/cart');
    
    // Learn from success
    await chronos.learnFromExecution({
      success: cart.success && cart.data.items.length > 0,
      task: 'add-to-cart',
      usedStrategy: strategy.selector.primary
    });
    
  } catch (error) {
    // Learn from failure
    await chronos.learnFromExecution({
      success: false,
      task: 'add-to-cart',
      failureReason: error.message
    });
    throw error;
  } finally {
    await browser.close();
  }
}
```

### Example 2: Natural Language Test Suite

```javascript
const { QAntumQuantum } = require('qantum');
const { chromium } = require('playwright');

const quantum = new QAntumQuantum();

const testSuite = `
# Login Test Suite

## Test 1: Valid Login
Отвори https://example.com/login
Напиши "user@example.com" в полето email
Напиши "password123" в полето password
Кликни на бутона Sign In
Изчакай 2 секунди
Провери че страницата съдържа "Dashboard"

## Test 2: Invalid Password
Отвори https://example.com/login
Напиши "user@example.com" в полето email
Напиши "wrong-password" в полето password
Кликни на бутона Sign In
Провери че страницата съдържа "Invalid credentials"
`;

async function runTests() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const tests = testSuite.split('## Test').filter(t => t.trim());
  
  for (const test of tests) {
    console.log(`Running: ${test.split('\n')[0]}`);
    await quantum.runNaturalLanguageTest(page, test);
  }
  
  await browser.close();
}
```

---

<div align="center">

## 🧠 QANTUM v15.1 - THE CHRONOS ENGINE

**The World's Most Advanced AI-Powered QA Framework**

*"We don't just test. We dominate the future."*

---

Built Part by Part. Tested at Every Step. Best Practices Always.

[GitHub](https://github.com/papica777-eng/QA-Framework) •
[Documentation](https://papica777-eng.github.io/QAntumPage/)

---

© 2025 Dimitar Prodromov | Commercial License

</div>
