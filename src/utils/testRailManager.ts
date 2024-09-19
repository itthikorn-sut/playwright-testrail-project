import { TestRailAPI } from '../api/testRailAPI';
import fs from 'fs/promises';
import path from 'path';

export class TestRailManager {
  private testRail: TestRailAPI;
  private suiteId: number;

  constructor(suiteId: number) {
    this.testRail = new TestRailAPI();
    this.suiteId = suiteId;
  }

  async createTestCase(filename: string): Promise<void> {
    const filePath = path.join(__dirname, '..', 'testcases', filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const testCase = JSON.parse(fileContent);

    const newTestCaseId = await this.testRail.addTestCase(
      testCase.sectionId,
      testCase.title,
      testCase.steps,
      { ...testCase.additionalFields, suite_id: this.suiteId }
    );

    console.log(`New test case created with ID: ${newTestCaseId}`);

    // Update the JSON file with the new TestRail Case ID
    testCase.testRailId = newTestCaseId;
    await fs.writeFile(filePath, JSON.stringify(testCase, null, 2));
  }

  async updateTestCase(filename: string): Promise<void> {
    const filePath = path.join(__dirname, '..', 'testcases', filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const testCase = JSON.parse(fileContent);

    if (!testCase.testRailId) {
      throw new Error('TestRail ID not found in the test case file. Create the test case first.');
    }

    const updatedTestCase = await this.testRail.updateTestCase(
      testCase.testRailId,
      testCase.title,
      testCase.steps
    );

    console.log(`Test case updated: ${updatedTestCase.id}`);
  }
}