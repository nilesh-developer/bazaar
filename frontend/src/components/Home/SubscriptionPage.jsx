import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../store/auth";

const token = localStorage.getItem("token");

const FreePlan = () => {
    const navigate = useNavigate();
    const { userData } = useAuth()

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 flex flex-col items-center w-full max-w-md mx-auto">
            {userData?.subscription_plan_type === "free" ? <div className="bg-green-600 text-white w-full py-2 rounded-t-3xl">
                Selected
            </div> : null}
            <div className="p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                    Free Plan
                </h3>
                <div className="text-4xl sm:text-5xl font-bold mb-6 text-center">
                    <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        ₹0
                    </span>
                </div>
                <ul className="space-y-2 sm:space-y-4 mb-6 w-full text-left">
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Free subdomain</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Add upto 12 Products</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Mobile-optimized storefront</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">24/7 customer support(Low Priority)</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">No setup fees</span>
                    </li>
                </ul>
                <button
                    onClick={() => navigate("/create-store")}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg w-full max-w-xs"
                >
                    Start for Free
                </button>
            </div>
        </div>
    );
};

const PaidPlan = () => {
    const navigate = useNavigate();
    const { userData } = useAuth()
    const [paymentIsProcessing, setPaymentIsProcessing] = useState(false)

    //razorpay start
    const handlePayment = async () => {
        try {
            setPaymentIsProcessing(true)
            // 1. Call backend to create order
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscription/create-order-razorpay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 99, userToken: token }),
            });

            const { order, userData, message } = await res.json();

            if (!res.ok) {
                toast.error(message)
                return
            }

            // 2. Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Growo",
                description: "Subscription Transaction",
                order_id: order.id,
                handler: async function (response) {
                    // alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
                    //Verify payment on backend
                    const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/subscription/verify-razorpay-payment`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: userData._id,
                            amount: order.amount,
                            currency: order.currency,
                            period: 1
                        }),
                    });
                    const result = await verifyRes.json();
                    if (verifyRes.ok) {
                        toast.success(result.message)
                        if (userData.store) {
                            navigate("/seller/dashboard")
                        } else {
                            navigate("/create-store")
                        }
                    } else {
                        toast.error(result.message)
                    }
                },
                prefill: {
                    name: "Demo",
                    email: "demo@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#00873d" },
            };

            // 3. Open Razorpay checkout
            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error("Payment failed", error);
        } finally {
            setPaymentIsProcessing(false)
        }
    };
    //razorpay end

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 flex flex-col items-center w-full max-w-md mx-auto">
            {userData?.subscription_plan_type === "pro" ? <div className="bg-green-600 text-white w-full py-2 rounded-t-3xl">
                Selected
            </div> : null}
            <div className="p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                    Pro Plan
                </h3>
                <div className="text-4xl sm:text-5xl font-bold mb-6 text-center">
                    <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        ₹99/month
                    </span>
                </div>
                <ul className="space-y-2 sm:space-y-4 mb-6 w-full text-left">
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Connect your own domain</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Unlimited Products</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Mobile-optimized storefront</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">24/7 customer support(High Priority)</span>
                    </li>
                    <li className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">No setup fees</span>
                    </li>
                </ul>
                {userData?.subscription_plan_type === "pro" ?
                    <button
                        disabled={true}
                        className="bg-gray-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full max-w-xs"
                    >
                        Already Purchased
                    </button>
                    :
                    <button
                        onClick={handlePayment} disabled={paymentIsProcessing}
                        className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg w-full max-w-xs"
                    >
                        {paymentIsProcessing ? "Processing..." : "Select & Pay Now"}
                    </button>
                }
            </div>
        </div>
    );
};

export default function SubscriptionPage() {
    return (
        <section id="pricing" className="relative z-10 py-12 sm:py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
                    <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        Select one plan
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FreePlan />
                    <PaidPlan />
                </div>
            </div>
        </section>
    );
}
