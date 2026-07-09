const { test, expect } = require('@playwright/test');
require('dotenv').config();
import { healthCheckAPIs,authAPIs,bookingAPIs } from '@apiRequests';
import { authPayloads,bookingPayloads } from '@apiPayloads'
import config from '@environment-manager';


test.describe('Create Product Tests', () => {
    let token;
    let bookingId;

    test.beforeEach(async () => {
        await test.step('Check if service is running', async () => {
            const response = await healthCheckAPIs.ping();
            await expect(response).toBeTruthy();
            const responseText = await response.text();
            console.log(responseText);
            await expect(responseText).toEqual('Created')
        });

        await test.step('Generate Token', async () => {
            const tokenBody =authPayloads.tokenPayload(config.credentials.tokenUsername,config.credentials.tokenPassword)
            const tokenResponse = await authAPIs.getToken(tokenBody);
            await expect(tokenResponse).toBeTruthy();
            const tokenRsponseJson = await tokenResponse.json();
            token = tokenRsponseJson.token
            await expect(token).toBeDefined();
            console.log(token)
        });
    });

    test.afterEach(async ({ }, testInfo) => {
        // delete the booking that was created
        console.log(`Test "${testInfo.title}" completed.`);
        console.log(`Status: ${testInfo.status}`);

        if(testInfo.status === 'passed'){
            //request and successful response
            const response = await bookingAPIs.deleteBookingById(bookingId,token);
            await expect(response).toBeTruthy();
            //deserialize response
            const responseText = await response.text();
            await expect(responseText).toEqual('Created');
    
        }
    });

    /**
    * add extra information for case
    * @owner Remy Miller
    * @jira 7366
    * @company Pick 'n Pay
    */
    test('E2E of making a booking', { tag: ['@Positive'] }, async () => {
        await test.step('Create Booking', async () => {
            //create payload
            const clientBody = bookingPayloads.createBookingPayload('Mark', 'Brown',9188,true,'2026-01-15','2026-02-23','Water on a daily and a warm blanket')
            console.log(clientBody)
            //request and successful response
            const response = await bookingAPIs.createBooking(clientBody);
            await expect(response).toBeTruthy();
            //deserialize response
            const responseJson = await response.json();
            console.log(responseJson);
            bookingId = String(responseJson.bookingid)
        });

        await test.step('Verify Specific Booking', async () => {
            //request and successful response
            const response = await bookingAPIs.getBookingById(bookingId);
            await expect(response).toBeTruthy();
            //deserialize response
            const responseJson = await response.json();
            console.log(responseJson);
        });

    })

});
