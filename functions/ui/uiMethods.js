import config from '@environment-manager';
import { uiFunctions } from '@uiFunctions';
import { commonFunctions } from '@commonFunctions';
import fs from 'fs';
import { expect } from '@playwright/test';

export class uiMethods {
    /**
    * @param {import('@playwright/test').Page} page
    * @param {import('@playwright/test').TestInfo} testInfo
    */
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.uiFunctions = new uiFunctions(page, testInfo);
    }

    /**
    * Navigate to the Client Products Insure Menu Item
    * @param {string} Username - Name of the client as Username
    */
    async ecoCommissionsLogin(Username) {

        await this.page.goto(config.ui.ecoemissionsURL);
        await expect(this.page.getByText('Login Test')).toBeVisible();
        await expect(this.page.getByText('Username')).toBeVisible();
        await expect(this.page.getByText('Password')).toBeVisible();
        await expect(this.page.locator('[value="Login"]')).toBeVisible();

        await this.page.locator('[name="txtUsername"]').fill(Username);
        await this.page.locator('[name="txtPassword"]').fill(config.credentials.loginPassword);

        // Screenshot after populating credentials
        await this.uiFunctions.screenshot('Credentials_Populated');

        await this.page.locator('[value="Login"]').click();

        await expect(this.page.getByText('Login Test')).toBeVisible();
        await expect(this.page.getByText('Sorry, but the username that you entered does not exist.')).toBeVisible();

        // Screenshot after successful login
        await this.uiFunctions.screenshot('Successful_Login');


    }


}