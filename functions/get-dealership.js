// IBM Action, method=GET, node.js v12
// API https://eca74085.eu-gb.apigw.appdomain.cloud/api (for node v16)
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


function main(params) {
    // console.log(params);
    return new Promise(function(resolve, reject) {
        const { CloudantV1 } = require('@ibm-cloud/cloudant');
        const { IamAuthenticator } = require('ibm-cloud-sdk-core');
        // my IAM_API_KEY
        const authenticator = new IamAuthenticator({ apikey: '5JZc4yWEBGRae-Ppwi9ydOglDcWwjW1egFx8-rnfElnm' })
        const cloudant = CloudantV1.newInstance({
            authenticator: authenticator
        });
        // my COUCH_URL
        cloudant.setServiceUrl('https://apikey-v2-1csac5kpgz3565tngf6qkazsen0qjdv8yrhfztjrui5c:41b9f6ff47a41bdd5e7c8df2a5b4cb1e@01770a55-31d3-478f-adf1-9df9ca660237-bluemix.cloudantnosqldb.appdomain.cloud');
        if (params.st) {
            // return dealership with this state 
            cloudant.postFind({ db: 'dealerships', selector: { st: params.st } })
                .then((result) => {
                    // console.log(result.result.docs);
                    let code = 200;
                    if (result.result.docs.length == 0) {
                        code = 404;
                    }
                    resolve({
                        statusCode: code,
                        headers: { 'Content-Type': 'application/json' },
                        body: result.result.docs
                    });
                }).catch((err) => {
                    reject(err);
                })
        } else if (params.id) {
            id = parseInt(params.dealerId)
                // return dealership with this state 
            cloudant.postFind({
                    db: 'dealerships',
                    selector: {
                        id: parseInt(params.id)
                    }
                })
                .then((result) => {
                    // console.log(result.result.docs);
                    let code = 200;
                    if (result.result.docs.length == 0) {
                        code = 404;
                    }
                    resolve({
                        statusCode: code,
                        headers: { 'Content-Type': 'application/json' },
                        body: result.result.docs
                    });
                }).catch((err) => {
                    reject(err);
                })
        } else {
            // return all documents 
            cloudant.postAllDocs({ db: 'dealerships', includeDocs: true, limit: 10 })
                .then((result) => {
                    // console.log(result.result.rows);
                    let code = 200;
                    if (result.result.rows.length == 0) {
                        code = 404;
                    }
                    resolve({
                        statusCode: code,
                        headers: { 'Content-Type': 'application/json' },
                        body: result.result.rows
                    });
                }).catch((err) => {
                    reject(err);
                })
        }
    })
}

main({})