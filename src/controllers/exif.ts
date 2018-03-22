import { Request, Response } from "express";
import { ExifTool } from "../helpers/exif";

const exif = new ExifTool();

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
    exif.get(req.params.author, req.params.permlink)
        .then((metadata: any[]) => {
            if (metadata.length < 1) {
                res.sendStatus(404);
            }
            else {
                res.send(metadata);
            }
        });
    };