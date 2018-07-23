const nforce = require('nforce');

// Connect to Salesforce
const SF_CONSUMER_KEY = process.env.SF_CONSUMER_KEY;
const SF_CONSUMER_SECRET = process.env.SF_CONSUMER_SECRET;
const SF_USER_NAME = process.env.SF_USER_NAME;
const SF_USER_PASSWORD = process.env.SF_USER_PASSWORD;
const SF_ENVIRONMENT = process.env.SF_ENVIRONMENT;

const org = nforce.createConnection({
    clientId: SF_CONSUMER_KEY,
    clientSecret: SF_CONSUMER_SECRET,
    environment: SF_ENVIRONMENT || 'sandbox',
    redirectUri: 'http://localhost:3000/oauth/_callback',
    mode: 'single',
    autoRefresh: true
});

org.authenticate({username: SF_USER_NAME, password: SF_USER_PASSWORD}, err => {
    if (err) {
        console.error("Salesforce authentication error");
        console.error(err);
    } else {
        console.log("Salesforce authentication successful");
        console.log(org.oauth.instance_url);
    }
});

exports.publishLanguageEvent = (payload) => {

    return new Promise((resolve, reject) => {
        let event = nforce.createSObject('Einstein_Event__e');
        event.set('Phrase__c', payload.phrase);
        event.set('Origin__c', payload.origin);
        event.set('Message_URL__c', payload.messageURL);
        event.set('User_Name__c', payload.userName);
        event.set('Screen_Name__c', payload.screenName);
        event.set('User_Pic_URL__c', payload.userPicURL);
        event.set('Image_URL__c', payload.imageURL);
        event.set('Intent_Predictions__c', JSON.stringify(payload.intentPredictions));
        event.set('Sentiment_Predictions__c', JSON.stringify(payload.sentimentPredictions));
        event.set('Vision_Predictions__c', JSON.stringify(payload.visionPredictions));
        org.insert({sobject: event}, err => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Einstein_Event__e published");
                resolve();
            }
        });
    });

}