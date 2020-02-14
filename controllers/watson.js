const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const { API_key, URL } = require("../config");

const { fetchTweets, tidyTweets } = require("./tweets.js");

const toneAnalyzer = new ToneAnalyzerV3({
  version: "2016-05-19",
  authenticator: new IamAuthenticator({
    apikey: API_key
  }),
  url: URL
});

const tweetTone = (req, res, next) => {
  return fetchTweets(req.query.handle)
    .then(tweets => {
      return tidyTweets(tweets);
    })
    .then(cleanTweets => {
      return toneAnalyzer.tone({
        toneInput: { text: cleanTweets },
        content_type: "application/json",
        sentences: false
      });
    })
    .then(({ result }) => {
      console.log(JSON.stringify(result.document_tone.tone_categories));
      return result.document_tone.tone_categories[0].tones;
    })
    .catch(console.log);
};

module.exports = { tweetTone };
