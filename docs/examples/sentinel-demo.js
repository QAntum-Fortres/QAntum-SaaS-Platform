/**
 * 🧠 QANTUM - Neuro-Sentinel Example
 * Demonstrates autonomous self-healing
 */

const { NeuroSentinel, ChaosEngine } = require('../neuro-sentinel/sentinel-core');

async function demo() {
    console.log('🧠 NEURO-SENTINEL DEMO\n');

    // 1. Create Sentinel
    const sentinel = new NeuroSentinel({
        healthThreshold: 0.95,
        monitorInterval: 3000,
        chaos: { safeMode: true }
    });

    // 2. Create standalone Chaos Engine
    const chaos = new ChaosEngine({ safeMode: true });

    // 3. Show available chaos scenarios
    console.log('🔥 Available Chaos Scenarios:');
    console.log('   - network-latency: Adds 100-500ms delay');
    console.log('   - network-loss: Drops 10-30% packets');
    console.log('   - service-kill: Terminates a service');
    console.log('   - memory-pressure: Consumes 70-90% RAM');
    console.log('   - cpu-spike: Creates high CPU load');
    console.log('   - disk-fill: Fills disk space');
    console.log('');

    // 4. Demo: Run chaos scenario (simulated)
    console.log('🔥 Simulating network-latency attack...');
    const attack = await chaos.unleashChaos('network-latency', null, { duration: 2000 });
    console.log(`   Attack ID: ${attack.id}`);
    console.log(`   Status: ${attack.status}`);
    console.log('');

    // 5. Show stats
    console.log('📊 Chaos Stats:', chaos.getStats());
    console.log('');

    // 6. Emergency stop
    await chaos.emergencyStop();
    console.log('✅ All chaos contained!\n');
}

demo().catch(console.error);
