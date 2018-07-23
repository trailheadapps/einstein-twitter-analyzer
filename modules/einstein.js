"use strict";

const sentiment = require('./sentiment'),
    intent = require('./intent'),
    vision = require('./vision'),
    salesforce = require('./salesforce'),
    tokenHelper = require('./token-helper');

exports.analyze = (tweet) => {

    tokenHelper.getAccessToken().then(accessToken => {
        let phrase = tweet.text;
        let origin = 'Twitter';
        let userName = tweet.user.name;
        let screenName = tweet.user.screen_name;
        let userPicURL = tweet.user.profile_image_url;
        let messageURL = `https://twitter.com/${userName}/status/${tweet.id_str}`;
        let imageURL;
        if (tweet.entities.media && tweet.entities.media.length > 0) {
            imageURL = tweet.entities.media[0].media_url;
        }

        let promises = [];
        promises.push(sentiment.predict(phrase, accessToken));
        promises.push(intent.predict(phrase, accessToken));
        if (imageURL) {
            promises.push(vision.predict(imageURL, accessToken));
        }

        Promise.all(promises).then(predictions => {

            console.log(predictions);

            let payload = {
                phrase: phrase,
                origin: origin,
                messageURL: messageURL,
                userName: userName,
                screenName: screenName,
                userPicURL: userPicURL,
                imageURL: imageURL,
                sentimentPredictions: predictions[0],
                intentPredictions: predictions[1],
                visionPredictions: imageURL ? predictions[2] : null
            }

            salesforce.publishLanguageEvent(payload);

        });

    });

};