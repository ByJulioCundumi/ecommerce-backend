import { Router } from "express";
import { adminAuthRequired } from "../midleware/authRequired.js";
import { deleteOneProductById, findAllProducts, findOneProductById, postProduct, putProduct } from "../controller/productController.js";
import multer from "multer";

const upload = multer({dest: "uploads/"})
const router = Router();

router.get("/product", findAllProducts);
router.get("/product/:id", adminAuthRequired, findOneProductById);
router.post("/product", adminAuthRequired, upload.single("img"), postProduct);
router.put("/product/:id", adminAuthRequired, upload.single("img"), putProduct);
router.delete("/product/:id", adminAuthRequired, deleteOneProductById);

export default router;