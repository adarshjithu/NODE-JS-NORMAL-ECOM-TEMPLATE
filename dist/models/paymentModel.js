"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order"
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["COD", "ONLINE", "WALLET"]
    },
    paymentGateway: {
        type: String,
        enum: ["RAZORPAY", "PAYPAL", "STRIPE", "PAYTM", null],
        default: null
    },
    status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
        default: "PENDING"
    },
    transactionId: String,
    paymentResponse: Object,
    refundDetails: Object
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("Payment", paymentSchema);
