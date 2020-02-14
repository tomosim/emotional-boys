const { fetchTweets, tidyTweets } = require("./tweets.js");
const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");
const { watson_username, watson_pass } = require("../config");

const toneAnalyzer = new ToneAnalyzerV3({
  username: watson_username,
  password: watson_pass,
  version: "2016-05-19",
  url: "https://gateway.watsonplatform.net/tone-analyzer/api/"
});

const tweetTone = (req, res, next) => {
  return new Promise((resolve, reject) => {
    fetchTweets(req.query.handle)
      .then(tweets => tidyTweets(tweets))

      .then(cleanTweets => {
        toneAnalyzer.tone(
          {
            tone_input: cleanTweets,
            content_type: "text/plain",
            sentences: false
          },
          function(err, tone) {
            if (err) {
              console.log(err);
            } else {
              console.log(tone.document_tone.tone_categories[0].tones);
              resolve(tone.document_tone.tone_categories[0].tones);
            }
          }
        );
      });
  });
};

module.exports = { tweetTone };
