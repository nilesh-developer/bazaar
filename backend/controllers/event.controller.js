import { events } from "../models/event.model.js";
import { stores } from "../models/store.model.js";
import { orders } from "../models/order.model.js";
import { products } from "../models/product.model.js";

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

const getAnalysisData = async (req, res) => {
    const { storeId } = req.params;
    const range = parseInt(req.query.days) || 7;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - range);

    try {
        // Fetch all events for the period
        const allEvents = await events.aggregate([
            {
                $match: {
                    storeId,
                    createdAt: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 },
                },
            },
        ]);

        // Initialize funnel metrics
        const funnel = {
            visits: 0,
            productViews: 0,
            addToCart: 0,
            checkout: 0,
            completedOrders: 0,
        };

        // Fill funnel data from allEvents
        allEvents.forEach((e) => {
            if (e._id === "visit") funnel.visits = e.count;
            if (e._id === "product_view") funnel.productViews = e.count;
            if (e._id === "add_to_cart") funnel.addToCart = e.count;
            if (e._id === "checkout") funnel.checkout = e.count;
            if (e._id === "order_completed") funnel.completedOrders = e.count;
        });

        // Orders from DB (completed orders)
        const order = await orders.find({
            store: storeId,
            createdAt: { $gte: startDate },
        });

        // funnel.completedOrders = order.length;

        // Compute conversion and abandonment
        const conversion =
            funnel.visits > 0
                ? ((funnel.completedOrders / funnel.visits) * 100).toFixed(1)
                : 0.0;
        const abandonment = (100 - conversion).toFixed(1);

        // Traffic chart
        const trafficData = await events.aggregate([
            {
                $match: {
                    storeId,
                    type: "visit",
                    createdAt: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    visits: { $sum: 1 },
                },
            },
        ]);

        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const traffic = weekDays.map((day, index) => {
            const found = trafficData.find((t) => t._id === index + 1);
            const visits = found ? found.visits : 0;
            const sales = order.filter(
                (o) => new Date(o.createdAt).getDay() === index
            ).length;
            return { name: day, visits, sales };
        });

        // Top products
        const product = await products.find({ store: storeId }).limit(5);
        // const topProducts =
        //     product.length > 0
        //         ? product.map((p) => ({
        //             name: p.name,
        //             views: p.views || 0,
        //             sales: p.sales || 0,
        //         }))
        //         : [
        //             { name: "Ebook: Instagram Growth", views: 0, sales: 0 },
        //             { name: "Digital Art Pack", views: 0, sales: 0 },
        //             { name: "Notion Template", views: 0, sales: 0 },
        //         ];


        // Fetch events for the time range once (avoid querying repeatedly)
        const [viewEvents, orderEvents] = await Promise.all([
            events.find({
                storeId,
                type: "product_view",
                createdAt: { $gte: startDate },
            }),
            events.find({
                storeId,
                type: "order_completed",
                createdAt: { $gte: startDate },
            }),
        ]);

        // Create a map for sales counts
        const salesCount = {};

        // Go through each order event
        orderEvents.forEach((evt) => {
            const productsInOrder = evt.payload?.products || [];
            productsInOrder.forEach((p) => {
                const pid = p._id?.toString();
                if (pid) {
                    salesCount[pid] = (salesCount[pid] || 0) + (p.quantity || 1);
                }
            });
        });

        // Compute per-product analytics
        const topProducts = await Promise.all(
            product.map(async (p) => {
                const views = viewEvents.filter(
                    (v) => v.payload?.id?.toString() === p._id.toString()
                ).length;

                const sales = salesCount[p._id.toString()] || 0;

                return {
                    name: p.name,
                    views,
                    sales,
                };
            })
        );

        const finalProducts =
            topProducts.length > 0
                ? topProducts
                : [
                    // { name: "Ebook: Instagram Growth", views: 0, sales: 0 },
                    // { name: "Digital Art Pack", views: 0, sales: 0 },
                    // { name: "Notion Template", views: 0, sales: 0 },
                ];

        // Visitors breakdown
        const uniqueVisitors = await events.distinct("visitorId", {
            storeId,
            createdAt: { $gte: startDate },
        });

        const returningVisitors = await events.aggregate([
            {
                $match: {
                    storeId,
                    createdAt: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: "$visitorId",
                    count: { $sum: 1 },
                },
            },
            { $match: { count: { $gt: 1 } } },
            { $count: "returning" },
        ]);

        const visitors = {
            unique: uniqueVisitors.length,
            returning: returningVisitors[0]?.returning || 0,
        };

        // Final Response
        return res.status(200).json({
            summary: {
                visits: funnel.visits,
                orders: order.length,
                revenue: order.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
                conversion,
                abandonment,
            },
            funnel, // 👈 all step-by-step data here
            traffic,
            products: finalProducts,
            visitors,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch analytics data" });
    }
}

export {
    createEvent,
    createOrderCompleteEvent,
    getAnalysisData
};