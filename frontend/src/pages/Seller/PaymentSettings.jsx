import React, { useEffect, useState } from 'react';
import { CreditCard, Zap, Shield, ExternalLink, ShieldCheck, Banknote } from 'lucide-react';
import { useAuth } from '../../store/auth';
import toast from 'react-hot-toast';

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

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    {/* Title */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Razorpay Account</h2>
                        <p className="text-gray-600">Connect your Razorpay account securely using OAuth to accept payments</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-6">
                        {/* Quick Setup */}
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-2.5 rounded-lg">
                                <Zap className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Quick Setup</h3>
                                <p className="text-sm text-gray-600">One-click connection without manual API key entry</p>
                            </div>
                        </div>

                        {/* Secure Authentication */}
                        <div className="flex items-start gap-4">
                            <div className="bg-green-50 p-2.5 rounded-lg">
                                <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Secure Authentication</h3>
                                <p className="text-sm text-gray-600">OAuth 2.0 with automatic token refresh</p>
                            </div>
                        </div>

                        {/* Direct Integration */}
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-50 p-2.5 rounded-lg">
                                <ExternalLink className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Direct Integration</h3>
                                <p className="text-sm text-gray-600">Connected directly with your Razorpay dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Live Mode Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-blue-900 mb-1">Live Mode Selected</h3>
                                <p className="text-sm text-blue-800">You will connect in live mode for real customer payments. This will process actual transactions.</p>
                            </div>
                        </div>
                    </div>

                    {/* Enforced Notice */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-900 mb-1">Live mode enforced</h3>
                                <p className="text-sm text-gray-600">Live mode is enforced for merchant connections. Test mode is only available in local development.</p>
                            </div>
                        </div>
                    </div>

                    {/* Connect Button */}
                    <div className="space-y-3">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                            {/* <span className="bg-white text-blue-600 font-bold px-2 py-0.5 rounded text-sm">R</span> */}
                            <img src="/razorpay.png" alt="razorpay" className='h-7 rounded-full' />
                            Connect with Razorpay
                        </button>

                        <div className="flex items-center justify-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-green-700 font-medium">Secure OAuth Connection</span>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            By connecting, you authorize Growo to access your Razorpay account for payment processing
                        </p>
                    </div>
                </div>

                {/* COD Settings Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Banknote className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Cash on Delivery (COD)</h2>
                                <p className="text-gray-600">Allow customers to pay with cash when they receive their order</p>
                            </div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            onClick={handleCodStatus}
                            className={`relative inline-flex h-7 w-20 lg:w-12 items-center rounded-full transition-colors ${codStatus ? 'bg-blue-600' : 'bg-gray-300'
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
            </div>
        </div>
    );
}