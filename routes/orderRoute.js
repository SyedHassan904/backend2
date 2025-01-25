import express from "express"
const ordersRouter = express.Router();
import { placeOrders, placeOrdersStripe, placeOrdersRazorpay, allOrders, userOrders, updateStatus } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/auth.js";

// Admin Features
ordersRouter.post("/list", adminAuth, allOrders);
ordersRouter.post("/status", adminAuth, updateStatus);

// Payment Features
ordersRouter.post("/place", userAuth, placeOrders);
ordersRouter.post("/stripe", userAuth, placeOrdersStripe);
ordersRouter.post("/razorpay", placeOrdersRazorpay);
ordersRouter.post("/update" , adminAuth ,updateStatus )

// User Features
ordersRouter.post("/userorders", userAuth, userOrders);

export default ordersRouter;