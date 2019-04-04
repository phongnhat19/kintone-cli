import {KintoneConfig} from './dto/kintoneConfig'
import axios from 'axios'
import { Base64 } from 'js-base64';
import * as fs from 'fs'

const fetchRecords = (exportConfig: KintoneConfig, opt_offset?: number, opt_limit?: number, opt_records?: Array<any>): Promise<any> => {
    var offset = opt_offset || 0;
    var limit = opt_limit || 100;
    var allRecords = opt_records || [];
    var params = {app: exportConfig.appID, query: 'limit ' + limit + ' offset ' + offset, fields: exportConfig.fieldsToExport};
    return axios.get(`${exportConfig.domainName}/k/v1/records.json`, {
        params: params,
        headers: exportConfig.headers
    })
    .then((axiosResponse)=>{
        let resp = axiosResponse.data
        allRecords = allRecords.concat(resp.records);
        if (resp.records.length === limit) {
            return fetchRecords(exportConfig, offset + limit, limit, allRecords);
        }
        return allRecords;
    })
    .catch((error)=>{
        if (error.response) {
            console.log(error.response.data)
            return error.response.data
        }
        if (error.request) {
            console.log(error.request)
            return error.request
        }
        console.log(error)
        return error
    })
}

const runExport = (exportConfig: KintoneConfig): Promise<any> => {
    console.log('---------EXPORTING DATA----------')
    if (exportConfig.domainName.indexOf('https://') !== 0) {
        exportConfig.domainName = `https://${exportConfig.domainName}`
    }
    if (exportConfig.authenType === 'APIToken') {
        exportConfig.headers = {
            'X-Cybozu-API-Token': exportConfig.apiToken
        }
    }
    if (exportConfig.authenType === 'BasicAuthen') {
        let basicAuthenToken = Base64.encode(`${exportConfig.basicAuthUsername}:${exportConfig.basicAuthPassword}`)
        exportConfig.headers = {
            'Authorization': `Basic ${basicAuthenToken}`
        }
    }
    if (exportConfig.authenType === 'UsernamePassword') {
        let passwordAuthen = Base64.encode(`${exportConfig.username}:${exportConfig.password}`)
        exportConfig.headers = {
            'X-Cybozu-Authorization': `${passwordAuthen}`
        }
    }
    //console.log(exportConfig)
    return fetchRecords(exportConfig)
    .then((records)=>{
        let currentDate = new Date()
        console.log(`Total Count: ${records.length}`)
        let fileName = `kintone-data-${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`
        fs.writeFile(`${fileName}.${exportConfig.outputFormat}`, JSON.stringify(records), {flag: 'w'}, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log(`Data was saved to ${fileName}.${exportConfig.outputFormat}`);
        }); 
    })
    .catch((error)=>{
        console.log(error)
    })
}

export default runExport