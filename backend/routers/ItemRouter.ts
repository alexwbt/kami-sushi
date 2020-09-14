import { Request, Response, Router } from "express";
import { fileWrapper, wrapper } from ".";
import { createItem, deleteItem, editItem } from "../services/ItemService";
import tables, { ITEM_I } from "../tables";
import { image } from "../utils/multer";
import { isLoggedIn } from "../utils/passport";

const router = Router();

router.post("/", isLoggedIn, image, fileWrapper(async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data);

    const valid = tables[ITEM_I].valid(data);
    if (valid !== true) return valid;

    const image = req.file ? req.file.filename : (req.body.deleteImage ? "" : undefined);
    await createItem({ ...data, image });

    res.status(200).json({ success: true });
}));

router.put("/", isLoggedIn, image, fileWrapper(async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data);

    if (typeof data.id !== "number" || data.id < 1) return "Invalid id";

    const valid = tables[ITEM_I].valid(data);
    if (valid !== true) return valid;

    const image = req.file ? req.file.filename : (req.body.deleteImage ? "" : undefined);
    await editItem({ ...data, image });

    res.status(200).json({ success: true });
}));

router.delete("/", isLoggedIn, wrapper(async (req: Request, res: Response) => {
    const { id } = req.body;

    if (typeof id !== "number" || id < 1) return "Invalid id";

    await deleteItem(id);

    res.status(200).json({ success: true });
}));

export default router;
