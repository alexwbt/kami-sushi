import { Router, Request, Response } from "express";
import { wrapper } from ".";
import { isLoggedIn } from "../utils/passport";
import tables, { ITEM_I } from "../tables";
import { createItem, editItem, deleteItem } from "../services/ItemService";

const router = Router();

router.post("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { name, description, image, menu_id } = req.body;

    if (typeof menu_id !== "number" || menu_id < 1) return "Invalid menu id";

    const valid = tables[ITEM_I].valid(req.body);
    if (valid !== true) return valid;

    await createItem({ name, description, image, menu_id });

    res.status(200).json({ success: true });
}));

router.put("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { id, name, description, image, menu_id } = req.body;

    if (typeof id !== "number" || id < 1) return "Invalid id";
    if (typeof menu_id !== "number" || menu_id < 1) return "Invalid menu id";

    const valid = tables[ITEM_I].valid(req.body);
    if (valid !== true) return valid;

    await editItem({ id, name, description, image, menu_id });

    res.status(200).json({ success: true });
}));

router.delete("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { id } = req.body;

    if (typeof id !== "number" || id < 1) return "Invalid id";

    await deleteItem(id);

    res.status(200).json({ success: true });
}));

export default router;
