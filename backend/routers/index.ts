import { NextFunction, Request, Response } from "express";
import Logger from "../utils/logger";
import * as RateLimit from "express-rate-limit";
import * as fs from "fs";

const { EMAIL_LIMITER_WINDOW_MS, EMAIL_LIMITER_MAX } = process.env;
export const emailLimiter = RateLimit({ windowMs: +EMAIL_LIMITER_WINDOW_MS, max: +EMAIL_LIMITER_MAX });

export const wrapper = (routerFunction: (req: Request, res: Response, next?: NextFunction) => Promise<string | void>) => {
    return async (req: Request, res: Response, next?: NextFunction) => {
        try {
            const message = await routerFunction(req, res, next);
            if (message && !res.headersSent) {
                res.status(400).json({ success: false, message });
                if (req.file) res.locals.deleteFile = req.file.filename;
            }
        } catch (err) {
            Logger.error(err.message);
            if (!res.headersSent) {
                res.status(500).json({ success: false, message: "Internal Server Error" });
            }
            if (req.file) res.locals.deleteFile = req.file.filename;
        }
        if (!res.headersSent) {
            Logger.error(req.originalUrl + " doesn't have a response.");
            res.status(500).json({ success: false, message: "No Response" });
        }
        if (res.locals.deleteFile || res.locals.deleteFiles) {
            const files = [res.locals.deleteFile, ...(res.locals.deleteFiles || [])];
            await Promise.all(files.map(file => new Promise(resolve => {
                if (file) fs.unlink(`public/${file}`, err => {
                    if (err) Logger.error(err.message);
                    else resolve();
                }); else resolve();
            })));
        }
    };
};
