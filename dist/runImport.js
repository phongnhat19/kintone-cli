"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
let questions = [
    {
        type: 'list',
        name: 'encoding',
        message: 'Please choose character encoding ...',
        choices: [
            {
                name: 'utf-8',
                value: 'utf-8'
            },
            {
                name: 'utf-16',
                value: 'utf-16'
            },
            {
                name: 'utf-16be-with-signature',
                value: 'utf-16be-with-signature'
            },
            {
                name: 'utf-16le-with-signature',
                value: 'utf-16le-with-signature'
            },
            {
                name: 'sjis',
                value: 'sjis'
            },
            {
                name: 'euc-jp',
                value: 'euc-jp'
            }
        ]
    }
];
const runImport = () => {
    return inquirer_1.prompt(questions)
        .then((answers) => {
        return answers;
    });
};
exports.default = runImport;
//# sourceMappingURL=runImport.js.map