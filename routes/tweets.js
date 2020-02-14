const tweetsRouter = require("express").Router();
const { getEmotion } = require("../controllers/analysis");

tweetsRouter.route("/").get(getEmotion);

module.exports = tweetsRouter;
