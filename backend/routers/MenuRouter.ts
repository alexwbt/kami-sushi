import { Request, Response, Router } from "express";
import { wrapper } from ".";
import { getAllItem } from "../services/ItemService";
import { getAllMenu, createMenu, editMenu, deleteMenu } from "../services/MenuService";
import { isLoggedIn } from "../utils/passport";
import tables, { MENU_I } from "../tables";

const router = Router();

router.get("/", wrapper(async (req: Request, res: Response) => {
    const data = await Promise.all([ getAllMenu(), getAllItem() ]);
    res.status(200).json({
        success: true,
        menus: data[0],
        items: data[1]
    });
}));

router.post("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { name, min_column, max_column, padding, banner } = req.body;

    const valid = tables[MENU_I].valid(req.body);
    if (valid !== true) return valid;

    await createMenu({ name, min_column, max_column, padding, banner });

    res.status(200).json({ success: true });
}));

router.put("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { id, name, min_column, max_column, padding, banner } = req.body;

    if (typeof id !== "number" || id < 1) return "Invalid id";

    const valid = tables[MENU_I].valid(req.body);
    if (valid !== true) return valid;

    await editMenu({ id, name, min_column, max_column, padding, banner });

    res.status(200).json({ success: true });
}));

router.delete("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { id } = req.body;

    if (typeof id !== "number" || id < 1) return "Invalid id";

    await deleteMenu(id);

    res.status(200).json({ success: true });
}));

export default router;
