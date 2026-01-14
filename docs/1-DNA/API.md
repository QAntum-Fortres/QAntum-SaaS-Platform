# 📚 API Reference

Complete API documentation for QANTUM v15.1

## Table of Contents

- [Installation](#installation)
- [Quick Reference](#quick-reference)
- [Core Exports](#core-exports)
- [Factory Functions](#factory-functions)
- [API Sensei](#-api-sensei)
- [CHRONOS Engine](#-chronos-engine)
- [Neuro-Sentinel](#-neuro-sentinel)
- [Security Scanner](#-security-scanner)
- [Voice Testing](#-voice-testing)
- [Video-to-Test AI](#-video-to-test-ai)
- [TypeScript Support](#typescript-support)

---

## Installation

```javascript
// CommonJS
const mm = require('qantum');

// ES Modules (with TypeScript)
import * as mm from 'qantum';
```

---

## Quick Reference

```javascript
const mm = require('qantum');

// Version info
mm.VERSION        // '15.1.0'
mm.CODENAME       // 'THE CHRONOS ENGINE'

// Factory functions (recommended)
mm.createChronos(config)         // CHRONOS Engine
mm.createAPISensei(config)       // API Testing
mm.createSentinel(config)        // Self-Healing
mm.createSecurityScanner(config) // Security
mm.createVoice()                 // Voice Testing
mm.createVideoAI()               // Video-to-Test

// Check module status
mm.getModuleStatus()  // { chronos: true, apiSensei: true, ... }
```

---

## Core Exports

### Constants

| Export | Type | Description |
|--------|------|-------------|
| `VERSION` | string | Current version (15.1.0) |
| `CODENAME` | string | Version codename |

### Classes

| Export | Module | Description |
|--------|--------|-------------|
| `QAntumChronos` | chronos-engine | Time-aware testing |
| `APISensei` | api-sensei | REST/GraphQL testing |
| `NeuroSentinel` | neuro-sentinel | Self-healing engine |
| `SecurityEngine` | sovereign-core | Security scanner |
| `VoiceTestingEngine` | nexus-engine | Voice commands |
| `VideoToTestAI` | nexus-engine | Video recording |

---

## Factory Functions

All factory functions include null checks and throw descriptive errors if modules are unavailable.

### createChronos(config?)

Creates a CHRONOS Engine instance for time-aware testing.

```javascript
const chronos = mm.createChronos({
    dataDir: './chronos-data',
    predictionThreshold: 0.7,
    learningRate: 0.1
});
```

**Config Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dataDir` | string | './chronos-data' | Data storage directory |
| `predictionThreshold` | number | 0.7 | Minimum confidence for predictions |
| `learningRate` | number | 0.1 | Pattern learning rate |

### createAPISensei(config)

Creates an API Sensei instance for REST/GraphQL testing.

```javascript
const api = mm.createAPISensei({
    baseURL: 'https://api.example.com',
    timeout: 30000,
    retries: 3,
    headers: {
        'X-Custom-Header': 'value'
    }
});
```

**Config Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseURL` | string | '' | Base URL for requests |
| `timeout` | number | 30000 | Request timeout (ms) |
| `retries` | number | 3 | Retry attempts |
| `retryDelay` | number | 1000 | Delay between retries (ms) |
| `headers` | object | {} | Default headers |

### createSentinel(config?)

Creates a Neuro-Sentinel instance for self-healing tests.

```javascript
const sentinel = mm.createSentinel({
    autoHeal: true,
    chaosLevel: 0.5,
    slackWebhook: 'https://hooks.slack.com/...'
});
```

### createSecurityScanner(config)

Creates a Security Engine instance for DAST scanning.

```javascript
const scanner = mm.createSecurityScanner({
    targetURL: 'https://myapp.com',
    crawlDepth: 3
});
```

### createVoice()

Creates a Voice Testing Engine instance.

```javascript
const voice = mm.createVoice();
```

### createVideoAI()

Creates a Video-to-Test AI instance.

```javascript
const videoAI = mm.createVideoAI();
```

### getModuleStatus()

Returns the availability status of all modules.

```javascript
const status = mm.getModuleStatus();
// {
//   chronos: true,
//   apiSensei: true,
//   omniscient: true,
//   sovereign: true,
//   neuroSentinel: true,
//   nexus: true,
//   quantum: true,
//   playwright: true
// }
```

---

## 🥋 API Sensei

Complete REST and GraphQL testing suite.

### Constructor

```javascript
const { APISensei } = require('qantum');
const api = new APISensei(config);
```

### Authentication Methods

#### setBasicAuth(username, password)

```javascript
api.setBasicAuth('user', 'pass');
```

#### setBearerToken(token)

```javascript
api.setBearerToken('eyJhbGciOiJIUzI1NiIs...');
```

#### setApiKey(key, headerName?)

```javascript
api.setApiKey('my-api-key');
api.setApiKey('my-api-key', 'X-API-Key');
```

#### setJWT(token)

```javascript
api.setJWT('eyJhbGciOiJIUzI1NiIs...');
```

### HTTP Methods

#### get(endpoint, options?)

```javascript
const response = await api.get('/users');
const response = await api.get('/users', { 
    params: { page: 1, limit: 10 },
    headers: { 'Accept': 'application/json' }
});
```

#### post(endpoint, body, options?)

```javascript
const response = await api.post('/users', {
    name: 'John',
    email: 'john@example.com'
});
```

#### put(endpoint, body, options?)

```javascript
const response = await api.put('/users/1', { name: 'Updated' });
```

#### patch(endpoint, body, options?)

```javascript
const response = await api.patch('/users/1', { status: 'active' });
```

#### delete(endpoint, options?)

```javascript
const response = await api.delete('/users/1');
```

### Response Object

```typescript
interface APIResponse {
    success: boolean;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: any;
    responseTime: number;
    request: {
        method: string;
        url: string;
        headers: Record<string, string>;
        body?: any;
    };
}
```

### GraphQL

#### graphql(query, variables?)

```javascript
const query = `
    query GetUser($id: ID!) {
        user(id: $id) {
            name
            email
        }
    }
`;

const response = await api.graphql(query, { id: '1' });
```

### Chained Requests

#### chain()

```javascript
const results = await api.chain()
    .step('login', () => api.post('/auth', { user, pass }))
    .step('getProfile', (ctx) => api.get(`/users/${ctx.login.data.id}`))
    .step('updateProfile', (ctx) => api.patch(
        `/users/${ctx.login.data.id}`, 
        { lastLogin: new Date() }
    ))
    .run();

console.log(results.login.data);
console.log(results.getProfile.data);
```

### Validation

#### validateSchema(data, schema)

```javascript
const schema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' }
    },
    required: ['id', 'name']
};

const isValid = api.validateSchema(response.data, schema);
```

### Metrics

#### getMetrics()

```javascript
const metrics = api.getMetrics();
// {
//   totalRequests: 10,
//   successfulRequests: 9,
//   failedRequests: 1,
//   avgResponseTime: 245,
//   minResponseTime: 120,
//   maxResponseTime: 890
// }
```

#### printReport()

```javascript
api.printReport();
// Prints formatted report to console
```

---

## ⏰ CHRONOS Engine

Time-aware testing and failure prediction.

### Constructor

```javascript
const { QAntumChronos } = require('qantum');
const chronos = new QAntumChronos(config);
```

### Methods

#### initialize()

Loads historical data and initializes pattern recognition.

```javascript
await chronos.initialize();
```

#### predictFailures(options)

Predicts test failures for a time period.

```javascript
const predictions = await chronos.predictFailures({ 
    hours: 24 
});

// Returns:
// [
//   {
//     test: 'login.spec.js',
//     probability: 0.87,
//     reason: 'Pattern: fails after Monday deployments',
//     suggestedAction: 'Review deployment pipeline'
//   }
// ]
```

#### recordResult(testName, passed, metadata?)

Records a test result for pattern learning.

```javascript
chronos.recordResult('login.spec.js', true, {
    duration: 1234,
    environment: 'staging'
});
```

#### start()

Starts continuous monitoring.

```javascript
chronos.start();
```

#### stop()

Stops monitoring.

```javascript
chronos.stop();
```

---

## 🧠 Neuro-Sentinel

Self-healing and chaos engineering.

### Constructor

```javascript
const { NeuroSentinel } = require('qantum');
const sentinel = new NeuroSentinel(config);
```

### Methods

#### ignite(targetURL)

Starts monitoring with shadow clone environment.

```javascript
await sentinel.ignite('https://your-app.com');
```

#### runChaosScenario(type, target?)

Runs a chaos engineering scenario.

```javascript
// Network chaos
await sentinel.runChaosScenario('network-latency');
await sentinel.runChaosScenario('packet-loss');

// Service chaos
await sentinel.runChaosScenario('service-kill', 'container:my-db');
await sentinel.runChaosScenario('service-pause', 'container:api');

// Resource chaos
await sentinel.runChaosScenario('memory-pressure');
await sentinel.runChaosScenario('cpu-spike');
await sentinel.runChaosScenario('disk-fill');
```

#### heal(issue)

Manually trigger healing for an issue.

```javascript
await sentinel.heal({
    type: 'selector-broken',
    selector: '#old-button',
    page: page
});
```

---

## 🔐 Security Scanner

DAST security scanning.

### Constructor

```javascript
const { SecurityEngine } = require('qantum');
const scanner = new SecurityEngine(config);
```

### Methods

#### quickScan()

Runs a quick scan for common vulnerabilities.

```javascript
const report = await scanner.quickScan();
```

#### fullScan()

Runs a comprehensive security scan.

```javascript
const report = await scanner.fullScan();
```

#### testSQLInjection(url, params)

Tests for SQL injection vulnerabilities.

```javascript
const findings = await scanner.testSQLInjection(
    'https://app.com/search',
    { q: 'test' }
);
```

#### testXSS(url, params)

Tests for XSS vulnerabilities.

```javascript
const findings = await scanner.testXSS(
    'https://app.com/search',
    { q: 'test' }
);
```

### Report Object

```typescript
interface SecurityReport {
    scanId: string;
    target: string;
    startTime: Date;
    endTime: Date;
    findings: SecurityFinding[];
    summary: {
        total: number;
        critical: number;
        high: number;
        medium: number;
        low: number;
        info: number;
    };
}
```

---

## 🎤 Voice Testing

Voice-controlled test execution.

### Constructor

```javascript
const { VoiceTestingEngine } = require('qantum');
const voice = new VoiceTestingEngine();
```

### Methods

#### processCommand(page, command)

Executes a voice command on a page.

```javascript
// Navigation
await voice.processCommand(page, 'go to google.com');
await voice.processCommand(page, 'navigate to /login');

// Interactions
await voice.processCommand(page, 'click the login button');
await voice.processCommand(page, 'type "hello" in the search field');

// Assertions
await voice.processCommand(page, 'verify page title contains "Dashboard"');

// Bulgarian 🇧🇬
await voice.processCommand(page, 'отвори google.com');
await voice.processCommand(page, 'кликни на бутона');
```

### Supported Commands

| English | Bulgarian | Action |
|---------|-----------|--------|
| go to / navigate to | отвори / отиди на | Navigate to URL |
| click | кликни | Click element |
| type | напиши | Type text |
| verify / assert | провери | Assert condition |
| screenshot | снимка | Take screenshot |
| wait | изчакай | Wait for time/element |

---

## 🎬 Video-to-Test AI

Generate tests from screen recordings.

### Constructor

```javascript
const { VideoToTestAI } = require('qantum');
const videoAI = new VideoToTestAI();
```

### Methods

#### startRecording(page)

Starts recording page interactions.

```javascript
videoAI.startRecording(page);
```

#### stopRecording()

Stops recording and returns generated test code.

```javascript
const testCode = videoAI.stopRecording();
// Returns complete Playwright test file
```

#### generateFromRecording(videoPath)

Generates tests from a video file.

```javascript
const tests = await videoAI.generateFromRecording('user-flow.mp4');
```

---

## TypeScript Support

QANTUM includes TypeScript type definitions.

### Using Types

```typescript
import { 
    APIConfig, 
    APIResponse, 
    ChronosConfig,
    SecurityReport 
} from 'qantum/src/types';

const config: APIConfig = {
    baseURL: 'https://api.example.com',
    timeout: 30000
};
```

### Available Types

See [src/types/index.ts](../src/types/index.ts) for all type definitions.

---

## Error Handling

All methods throw descriptive errors:

```javascript
try {
    const chronos = mm.createChronos();
} catch (error) {
    if (error.message.includes('not available')) {
        console.log('CHRONOS module not loaded');
    }
}
```

---

## Events

Many classes extend EventEmitter:

```javascript
const api = mm.createAPISensei({ baseURL: '...' });

api.on('request:start', (data) => {
    console.log('Starting request:', data.url);
});

api.on('request:complete', (data) => {
    console.log('Completed:', data.status);
});

api.on('request:error', (error) => {
    console.log('Failed:', error.message);
});
```

---

## Need Help?

- 📖 [Quick Start Guide](QUICK-START.md)
- 🐛 [Report Issues](https://github.com/papica777-eng/QA-Framework/issues)
- 💬 [Discussions](https://github.com/papica777-eng/QA-Framework/discussions)
