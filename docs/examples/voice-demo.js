/**
 * 🎤 QANTUM - Voice Testing Example
 * Test with voice commands in English or Bulgarian
 */

const { VoiceTestingEngine } = require('../nexus-engine');

async function demo() {
    console.log('🎤 VOICE TESTING DEMO\n');

    const voice = new VoiceTestingEngine();

    // Show supported commands
    console.log('📋 Supported English Commands:');
    console.log('   - "go to [url]"');
    console.log('   - "click [element]"');
    console.log('   - "type [text] in [field]"');
    console.log('   - "verify [text]"');
    console.log('   - "wait [seconds]"');
    console.log('   - "take screenshot"');
    console.log('   - "scroll up/down"');
    console.log('');

    console.log('📋 Bulgarian Commands (🇧🇬):');
    console.log('   - "отвори [url]"');
    console.log('   - "кликни на [елемент]"');
    console.log('   - "напиши [текст] в [поле]"');
    console.log('');

    // Simulate commands (without real page)
    console.log('🎯 Simulating voice commands...\n');

    const commands = [
        'go to google.com',
        'click the search button',
        'type "hello world" in search field',
        'wait 2 seconds',
        'take screenshot'
    ];

    for (const cmd of commands) {
        console.log(`🎤 Command: "${cmd}"`);
        // In real usage: await voice.processCommand(page, cmd);
    }

    console.log('\n✅ Voice demo complete!');
    console.log('   Note: Use with Playwright page for real execution.');
}

demo().catch(console.error);
