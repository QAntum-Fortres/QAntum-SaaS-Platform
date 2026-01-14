# 📡 QAntum Prime API Reference
## Version 28.1.0 SUPREME

---

## 🧠 Core Modules

### 1. Assimilator (Anti-Hallucination Engine)

```typescript
import { Assimilator, getAssimilator } from './scripts/assimilator';

// Singleton instance
const assimilator = getAssimilator();

// Scan codebase
const result = await assimilator.assimilate('./src');
// Returns: AssimilationResult {
//   totalFiles: number,
//   totalLines: number,
//   totalTokens: number,
//   symbolRegistry: SymbolRegistry
// }

// Verify symbol exists
const exists = assimilator.verify('BrainRouter');
// Returns: boolean

// Find similar symbols (typo correction)
const suggestions = assimilator.findSimilar('BrainRuter');
// Returns: string[] - ['BrainRouter', 'Router', ...]

// Get context for AI
const context = assimilator.getRelevantContext(['security', 'auth']);
// Returns: string (token-budgeted)

// Verify AI-generated code
const validation = assimilator.verifyGeneratedCode(generatedCode);
// Returns: VerificationResult {
//   valid: boolean,
//   errors: ValidationError[],
//   suggestions: string[]
// }
```

### 2. DependencyGraph

```typescript
import { DependencyGraph, getDependencyGraph } from './src/cognition/DependencyGraph';

const graph = getDependencyGraph();

// Build dependency graph
const analysis = await graph.build('./src');
// Returns: GraphAnalysis {
//   modules: number,
//   edges: number,
//   healthScore: number
// }

// Detect circular dependencies
const cycles = graph.detectCircularDependencies();
// Returns: CircularDependency[]

// Detect layer violations
const violations = graph.detectLayerViolations();
// Returns: LayerViolation[] {
//   source: string,
//   target: string,
//   sourceLayer: string,
//   targetLayer: string
// }

// Generate outputs
const mermaid = graph.generateMermaid();   // Mermaid diagram
const dot = graph.generateDot();           // Graphviz DOT
const ascii = graph.generateAscii();       // ASCII art
const report = graph.generateReport();     // Markdown report

// Save all outputs
await graph.saveAll('./output');
```

### 3. Brain Router

```typescript
import { BrainRouter, getBrainRouter } from './src/biology/evolution/BrainRouter';

const router = getBrainRouter();

// Route task to optimal model
const decision = await router.route('selector-repair', inputText);
// Returns: RoutingDecision {
//   selectedModel: 'llama3.1:8b' | 'deepseek-v3',
//   alternativeModel: AIModel,
//   confidence: number,
//   reasoning: string[]
// }

// Execute with routing
const response = await router.execute('logic-refactor', prompt, context, 'high');
// Returns: InferenceResponse

// Execute with automatic fallback
const response = await router.executeWithFallback('code-generation', prompt);
```

### 4. Neural Inference

```typescript
import { NeuralInference, getNeuralInference } from './src/physics/NeuralInference';

const neural = getNeuralInference();

// Infer with specific task
const response = await neural.infer({
  task: 'selector-repair',
  prompt: 'Fix this CSS selector: ...',
  context: {
    distilledKnowledge: {...},
    projectStructure: '...',
    verifiedCodebaseContext: '...'  // From Assimilator
  },
  priority: 'high',
  options: {
    model: 'llama3.1:8b',
    temperature: 0.7,
    maxTokens: 2000
  }
});
// Returns: InferenceResponse {
//   content: string,
//   model: AIModel,
//   tokens: TokenUsage,
//   timing: TimingInfo
// }
```

### 5. Hive Mind

```typescript
import { HiveMind, getHiveMind } from './src/biology/evolution/HiveMind';

const hive = getHiveMind();

// Start federated learning round
const round = await hive.startFederatedRound('stealth-detection');
// Returns: FederatedRound

// Submit neural update
await hive.submitNeuralUpdate({
  modelType: 'stealth-detection',
  gradients: Float32Array,
  localAccuracyBefore: 0.85,
  localAccuracyAfter: 0.92
});

// Get aggregated model
const model = await hive.getAggregatedModel('stealth-detection');
// Returns: NeuralModel
```

### 6. Context Injector

