const apiRouter = require("express").Router();
const tweetsRouter = require("./tweets");

apiRouter.use("/tweets", tweetsRouter);

module.exports = apiRouter;
