import { Router } from "express";
import { createOrderRazorpay, getUserTransaction, verifyRazorpayPayment } from "../controllers/subscription.controller.js";
const router = Router()

router.route("/user-transaction/:userId").get(getUserTransaction)

router.route("/create-order-razorpay").post(createOrderRazorpay)

router.route("/verify-razorpay-payment").post(verifyRazorpayPayment)

export { router as subscriptionRouter }