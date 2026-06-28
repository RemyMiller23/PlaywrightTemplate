// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config()

/**
* Read environment variables from file.
* https://github.com/motdotla/dotenv
*/
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
* @see https://playwright.dev/docs/test-configuration
*/

process.env.ENV = 'dev';
const ENV = process.env.ENV;
if (!ENV || ![`dev`, `int`, `qa`, `ppd`].includes(ENV)) {
    console.log(`Please provide a correct environment value like "dev/int/qa e.g ENV=dev npx playwright test <pathtotest>"`);
    process.exit();
}

export default defineConfig({
    timeout: 30 * 60 * 1000, // 30 minutes
    updateSnapshots: 'none', // ✅ Never update snapshots automatically
    expect: {
        /**
        * Maximum time expect() should wait for the condition to be met.
        * For example in `await expect(locator).toHaveText();`
        */
        timeout: 2000,
    },

    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    //forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 2,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 5 : 2,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['line'],
        [
            'monocart-reporter',
            {
                name: `Playwright Test Report - ${process.env.ENV}`,
                outputFile: 'test-results/report.html',
                onEnd: async (reportData, helper) => {
                    const { summary } = reportData;
                    // browserstack_toggle ? await combineBrowserstack(reportData, helper) : null;
                    // browserstack_toggle ? await browserstack(reportData, helper) : null;
                    // process.env.CI && summary.tests.value > 0 ? await slackWebhook(reportData) : null;
                    // await slackWebhook(reportData);
                },
                tags: {
                    Positive: {
                        style: {
                            background: '#008000',
                        },
                        description: 'This is a positive test',
                    },
                    Negative: {
                        style: {
                            background: '#d00',
                        },
                        description: 'This is a negative test',
                    },
                },

                // custom columns
                columns: (defaultColumns) => {
                    // disable title tags
                    defaultColumns.find((column) => column.id === 'title').titleTagsDisabled = true;

                    // add tags column
                    const index = defaultColumns.findIndex((column) => column.id === 'type');
                    defaultColumns.splice(
                        index,
                        0,
                        {
                            // define the column in reporter
                            id: 'owner',
                            name: 'Owner',
                            width: 100,
                            searchable: true,
                            styleMap: {
                                'font-weight': 'normal',
                            },
                        },
                        {
                            // another column for JIRA link
                            id: 'jira',
                            name: 'JIRA #',
                            width: 100,
                            searchable: true,
                            styleMap: 'font-weight:normal;',
                            formatter: (v, rowItem, columnItem) => {
                                const key = rowItem[columnItem.id];
                                return `<a href="https://your-jira-url/${key}" target="_blank">${v}</a>`;
                            },
                        },
                        {
                            // another cloumn for Company name
                            id: 'company',
                            name: 'Company',
                            width: 100,
                            searchable: true,
                            styleMap: {
                                'font-weight': 'normal',
                            },
                        },
                        {
                            id: 'tags',
                            name: 'Tags',
                            width: 100,
                            formatter: 'tags',
                        },
                    );
                },
            },
        ],
    ],

    /* Configure projects for major browsers */
    projects: [
        //UI Portion
        {
            name: 'Eco Commissions UI',
            testDir: './tests/ui',
            // Change snapshot location
            snapshotDir: './data/screenshots', // All snapshots go here
            expect: {
                /**
                * Maximum time expect() should wait for the condition to be met.
                * For example in `await expect(locator).toHaveText();`
                */
                timeout: 2000,

                // Add visual regression settings
                toHaveScreenshot: {
                    threshold: 0.2, // Allow 20% pixel difference threshold
                    animations: 'disabled', // Disable animations for consistent screenshots
                    scale: 'css', // Use CSS pixels, ignore device scaling
                },
            },
            use: {
                actionTimeout: 5000,
                ignoreHTTPSErrors: true,
                viewport: process.env.CI ? { width: 1920, height: 1080 } : null, // Dynamic viewport locally, fixed on CI
                headless: false,
                launchOptions: {
                    slowMo: 250,
                    args: process.env.CI ? [] : ['--start-maximized', '--force-device-scale-factor=1'],
                },
                screenshot: 'only-on-failure',
                video: 'on-first-retry',
                permissions: ['camera'],
            },
        },
        // API Tests - No browser needed
        {
            name: 'Eco Commissions Services API',
            testDir: './tests/api',
            use: {
                ignoreHTTPSErrors: true,
                // API tests don't need browser features
                headless: true,
                launchOptions: {
                    // Minimal browser for API intercepted requests only
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                },
                // No screenshots/videos for API tests
                screenshot: 'off',
                video: 'off',
            },
        },
    ],
});