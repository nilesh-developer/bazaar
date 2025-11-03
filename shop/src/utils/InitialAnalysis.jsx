import React, { useEffect } from 'react';

function InitialAnalysis({ children }) {

    useEffect(() => {
        let visitorId = localStorage.getItem("growo_visitor");
        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem("growo_visitor", visitorId);
        }
        const storename = window.location.hostname.split('.')[0]

        const sendEvent = (type, payload = {}) => {
            fetch(`${import.meta.env.VITE_API_URL}/api/event/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    storename,
                    visitorId,
                    type,
                    payload,
                    url: window.location.href,
                    timestamp: new Date().toISOString(),
                }),
            });
        };

        // Track visit on first load
        sendEvent("visit");

        window.Growo = {
            productView: (p) => sendEvent("product_view", p),
            addToCart: (p) => sendEvent("add_to_cart", p),
            checkout: () => sendEvent("checkout"),
            orderComplete: (o) =>
                fetch(`${import.meta.env.VITE_API_URL}/api/event/order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        storename,
                        visitorId,
                        payload: {orderId: o._id},
                        url: window.location.href,
                        timestamp: new Date().toISOString(),
                    }),
                }),
        };
    }, []);

    return children
}

export default InitialAnalysis