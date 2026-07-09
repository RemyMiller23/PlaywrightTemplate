import dotenv from 'dotenv';
dotenv.config()

const BackendEndpoint = `https://restful-booker.herokuapp.com`;
const FrontendURL = `http://vbsca.ca/login/login.asp`;

/**
* @typedef {Object} config
* @property {Object} api - API Object containing various endpoint URLs
* @property {string} api.backendEndpoint - API CRUD Service Endpoint
* @property {Object} database - Database configuration object
* @property {string} database.host - Database host
* @property {number} database.port - Database port
* @property {string} database.username - Database username
* @property {string} database.password - Database password
* @property {string} database.name - Database name
* @property {Object} ui - UI configuration object
* @property {string} ui.URL - application URL
* @property {Object} credentials - User credentials for different roles
* @property {string} credentials.loginUsername - Username required to Login
* @property {string} credentials.loginPassword - password required to Login
*/
let config = {
    api: {
        backendEndpoint: `${BackendEndpoint}`,
    },
    database: {
        host: '',
        port: 1000,
        username: '',
        password: '',
        name: '',
    },
    ui: {
        URL: FrontendURL,
    },
    credentials: {
        loginUsername: '',
        loginPassword: '',
        tokenUsername: '',
        tokenPassword: '',
    },
};

switch (process.env.ENV) {
    case 'dev':
        config = {
            api: {
                backendEndpoint: `${BackendEndpoint}`,
            },
            database: {
                host: '',
                port: 1000,
                username: '',
                password: '',
                name: '',
            },
            ui: {
                URL: FrontendURL,
            },
            credentials: {
                loginUsername: process.env.LOGIN_USERNAME_DEV,
                loginPassword: process.env.LOGIN_PASSWORD_DEV,
                tokenUsername: process.env.TOKEN_USERNAME,
                tokenPassword: process.env.TOKEN_PASSWORD,
            },
        };
        break;
    case 'qa':
        config = {
            api: {
                backendEndpoint: `${BackendEndpoint}`,
            },
            database: {
                host: '',
                port: 1000,
                username: '',
                password: '',
                name: '',
            },
            ui: {
                URL: FrontendURL,
            },
            credentials: {
                loginUsername: process.env.LOGIN_USERNAME_QA,
                loginPassword: process.env.LOGIN_PASSWORD_QA,
                tokenUsername: process.env.TOKEN_USERNAME,
                tokenPassword: process.env.TOKEN_PASSWORD,
            },
        };
        break;
    case 'uat':
        config = {
            api: {
                backendEndpoint: `${BackendEndpoint}`,
            },
            database: {
                host: '',
                port: 1000,
                username: '',
                password: '',
                name: '',
            },
            ui: {
                URL: FrontendURL,
            },
            credentials: {
                loginUsername: process.env.LOGIN_USERNAME_UAT,
                loginPassword: process.env.LOGIN_PASSWORD_UAT,
                tokenUsername: process.env.TOKEN_USERNAME,
                tokenPassword: process.env.TOKEN_PASSWORD,
            },
        };
        break;
    default:
        throw new Error(`Unknown environment`);
}

export default config;