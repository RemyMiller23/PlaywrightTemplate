// @ts-check
import { test, expect } from '@playwright/test';
import { commonFunctions } from '@commonFunctions';
import { uiMethods } from '@uiMethods';
import { uiFunctions } from '@uiFunctions';


test.describe.parallel('Login Authentication Tests', () => {
    /** @type {uiMethods} */
    let uiMethods_;
    let uiFunctions_;
    let client_data;
    test.beforeEach(async ({ page }, testInfo) => {
        // Setups UI methods & functions
        uiMethods_ = new uiMethods(page, testInfo);
        uiFunctions_ = new uiFunctions(page, testInfo);

        client_data = await commonFunctions.getClientData('male')
        console.log(client_data)
    });

    test.afterEach(async ({ }, testInfo) => {
        // Closes the page after each test
        await uiFunctions_.tearDown();
        console.log(`Test "${testInfo.title}" completed.`);
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
    * @owner Remy Miller
    * @jira 5674
    * @company Caltex
    */
    test('EcoCommissions - Login Unsuccessful', { tag: ['@Negative'] }, async () => {
        await uiMethods_.ecoCommissionsLogin(client_data.idNumber);

    });

    /**
    * Login to EcoCommissions
    * @owner Remy Miller
    * @jira 5698
    * @company BP
    */
    test('EcoCommissions - Login Default', { tag: ['@Negative'] }, async () => {
        await uiMethods_.ecoCommissionsLogin();

    });


});