```typescript
import { ContextInjector, getContextInjector } from './src/cognition/ContextInjector';

const injector = getContextInjector();

// Inject context from all sources
const context = await injector.inject({
  query: 'security authentication',
  tokenBudget: 4000,
  sources: ['backpack', 'knowledge', 'codebase']
});
// Returns: ContextPayload

// Get verified context (with Assimilator)
const verified = await injector.getVerifiedContext(query, budget);
// Validates all symbols before returning
```

---

## 🔒 Security Modules

### Kill Switch

```typescript
import { KillSwitch, getGlobalKillSwitch } from './src/security/KillSwitchGracePeriod';

const killSwitch = getGlobalKillSwitch();

// Arm the kill switch
await killSwitch.arm();

// Trigger emergency stop
await killSwitch.trigger('max-loss-exceeded', {
  currentLoss: 600,
  maxAllowed: 500
});

// Check status
const status = killSwitch.getStatus();
// Returns: KillSwitchStatus
```

### Encryption

```typescript
import { getEncryption } from './src/security/encryption';

const encryption = getEncryption();

// Encrypt data
const encrypted = await encryption.encrypt(data, key);
// Returns: EncryptedData { algorithm, iv, data, authTag }

// Decrypt data
const decrypted = await encryption.decrypt(encrypted, key);
```

---

## 📊 Scripts

### Supreme Meditation

```bash
npx tsx scripts/supreme-meditation.ts
```

**Output:**
- `data/supreme-meditation/meditation-result.json`
- `data/supreme-meditation/meditation-report.md`
- `data/supreme-meditation/dependency-graph/*`

### Autonomous Thought

```bash
npx tsx scripts/autonomous-thought.ts
```

**Output:**
- `data/autonomous-thought/thinking-session.json`
- `data/backpack/slot12.json`

### Hive Mind Awakening

```bash
npx tsx scripts/hive-mind-awakening.ts
```

**Output:**
- `data/hive-mind/awakening-result.json`

### Purge Engine

```bash
# Dry run (safe)
npx tsx scripts/purge-engine.ts --dry-run

# Live purge (creates backup)
npx tsx scripts/purge-engine.ts
```

**Output:**
- `data/purge-report.json`
- `data/purge-report.md`
- `data/purge-backup/purge-{timestamp}/`

---

## 🎒 Neural Backpack Slots

| Slot | Purpose | Auto-saved by |
|------|---------|---------------|
| 1-5 | Intent history | IntentLearner |
| 6-10 | Error patterns | SelfCorrectionLoop |
| 11 | Session context | ContextInjector |
| **12** | **Autonomous thoughts** | **AutonomousMind** |
| 13-16 | Reserved | - |

---

## ⚙️ Configuration

### Environment Variables

```bash
# Required
GEMINI_API_KEY=...          # For AI inference

# Optional
HEADLESS=false              # Browser mode
LITE_MODE=true              # Reduced memory usage

# Fortress (for production)
STRIPE_SECRET_KEY=...
BINANCE_API_KEY=...
TRADING_MODE=dry-run        # dry-run | paper | live
```

### Layer Hierarchy

```typescript
const LAYER_HIERARCHY = {
  physics: 1,    // Math, inference
  biology: 2,    // Evolution, learning
  cognition: 3,  // Thinking, context
  chemistry: 4,  // API, integration
  quantum: 5     // Reality, market
};

// Rule: layer[N] can import from layer[M] only if N > M
```

---

## 📡 Events

### Assimilator Events

```typescript
assimilator.on('scan:start', (path) => {...});
assimilator.on('scan:complete', (result) => {...});
assimilator.on('verify:miss', (symbol) => {...});
```

### BrainRouter Events

```typescript
router.on('route:decision', (decision) => {...});
router.on('model:fallback', (from, to) => {...});
```

### HiveMind Events

```typescript
hive.on('round:start', (round) => {...});
hive.on('update:received', (update) => {...});
hive.on('model:aggregated', (model) => {...});
```

---

## 🔍 Type Definitions

See `index.d.ts` for complete type definitions.

Key interfaces:
- `AssimilationResult`
- `SymbolRegistry`
- `GraphAnalysis`
- `RoutingDecision`
- `InferenceRequest`
- `InferenceResponse`
- `FederatedRound`
- `AutonomousThought`

---

```
╔══════════════════════════════════════════════════════════════════════════╗
║  QAntum Prime v28.1.0 SUPREME - API Reference                            ║
║                                                                          ║
║  © 2025-2026 Dimitar Prodromov                                           ║
║  "В QAntum не лъжем."                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝
```
