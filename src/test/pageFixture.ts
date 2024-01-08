import { Page } from '@playwright/test';

export const pageFixture = {
  page: undefined as unknown as Page,

  initializePage: async function (browserContext: any) {
    this.page = await browserContext.newPage();
  },
};
