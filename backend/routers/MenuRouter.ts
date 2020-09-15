import { Request, Response, Router } from "express";
import { wrapper, imageWrapper } from ".";
import { getAllItem } from "../services/ItemService";
import { createMenu, deleteMenu, editMenu, getAllMenu } from "../services/MenuService";
import tables, { MENU_I } from "../tables";
import { image } from "../utils/multer";
import { isLoggedIn } from "../utils/passport";

const router = Router();

router.get("/", wrapper(async (req: Request, res: Response) => {
    const data = await Promise.all([getAllMenu(), getAllItem()]);
    res.status(200).json({
        success: true,
        menus: data[0],
        items: data[1]
    });
}));

router.post("/", isLoggedIn, image, imageWrapper(async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data);

    const valid = tables[MENU_I].valid(data);
    if (valid !== true) return valid;

    const banner = req.file ? req.file.filename : "";
    await createMenu({ ...data, banner });

    res.status(200).json({ success: true });
}));

router.put("/", isLoggedIn, image, imageWrapper(async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data);

    if (typeof data.id !== "number" || data.id < 1) return "Invalid id";

    const valid = tables[MENU_I].valid(data);
    if (valid !== true) return valid;

    const banner = req.file ? req.file.filename : (req.body.deleteBanner ? "" : undefined);
    await editMenu({ ...data, banner });

    res.status(200).json({ success: true });
}));

router.delete("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { id } = req.body;

    if (typeof id !== "number" || id < 1) return "Invalid id";

    await deleteMenu(id);

    res.status(200).json({ success: true });
}));

export default router;
