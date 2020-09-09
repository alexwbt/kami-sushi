import { Request, Response, Router } from "express";
import { wrapper } from ".";
import { getAllItem } from "../services/ItemService";
import { getAllMenu, createMenu } from "../services/MenuService";
import { isLoggedIn } from "../utils/passport";
import tables, { MENU_I } from "../tables";

const router = Router();

router.get("/", wrapper(async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        menus: await getAllMenu(),
        items: await getAllItem()
    });
}));

router.post("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { menu_name, min_column, max_column, padding, banner } = req.body;

    const valid = tables[MENU_I].valid(req.body);
    if (valid !== true) return valid;

    await createMenu({ menu_name, min_column, max_column, padding, banner });

    res.status(200).json({ success: true });
}));

export default router;
