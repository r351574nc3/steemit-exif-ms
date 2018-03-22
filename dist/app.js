"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
// Controllers (route handlers)
const exifController = require("./controllers/exif");
// Create Express server
const app = express();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Primary app routes.
 */
app.get("/:author/:permlink", exifController.index);
module.exports = app;
//# sourceMappingURL=app.js.map