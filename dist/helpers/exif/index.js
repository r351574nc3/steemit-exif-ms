"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got");
const Steem = require("steem");
const ExifReader = require("exifreader");
global.DataView = require("jdataview");
class ExifTool {
    get(author, permlink) {
        return Steem.api.getContentAsync(author, permlink)
            .then((content) => {
            if (content.json_metadata && content.json_metadata != "") {
                return JSON.parse(content.json_metadata);
            }
            return {};
        })
            .then((metadata) => {
            if (metadata.image && metadata.image.length > 0) {
                return metadata.image;
            }
            return [];
        })
            .map((image) => {
            if (image.indexOf(".jpg") > -1 || image.indexOf(".JPG") > -1) {
                const buffers = [];
                return got(image, { encoding: null })
                    .then((response) => {
                    try {
                        console.log("Loading ", image);
                        return ExifReader.load(response.body);
                    }
                    catch (err) {
                        Promise.reject(err);
                    }
                })
                    .catch((error) => {
                    console.log("Error ", error);
                });
            }
        })
            .filter((tag) => tag ? true : false);
    }
}
exports.ExifTool = ExifTool;
//# sourceMappingURL=index.js.map