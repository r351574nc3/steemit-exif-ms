"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exif_1 = require("../helpers/exif");
const exif = new exif_1.ExifTool();
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    exif.get(req.params.author, req.params.permlink)
        .then((metadata) => {
        if (metadata.length < 1) {
            res.sendStatus(404);
        }
        else {
            res.send(metadata);
        }
    });
};
//# sourceMappingURL=exif.js.map