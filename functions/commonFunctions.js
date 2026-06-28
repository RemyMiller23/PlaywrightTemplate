import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import fakeSaIdGenerator from 'south-african-fake-id-generator';

export const commonFunctions = {

    /**
    * Gets today's date in the format dd/mm/yyyy
    * @returns {Promise<string>} - The formatted date string
    */
    getTodaysDate: async function () {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    },

    /**
    * @param {"male" | "female"} Gender - Gender: Male or Female
    * @returns {Promise<Object>} - Client object
    */
    getClientData: async function (Gender) {
        const generate_age = faker.number.int({ min: 18, max: 65 });
        const prefixes = [
            "060", "061", "062", "063", "064", "065", "066", "067", "068", "069",
            "071", "072", "073", "074", "075", "076", "077", "078", "079",
            "081", "082", "083", "084", "085", "086", "087", "088", "089"
        ];

        const prefix = faker.helpers.arrayElement(prefixes);
        const rest = faker.number.int({ min: 1000000, max: 9999999 });

        const client = {
            age: generate_age,
            name: faker.person.firstName(Gender),
            surname: faker.person.lastName(Gender),
            phoneNumber: `${prefix}${rest}`,
            idNumber: fakeSaIdGenerator.generateFakeIdByAge(generate_age)
        }

        return client
    },
}