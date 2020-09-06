import { Router, Request, Response } from "express";
import { wrapper } from ".";

const router = Router();

router.get("/", wrapper(async (req: Request, res: Response) => {
    
}));

export default router;
