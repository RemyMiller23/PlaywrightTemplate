import fs from 'fs';
import path from 'path';

export class uiFunctions {
    /**
    * @param {import('@playwright/test').Page} page
    * @param {import('@playwright/test').TestInfo} testInfo
    */
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    /**
    * Captures a full-page screenshot and attaches it to the test report
    * @param {string} screenshotName - The name to give the screenshot attachment
    */
    async screenshot(screenshotName) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        if (this.testInfo) {
            await this.testInfo.attach(screenshotName, {
                body: screenshot,
                contentType: 'image/png',
            });
        } else {
            console.log(`📸 Screenshot captured: ${screenshotName} (not attached - no test context)`);
        }
    }
}