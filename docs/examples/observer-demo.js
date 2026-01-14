/**
 * 🔭 PRECISION OBSERVER Demo
 * Демонстрира прецизното наблюдение и откриване на аномалии
 */

const { createObserver, createMetrics, createAnomalyDetector } = require('../');

async function runDemo() {
    console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  🔭 PRECISION OBSERVER DEMO                                        ║
║  "Вижда всичко. Пропуска нищо."                                    ║
╚════════════════════════════════════════════════════════════════════╝
`);

    // ═══════════════════════════════════════════════════════════════
    // 1. METRICS COLLECTOR Demo
    // ═══════════════════════════════════════════════════════════════
    console.log('\n📊 METRICS COLLECTOR\n');
    
    const metrics = createMetrics();
    
    // Симулирай HTTP заявки
    console.log('   Recording HTTP metrics...');
    for (let i = 0; i < 50; i++) {
        metrics.recordHttp({
            url: 'https://api.example.com/test',
            method: 'GET',
            statusCode: i < 45 ? 200 : 500, // 10% errors
            responseTime: 100 + Math.random() * 300
        });
    }
    
    // Симулирай системни метрики
    console.log('   Recording system metrics...');
    for (let i = 0; i < 20; i++) {
        metrics.recordMemory();
        metrics.recordCpu();
    }
    
    // Покажи статистика
    const httpStats = metrics.getStats('http', 'responseTime', 60000);
    console.log('\n   HTTP Response Time Stats:');
    console.log(`      • Average: ${httpStats.avg.toFixed(2)}ms`);
    console.log(`      • P95: ${httpStats.p95.toFixed(2)}ms`);
    console.log(`      • P99: ${httpStats.p99.toFixed(2)}ms`);
    console.log(`      • Std Dev: ${httpStats.stdDev.toFixed(2)}ms`);
    
    const successRate = metrics.calculateSuccessRate('http', 60000);
    console.log(`\n   Success Rate: ${successRate.toFixed(1)}%`);

    // ═══════════════════════════════════════════════════════════════
    // 2. ANOMALY DETECTOR Demo
    // ═══════════════════════════════════════════════════════════════
    console.log('\n\n🔮 ANOMALY DETECTOR\n');
    
    const detector = createAnomalyDetector({
        responseTimeThreshold: 500,
        errorRateThreshold: 5,
        stdDevMultiplier: 2.5
    });
    
    // Научи baseline от нормални стойности
    console.log('   Learning baseline from normal values...');
    const normalResponseTimes = Array(100).fill(0).map(() => 150 + Math.random() * 100);
    detector.learnBaseline('responseTime', normalResponseTimes);
    
    // Тествай откриване на аномалии
    console.log('\n   Testing anomaly detection:');
    
    const testValues = [
        { value: 180, desc: 'Normal response' },
        { value: 450, desc: 'Slow response' },
        { value: 1500, desc: 'Very slow (anomaly!)' },
        { value: 50, desc: 'Unusually fast' }
    ];
    
    testValues.forEach(test => {
        const anomalies = detector.detectAnomaly('responseTime', test.value);
        const status = anomalies.length > 0 ? '🚨 ANOMALY' : '✅ Normal';
        console.log(`      • ${test.desc} (${test.value}ms): ${status}`);
        if (anomalies.length > 0) {
            anomalies.forEach(a => {
                console.log(`        └─ ${a.severity.toUpperCase()}: ${a.message}`);
            });
        }
    });
    
    // Тествай trend analysis
    console.log('\n   Testing trend detection:');
    const degradingValues = [100, 110, 120, 130, 140, 200, 220, 250, 280, 320, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
    const trendAnomaly = detector.detectTrendAnomaly('responseTime', degradingValues, 5);
    if (trendAnomaly) {
        console.log(`      🚨 Trend detected: ${trendAnomaly.message}`);
        console.log(`         Change: ${trendAnomaly.changePercent.toFixed(1)}%`);
    }

    // ═══════════════════════════════════════════════════════════════
    // 3. PRECISION OBSERVER Demo
    // ═══════════════════════════════════════════════════════════════
    console.log('\n\n🔭 PRECISION OBSERVER\n');
    
    const observer = createObserver({
        checkInterval: 3000,
        anomaly: {
            responseTimeThreshold: 1000,
            errorRateThreshold: 5,
            memoryThreshold: 85
        }
    });
    
    // Добави targets за наблюдение
    console.log('   Adding monitoring targets...');
    
    observer.addTarget('google', 'https://www.google.com', {
        priority: 'high',
        expectedStatus: 200,
        timeout: 5000
    });
    
    observer.addTarget('github', 'https://api.github.com', {
        priority: 'normal',
        expectedStatus: 200
    });
    
    // Добави alert handler
    observer.onAlert(alert => {
        console.log(`\n   🚨 ALERT [${alert.severity}]: ${alert.message}`);
    });
    
    // Стартирай мониторинг
    console.log('\n   Starting observer (will run for 10 seconds)...\n');
    observer.start();
    
    // Чакай 10 секунди
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Спри и покажи резултати
    observer.stop();
    
    // Покажи репорт
    const report = observer.getReport();
    console.log('\n   📊 OBSERVER REPORT:');
    console.log(`      • Status: ${report.status}`);
    console.log(`      • Checks performed: ${report.stats.checksPerformed}`);
    console.log(`      • Anomalies detected: ${report.stats.anomaliesDetected}`);
    console.log(`      • Alerts sent: ${report.stats.alertsSent}`);
    
    console.log('\n   🎯 TARGET STATUS:');
    report.targets.forEach(t => {
        const icon = t.status === 'healthy' ? '✅' : t.status === 'degraded' ? '⚠️' : '❌';
        console.log(`      ${icon} ${t.name}: ${t.status} (last: ${t.lastStatus || 'N/A'})`);
    });
    
    // Health score
    const healthScore = observer.getHealthScore();
    console.log(`\n   💚 HEALTH SCORE: ${healthScore}/100`);
    
    console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  ✅ PRECISION OBSERVER DEMO COMPLETE                               ║
║                                                                    ║
║  Demonstrated:                                                     ║
║  • Real-time metrics collection                                    ║
║  • Statistical analysis (avg, p95, p99, stdDev)                    ║
║  • Baseline learning                                               ║
║  • Anomaly detection (statistical + threshold)                     ║
║  • Trend detection                                                 ║
║  • Multi-target monitoring                                         ║
║  • Health scoring                                                  ║
╚════════════════════════════════════════════════════════════════════╝
`);
}

// Run demo
runDemo().catch(console.error);
