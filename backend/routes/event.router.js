import { Router } from "express";
import { createEvent, createOrderCompleteEvent, getAnalysisData } from "../controllers/event.controller.js";

const router = Router()

router.route("/create").post(createEvent)

router.route("/order").post(createOrderCompleteEvent)

router.route("/analytics/:storeId").get(getAnalysisData)

export { router as eventRouter }