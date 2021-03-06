"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
let questions = [
    {
        type: 'input',
        name: 'domainName',
        message: 'Enter your domain name ...',
        validate: (domainName) => {
            if (/^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/.test(domainName)) {
                return true;
            }
            return "Pleas enter a valid domain.";
        }
    },
    {
        type: 'input',
        name: 'appID',
        message: 'Enter your app ID ...(Press enter to skip)',
        default: '0',
        validate: (appID) => {
            if (!/^\d+$/.test(appID)) {
                return 'Please enter a valid app ID';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'guestSpaceID',
        message: 'Enter your guest space ID ...(Press enter to skip)',
        default: '0',
        validate: (guestSpaceID) => {
            if (!/^\d+$/.test(guestSpaceID)) {
                return 'Please enter a valid guest space ID';
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'authenType',
        message: 'Please choose authentication type ...',
        choices: [
            {
                name: 'API Token',
                value: 'APIToken'
            },
            {
                name: 'Basic Authentication',
                value: 'BasicAuthen'
            },
            {
                name: 'Username / Password',
                value: 'UsernamePassword'
            }
        ]
    },
    {
        type: 'input',
        name: 'apiToken',
        message: 'Enter your API Token ...',
        when: (currentValue) => {
            return currentValue['authenType'] === 'APIToken';
        }
    },
    {
        type: 'input',
        name: 'basicAuthUsername',
        message: 'Enter your Basic Authentication Username ...',
        when: (currentValue) => {
            return currentValue['authenType'] === 'BasicAuthen';
        }
    },
    {
        type: 'input',
        name: 'basicAuthPassword',
        message: 'Enter your Basic Authentication Password ...',
        when: (currentValue) => {
            return currentValue['authenType'] === 'BasicAuthen';
        },
        transformer: (password) => {
            return '*'.repeat(password.length);
        }
    },
    {
        type: 'input',
        name: 'username',
        message: 'Enter your Username ...',
        when: (currentValue) => {
            return currentValue['authenType'] === 'UsernamePassword';
        }
    },
    {
        type: 'input',
        name: 'password',
        message: 'Enter your Password ...',
        when: (currentValue) => {
            return currentValue['authenType'] === 'UsernamePassword';
        },
        transformer: (password) => {
            return '*'.repeat(password.length);
        }
    },
    {
        type: 'list',
        name: 'command',
        message: 'Please choose action ...',
        choices: [
            {
                name: 'Import',
                value: 'import'
            },
            {
                name: 'Export',
                value: 'export'
            }
        ]
    },
    {
        type: 'input',
        name: 'fieldsToExport',
        message: 'Enter your field to export (seperated by comma) ...',
        when: (currentValue) => {
            return currentValue['command'] === 'export';
        }
    },
    {
        type: 'input',
        name: 'queryString',
        message: 'Enter your query string (press enter to skip) ...',
        default: '',
        when: (currentValue) => {
            return currentValue['command'] === 'export';
        }
    },
    {
        type: 'list',
        name: 'outputFormat',
        message: 'Please choose output format ...',
        choices: [
            {
                name: 'CSV',
                value: 'csv'
            },
            {
                name: 'JSON',
                value: 'json'
            }
        ],
        when: (currentValue) => {
            return currentValue['command'] === 'export';
        }
    }
];
const runConfig = () => {
    return inquirer.prompt(questions)
        .then((answers) => {
        return answers;
    });
};
exports.default = runConfig;
//# sourceMappingURL=runConfig.js.map