import { TestRailManager } from './src/utils/testRailManager';

const SUITE_ID = 425940; // Your specific suite ID

async function main() {
  const manager = new TestRailManager(SUITE_ID);

  try {
    // Create a new test case
    await manager.createTestCase('regressionTestCases.json');

    // Update an existing test case
    await manager.updateTestCase('regressionTestCases.json');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();