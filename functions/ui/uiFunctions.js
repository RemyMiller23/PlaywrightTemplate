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

    /**
    * Tear down function to handle post-test cleanup and error checking
    */
    async tearDown() {
        if (this.page.isClosed()) {
            console.log('Page is already closed, skipping teardown.');
            return;
        }

        let errorToThrow = null;

        try {
            const currentUrl = this.page.url();

            // Check for navigation failure
            if (currentUrl === 'about:blank' || currentUrl === '' || currentUrl === 'data:,') {
                errorToThrow = new Error('Page navigation failed, DB request or an API may have failed.');
                return;
            }

            // // Check for authentication failure dialog
            // if (await this.page.locator("//h2[@data-slot='alert-dialog-title' and text()=' Authentication failed ']").isVisible({ timeout: 1000 })) {
            //     console.log('Authentication failed dialog detected.');
            //     return;
            // }

            // // Check for logged-in state and logout if needed
            // if (await this.page.locator("//button[@aria-haspopup='menu']").isVisible({ timeout: 1000 })) {
            //     await this.logoutFromMyAccountDropdown();
            //     return;
            // }
        } catch (error) {
            // Handle case where page was closed during tearDown
            if (error.message.includes('Target page, context or browser has been closed')) {
                console.log('Page closed during tearDown, ignoring.');
                return;
            }
            // Store unexpected errors to throw after cleanup
            errorToThrow = error;
        } finally {
            // Always close the page at the end
            try {
                if (!this.page.isClosed()) {
                    await this.page.close();
                    console.log('Page closed successfully.');
                }
            } catch (closeError) {
                console.error('Error closing the page:', closeError.errorMessage);
            }

            if (errorToThrow) {
                throw errorToThrow;
            }
        }
    }


}