import TestRail from '@dlenroc/testrail';
import dotenv from 'dotenv';

dotenv.config();

export class TestRailAPI {
  private api: TestRail;

  constructor() {
    this.api = new TestRail({
      host: process.env.TESTRAIL_URL || '',
      username: process.env.TESTRAIL_USERNAME || '',
      password: process.env.TESTRAIL_API_KEY || '',
    });
  }

  async addTestCase(sectionId: number, title: string, steps: { content: string, expected: string }[], additionalFields: any = {}): Promise<number> {
    try {
      const response = await this.api.addCase(sectionId, {
        title,
        template_id: additionalFields.template_id,
        type_id: additionalFields.type_id,
        priority_id: additionalFields.priority_id,
        estimate: additionalFields.estimate,
        custom_steps_separated: steps,
        custom_automation_status: additionalFields.custom_automation_status,
        custom_automation_candidate: additionalFields.custom_automation_candidate,
        custom_test_layer: additionalFields.custom_test_layer,
        custom_test_category: additionalFields.custom_test_category,
        custom_product_version: additionalFields.custom_product_version,
      });
      return response.id;
    } catch (error) {
      console.error('Error adding test case:', error);
      throw error;
    }
  }

  async updateTestCase(caseId: number, title: string, steps: { content: string, expected: string }[]): Promise<any> {
    try {
      const response = await this.api.updateCase(caseId, {
        title,
        custom_steps_separated: steps,
      });
      return response;
    } catch (error) {
      console.error('Error updating test case:', error);
      throw error;
    }
  }
}