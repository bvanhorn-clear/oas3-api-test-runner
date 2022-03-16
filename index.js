'use strict';

const fs = require('fs');
const axios = require('axios');
const yaml = require('js-yaml');


const fileName = process.argv[2];
const environment = process.argv[3].toLowerCase() || 'dev';

const type = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
const rawData = fs.readFileSync(fileName);
let spec = {};

switch (type) {
    case 'yaml':
        spec = yaml.load(rawData);
        break;
    case 'json':
        spec = JSON.parse(rawData);
        break;
    default:
        console.log("Invalid input file.  It needs to be a .json or an .yaml file.");
        process.exit();
}

let baseUrl = spec.servers[0].url;  //first server needs to be the one we test for now
const environmentMatch = spec.servers.filter(server => server.description === environment);
if (!environmentMatch) {
    console.log("Couldn't match your environment.  Defaulting to first server url for test which is " + baseUrl);
} else {
    console.log(`Matched environment ${environment}`);
    baseUrl = environmentMatch[0].url;
    console.log(`Using ${baseUrl} for testing.`);
}


for (const path in spec.paths) {
    const pathObject = spec.paths[path];
    if (pathObject.hasOwnProperty("get")) {
        axios.get(baseUrl + path).then(res => {
            console.log(res.data);
        });
    }
}