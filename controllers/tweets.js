const Twit = require("twit");
const {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret
} = require("../config");

const T = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret
});

const fetchTweets = (handle, count = 50) => {
  return new Promise((resolve, reject) => {
    return T.get("statuses/user_timeline", {
      screen_name: handle,
      count: count,
      includes_rts: false
    })
      .then(tweetData => {
        tweetArr = [];
        for (let i = 0; i < tweetData.data.length; i++) {
          const text = tweetData.data[i].text;
          tweetArr.push(text);
        }
        resolve(tweetArr);
      })
      .catch(err => console.log(err));
  });
};

const tidyTweets = arr => {
  const regex = /[^a-z.'!? ]/gi;
  return arr
    .map(tweet => {
      return tweet.replace(regex, "");
    })
    .join(" ");
};

module.exports = { fetchTweets, tidyTweets };
