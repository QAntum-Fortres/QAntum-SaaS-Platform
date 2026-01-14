/**
 * QANTUM - CI/CD Integration Example
 * 
 * This example demonstrates how to integrate QANTUM
 * into your CI/CD pipeline for automated testing.
 */

const { QAntum } = require('../index.js');

async function ciPipelineExample() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║           QANTUM - CI/CD Integration Example            ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const mm = new QAntum({
    projectRoot: process.cwd(),
    mode: 'ci'
  });

  const results = {
    passed: 0,
    failed: 0,
    errors: []
  };

  // Stage 1: Link Check
  console.log('📍 Stage 1: Link Validation\n');
  try {
    const links = await mm.checkLinks('https://example.com');
    console.log(`   ✅ Found ${links.total} links, ${links.broken} broken`);
    if (links.broken > 0) {
      results.failed++;
      results.errors.push(`${links.broken} broken links found`);
    } else {
      results.passed++;
    }
  } catch (error) {
    console.log(`   ❌ Link check failed: ${error.message}`);
    results.failed++;
    results.errors.push(error.message);
  }

  // Stage 2: Performance Audit
  console.log('\n📍 Stage 2: Performance Audit\n');
  try {
    const perf = await mm.audit('https://example.com');
    console.log(`   Performance Score: ${perf.score}/100`);
    if (perf.score < 80) {
      console.log(`   ⚠️  Warning: Performance below threshold`);
      results.errors.push('Performance score below 80');
    } else {
      console.log(`   ✅ Performance OK`);
      results.passed++;
    }
  } catch (error) {
    console.log(`   ❌ Audit failed: ${error.message}`);
    results.failed++;
  }

  // Stage 3: API Health Check
  console.log('\n📍 Stage 3: API Health Check\n');
  try {
    const api = await mm.testAPI({
      endpoint: 'https://api.example.com/health',
      method: 'GET',
      expectedStatus: 200
    });
    console.log(`   ✅ API responded in ${api.responseTime}ms`);
    results.passed++;
  } catch (error) {
    console.log(`   ❌ API check failed: ${error.message}`);
    results.failed++;
    results.errors.push('API health check failed');
  }

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                       PIPELINE SUMMARY                         ');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log('\n   Errors:');
    results.errors.forEach(err => console.log(`   • ${err}`));
  }

  // Exit with appropriate code for CI
  const exitCode = results.failed > 0 ? 1 : 0;
  console.log(`\n   Exit Code: ${exitCode}`);
  
  return exitCode;
}

// Run if executed directly
if (require.main === module) {
  ciPipelineExample()
    .then(code => process.exit(code))
    .catch(err => {
      console.error('Pipeline error:', err);
      process.exit(1);
    });
}

module.exports = { ciPipelineExample };
