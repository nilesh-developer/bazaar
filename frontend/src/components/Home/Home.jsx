import React, { useState, useEffect } from 'react';
import {
    Zap,
    Globe,
    CreditCard,
    CheckCircle,
    Play,
    Smartphone,
    IndianRupee,
    Shield,
    Star,
    ArrowRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Create Store in 1 Minute",
            description: "No coding, no setup. Just register and launch your store instantly.",
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: "Made for Instagram Sellers",
            description: "Perfect for those who sell through DMs — turn your followers into customers.",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Free Subdomain or Custom Domain",
            description: "Get your own Growo subdomain for free or connect your custom domain in the ₹99 plan.",
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: "Integrated Payments",
            description: "Accept UPI, cards, and wallets. Simple, secure, and fast payouts.",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "No Monthly Fees",
            description: "Pay only a small % on online payments. 0% on Cash on Delivery orders.",
        },
        {
            icon: <IndianRupee className="w-8 h-8" />,
            title: "Grow Without Investment",
            description: "Start free, upgrade anytime. Focus on sales — not subscriptions.",
        },
    ];

    const testimonials = [
        {
            name: "Aarti Gupta",
            role: "Jewellery Seller, Lucknow",
            content:
                "Growo Store helped me move my business from Instagram DMs to my own website — now customers can order easily!",
            avatar: "AG",
            rating: 5,
        },
        {
            name: "Rohit Mehra",
            role: "Clothing Brand Owner, Delhi",
            content:
                "It’s super easy! I made my store in 10 minutes and started taking orders online — no coding needed.",
            avatar: "RM",
            rating: 5,
        },
        {
            name: "Sneha Patil",
            role: "Home Baker, Mumbai",
            content:
                "I used to take orders on WhatsApp, now I just share my Growo Store link. More orders, less confusion!",
            avatar: "SP",
            rating: 5,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden font-sans">
            <Helmet>
                <title>
                    Growo Store - Launch your online store in 30 seconds
                </title>
            </Helmet>
            {/* Background Animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-72 h-72 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-green-400 to-teal-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '6s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-300 to-green-400 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pb-20 pt-40 lg:pt-48 sm:pb-32">
                <div className="max-w-3xl sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-4">
                            <span className="block bg-gradient-to-r from-green-700 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                From DMs to Your Own Store
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
                            Growo Store helps Instagram sellers, creators & small business owners in India
                            <span className="font-semibold text-green-700"> launch their online store for free.</span>
                            No coding. No monthly fees. Just sell.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                            <Link to="/signup" className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                                <button >Create Store Now<ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <a href="https://youtu.be/P3uvqfF1cRY?si=cPubx4YBNvPfGCCf" className="group flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold border border-green-500/40 hover:border-green-400 backdrop-blur-sm hover:bg-green-500/5 transition-all text-black">
                                <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} /> Watch Demo
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-sm text-gray-700">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Free subdomain</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>0% commission on COD</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Made for Instagram Sellers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-12 sm:py-20 bg-white/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                            Everything You Need to Sell Online in India
                        </h2>
                        <p className="text-lg text-gray-700 mt-3">
                            Designed for small business owners, creators & Instagram entrepreneurs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white/90 rounded-2xl p-8 shadow-lg border border-green-100 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center ${activeFeature === index ? 'ring-2 ring-green-300 bg-gradient-to-br from-green-50 to-emerald-50' : ''
                                    }`}
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-white mb-5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-10">
                        Simple Pricing — Built for Growing Sellers
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Free Plan */}
                        <div className="bg-white/90 rounded-3xl p-10 shadow-2xl border border-green-100">
                            <h3 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
                                Free
                            </h3>
                            <ul className="space-y-4 text-left max-w-md mx-auto mb-8">
                                {[
                                    "Free subdomain (yourstore.growostore.com)",
                                    "5% on Online Payments",
                                    "0% on COD Orders",
                                    "Mobile-ready store",
                                    "No setup or monthly fees",
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-all">
                                Start for Free
                            </button>
                        </div>

                        {/* ₹99 Plan */}
                        <div className="bg-white/90 rounded-3xl p-10 shadow-2xl border border-green-100">
                            <h3 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
                                ₹99/month
                            </h3>
                            <ul className="space-y-4 text-left max-w-md mx-auto mb-8">
                                {[
                                    "Connect your own domain",
                                    "3% on Online Payments",
                                    "0% on COD Orders",
                                    "Everything in Free Plan",
                                    "Priority Support",
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-all">
                                Get Premium
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="relative z-10 py-16 bg-white/70 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        Loved by Instagram Sellers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white/90 rounded-2xl p-8 shadow-lg border border-green-100">
                                <div className="flex items-center justify-center mb-4">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{t.content}"</p>
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{t.name}</h4>
                                        <p className="text-gray-600 text-sm">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-10 text-white shadow-2xl">
                        <h2 className="text-4xl font-bold mb-4">Start Selling — No More DMs!</h2>
                        <p className="text-lg mb-6 opacity-90">
                            Create your free Growo Store today and turn your followers into paying customers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate("/signup")} className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
                                Create Your Store
                            </button>
                            <a href="https://youtu.be/P3uvqfF1cRY?si=cPubx4YBNvPfGCCf" className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-all">
                                Watch Demo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
