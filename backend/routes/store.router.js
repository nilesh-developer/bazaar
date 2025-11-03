import { Router } from "express";
import {
    addCustomDomain,
    businessdetails,
    changeCodStatus,
    changeStoreStatus,
    createStore,
    deleteStore,
    getCurrentStoreData,
    getCustomerData,
    storeData,
    updatePolicies,
    updateAboutPage,
    updateSocial,
    updateStoreName,
    uploadStoreImage,
    getNumbersOfThirtyDays,
    setDeliveryCharges,
    getDeliveryCharges,
    changeRazorpayStatus,
    updateWhatsAppNumber,
    updateWhatsAppPayStatus,
    getDataDayWise
} from "../controllers/store.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/create-store").post(createStore)

router.route("/businessdetails").post(upload.fields([
    {
        name: "logo",
        maxCount: 1
    },
]), businessdetails)

router.route("/data").post(getCurrentStoreData)

router.route("/get-numbers-of-thirty-days/:storeId").get(getNumbersOfThirtyDays)
router.route("/get-day-wise").get(getDataDayWise)

router.route("/add-domain/:id").patch(addCustomDomain)

router.route("/update/basic/:id").patch(verifyJwt, updateStoreName)

router.route("/update/social/:id").patch(verifyJwt, updateSocial)

router.route("/update/whatsapp-number/:id").patch(verifyJwt, updateWhatsAppNumber)

router.route("/update/whatsapp-pay-status/:id").patch(verifyJwt, updateWhatsAppPayStatus)

router.route("/update/policy/:id").patch(verifyJwt, updatePolicies)

router.route("/update/aboutpage/:id").patch(verifyJwt, updateAboutPage)

router.route("/update/status/:id").patch(verifyJwt, changeStoreStatus)

router.route("/delete/:id").delete(verifyJwt, deleteStore)

router.route("/subdomain/:subdomain").get(storeData)

router.route("/cod/change-status/:storeId").patch(changeCodStatus)

router.route("/razorpay/change-status/:storeId").patch(changeRazorpayStatus)

router.route("/upload/images").post(
    upload.fields([
        {
            name: "logo",
            maxCount: 1
        },
        {
            name: "favicon",
            maxCount: 1
        },
        {
            name: "sliderImages",
            maxCount: 5
        },
        {
            name: "desktopBanner",
            maxCount: 1
        },
        {
            name: "mobileBanner",
            maxCount: 1
        },
    ]), uploadStoreImage)

router.route("/customer-data/:storeId").get(getCustomerData)

router.route("/set-delivery-charges").post(setDeliveryCharges)

router.route("/get-delivery-charges/:userId").get(getDeliveryCharges)

export { router as storeRouter }