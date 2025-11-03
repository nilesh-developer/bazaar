import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  storeId: String,
  visitorId: String,
  type: String, // visit, product_view, add_to_cart, checkout, order_completed
  url: String,
  payload: Object,
  createdAt: { type: Date, default: Date.now },
});

export const events = mongoose.model("events", EventSchema);
