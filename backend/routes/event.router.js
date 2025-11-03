import { Router } from "express";
import { createEvent, createOrderCompleteEvent } from "../controllers/event.controller.js";

const router = Router()

router.route("/create").post(createEvent)

router.route("/order").post(createOrderCompleteEvent)

export { router as eventRouter }