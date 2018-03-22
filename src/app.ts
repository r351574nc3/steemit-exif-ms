import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as expressValidator from "express-validator";
import * as bluebird from "bluebird";

// Controllers (route handlers)
import * as exifController from "./controllers/exif";

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