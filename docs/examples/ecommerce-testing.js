/**
 * QANTUM - E-Commerce Testing Example
 * 
 * Demonstrates comprehensive testing of an e-commerce site
 * including checkout flow, cart, and payment validation.
 */

const { QAntum } = require('../index.js');

async function ecommerceTestingSuite() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║         QANTUM - E-Commerce Testing Suite               ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const mm = new QAntum({
    projectRoot: process.cwd(),
    verbose: true
  });

  const baseUrl = 'https://demo-store.example.com';

  // Test Suite Definition
  const testSuite = [
    {
      name: 'Homepage Load',
      test: async () => {
        const result = await mm.audit(`${baseUrl}/`);
        return result.score > 70;
      }
    },
    {
      name: 'Product Catalog',
      test: async () => {
        const result = await mm.checkLinks(`${baseUrl}/products`);
        return result.broken === 0;
      }
    },
    {
      name: 'Search Functionality',
      test: async () => {
        const result = await mm.testAPI({
          endpoint: `${baseUrl}/api/search?q=shirt`,
          method: 'GET',
          expectedStatus: 200
        });
        return result.statusCode === 200;
      }
    },
    {
      name: 'Add to Cart API',
      test: async () => {
        const result = await mm.testAPI({
          endpoint: `${baseUrl}/api/cart/add`,
          method: 'POST',
          body: { productId: '12345', quantity: 1 },
          expectedStatus: 201
        });
        return result.statusCode === 201;
      }
    },
    {
      name: 'Cart Retrieval',
      test: async () => {
        const result = await mm.testAPI({
          endpoint: `${baseUrl}/api/cart`,
          method: 'GET',
          expectedStatus: 200
        });
        return result.statusCode === 200 && result.body?.items;
      }
    },
    {
      name: 'Checkout Process',
      test: async () => {
        const result = await mm.testAPI({
          endpoint: `${baseUrl}/api/checkout/validate`,
          method: 'POST',
          body: {
            items: [{ id: '12345', qty: 1 }],
            shipping: { country: 'BG' }
          },
          expectedStatus: 200
        });
        return result.statusCode === 200;
      }
    },
    {
      name: 'Payment Gateway',
      test: async () => {
        const result = await mm.testAPI({
          endpoint: `${baseUrl}/api/payment/methods`,
          method: 'GET',
          expectedStatus: 200
        });
        return result.body?.methods?.length > 0;
      }
    }
  ];

  // Run Tests
  console.log('🛒 Running E-Commerce Test Suite...\n');
  
  let passed = 0;
  let failed = 0;

  for (const { name, test } of testSuite) {
    try {
      process.stdout.write(`   ${name}... `);
      const result = await test();
      if (result) {
        console.log('✅ PASS');
        passed++;
      } else {
        console.log('❌ FAIL');
        failed++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      failed++;
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Results: ${passed} passed, ${failed} failed`);
  console.log(`   Coverage: ${Math.round((passed / testSuite.length) * 100)}%`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return { passed, failed, total: testSuite.length };
}

// Run if executed directly
if (require.main === module) {
  ecommerceTestingSuite()
    .then(results => {
      process.exit(results.failed > 0 ? 1 : 0);
    })
    .catch(err => {
      console.error('Suite error:', err);
      process.exit(1);
    });
}

module.exports = { ecommerceTestingSuite };
