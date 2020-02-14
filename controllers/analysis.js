const { tweetTone } = require("./watson.js");

const topEmotion = array => {
  return array.reduce((acc, val) => {
    if (val.score > acc.score) acc = val;

    return acc;
  });
};

const getEmotion = (req, res, next) => {
  tweetTone(req, res, next)
    .then(topEmotion)
    .then(emotion => {
      const { boys } = require(`../data/boys.js`);
      const chosenBoy = boys[emotion.tone_name];
      const { img, name, bio } = chosenBoy;

      res.render("pages/results", {
        user_emotion: emotion.tone_name,
        img,
        name,
        bio
      });
    });
};

module.exports = {
  getEmotion
};
