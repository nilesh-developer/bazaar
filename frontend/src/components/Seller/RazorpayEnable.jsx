import { AlertCircle, ChevronUp, Clock, CreditCard, ExternalLink, Shield, ShieldCheck, Wallet, Zap } from 'lucide-react'
import React, { useState } from 'react'

function RazorpayEnable() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [instructions, setInstructions] = useState('');
    return (
        <div data-theme="light" className="mx-auto pb-6 bg-gray-50 h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Header */}
                <div onClick={() => setIsExpanded(!isExpanded)} className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-emerald-600" />
                                <h2 className="text-xl font-semibold text-gray-900">Razorpay</h2>
                            </div>
                            <span className="hidden lg:flex gap-2 px-1 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded-full">
                                <AlertCircle className='h-4' />
                                Coming Soon
                            </span>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronUp
                                className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? '' : 'rotate-180'
                                    }`}
                            />
                        </button>
                    </div>

                    <div className='lg:hidden mt-2 flex gap-2'>
                        <span className="flex gap-2 px-1 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded-full">
                            <AlertCircle className='h-4' />
                            Coming Soon
                        </span>
                    </div>

                    {/* Features - Show when collapsed */}

                    <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-3 text-gray-700">
                            <CreditCard className="w-5 h-5 text-emerald-600" />
                            <span>2% + GST per transaction</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Clock className="w-5 h-5 text-emerald-600" />
                            <span>T+2 settlement cycle</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Clock className="w-5 h-5 text-orange-600" />
                            <span>Activation process may take some time</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {isExpanded && (<div className="bg-white rounded-lg border border-gray-200 p-4">
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
                )}
            </div>
        </div>
    )
}

export default RazorpayEnable