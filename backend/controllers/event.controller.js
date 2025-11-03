import { events } from "../models/event.model.js";
import { stores } from "../models/store.model.js";

const createEvent = async (req, res) => {
    // Implementation for creating an event
    try {
        const { storename, visitorId, type, payload, url, timestamp } = req.body;
        const store = await stores.findOne({ storename: storename })
        const ev = new events({
            storeId: store._id,
            visitorId,
            type, // visit, product_view, add_to_cart, checkout, order_completed
            url,
            payload,
            createdAt: timestamp,
        });
        await ev.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createOrderCompleteEvent = async (req, res) => {
    try {
        const { storename, visitorId, url, payload } = req.body;

        const store = await stores.findOne({ storename })
        const ev = await events.create({
            storeId: store._id,
            visitorId: visitorId,
            type: "order_completed",
            url: url,
            payload: payload,
        });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export {
    createEvent,
    createOrderCompleteEvent
};