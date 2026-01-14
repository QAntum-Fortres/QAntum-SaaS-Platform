/**
 * 🎯 QANTUM - Quick Examples
 * Run: node examples/quick-start.js
 */

// Import the framework
const mm = require('../index');

async function main() {
    console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  QANTUM v${mm.VERSION} - Quick Start Examples                 ║
╚════════════════════════════════════════════════════════════════════╝
`);

    // ═══════════════════════════════════════════════════════════════════
    // Example 1: Voice Testing
    // ═══════════════════════════════════════════════════════════════════
    console.log('📌 Example 1: Voice Testing Engine');
    console.log('─'.repeat(50));
    
    const voice = mm.createVoice();
    console.log('✅ Voice engine created');
    console.log('   Commands: "go to google.com", "click login button"');
    console.log('   Bulgarian: "отвори google.com", "кликни на бутон"\n');

    // ═══════════════════════════════════════════════════════════════════
    // Example 2: Natural Language Testing
    // ═══════════════════════════════════════════════════════════════════
    console.log('📌 Example 2: Natural Language Test (Bulgarian)');
    console.log('─'.repeat(50));
    
    const nlEngine = mm.createNaturalLanguage();
    const bgTest = `
Отвори https://example.com
Кликни на бутон Login
Напиши "user@test.com" в полето email
Изчакай 2 секунди
`;
    
    const steps = nlEngine.parseTest(bgTest, 'bg');
    console.log('Input (Bulgarian):');
    console.log(bgTest);
    console.log(`✅ Parsed ${steps.length} steps\n`);

    // ═══════════════════════════════════════════════════════════════════
    // Example 3: Chaos Engine
    // ═══════════════════════════════════════════════════════════════════
    console.log('📌 Example 3: Chaos Engine');
    console.log('─'.repeat(50));
    
    const chaos = mm.createChaos({ safeMode: true });
    console.log('✅ Chaos engine created (safe mode)');
    console.log('   Available attacks:');
    console.log('   - network-latency');
    console.log('   - service-kill');
    console.log('   - memory-pressure');
    console.log('   - cpu-spike\n');

    // ═══════════════════════════════════════════════════════════════════
    // Example 4: Neuro-Sentinel
    // ═══════════════════════════════════════════════════════════════════
    console.log('📌 Example 4: Neuro-Sentinel');
    console.log('─'.repeat(50));
    
    const sentinel = mm.createSentinel({
        healthThreshold: 0.95,
        monitorInterval: 5000
    });
    console.log('✅ Neuro-Sentinel created');
    console.log('   - Health threshold: 95%');
    console.log('   - Monitor interval: 5s');
    console.log('   - Ready to ignite!\n');

    // ═══════════════════════════════════════════════════════════════════
    // Summary
    // ═══════════════════════════════════════════════════════════════════
    console.log('═'.repeat(50));
    console.log('✅ All examples completed!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. npm run demo:nexus    - See NEXUS features');
    console.log('  2. npm run demo:quantum  - See QUANTUM features');
    console.log('  3. npm run sentinel      - Run Neuro-Sentinel');
    console.log('');
}

main().catch(console.error);
