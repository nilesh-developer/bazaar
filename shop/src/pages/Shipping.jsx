import React from "react";
import { useEffect } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import dateFormat from "dateformat";

const Shipping = () => {
    const { store } = useOutletContext();
     useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

    return (
        <div className="max-w-4xl mx-auto px-6 py-3 lg:py-6 text-gray-800 leading-relaxed bg-white shadow-md rounded-lg lg:mt-10 mb-20">
            <h1 className="text-3xl font-bold text-center text-black mb-2">
                Shipping Policy
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">
               Last updated: {dateFormat(store?.policy?.lastUpdated,"dd mmmm yyyy")}
            </p>

            <section className="space-y-6">
                {/* Shipping Coverage */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Shipping Coverage
                    </h2>
                    <p>
                        We currently ship to all serviceable pin codes across India. Enter
                        your pin code at checkout to verify delivery availability to your
                        area.
                    </p>
                </div>

                {/* Shipping Partners */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Shipping Partners
                    </h2>
                    <p>We work with trusted delivery partners including:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>India Post</li>
                        <li>Delhivery</li>
                        <li>Blue Dart</li>
                    </ul>
                </div>

                {/* Delivery Timelines */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Delivery Timelines
                    </h2>

                    <h3 className="font-medium text-gray-800 mt-3">Standard Delivery</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Timeline: {store?.policy?.standardShipping}</li>
                        <li>Coverage: All serviceable pin codes</li>
                        <li>Orders placed before 2 PM IST are processed the same day</li>
                    </ul>

                    <h3 className="font-medium text-gray-800 mt-4">Express Delivery</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Timeline: {store?.policy?.expressShipping}</li>
                        <li>Coverage: Select cities</li>
                        <li>Additional charges apply</li>
                    </ul>
                </div>

                {/* Shipping Charges */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Shipping Charges
                    </h2>
                    <p>Shipping charges are calculated based on:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Order weight and dimensions</li>
                        <li>Delivery location</li>
                        <li>Shipping speed selected</li>
                    </ul>
                </div>

                {/* Order Processing */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Order Processing
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Order Confirmation:</strong> You'll receive an email
                            confirmation immediately after placing your order.
                        </li>
                        <li>
                            <strong>Processing Time:</strong> Orders are processed within 24-48
                            hours.
                        </li>
                        <li>
                            <strong>Dispatch Notification:</strong> You'll receive tracking
                            details once your order is shipped.
                        </li>
                        <li>
                            <strong>Tracking:</strong> Track your order using the provided
                            tracking number.
                        </li>
                    </ul>
                </div>

                {/* Delivery Process */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Delivery Process
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Our delivery partner will attempt delivery at your provided address.</li>
                        <li>Please ensure someone is available to receive the package.</li>
                        <li>Valid ID proof may be required for high-value orders.</li>
                        <li>OTP verification may be required for prepaid orders.</li>
                    </ul>
                </div>

                {/* Delivery Issues */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Delivery Issues
                    </h2>

                    <h3 className="font-medium text-gray-800 mt-3">Incorrect Address</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Please double-check your delivery address before placing the order.</li>
                        <li>Address changes are allowed within 24 hours of order placement.</li>
                        <li>
                            Contact us immediately at{" "}
                            <a href={`mailto:${store?.policy?.contactEmail}`} className="text-blue-600 underline">{store?.policy?.contactEmail}</a>{" "}
                            for address corrections.
                        </li>
                    </ul>

                    <h3 className="font-medium text-gray-800 mt-4">Failed Delivery Attempts</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Delivery partners make up to 3 attempts.</li>
                        <li>After failed attempts, the package returns to us.</li>
                        <li>Re-shipping charges may apply.</li>
                    </ul>

                    <h3 className="font-medium text-gray-800 mt-4">Damaged or Missing Items</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Check your package immediately upon delivery.</li>
                        <li>Report any damage or missing items within 48 hours.</li>
                        <li>Include photos of damaged items/packaging.</li>
                        <li>We'll arrange replacement or refund as appropriate.</li>
                    </ul>
                </div>

                {/* International Shipping */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        International Shipping
                    </h2>
                    <p>
                        We currently do not offer international shipping. We're working on
                        expanding our services globally.
                    </p>
                </div>

                {/* Tracking Your Order */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Tracking Your Order
                    </h2>
                    <p>Track your order through:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Tracking link in your shipping confirmation email</li>
                        <li>Your account dashboard on our store</li>
                        <li>Delivery partner's website using the tracking number</li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h2>
                    <ul className="list-none space-y-1">
                        <li>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${store?.policy?.contactEmail}`} className="text-blue-600 underline">{store?.policy?.contactEmail}</a>
                        </li>
                        <li>
                            <strong>Phone:</strong> {store?.policy?.contactPhone ? store?.policy?.contactPhone : "Contact number will be updated soon"}
                        </li>
                        <li>
                            <strong>Response Time:</strong> 24-48 hours
                        </li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
                    <p>
                        Please note that delivery times are estimates and may vary due to
                        unforeseen circumstances such as weather conditions, strikes, or
                        logistics issues.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Shipping;
