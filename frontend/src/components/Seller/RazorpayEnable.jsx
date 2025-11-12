import {
    AlertCircle,
    ChevronUp,
    Clock,
    CreditCard,
    Shield,
    ShieldCheck,
    Zap,
    KeyRound,
    Power,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function RazorpayEnable() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [keyId, setKeyId] = useState("");
    const [keySecret, setKeySecret] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);

    // 🧠 Load existing Razorpay status
    useEffect(() => {
        const fetchStatus = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/store/razorpay-status`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    setIsConnected(data.razorpayConnected);
                    setIsActive(data.active);
                    setKeyId(data.active ? data.keyId : "");
                    setKeySecret(data.active ? data.keySecret : "");
                }
            } catch (err) {
                console.error("Failed to fetch Razorpay status", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    // 🧩 Save API Keys to backend
    const handleSave = async () => {
        if (!keyId || !keySecret)
            return toast.error("Please enter both Key ID and Secret");

        setIsSaving(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/store/update/razorpay`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ key_id: keyId, key_secret: keySecret }),
                }
            );

            if (res.ok) {
                toast.success("Razorpay keys saved successfully!");
                setIsConnected(true);
                setShowModal(false);
                setIsActive(true);
            } else toast.error("Failed to connect Razorpay. Try again.");
        } catch (error) {
            console.error(error);
            toast.error("Server error while saving keys.");
        } finally {
            setIsSaving(false);
        }
    };

    // ⚙️ Toggle Activation
    const handleToggle = async () => {
        // If trying to activate without keys → show modal first
        if (!isConnected && !isActive) {
            setShowModal(true);
            toast("Please add your Razorpay keys first!");
            return;
        }

        const newStatus = !isActive;
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/store/razorpay/change-status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (res.ok) {
                setIsActive(newStatus);
                toast.success(
                    newStatus ? "Razorpay activated" : "Razorpay deactivated"
                );
            } else toast.error("Failed to update Razorpay status.");
        } catch (err) {
            console.error(err);
            toast.error("Server error toggling status.");
        }
    };

    if (loading) {
        return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div data-theme="light" className="mx-auto pb-6 bg-gray-50 h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Header */}
                <div onClick={() => setIsExpanded(!isExpanded)} className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-emerald-600" />
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Razorpay
                                </h2>
                            </div>

                            {isActive ? (
                                <span className="hidden lg:flex gap-2 px-2 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                                    <ShieldCheck className="h-4" />
                                    Connected
                                </span>
                            ) : (
                                <span className="hidden lg:flex gap-2 px-2 py-1 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-full">
                                    <AlertCircle className="h-4" />
                                    Not Connected
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronUp
                                className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? "" : "rotate-180"
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Collapsed Info */}
                <div className="px-6 pb-4 space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                        <span>No commission on sales</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="w-5 h-5 text-emerald-600" />
                        <span>Instant settlements via Razorpay</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        <span>Direct payment to your account</span>
                    </div>
                </div>

                {/* Expanded Section */}
                {isExpanded && (
                    <div className="bg-white rounded-lg border-t border-gray-200 p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Connect Razorpay Account
                            </h2>
                            <p className="text-gray-600">
                                Enter your Razorpay API keys to accept payments directly into
                                your account.
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-2.5 rounded-lg">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        Secure Connection
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Your keys are encrypted and stored securely.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-green-50 p-2.5 rounded-lg">
                                    <KeyRound className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        Manual Key Setup
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Add your Key ID and Secret from your Razorpay dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Activation Toggle */}
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
                            <div className="flex items-center gap-3">
                                <Power
                                    className={`w-5 h-5 ${isActive ? "text-green-600" : "text-gray-500"
                                        }`}
                                />
                                <span className="font-medium text-gray-800">
                                    {isActive ? "Razorpay is Active" : "Razorpay is Inactive"}
                                </span>
                            </div>

                            <button
                                onClick={handleToggle}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-green-600" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Connect Button */}
                        <div className="space-y-3">
                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <img
                                    src="/razorpay.png"
                                    alt="razorpay"
                                    className="h-7 rounded-full"
                                />
                                {isConnected ? "Update Razorpay Keys" : "Connect Razorpay Keys"}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-sm">
                                <Shield className="w-4 h-4 text-green-600" />
                                <span className="text-green-700 font-medium">
                                    100% Secure API Connection
                                </span>
                            </div>

                            <p className="text-center text-sm text-gray-500">
                                By connecting, you enable Growo to process payments using your
                                Razorpay account.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-lg w-[95%] max-w-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-1">
                            Enter Razorpay API Credentials
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            You can find these in your Razorpay dashboard under
                            <span className="font-medium"> Settings → API Keys</span>.
                        </p>

                        {/* 🔗 Helpful Links Section */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5">
                            <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-600" />
                                Helpful Razorpay Setup Guides
                            </h3>

                            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                                <li>
                                    <a
                                        href="https://razorpay.com/docs/payments/dashboard/account-settings/api-keys/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline font-medium"
                                    >
                                        🔑 How to Generate API Keys
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://razorpay.com/docs/payments/dashboard/account-settings/business-website-details/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline font-medium"
                                    >
                                        🌐 How to Add Website / App in Razorpay
                                    </a>
                                </li>
                            </ul>
                            <p className="text-xs text-gray-600 mt-2">
                                * Make sure your Razorpay account is activated and verified before connecting.
                            </p>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Key ID
                                </label>
                                <input
                                    type="text"
                                    value={keyId}
                                    onChange={(e) => setKeyId(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="rzp_test_XXXXXXXXXX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Key Secret
                                </label>
                                <input
                                    type="password"
                                    value={keySecret}
                                    onChange={(e) => setKeySecret(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your secret key"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60"
                            >
                                {isSaving ? "Saving..." : "Save Keys"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default RazorpayEnable;
