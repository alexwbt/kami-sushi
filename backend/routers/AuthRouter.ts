import { Request, Response, Router } from "express";
import { emailLimiter, wrapper } from ".";
import { createUser, getUserWithUsername } from "../services/AuthService";
import { sendToken } from "../utils/mailer";
import { getLoginToken, isLoggedIn, verify } from "../utils/passport";

const { COOKIES_DOMAIN, SECURE_CONNECTION } = process.env;

const router = Router();

router.get("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    res.status(200).json({ success: true, user: req.user });
}));

router.post("/", emailLimiter, wrapper(async (req: Request, res: Response) => {
    const { username } = req.body;

    if (typeof username !== "string" || username.length === 0) return "Invalid username";
    if (await getUserWithUsername(username)) return "Username taken";

    try { await sendToken(username); }
    catch (err) { return err; }

    res.status(200).json({ success: true });
}));

router.post("/verify", wrapper(async (req: Request, res: Response) => {
    const { token } = req.body;

    let id: number;
    try {
        const { username } = await verify(token);
        if (await getUserWithUsername(username)) return "Used Token";
        id = await createUser(username);
    } catch (err) { return "Token expired"; }

    const adminToken = await getLoginToken(id);
    res.cookie("AdminToken", adminToken, {
        signed: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 315569259747,
        domain: COOKIES_DOMAIN,
        secure: SECURE_CONNECTION === 'true'
    });

    res.status(200).json({ success: true });
}));

export default router;
