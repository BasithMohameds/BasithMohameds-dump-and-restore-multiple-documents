const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const toolRoute = require("./api/v1/mongo_tool/tool.route");

app.use("/mongodb-tool", toolRoute);

app.listen(5050, () => {
  console.log("Server Started..!");
});
