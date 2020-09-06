import { Request, Response, Router } from "express";
import { emailLimiter, wrapper } from ".";
import { createUser, getUserWithUsername } from "../services/AuthService";
import { sendToken } from "../utils/mailer";
import { verify, getLoginToken } from "../utils/passport";

const router = Router();

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
        if (await getUserWithUsername(username)) return "Username taken";
        id = await createUser(username);
    } catch (err) { return "Token expired"; }

    res.status(200).json({
        success: true,
        token: await getLoginToken(id)
    });
}));

export default router;
