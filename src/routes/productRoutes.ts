import { Router } from "express";
import { authRequired } from "../midleware/authRequired.js";
import { deleteOneProductById, findAllProducts, findOneProductById, postProduct, putProduct } from "../controller/productController.js";
import multer from "multer";

const upload = multer({dest: "uploads/"})
const router = Router();

router.get("/product", findAllProducts);
router.get("/product/:id", authRequired, findOneProductById);
router.post("/product", authRequired, upload.single("img"), postProduct);
router.put("/product/:id", authRequired, upload.single("img"), putProduct);
router.delete("/product/:id", authRequired, deleteOneProductById);

export default router;