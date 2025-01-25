import express from "express"
import adminAuth from "../middleware/adminAuth.js"
// import adminAuth from "../middleware/adminAuth.js"
import upload from "../middleware/multer.js"
const productRouter = express.Router()
import { addProduct, removeProduct, listProducts, singleProduct } from "../controllers/productController.js"

productRouter.post("/add", adminAuth, upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 },]), addProduct)
productRouter.post("/remove", adminAuth, removeProduct)
productRouter.post("/single", singleProduct)
productRouter.get("/list", listProducts)

export default productRouter;

// Note: "q k admin ne products lagani hain isi liay api/user/product main adminAuth middleware lagaya hai."