import mongoose from "mongoose"
const ordersSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String,
    },
    items: {
        required: true,
        type: Array,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        required: true,
        type: String,
        default: "Order Placed",
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Number,
        required: true,
    }
});

const orderModel = mongoose.models.order || mongoose.model("order", ordersSchema);
export default orderModel;