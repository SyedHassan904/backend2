import express from "express"
import userAuth from "../middleware/auth.js";
const cartRouter = express.Router();
import { addToCart, updateCart, getUserCart } from "../controllers/cartController.js";

cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/update", userAuth, updateCart);
cartRouter.post("/get", userAuth, getUserCart);

export default cartRouter;

