import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import ordersRouter from "./routes/orderRoute.js";
import createRouter from "./routes/createRoute.js";

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



connectDB();
connectCloudinary();

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders", ordersRouter)
app.use("/api", createRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    const conn=process.env.MONGODB_URI
    console.log("MongoDB URI:", conn);
    console.log(`http://localhost:${port}`);
});
