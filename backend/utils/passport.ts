import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import * as passportJWT from "passport-jwt";
import { getUser } from "../services/AuthService";
import Logger from "./logger";

const { JWT_SECRET, JWT_VERIFY_SECRET } = process.env;

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        if (!user) res.status(401).json({ success: false, message: "Unauthorized" });
        else {
            Logger.info(`Admin Action: ${user.username} ${req.method} ${req.originalUrl}`);
            req.user = user;
            next();
        }
    })(req, res, next);
};

export const getLoginToken = (id: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id },
            JWT_SECRET,
            (err: Error | null, encoded: string | undefined) => {
                if (err) reject(err);
                else resolve(encoded);
            }
        );
    });
};

export const getVerifyToken = (username: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username },
            JWT_VERIFY_SECRET,
            { expiresIn: 600 },
            (err: Error | null, encoded: string | undefined) => {
                if (err) reject(err);
                else resolve(encoded);
            }
        );
    });
};

export const verify = (token: string): Promise<{ username: string }> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            JWT_VERIFY_SECRET,
            undefined,
            (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded as { username: string });
            }
        );
    });
};

export default () => {
    passport.use(new passportJWT.Strategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: req => req && req.signedCookies && req.signedCookies["AdminToken"]
    }, async (payload: { id: number }, done) => {
        try {
            const user = await getUser(payload.id);
            if (!user) throw null;
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));
};
