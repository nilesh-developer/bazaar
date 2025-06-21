import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useStoreData from "../../Hooks/useStoreData";

export default function SetDeliveryCharges() {
    const [tiers, setTiers] = useState([]);
    const { user } = useStoreData();
    const [loadingData, setLoadingData] = useState(false);
    const [form, setForm] = useState({
        min: "",
        max: "",
        charge: "",
    });

    const getDeliveryChargesData = async () => {
        try {
            setLoadingData(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/get-delivery-charges/${user._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                setTiers(responseData.data);
            }

            setLoadingData(false);
        } catch (error) {
            console.log(error);
            setLoadingData(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            getDeliveryChargesData()
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdateTier = (e) => {
        e.preventDefault();
        const { min, max, charge } = form;
        if (!min || !charge) return;

        const parsedMin = parseFloat(min);
        const parsedMax = max ? parseFloat(max) : null;
        const parsedCharge = parseFloat(charge);

        // Check if the same range already exists
        const existingIndex = tiers.findIndex(
            (tier) => tier.min === parsedMin && tier.max === parsedMax
        );

        if (existingIndex !== -1) {
            // Update existing tier
            const updatedTiers = [...tiers];
            updatedTiers[existingIndex] = { min: parsedMin, max: parsedMax, charge: parsedCharge };
            setTiers(updatedTiers);
        } else {
            // Add new tier
            setTiers([...tiers, { min: parsedMin, max: parsedMax, charge: parsedCharge }]);
        }

        setForm({ min: "", max: "", charge: "" });
    };

    const handleRemoveTier = (index) => {
        setTiers((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/set-delivery-charges`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user._id, tiers }),
            });

            if (!response.ok) {
                throw new Error("Failed to set delivery charges");
            }

            const data = await response.json();
            toast.success("Delivery charges updated successfully!");
        } catch (error) {
            console.error("Error setting delivery charges:", error);
            toast.error("Failed to update delivery charges. Please try again.");
        }
    }

    if (loadingData) {
        return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div data-theme="light" className="max-w-4xl mx-auto py-6 px-4 lg:p-8">
            <h1 className="text-3xl font-bold mb-6">Set Delivery Charges by Cart Size</h1>

            <form onSubmit={handleAddOrUpdateTier} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                    type="number"
                    name="min"
                    value={form.min}
                    onChange={handleChange}
                    placeholder="Min (₹)"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="max"
                    value={form.max}
                    onChange={handleChange}
                    placeholder="Max (₹ or blank for ∞)"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="charge"
                    value={form.charge}
                    onChange={handleChange}
                    placeholder="Charge (₹)"
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
                >
                    Add / Update Tier
                </button>
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2 border">Min Cart (₹)</th>
                            <th className="p-2 border">Max Cart (₹)</th>
                            <th className="p-2 border">Delivery Charge (₹)</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiers.map((tier, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="p-2 border">₹{Number(tier.min).toFixed(2)}</td>
                                <td className="p-2 border">{tier.max !== null ? `₹${Number(tier.max).toFixed(2)}` : "∞"}</td>
                                <td className="p-2 border">{tier.charge === 0 ? "Free" : `₹${Number(tier.charge).toFixed(2)}`}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleRemoveTier(idx)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {tiers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-2 border text-center">
                                    No tiers defined yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button
                onClick={handleSubmit}
                className="mt-8 bg-green-700 w-full lg:w-auto text-white font-semibold text-lg py-2 px-6 rounded-xl hover:bg-green-800"
            >Save Settings</button>
        </div>
    );
}
