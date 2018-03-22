import * as got from "got";
import * as tempfile from "tempfile";
import * as Steem from "steem";
import * as ExifReader from "exifreader";
import * as fs from "fs";
import * as path from "path";
import * as Handlebars from "handlebars";
import { Stream } from "stream";
import * as http from "http";
import * as https from "https";

global.DataView = require("jdataview");

class ExifTool {
    get(author: string, permlink: string): any {
        return Steem.api.getContentAsync(author, permlink)
            .then((content: any) => {
                if (content.json_metadata && content.json_metadata != "") {
                    return JSON.parse(content.json_metadata);
                }
                return {};
            })
            .then((metadata: any) => {
                if (metadata.image && metadata.image.length > 0) {
                    return metadata.image;
                }
                return [];
            })
            .map((image: any) => {
                if (image.indexOf(".jpg") > -1 || image.indexOf(".JPG") > -1) {
                    const buffers: Buffer[] = [];
                    return got(image, {encoding: null })
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
            .filter((tag: any) => tag ? true : false);
    }
}

export { ExifTool };