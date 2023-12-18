import { Router } from "express";
import { authRequired } from "../midleware/authRequired.js";
import { deleteOneProductById, findAllProducts, findOneProductById, postProduct, putProduct } from "../controller/productController.js";

const router = Router()

router.get("/product", findAllProducts);
router.get("/product/:id", authRequired, findOneProductById);
router.post("/product", authRequired, postProduct);
router.put("/product/:id", authRequired, putProduct);
router.delete("/product/:id", authRequired, deleteOneProductById);

export default router;