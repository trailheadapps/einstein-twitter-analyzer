const http = require('http');
const einstein = require('./modules/einstein');

const Twit = require('twit');

const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

// The words to track
const track = TWITTER_TRACK.split(',');

const stream = T.stream('statuses/filter', { track: track });

stream.on('tweet', function (tweet) {
    console.log(tweet);
    einstein.analyze(tweet);
});

// To keep Heroku awake
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Ok, dyno is awake.');
}).listen(process.env.PORT || 5000);