import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import * as passportJWT from "passport-jwt";
import { getUser } from "../services/AuthService";

const { JWT_SECRET, JWT_VERIFY_SECRET } = process.env;

export const isLoggedIn = passport.authenticate('jwt', { session: false });

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
            if (user) return done(null, user);
            return done(null, false, { message: "Non-registered User" });
        } catch (err) {
            return done(err, false);
        }
    }));
};
