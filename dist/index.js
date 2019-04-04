#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const runConfig_1 = require("./runConfig");
const runExport_1 = require("./runExport");
const buildParams = (cmd) => {
    let returnParam = {
        domainName: cmd.domainName,
        appID: cmd.appID,
        guestSpaceID: cmd.guestSpaceID || 0,
        command: (cmd.import) ? 'import' : 'export',
        authenType: (() => {
            if (cmd.apiToken) {
                return 'APIToken';
            }
            if (cmd.basicAuthUsername) {
                return 'BasicAuthen';
            }
            return 'UsernamePassword';
        })(),
        outputFormat: cmd.outputFormat || 'csv',
        encoding: cmd.encoding || 'utf-8',
        indexPosition: cmd.indexPosition || '1'
    };
    if (returnParam.authenType === 'APIToken') {
        returnParam['apiToken'] = cmd.apiToken;
    }
    else if (returnParam.authenType === 'BasicAuthen') {
        returnParam['basicAuthUsername'] = cmd.basicAuthUsername;
        returnParam['basicAuthPassword'] = cmd.basicAuthPassword;
    }
    else {
        returnParam['username'] = cmd.username;
        returnParam['password'] = cmd.password;
    }
    if (cmd.queryString) {
        returnParam['queryString'] = cmd.queryString;
    }
    if (cmd.fieldsToExport) {
        returnParam['fieldsToExport'] = cmd.fieldsToExport;
    }
    if (cmd.inputFilePath) {
        returnParam['inputFilePath'] = cmd.inputFilePath;
    }
    if (cmd.attachFileDirectory) {
        returnParam['attachFileDirectory'] = cmd.attachFileDirectory;
    }
    if (cmd.deleteRecordsBeforeInsert) {
        returnParam['deleteRecordsBeforeInsert'] = cmd.deleteRecordsBeforeInsert;
    }
    return returnParam;
};
const isValid = (params) => {
    if (!params.domainName) {
        return 'Missing domain name';
    }
    if (!params.appID) {
        return 'Missing app ID';
    }
    if (!params.authenType) {
        return 'Missing authentication type';
    }
    if (params.authenType === 'APIToken') {
        if (!params.apiToken) {
            return 'Missing API Token';
        }
    }
    else if (params.authenType === 'BasicAuthen') {
        if (!params.basicAuthUsername) {
            return 'Missing Basic Authentication Username';
        }
        if (!params.basicAuthPassword) {
            return 'Missing Basic Authentication Password';
        }
    }
    else if (params.authenType === 'UsernamePassword') {
        if (!params.username) {
            return 'Missing Username';
        }
        if (!params.password) {
            return 'Missing Password';
        }
    }
    if (params.command === 'export') {
        if (!params.fieldsToExport) {
            return 'Missing fields to export';
        }
        if (!params.encoding) {
            return 'Missing encoding';
        }
    }
    else if (params.command === 'import') {
        if (!params.inputFilePath) {
            return 'Missing input file path';
        }
        if (!params.attachFileDirectory) {
            return 'Missing attachment file directory';
        }
    }
    return true;
};
program
    .version('0.1.0')
    .description('kintone CLI');
program
    .command('run')
    .alias('r')
    .description('Run kintone CLI')
    .option('--domainName <domainName>', 'Set domain')
    .option('--appID <appID>', 'Set app ID')
    .option('--username <username>', 'Set username')
    .option('--password <password>', 'Set password')
    .option('--guestSpaceID <guestSpaceID>', 'Set guest space ID')
    .option('--apiToken <apiToken>', 'Set API Token')
    .option('--outputFormat <outputFormat>', 'Set output format (\'json\' or \'csv\')')
    .option('--encoding <encoding>', 'Set character encoding')
    .option('--basicAuthenUsername <basicAuthenUsername>', 'Set Username for Basic Authentication')
    .option('--basicAuthenPassword <basicAuthenPassword>', 'Set Password for Basic Authentication')
    .option('--queryString <queryString>', 'Query String for condition')
    .option('--fieldsToExport <fieldsToExport>', 'Field to export (comma separated)')
    .option('--inputFilePath <inputFilePath>', 'Input file path')
    .option('--attachFileDirectory <attachFileDirectory>', 'Attachment file directory')
    .option('--deleteRecordsBeforeInsert', 'Delete records before insert')
    .option('--indexPosition <indexPosition>', 'Position index of data in the input file (default: 1)')
    .option('--import', 'Import from file')
    .option('--export', 'Export to file')
    .action((cmd) => {
    let params = buildParams(cmd);
    if (Object.keys(params).length === 0 && params.constructor === Object) {
        runConfig_1.default()
            .then((config) => {
            if (config.command === 'export') {
                runExport_1.default(config);
            }
        });
    }
    else if (typeof isValid(params) === 'string') {
        console.log(isValid(params));
    }
    else {
        if (params.command === 'export') {
            runExport_1.default(params);
        }
    }
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map