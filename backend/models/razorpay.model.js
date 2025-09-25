import mongoose from "mongoose";

const RazorpaySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    currency: {
        type: String
    },
    amount: {
        type: Number
    },
    planType: {
        type: String,
        default: "free",
        required: true
    },
    status: {
        type: String,
    }, 
    razorpay_order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String
    },
    razorpay_signature: {
        type: String
    },
    period: {
        type: Number
    },
    expiresOn: {
        type: Date
    }
}, { timestamps: true })


export const razorpaypayments = mongoose.model("razorpaypayments", RazorpaySchema)