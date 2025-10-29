import { Router } from "express";
import { acceptOrder, cancelOrder, codOrderPlaced, getAllOrders, getOrderData, initiateRazorpayPayment, storeOrders, updateStatus, verifyRazorpayPayment } from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

//razorpay start
router.route("/initiate-razorpay-payment").post(initiateRazorpayPayment)
router.route("/verify-razorpay-payment").post(verifyRazorpayPayment)
//razorpay end

router.route("/place-order-cod").post(codOrderPlaced)

router.route("/all-orders/:custId").get(getAllOrders)

router.route("/get-orders/:storeId").get(storeOrders)

router.route("/get-data/:id").get(getOrderData)

router.route("/update-status/:orderId").patch(verifyJwt,updateStatus)

router.route("/accept/:orderId").patch(verifyJwt,acceptOrder)

router.route("/cancel-order/:orderId").patch(cancelOrder)

export { router as orderRouter }