const { test, expect } = require('@playwright/test');
require('dotenv').config();
import { productAPIs } from '@apiRequests';
import { productPayloads } from '@apiPayloads'


test.describe('Create Product Tests', () => {
    /**
    * add extra information for case
    * @owner Remy Miller
    * @jira 7366
    * @company Shell
    */
    test('Basic Service Rest API Test POST & GET', { tag: ['@Positive'] }, async () => {
        await test.step('Add New Product', async () => {
            //create payload
            let clientbody = productPayloads.newProductPayload('Amazing Juice')
            console.log(clientbody)
            //request and successful response
            const response = await productAPIs.addNewProduct(clientbody);
            await expect(response).toBeTruthy();
            //deserialize response
            const responseJson = await response.json();
            console.log(responseJson);
        });

        await test.step('Verify Product id 1 - Return Policy', async () => {
            //request and successful response
            const response = await productAPIs.getSingleProduct('1');
            await expect(response).toBeTruthy();
            //deserialize response
            const responseJson = await response.json();
            console.log(responseJson);
            //asseertion of response
            expect(responseJson.returnPolicy).toContain('No')
        });

    })

});
