import config from '@environment-manager';
import { request } from '@playwright/test';


// Basic Required API Context Request Methods

/**
* GET request using Axios
* @param {string} url - The URL to send the GET request to
* @param {object} options - Optional config (headers, params, etc.)
* @returns {Promise<any>} - The response data or an error
*/
async function getCall(url, options = {}) {
    try {
        let context = await request.newContext();
        const response = await context.get(url, options);
        return response;
    } catch (error) {
        console.error('Error in fetchData:', error);
        throw error; // Rethrow to handle it where the function is used
    }
}

/**
* POST request using Axios
* @param {string} url - The URL to send the POST request to
* @param {object} options - Optional config (headers, etc.)
* @returns {Promise<import('@playwright/test').APIResponse>}
*/
async function postCall(url, options = {}) {
    try {
        let context = await request.newContext();
        const response = await context.post(url, options);
        return response;
    } catch (error) {
        console.error('Error in postData:', error);
        throw error;
    }
}

/**
* PUT request using Axios
* @param {string} url - The URL to send the PUT request to
* @param {object} options - Optional config (headers, etc.)
* @returns {Promise<any>}
*/
async function putCall(url, options = {}) {
    try {
        let context = await request.newContext();
        const response = await context.put(url, options);
        return response;
    } catch (error) {
        console.error('Error in putData:', error);
        throw error;
    }
}

/**
* PATCH request using Axios
* @param {string} url - The URL to send the PATCH request to
* @param {object} options - Optional config (headers, etc.)
* @returns {Promise<import('@playwright/test').APIResponse>} - Playwright API Response
*/
async function patchCall(url, options = {}) {
    try {
        let context = await request.newContext();
        const response = await context.patch(url, options);
        return response;
    } catch (error) {
        console.error('Error in PatchData:', error);
        throw error;
    }
}

/**
* DELETE request using Axios
* @param {string} url - The URL to send the PATCH request to
* @param {object} options - Optional config (headers, etc.)
* @returns {Promise<import('@playwright/test').APIResponse>} - Playwright API Response
*/
async function deleteCall(url, options = {}) {
    try {
        let context = await request.newContext();
        const response = await context.delete(url, options);
        return response;
    } catch (error) {
        console.error('Error in PatchData:', error);
        throw error;
    }
}


// API Groups
export const productAPIs = {
    /**
    * Post client identity fingerprint for foreign-national client
    * @param {Object} payload Payload of the request
    * @returns {Promise<import('@playwright/test').APIResponse>} - Playwright API Response
    */
    addNewProduct: async function (payload) {
        return await postCall(`${config.api.backendEndpoint}/add`, {
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            data: payload,
        });
    },

    /**
    * Gets authentication types for client
    * @param {string} productId - Product ID
    * @returns {Promise<import('@playwright/test').APIResponse>} - Playwright API Response
    */
    getSingleProduct: async function (productId) {
        return await getCall(`${config.api.backendEndpoint}/${productId}`, {
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            params: null,
        });
    },

}
