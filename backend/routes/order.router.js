import { Router } from "express";
import { acceptOrder, cancelOrder, codOrderPlaced, downloadOrderFiles, getAllOrders, getOrderData, initiateRazorpayPayment, storeOrders, updateStatus, updateWhatsappStatus, verifyRazorpayPayment, whatsappPayOrderPlaced } from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

//razorpay start
router.route("/initiate-razorpay-payment").post(initiateRazorpayPayment)
router.route("/verify-razorpay-payment").post(verifyRazorpayPayment)
//razorpay end

router.route("/place-order-cod").post(codOrderPlaced)

router.route("/place-order-whatsapp-pay").post(whatsappPayOrderPlaced)

router.route("/all-orders/:custId").get(getAllOrders)

router.route("/get-orders/:storeId").get(storeOrders)

router.route("/get-data/:id").get(getOrderData)

router.route("/update-status/:orderId").patch(verifyJwt, updateStatus)

router.route("/update-whatsapp-pay-status/:orderId").patch(verifyJwt, updateWhatsappStatus)

router.route("/accept/:orderId").patch(verifyJwt, acceptOrder)

router.route("/cancel-order/:orderId").patch(cancelOrder)

router.route("/download/:orderId/:productId/:fileIndex").get(downloadOrderFiles)

export { router as orderRouter }