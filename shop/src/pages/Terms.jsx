import React from "react";
import { useEffect } from "react";
import { Link, useOutletContext } from 'react-router-dom';

const Terms = () => {
    const { store } = useOutletContext();
     useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 leading-relaxed bg-white shadow-md rounded-lg mt-10 mb-20">
            <h1 className="text-3xl font-bold text-center text-black mb-2">
                Terms & Conditions
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">
                Last updated: 31 October 2025
            </p>

            <section className="space-y-6">
                {/* Agreement to Terms */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Agreement to Terms
                    </h2>
                    <p>
                        By accessing and using <strong>{store?.name}</strong>, you agree to be
                        bound by these Terms and Conditions. If you disagree with any part of
                        these terms, please do not use our services.
                    </p>
                </div>

                {/* Use of Store */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Use of Our Store
                    </h2>

                    <h3 className="font-medium text-gray-800 mt-3">Account Registration</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>You must provide accurate and complete information</li>
                        <li>You are responsible for maintaining account security</li>
                        <li>You must be at least 18 years old to make purchases</li>
                        <li>One person may not maintain multiple accounts</li>
                    </ul>

                    <h3 className="font-medium text-gray-800 mt-4">Prohibited Uses</h3>
                    <p>You may not:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                        <li>Use our store for any illegal purposes</li>
                        <li>Transmit viruses or malicious code</li>
                        <li>Attempt to gain unauthorized access</li>
                        <li>Interfere with the proper working of the store</li>
                        <li>Copy or reproduce content without permission</li>
                    </ul>
                </div>

                {/* Products and Pricing */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Products and Pricing
                    </h2>

                    <h3 className="font-medium text-gray-800">Product Information</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>We strive to display accurate product descriptions and images</li>
                        <li>Colors may vary slightly due to display settings</li>
                        <li>We reserve the right to limit quantities</li>
                    </ul>

                    <h3 className="font-medium text-gray-800 mt-4">Pricing</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>All prices are in INR (Indian Rupees)</li>
                        <li>Prices are subject to change without notice</li>
                        <li>We reserve the right to correct pricing errors</li>
                    </ul>
                </div>

                {/* Orders and Payment */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Orders and Payment
                    </h2>

                    <h3 className="font-medium text-gray-800">Order Acceptance</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Order confirmation does not signify acceptance</li>
                        <li>We reserve the right to refuse or cancel orders</li>
                        <li>Orders are subject to product availability</li>
                    </ul>

                    <h3 className="font-medium text-gray-800 mt-4">Payment</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Payment is processed through a secure payment gateway (Razorpay)
                        </li>
                        <li>
                            We accept multiple payment methods including cards, UPI, and wallets
                        </li>
                        <li>Full payment is required before order processing</li>
                    </ul>
                </div>

                {/* Shipping and Delivery */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Shipping and Delivery
                    </h2>
                    <p>
                        Please refer to our <strong>Shipping Policy</strong> for detailed
                        information about:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Delivery timelines</li>
                        <li>Shipping charges</li>
                        <li>Delivery areas</li>
                    </ul>
                </div>

                {/* Returns and Refunds */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Returns and Refunds
                    </h2>
                    <p>
                        Please refer to our <strong>Refund Policy</strong> for detailed
                        information about:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Return eligibility</li>
                        <li>Refund process</li>
                        <li>Cancellation policy</li>
                    </ul>
                </div>

                {/* Intellectual Property */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Intellectual Property
                    </h2>
                    <p>
                        All content on this store including text, graphics, logos, and images
                        is the property of <strong>{store?.name}</strong> and protected by
                        intellectual property laws.
                    </p>
                </div>

                {/* Limitation of Liability */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Limitation of Liability
                    </h2>
                    <p>
                        To the maximum extent permitted by law, <strong>{store?.name}</strong> shall
                        not be liable for any indirect, incidental, special, or consequential
                        damages resulting from:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Use or inability to use our services</li>
                        <li>Unauthorized access to your data</li>
                        <li>Any third-party conduct</li>
                    </ul>
                </div>

                {/* Indemnification */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Indemnification
                    </h2>
                    <p>
                        You agree to indemnify and hold harmless{" "}
                        <strong>{store?.name}</strong> from any claims, damages, or expenses arising
                        from your violation of these terms.
                    </p>
                </div>

                {/* Governing Law */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Governing Law
                    </h2>
                    <p>
                        These terms shall be governed by the laws of India. Any disputes shall
                        be subject to the exclusive jurisdiction of courts in your region.
                    </p>
                </div>

                {/* Changes to Terms */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Changes to Terms
                    </h2>
                    <p>
                        We reserve the right to modify these terms at any time. Continued use
                        of our store after changes constitutes acceptance of the new terms.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Contact Information
                    </h2>
                    <ul className="list-none space-y-1">
                        <li>
                            <strong>Email:</strong> {store?.policy?.contactEmail}
                        </li>
                        <li>
                            <strong>Phone:</strong> {store?.policy?.contactPhone ? store?.policy?.contactPhone : "Contact number will be updated soon"}
                        </li>
                        <li>
                            <strong>Business Hours:</strong> {store?.policy?.businessHours}
                        </li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
                    <p>
                        By using our store, you acknowledge that you have read, understood, and
                        agree to be bound by these Terms and Conditions.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Terms;
