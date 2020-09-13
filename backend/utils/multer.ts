import * as Multer from "multer";

const storage = Multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public"),
    filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`)
})

const multer = Multer({ storage });

export const image = multer.single("image");
