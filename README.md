# Einstein Twitter Analyzer

The Einstein Twitter Analyzer app is a Node.js app running on Heroku. It monitors tweets using keywords you specify. The app uses Einstein Platform Services to analyze each tweet:

- Einstein Sentiment identifies the overall sentiment of the tweet (positive, neutral or negative)
- Einstein Intent identifies a potential call to action in the tweet
- Einstein Vision attempts to determine what's in the picture attached to the tweet (if any)

The Twitter Einstein Analyzer app then publishes a platform event with the Tweet details as well as the Einstein predictions. You can subscribe to that platform event in a Salesforce app and take the appropriate action when a tweet is published.

## Installation instructions

### Step 1: Create Twitter App and Einstein Models

1. Create a Twitter application

    https://apps.twitter.com 

1. Create an Einstein account

    https://api.einstein.ai/signup

1. Create an Einstein vision model

    https://trailhead.salesforce.com/en/projects/predictive_vision_apex

1. Create an Einstein intent model

    https://trailhead.salesforce.com/en/modules/einstein_intent_basics

### Step 2: Create Salesforce App

The steps below provide an example of integrating the Einstein Twitter Analyzer app with the [Northern Trail Outfitters sample app](https://github.com/trailheadapps/northern-trail-outfitters). You can use the Einstein Twitter Analyzer app with any Salesforce app. All you need to do is create an Einstein_Event__e platform event and subscribe to that event (See the Northern Trail Outfitters sample app for an example). 

1. Install the Northern Trail Outfitters Salesforce application first. See instructions here: <a href="https://github.com/trailheadapps/northern-trail-outfitters">https://github.com/trailheadapps/northern-trail-outfitters</a>

1. In **Setup > Users**, create an integration user that you will use to connect to Salesforce from the Node.js app. Select **Salesforce** as the license type and **System Administrator** as the profile. 

1. Log in (at least once) as that user via your browser. For scratch orgs, use <a href="https://test.salesforce.com">https://test.salesforce.com</a> as the login URL. For Develper Edition orgs, use <a href="https://login.salesforce.com">https://login.salesforce.com</a>. Choose to not register your phone number.

1. In **Setup > Users > Permission Sets**, assign your integration user to the **NTO** permission set.

1. Create a Connected App in your scratch org or your developer edition:
    - In **Setup > Apps > App Manager**, click **New Connected App**
    - Specify a Connected App Name. For example, **NTO Manufacturing**
    - Enter your email address for **Contact Email**
    - Enter **http://localhost:3000/oauth/_callback** as the Callback URL (This URL is not used in the application)
    - Check **Enable OAuth Settings**
    - Add **Full access (full)** to the **Selected OAuth Scopes**
    - Click **Save** and click **Continue**

### Step 3: Install Einstein Twitter Analyzer app

### Option 1: Install the Einstein Twitter Analyzer app using the Heroku button

1. Make sure you are logged in to the Heroku Dashboard
1. Click the button below to deploy the manufacturing app on Heroku:

    [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

1. Fill in the config variables as follows:
    - **TWITTER_ACCESS_TOKEN**: Your Twitter app access token
    - **TWITTER_ACCESS_TOKEN_SECRET**: Your Twitter app access token secret
    - **TWITTER_CONSUMER_KEY**: Your Twitter app consumer key
    - **TWITTER_CONSUMER_SECRET**: Your Twitter app consumer secret
    - **TWITTER_TRACK**: Comma separated list of words to track
    - **EINSTEIN_ACCOUNT_ID**: Email address used to create Einstein account
    - **EINSTEIN_PRIVATE_KEY**: Einstein account provate key
    - **EINSTEIN_SENTIMENT_MODEL**: Einstein sentiment model id
    - **EINSTEIN_INTENT_MODEL**: Einstein intent model id
    - **EINSTEIN_VISION_MODEL**: Einstein vision model id
    - **SF_CONSUMER_KEY**, Your Salesforce connected app consumer key
    - **SF_CONSUMER_SECRET**: Your Salesforce connected app consumer secret
    - **SF_USER_NAME**: Your Salesforce integration user username
    - **SF_USER_PASSWORD**: Your Salesforce integration user password
    - **SF_ENVIRONMENT**: Enter **sandbox** if using a scratch org, or **production** if using a regular Developer Edition.

### Option 2: Install the Einstein Twitter Analyzer app manually

1. Clone this repository:
    ```
    git clone https://github.com/trailheadapps/einstein-twitter-analyzer
    cd einstein-twitter-analyzer
    ```

1. Create a Heroku app and give it a name:
    ```
    heroku create *your_app_name*
    ```

1. Set the Heroku config variables (replace with values from your connected app):
    
    ```bash
    heroku config:set TWITTER_ACCESS_TOKEN=*Your Twitter app access token*
    heroku config:set TWITTER_ACCESS_TOKEN_SECRET=*Your Twitter app access token secret*
    heroku config:set TWITTER_CONSUMER_KEY=*Your Twitter app consumer key*
    heroku config:set TWITTER_CONSUMER_SECRET=*Your Twitter app consumer secret*
    heroku config:set TWITTER_TRACK=*Comma separated list of words to track*
    heroku config:set EINSTEIN_ACCOUNT_ID=*Email address used to create Einstein account*
    heroku config:set EINSTEIN_PRIVATE_KEY="*Einstein account provate key*"
    heroku config:set EINSTEIN_SENTIMENT_MODEL=*Einstein sentiment model id*
    heroku config:set EINSTEIN_INTENT_MODEL=*Einstein intent model id*
    heroku config:set EINSTEIN_VISION_MODEL=*Einstein vision model id*
    heroku config:set SF_CONSUMER_KEY=*Your Salesforce connected app consumer key*
    heroku config:set SF_CONSUMER_SECRET=*Your Salesforce connected app consumer secret*
    heroku config:set SF_USER_NAME=*Your Salesforce integration user username*
    heroku config:set SF_USER_PASSWORD=*Your Salesforce integration user password*
    heroku config:set SF_ENVIRONMENT=*Your or type* 
    ```

    Set **SF_ENVIRONMENT** to **sandbox** if using a scratch org, or **production** if using a Developer Edition.

1. Push the code to your Heroku app: 
    ```
    git push heroku master
    ```

    or run the application locally:
    ```
    heroku run:local npm start
    ```

**Note:** If you're using a scratch org for this integration, keep in mind that you'll need to repeat the above steps and re-set your Heroku app's config variables when your scratch org expires.

## Step 4: 

1. Click the **Einstein Twitter Analyzer** tab

1. Tweet with one of the keywords you specified in the **TWITTER_TRACK** environment variable

1. Watch the tweets flow into the Einstein Twitter Analyzer tab in Salesforce

## Troubleshooting

- Make sure you can successfully login with your integration user in a browser window (using https://test.salesforce.com for scratch orgs or https://login.salesforce.com for regular developer editions)
- Make sure the System Administrator profile has an IP Range set from 0.0.0.0 to 255.255.255.255.
- Make sure you assigned your integration user to the NTO permission set
- Check the Heroku logs
- Check the browser console log