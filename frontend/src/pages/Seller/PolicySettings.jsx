import { Building, CornerDownLeft, MapPin, Phone, Shield, Truck } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from "../../store/auth";

export default function PolicySettings() {
    const [storeId, setStoreId] = useState("");
    const [enabled, setEnabled] = useState(true);
    const [useDefaultTemplates, setUseDefaultTemplates] = useState(true);
    const [showPolicy, setShowPolicy] = useState(true);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    // all form fields
    const [formData, setFormData] = useState({
        businessName: "",
        gstNumber: "",
        contactEmail: "",
        contactPhone: "",
        whatsapp: "",
        businessHours: "",
        streetAddress: "",
        city: "",
        state: "",
        pinCode: "",
        standardShipping: "",
        expressShipping: "",
        freeShippingAbove: "",
        returnPeriod: "",
        refundProcessing: "",
        returnShippingBy: "Customer",
        cancellationAllowed: "Before Shipping",
    });

    const getStoreData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const responseData = await response.json();
            const storeData = responseData.data.store;
            setStoreId(storeData._id);
            setFormData(storeData.policy);
            setEnabled(storeData?.policy?.enabled ?? true);
            setUseDefaultTemplates(storeData?.policy?.useDefaultTemplates ?? true);
            setShowPolicy(storeData?.policy?.showPolicy ?? true);
        } catch (error) {
            console.error("Failed to fetch store data:", error);
            toast.error("Failed to fetch store data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getStoreData();
    }, [token]);

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { ...formData, enabled, useDefaultTemplates, showPolicy };
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/update/policy/${storeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                toast.success("Policy settings saved successfully!");
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message || "Failed to update store");
            }
        } catch (err) {
            console.error("Error saving policy settings:", err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            data-theme="light"
            className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6 mb-10"
        >
            <h2 className="text-lg font-semibold flex items-center mb-4">
                <span className="text-emerald-600 mr-2"><Shield className="text-emerald-800" /></span>
                Policy Pages Settings
            </h2>
            <p className="text-gray-500 text-sm mb-4">
                Configure your store’s legal and policy pages for Razorpay compliance.
            </p>

            {/* Enable Policy */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 mb-6">
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => setEnabled(!enabled)}
                        className="w-4 h-4 text-emerald-600"
                    />
                    <span className="font-medium text-gray-800">
                        Enable Policy Pages
                    </span>
                </label>
                <p className="text-sm text-gray-500 mt-1">
                    Required for Razorpay payment gateway activation
                </p>
            </div>

            {/* Business Info */}
            <Section title={<><Building /> Business Information</>}>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="businessName" label="Business Name (Optional)" placeholder="Legal business name" value={formData.businessName} onChange={handleChange} />
                    <Input name="gstNumber" label="GST Number (Optional)" placeholder="22AAAAA0000A1Z5" value={formData.gstNumber} onChange={handleChange} />
                </div>
            </Section>

            {/* Contact Info */}
            <Section title={<><Phone /> Contact Information</>}>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="contactEmail" label="Contact Email" placeholder="contact@yourstore.com" value={formData.contactEmail} onChange={handleChange} />
                    <Input name="contactPhone" label="Contact Phone" placeholder="+91 98765 43210" value={formData.contactPhone} onChange={handleChange} />
                    <Input name="whatsapp" label="WhatsApp Number (Optional)" placeholder="919876543210" value={formData.whatsapp} onChange={handleChange} />
                    <Input name="businessHours" label="Business Hours" placeholder="Monday to Saturday, 10 AM to 7 PM IST" value={formData.businessHours} onChange={handleChange} />
                </div>
            </Section>

            {/* Business Address */}
            <Section title={<><MapPin /> Business Address</>}>
                <Input name="streetAddress" label="Street Address" placeholder="123, Main Street, Building Name" value={formData.streetAddress} onChange={handleChange} />
                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="city" label="City" placeholder="Mumbai" value={formData.city} onChange={handleChange} />
                    <Input name="state" label="State" placeholder="Maharashtra" value={formData.state} onChange={handleChange} />
                </div>
                <Input name="pinCode" label="PIN Code" placeholder="400001" value={formData.pinCode} onChange={handleChange} />
            </Section>

            {/* Shipping */}
            <Section title={<><Truck /> Shipping Settings</>}>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="standardShipping" label="Standard Shipping Time" placeholder="7 business days" value={formData.standardShipping} onChange={handleChange} />
                    <Input name="expressShipping" label="Express Shipping Time" placeholder="1-3 business days" value={formData.expressShipping} onChange={handleChange} />
                </div>
                <Input name="freeShippingAbove" label="Free Shipping Above (₹)" placeholder="500" value={formData.freeShippingAbove} onChange={handleChange} />
            </Section>

            {/* Return & Refund */}
            <Section title={<><CornerDownLeft /> Return & Refund Policy</>}>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="returnPeriod" label="Return Period" placeholder="30 days" value={formData.returnPeriod} onChange={handleChange} />
                    <Input name="refundProcessing" label="Refund Processing Time" placeholder="5-7 business days" value={formData.refundProcessing} onChange={handleChange} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <Select name="returnShippingBy" label="Return Shipping Paid By" options={["Customer", "Seller"]} value={formData.returnShippingBy} onChange={handleChange} />
                    <Select name="cancellationAllowed" label="Cancellation Allowed Until" options={["Before Shipping", "After Shipping"]} value={formData.cancellationAllowed} onChange={handleChange} />
                </div>
            </Section>

            {/* Checkboxes */}
            <div className="space-y-3 mt-6">
                <Checkbox
                    label="Use Default Policy Templates"
                    description="Automatically generate compliant policy pages based on your settings."
                    checked={useDefaultTemplates}
                    onChange={() => setUseDefaultTemplates(!useDefaultTemplates)}
                />
                <Checkbox
                    label="Show Policy Pages"
                    description="Display policy page links at the bottom of your store."
                    checked={showPolicy}
                    onChange={() => setShowPolicy(!showPolicy)}
                />
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-300 text-yellow-700 text-sm rounded-md p-4">
                ⚠️ <strong>Razorpay Compliance Required:</strong> These policy pages are mandatory for Razorpay payment gateway activation. Ensure all information is accurate and up-to-date.
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-md ${loading && "opacity-60 cursor-not-allowed"}`}
                >
                    {loading ? "Saving..." : "Save Policy Settings"}
                </button>
            </div>
        </form>
    );
}

/* --- Reusable Components --- */
function Section({ title, children }) {
    return (
        <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3 flex gap-2 items-center">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function Input({ label, placeholder, name, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                name={name}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
        </div>
    );
}

function Select({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
                {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

function Checkbox({ label, description, checked, onChange }) {
    return (
        <label className="flex items-start gap-3 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mt-1 w-4 h-4 text-emerald-600"
            />
            <div>
                <span className="font-medium text-gray-800">{label}</span>
                {description && (
                    <p className="text-sm text-gray-500 leading-snug">{description}</p>
                )}
            </div>
        </label>
    );
}
