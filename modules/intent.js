'use strict';

const request = require('request');

const url = 'https://api.einstein.ai/v2/language/intent';

exports.predict = (text, accessToken) => {

    return new Promise((resolve, reject) => {

        const formData = {
            modelId: process.env.EINSTEIN_INTENT_MODEL, 
            document: text
        };

        const options = {
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            formData: formData
        };

        request.post(options, function (error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(body);
                const data = JSON.parse(body);
                resolve(data);
            }
        });
    });

};