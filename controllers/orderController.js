import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
const placeOrders = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const order = await orderModel.create({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        });
        await order.save();
        userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const placeOrdersStripe = async (req, res) => {

}

const placeOrdersRazorpay = async (req, res) => {

}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const {orderId , status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { placeOrders, placeOrdersStripe, placeOrdersRazorpay, allOrders, userOrders, updateStatus };