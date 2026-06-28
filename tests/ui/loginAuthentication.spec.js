// @ts-check
import { test, expect } from '@playwright/test';
import { commonFunctions } from '@commonFunctions';
import { uiMethods } from '@uiMethods';


test.describe('Login Authentication Tests', () => {
    /** @type {uiMethods} */
    let uiMethods_;
    let client_data
    test.beforeEach(async ({ page }, testInfo) => {
        // Setups UI methods
        uiMethods_ = new uiMethods(page, testInfo);

        client_data = await commonFunctions.getClientData('male')
        console.log(client_data)
    });

    /**
    * Login to EcoCommissions
    * @owner Remy Miller
    * @jira 7366
    * @company Astron Energy
    */
    test('EcoCommissions - Login Successful', { tag: ['@Positive'] }, async () => {
        await uiMethods_.ecoCommissionsLogin(client_data.name);
    });

    /**
    * Login to EcoCommissions
    * @owner Russell Miller
    * @jira 5674
    * @company Caltex
    */
    test('EcoCommissions - Login Unsuccessful', { tag: ['@Negative'] }, async () => {
        await uiMethods_.ecoCommissionsLogin(client_data.idNumber);

    });


    test.afterEach(async ({ }, testInfo) => {
        // Closes the page after each test
        if (uiMethods_.page && !uiMethods_.page.isClosed()) {
            await uiMethods_.page.close();
        }
        console.log(`Test "${testInfo.title}" completed.`);
    });

});