import * as winston from "winston";
import { Request, Response, NextFunction } from "express";
require("winston-daily-rotate-file");

const { LOGGER_DATE_LOCALE } = process.env;

const Logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new (winston.transports as any).DailyRotateFile({
            dirname: 'log',
            filename: '%DATE%.log',
            datePattern: 'YYYY-MM-DD',
        })
    ],
});

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const who = req.headers['x-real-ip'];
    const when = new Date().toLocaleString(LOGGER_DATE_LOCALE, {
        hour: "numeric",
        minute:"numeric",
        second: "numeric",
        hour12: false
    });
    Logger.info(`${who} ${when} ${req.method} ${req.path}`);
    next();
};

export default Logger;
