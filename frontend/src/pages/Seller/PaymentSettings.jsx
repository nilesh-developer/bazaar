import React, { useEffect, useState } from 'react';
import { CreditCard, Zap, Shield, ExternalLink, ShieldCheck, Banknote, AlertCircle } from 'lucide-react';
import { useAuth } from '../../store/auth';
import toast from 'react-hot-toast';
import WhatsAppPayLater from '../../components/Seller/WhatsAppPayLater';
import RazorpayEnable from '../../components/Seller/RazorpayEnable';

export default function PaymentSettings() {
    const { token } = useAuth()
    const [store, setStore] = useState({})
    const [loading, setLoading] = useState(true);
    const [codStatus, setCodStatus] = useState(false);

    const getStoreData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setStore(responseData.data.store);
                setCodStatus(responseData.data.store.cod);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getStoreData()
    }, [codStatus])

    const handleCodStatus = async (e) => {
        setCodStatus(!codStatus)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/cod/change-status/${store._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: !codStatus
                })
            })

            const responseData = await response.json()
            if (response.ok) {
                toast.success(responseData.message)
                getStoreData()
            } else {
                toast.error(responseData.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 lg:p-8 pt-8 pb-20 lg:pb-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-start gap-4 mb-8">
                    <div className="bg-blue-100 p-3 rounded-lg">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Payment Settings</h1>
                        <p className="text-gray-600 mt-1">Connect your payment provider to accept payments from customers</p>
                    </div>
                </div>

                {/* WhatsApp Pay Later */}
                <WhatsAppPayLater />

                {/* Main Card */}
                <RazorpayEnable />

                {/* COD Settings Card */}
                {store?.businessCategory?.toLowerCase() === "physical" ?
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Banknote className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Cash on Delivery (COD)</h2>
                                    <p className="text-gray-600 lg:text-base text-sm">Allow customers to pay with cash when they receive their order</p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                onClick={handleCodStatus}
                                className={`relative inline-flex h-7 w-20 sm:w-12 lg:w-12 items-center rounded-full transition-colors ${codStatus ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${codStatus ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Status Message */}
                        <div className="mt-4 ml-16">
                            <p className="text-xs lg:text-sm text-gray-600">
                                COD is currently <span className={`font-semibold ${codStatus ? 'text-green-600' : 'text-gray-900'}`}>
                                    {codStatus ? 'Active' : 'Inactive'}
                                </span>
                            </p>
                            {codStatus && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Customers can now choose to pay with cash on delivery at checkout
                                </p>
                            )}
                        </div>
                    </div>
                    :
                    <div className="text-gray-300 rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
                        <div className='bg-orange-100 border border-orange-300 p-4 mb-3 rounded-lg'>
                            <p className='flex gap-2 text-orange-700'><AlertCircle />Not available for store type with digital. COD is only available for physical products.</p>
                        </div>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Banknote className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-600 mb-2">Cash on Delivery (COD)</h2>
                                    <p className="text-gray-600">Allow customers to pay with cash when they receive their order</p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                className={`relative inline-flex h-7 w-20 lg:w-12 items-center rounded-full transition-colors ${codStatus ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                                disabled
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${codStatus ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Status Message */}
                        <div className="mt-4 ml-16">
                            <p className="text-sm text-gray-600">
                                COD is currently <span className={`font-semibold ${codStatus ? 'text-green-600' : 'text-gray-900'}`}>
                                    {codStatus ? 'Active' : 'Inactive'}
                                </span>
                            </p>
                            {codStatus && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Customers can now choose to pay with cash on delivery at checkout
                                </p>
                            )}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}