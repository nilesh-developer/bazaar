import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { razorpaypayments } from "../models/razorpay.model.js";
import { users } from "../models/user.model.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//Razorpay Subscription
const createOrderRazorpay = async (req, res) => {
    try {
        const { userToken, plan } = req.body;

        const tokenDetails = await jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET)

        if (!tokenDetails) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    message: "Invalid token"
                })
        }

        const amountInPaise = plan.amount * 100;

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        })

        return res.status(200)
            .json({
                statusCode: 200,
                order: order,
                userData: {
                    _id: tokenDetails._id,
                    email: tokenDetails.email
                },
                message: "Order Created"
            })
    } catch (error) {
        console.error("Error creating order: ", error)
        return res.status(500)
            .json({
                statusCode: 500,
                message: "Error creating order"
            })
    }
}

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount, currency, plan } = req.body;

    // Get today's date
    const today = new Date();

    // Calculate one month later
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + plan.duration);

    const amountInRupees = amount / 100;

    // Verify signature
    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature === razorpay_signature) {
        // Save subscription/payment in MongoDB
        const subscription = new razorpaypayments({
            userId,
            planType: plan.name,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount: amountInRupees,
            currency,
            status: "success",
            period: plan.duration,
            expiresOn: oneMonthLater
        });

        await subscription.save();

        const user = await users.findByIdAndUpdate(userId, {
            transactionId: subscription._id,
            subcription: true,
            subscription_plan_type: plan.name,
        })

        res.status(200).json({ statusCode: 200, message: "Payment Verified & Saved", subscription });
    } else {
        res.status(400).json({ statusCode: 400, message: "Payment Verification Failed" });
    }
});

const getUserTransaction = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const transactions = await razorpaypayments.find({ userId }).sort({ _id: -1 });
    return res.status(200).json(
        new ApiResponse(200, transactions, "Data retrieved Successfully")
    )
})

export {
    createOrderRazorpay,
    verifyRazorpayPayment,
    getUserTransaction,
}