import React from "react";
import { useEffect } from "react";
import { Link, useOutletContext } from 'react-router-dom';

const Refunds = () => {

    const { store } = useOutletContext();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
            <h1 className="text-sm text-center text-gray-600">{store?.name}</h1>

            <h2 className="text-3xl lg:text-4xl text-center font-bold">Cancellation & Refund Policy</h2>
            <p className="text-sm text-center text-gray-500 mb-6">Last updated: 31 October 2025</p>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Order Cancellation</h3>
                <p className="mb-2">You can cancel your order before it is shipped.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Email us at <a href={`mailto:${store?.policy?.contactEmail}`} className="text-blue-600 underline">{store?.policy?.contactEmail}</a> with your order number.</li>
                    <li>Include "Cancel Order #[Order Number]" in the subject line.</li>
                    <li>You'll receive confirmation within 24 hours.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Return Policy</h3>
                <h4 className="font-semibold mt-4">Return Period</h4>
                <p>Products can be returned within {store?.policy?.returnPeriod} from delivery date.</p>
                <p>The return period starts from the day you receive your order.</p>

                <h4 className="font-semibold mt-4">Eligible Products for Return</h4>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Damaged or defective products</li>
                    <li>Wrong products delivered</li>
                    <li>Products with missing parts/accessories</li>
                    <li>Products significantly different from description</li>
                </ul>

                <h4 className="font-semibold mt-4">Products that cannot be returned:</h4>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Customized or personalized products</li>
                    <li>Digital products once downloaded</li>
                    <li>Products marked as "non-returnable"</li>
                    <li>Used or altered products</li>
                </ul>

                <h4 className="font-semibold mt-4">Return Conditions</h4>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Product must be unused and in original condition</li>
                    <li>Product must have all original tags and packaging</li>
                    <li>Product must be returned within the return period</li>
                </ul>

                <h4 className="font-semibold mt-4">Return Process</h4>
                <ol className="list-decimal pl-6 space-y-1">
                    <li>Initiate Return: Contact us at <a href={`mailto:${store?.policy?.contactEmail}`} className="text-blue-600 underline">{store?.policy?.contactEmail}</a> within the return period.</li>
                    <li>Approval: We'll review and approve eligible returns within 24-48 hours.</li>
                    <li>Packaging: Pack the product securely in original packaging if available.</li>
                    <li>Pickup/Shipping: Ship the product to our return address (shipping costs borne by customer).</li>
                    <li>Inspection: We'll inspect the returned product within 2-3 business days.</li>
                    <li>Refund/Replacement: Process refund or send replacement based on your preference.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Refund Policy</h3>
                <h4 className="font-semibold mt-4">Refund Timeline</h4>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Processing Time: {store?.policy?.refundProcessing} after product receipt and inspection</li>
                    <li>Bank Account/Card: 5-7 additional business days</li>
                    <li>Wallet/UPI: 24-48 hours</li>
                </ul>

                <h4 className="font-semibold mt-4">Refund Amount</h4>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Product Cost: Full refund of product price</li>
                    <li>Shipping Charges: Refunded for damaged/wrong products, not refunded for change of mind returns</li>
                    <li>COD Charges: Non-refundable</li>
                </ul>

                <h4 className="font-semibold mt-4">Refund Method</h4>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Credit/Debit Card → Same card</li>
                    <li>Net Banking → Same bank account</li>
                    <li>UPI → Same UPI ID</li>
                    <li>Wallet → Same wallet</li>
                    <li>COD → Bank transfer (bank details required)</li>
                </ul>
            </section>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Exchange Policy</h3>
                <p>We offer exchanges for:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Size issues (subject to availability)</li>
                    <li>Color preferences (subject to availability)</li>
                    <li>Defective products</li>
                </ul>
                <p>Exchange process follows the same timeline as returns.</p>
            </section>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Damaged Products</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Do not accept visibly damaged packages</li>
                    <li>Record video while opening the package</li>
                    <li>Take photos of damage</li>
                    <li>Report within 48 hours with evidence</li>
                </ul>
                <p>We'll arrange immediate replacement or full refund.</p>
            </section>

            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                <p>For cancellations, returns, and refunds:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Email: <a href={`mailto:${store?.policy?.contactEmail}`} className="text-blue-600 underline">{store?.policy?.contactEmail}</a></li>
                    <li>Phone: {store?.policy?.contactPhone ? store?.policy?.contactPhone : "Contact number will be updated soon"}</li>
                    <li>Business Hours: {store?.policy?.businessHours}</li>
                    <li>Response Time: 24-48 hours</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Dispute Resolution</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Contact our customer support first</li>
                    <li>We'll attempt resolution within 7 business days</li>
                    <li>If unresolved, disputes are subject to jurisdiction in {store?.policy?.state ? store?.policy?.state : "State"}</li>
                </ul>
                <p className="mt-2 text-gray-600 text-sm">
                    This policy is in accordance with the Consumer Protection Act, 2019 and other applicable laws in India.
                </p>
            </section>
        </div>
    );
};

export default Refunds;
