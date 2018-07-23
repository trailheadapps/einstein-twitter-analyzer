'use strict';
const request = require('request');

const url = 'https://api.einstein.ai/v2/vision/predict';

exports.predict = (imageURL, accessToken) => {

    return new Promise((resolve, reject) => {

        let formData = {
            modelId: process.env.EINSTEIN_VISION_MODEL, 
            sampleLocation: imageURL
        };

        let options = {
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            formData: formData
        };

        request.post(options, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                let data = JSON.parse(body);
                resolve(data);
            }
        });

    });

};