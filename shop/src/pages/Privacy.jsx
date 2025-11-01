import React from "react";
import { useEffect } from "react";
import { Link, useOutletContext } from 'react-router-dom';

const Privacy = () => {
    const { store } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 leading-relaxed bg-white shadow-md rounded-lg mt-10 mb-20">
            <h1 className="text-3xl font-bold text-center mb-2 text-black">
                Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">
                Last updated: 31 October 2025
            </p>

            <section className="space-y-6">
                {/* Introduction */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Introduction</h2>
                    <p>
                        Welcome to <strong>{store?.name}</strong>. We respect your privacy and are
                        committed to protecting your personal data. This privacy policy explains
                        how we collect, use, and safeguard your information when you visit our
                        store and make purchases.
                    </p>
                </div>

                {/* Information We Collect */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Information We Collect
                    </h2>

                    <h3 className="font-medium text-gray-800">Personal Information</h3>
                    <p className="mb-2">
                        When you make a purchase or create an account, we collect:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Delivery address</li>
                        <li>Payment information (processed securely through Razorpay)</li>
                    </ul>

                    <h3 className="font-medium text-gray-800 mt-4">
                        Automatically Collected Information
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>Pages visited and time spent</li>
                        <li>Products viewed</li>
                    </ul>
                </div>

                {/* How We Use Information */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        How We Use Your Information
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Process and fulfill your orders</li>
                        <li>Send order confirmations and updates</li>
                        <li>Respond to your inquiries and provide customer support</li>
                        <li>Send marketing communications (with your consent)</li>
                        <li>Improve our products and services</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </div>

                {/* Data Sharing */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Sharing</h2>
                    <p>
                        We do not sell, trade, or rent your personal information. We may share
                        your data with:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>
                            <strong>Payment Processors:</strong> Razorpay for secure payment
                            processing
                        </li>
                        <li>
                            <strong>Shipping Partners:</strong> India Post, Delhivery, Blue Dart
                            for order delivery
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> When required by law or to
                            protect our rights
                        </li>
                    </ul>
                </div>

                {/* Data Security */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to
                        protect your personal data against unauthorized access, alteration,
                        disclosure, or destruction. All payment transactions are encrypted and
                        processed through secure payment gateways.
                    </p>
                </div>

                {/* Your Rights */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Lodge a complaint with data protection authorities</li>
                    </ul>
                </div>

                {/* Cookies */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Cookies</h2>
                    <p>
                        We use cookies to enhance your browsing experience, analyze site
                        traffic, and personalize content. You can control cookie preferences
                        through your browser settings.
                    </p>
                </div>

                {/* Children’s Privacy */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Children&apos;s Privacy
                    </h2>
                    <p>
                        Our services are not directed to individuals under 18 years. We do not
                        knowingly collect personal information from children.
                    </p>
                </div>

                {/* Policy Updates */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Changes to This Policy
                    </h2>
                    <p>
                        We may update this privacy policy from time to time. We will notify you
                        of any changes by posting the new policy on this page.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h2>
                    <p>If you have questions about this privacy policy, please contact us:</p>
                    <ul className="list-none mt-2 space-y-1">
                        <li>
                            <strong>Email:</strong> {store?.policy?.contactEmail}
                        </li>
                        <li>
                            <strong>Phone:</strong> {store?.policy?.contactPhone ? store?.policy?.contactPhone : "Contact number will be updated soon"}
                        </li>
                        <li>
                            <strong>Address:</strong> {store?.policy?.state ? store?.policy?.state : "Business address will be updated soon"}, India
                        </li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
                    <p>
                        This privacy policy is compliant with applicable data protection laws,
                        including the Information Technology Act, 2000 and GDPR where
                        applicable.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
