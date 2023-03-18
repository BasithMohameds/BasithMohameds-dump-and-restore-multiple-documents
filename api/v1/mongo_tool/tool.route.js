const express = require("express");
const toolRoute = express.Router();

const { catchAsync } = require("../../../service/common-service");
const { mongodbDump, mongodbRestore } = require("./tool.service");

toolRoute.get("/", (req, res) => {
  res.send("MongoDB Tool Home Page");
});

// 1 dump api
toolRoute.post("/dump", catchAsync(mongodbDump));

// 2 restore api
toolRoute.post("/restore", catchAsync(mongodbRestore));

module.exports = toolRoute;
