import { useState } from "react";
import { X, Download, Package, Gift } from "lucide-react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

export default function QuickAddProductModal({ onClose, currentPlan, userData }) {
    const [selectedType, setSelectedType] = useState("physical");
    const navigate = useNavigate();

    const handleSubmit = () => {
        onClose();
        if(selectedType === "physical") {
            navigate(`/seller/add-product`);
            return;
        }
        if(selectedType === "digital") {
            navigate(`/seller/add-digital`);
            return;
        }
        if(selectedType === "service") {
            navigate(`/seller/add-service`);
            return;
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[600px] max-w-full p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Quick Add Product</h2>
                        <p className="text-sm text-gray-500">Create a new product in seconds</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Plan Info */}
                <div className={`${Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100) >= 80 ? "bg-red-50 border-red-100 text-red-700" : "bg-emerald-50 border-emerald-100 text-emerald-700"} border rounded-xl p-4 mb-6`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs font-semibold text-emerald-700">{currentPlan?.name} PLAN</p>
                            {Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100) >= 80 ?
                                <>
                                    <p className="text-base font-semibold text-amber-700">Almost full capacity</p>
                                    <p className="text-sm text-gray-600">
                                        You’re nearing your product limit. Consider upgrading your plan for more slots.
                                    </p>
                                </>
                                :
                                <>
                                    <p className="text-base font-semibold text-gray-800">Everything’s on track</p>
                                    <p className="text-sm text-gray-500">Plenty of room left to keep building momentum.</p>
                                </>
                            }
                        </div>
                        {currentPlan?.name?.toLowerCase() !== "plus" && <button onClick={() => navigate("/seller/subscriptions")} className={`text-sm font-medium ${Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100) >= 80 ? " bg-white hover:bg-red-100 border border-red-200" : "bg-white hover:bg-emerald-100 border border-emerald-200"} px-3 py-1 rounded-full transition`}>
                            Upgrade to {currentPlan?.name?.toLowerCase() === "free" ? "Go" : "Plus"} →
                        </button>
                        }
                    </div>

                    <div className="mt-4">
                        <p className="text-xs text-gray-600 mb-1">
                            You’re using <strong>{userData?.store?.products?.length} of {currentPlan?.features?.upToProducts}</strong> active product slots. {Number(currentPlan?.features?.upToProducts) - Number(userData?.store?.products?.length)} slots left.
                        </p>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className={`h-2 ${Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100) >= 80 ? "bg-red-600" : "bg-emerald-600"} rounded-full`} style={{ width: `${Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Usage {Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100}%</p>
                    </div>
                </div>

                {/* Product Type Selection */}
                <div>
                    <h3 className="text-gray-800 font-semibold mb-3">Product Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Physical Product */}
                        <button
                            onClick={() => setSelectedType("physical")}
                            className={`border rounded-xl p-4 text-left transition ${selectedType === "physical"
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Package size={18} className={selectedType === "physical" ? "text-emerald-600" : "text-gray-500"} />
                                <span className="font-medium text-gray-800 text-sm">Physical Product</span>
                            </div>
                            <p className="text-xs text-gray-500">Items you ship to customers</p>
                            <p className="text-[11px] text-gray-400 mt-1">
                                Clothing, accessories, handmade goods
                            </p>
                        </button>

                        {/* Digital Product */}
                        <button
                            onClick={() => setSelectedType("digital")}
                            className={`border rounded-xl p-4 text-left transition ${selectedType === "digital"
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Download size={18} className={selectedType === "digital" ? "text-emerald-600" : "text-gray-500"} />
                                <span className="font-medium text-gray-800 text-sm">Digital Product</span>
                            </div>
                            <p className="text-xs text-gray-500">Files customers download</p>
                            <p className="text-[11px] text-gray-400 mt-1">
                                PDFs, templates, courses, music
                            </p>
                        </button>

                        {/* Service */}
                        {/* <button
                            onClick={() => setSelectedType("service")}
                            className={`border rounded-xl p-4 text-left transition ${selectedType === "service"
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Gift size={18} className={selectedType === "service" ? "text-emerald-600" : "text-gray-500"} />
                                <span className="font-medium text-gray-800 text-sm">Service</span>
                            </div>
                            <p className="text-xs text-gray-500">Time-based offerings</p>
                            <p className="text-[11px] text-gray-400 mt-1">
                                Consultations, coaching, beauty services
                            </p>
                        </button> */}
                    </div>
                </div>
                <button onClick={handleSubmit} className="bg-emerald-700 text-white w-full mt-4 p-3 rounded-xl">Proceed</button>
            </div>
        </div>
    );
}
