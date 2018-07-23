"use strict";

let accessToken;

const jwt = require('jsonwebtoken');
const request = require('request');

const privateKey = process.env.EINSTEIN_PRIVATE_KEY;
const accountId = process.env.EINSTEIN_ACCOUNT_ID;

const reqUrl = "https://api.metamind.io/v1/oauth2/token";

let rsaPayload = {
    "sub": accountId,
    "aud": reqUrl
}

let rsaOptions = {
    header: {
        "alg": "RS256",
        "typ": "JWT"
    },
    expiresIn: '500h'
}

exports.getAccessToken = () => {

    let assertion = jwt.sign(
        rsaPayload,
        privateKey,
        rsaOptions
    );

    let options = {
        url: reqUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json'
        },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${encodeURIComponent(assertion)}`
    };

    return new Promise((resolve, reject) => {

        if (accessToken) {
            resolve(accessToken);
        } else {

            request.post(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    let data = JSON.parse(body);
                    accessToken = data["access_token"];
                    console.log(accessToken);
                    resolve(accessToken);
                }
            });
        }
    });

};