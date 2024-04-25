const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/hello", (req, res) => {
  res.json({
    hello: "hi MOM!"
  });
});

api.use("/api/", router);

module.exports = app;
module.exports.handler = serverless(app);

