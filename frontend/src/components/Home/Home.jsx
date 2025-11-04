import React, { useState, useEffect } from 'react';
import {
    Zap,
    Globe,
    CreditCard,
    CheckCircle,
    Smartphone,
    IndianRupee,
    Shield,
    Star,
    ArrowRight,
    Activity,
    Lock,
    Users,
    MessageCircle,
    BadgeCheck,
    ShieldCheck,
    XCircle,
    Check,
    X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [domain, setDomain] = useState("");
    const [storeAvailable, setStoreAvailable] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 6);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    // TRUST / SOCIAL PROOF BUBBLES (copy-friendly)
    const trustBadges = [
        { icon: <CheckCircle className="w-5 h-5" />, text: 'Instagram-Ready' },
        { icon: <Activity className="w-5 h-5" />, text: 'Free Setup' },
        { icon: <ShieldCheck className="w-5 h-5" />, text: 'Secure Payment' },
        { icon: <Users className="w-5 h-5" />, text: 'Made for Instagram Sellers' },
    ];

    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Launch in 2 Minutes',
            description: 'Create your store, add products, and share your link — no tech skills required.',
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: 'Instagram-First Design',
            description: 'Beautiful mobile-ready stores that look great in bio links and DMs.',
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: 'Razorpay Integrated',
            description: 'Accept UPI, cards & wallets with secure payouts and easy onboarding.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Trusted & Secure',
            description: 'SSL, secure payments and data privacy — your customers feel safe buying.',
        },
        {
            icon: <IndianRupee className="w-8 h-8" />,
            title: 'Free Forever',
            description: 'Free plan available. Upgrade for lower fees and custom domain.',
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: 'Built for Growth',
            description: 'Analytics, order alerts and simple tools to turn followers into repeat buyers.',
        },
    ];

    const creators = [
        {
            icon: '👗',
            title: 'Fashion Sellers',
            subtitle: 'Turn outfit posts into orders',
            items: 'Collections • Size charts • Quick checkout',
        },
        {
            icon: '💍',
            title: 'Jewellery & Accessories',
            subtitle: 'Showcase your best sellers',
            items: 'Gallery, variants, COD & prepaid flows',
        },
        {
            icon: '🍰',
            title: 'Home Bakers & Food',
            subtitle: 'Take orders with confidence',
            items: 'Booking slots • Address capture • COD options',
        },
        {
            icon: '🏪',
            title: 'Small D2C Brands',
            subtitle: 'Scale beyond DMs',
            items: 'Storefront, offers, simple analytics',
        },
        {
            icon: '🎨',
            title: 'Artists & Makers',
            subtitle: 'Sell prints, originals & commissions',
            items: 'Custom orders • Collections • Link in bio',
        },
        {
            icon: '📦',
            title: 'Resellers & Curators',
            subtitle: 'Organize catalog & accept payments',
            items: 'Easy product import • Sharing links',
        },
    ];

    const testimonials = [
        {
            name: 'Aarti Gupta',
            role: 'Jewellery Seller, Lucknow',
            content:
                'Growo made it easy — customers can buy directly from my bio. My DM confusion is gone!',
            avatar: 'AG',
            rating: 5,
        },
        {
            name: 'Rohit Mehra',
            role: 'Clothing Brand, Delhi',
            content:
                'Setup took 3 minutes. Razorpay integration was instant. Customers trust the checkout.',
            avatar: 'RM',
            rating: 5,
        },
        {
            name: 'Sneha Patil',
            role: 'Home Baker, Mumbai',
            content:
                'I share my Growo link in stories and WhatsApp — orders increased and packing is simpler now.',
            avatar: 'SP',
            rating: 5,
        },
    ];

    const claimDomain = () => {
        // basic local navigation to signup with suggested domain - real implementation will validate
        if (!domain.trim()) {
            navigate('/signup');
            return;
        }
        navigate(`/signup?store=${encodeURIComponent(domain.trim())}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 font-sans overflow-x-hidden">
            <Helmet>
                <title>Growo Store — Launch your Instagram store in 2 minutes</title>
                <meta
                    name="description"
                    content="Growo Store — the easiest way for Instagram sellers and small brands in India to create a mobile-ready online store. Free plan, Razorpay payments, and custom domains."
                />
            </Helmet>

            {/* HERO */}
            <section className="relative z-20 pt-20 pb-12 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                    <div className="flex flex-col items-center text-center">
                        {/* Animated Container */}
                        <div
                            className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                } w-full max-w-2xl`}
                        >
                            {/* Headline */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
                                Launch your Instagram Store
                                <span className="block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                                    in 2 minutes
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-base sm:text-lg text-gray-700 mb-6 px-2">
                                Built for creators, small businesses & D2C brands — start free, accept
                                orders, and turn followers into customers.
                            </p>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
                                {trustBadges.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 bg-white/90 px-3 py-2 rounded-full shadow-sm border border-emerald-100"
                                    >
                                        <div className="text-emerald-600">{b.icon}</div>
                                        <div className="text-sm font-medium text-gray-700">{b.text}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Domain Input with Check */}
                            <div className="w-full max-w-md mx-auto">
                                <div className="flex items-stretch bg-white rounded-full border-2 border-emerald-200 overflow-hidden">
                                    <input
                                        value={domain}
                                        onChange={(e) => {
                                            setDomain(e.target.value.replace(/\s+/g, "").toLowerCase());
                                            setStoreAvailable(null);
                                        }}
                                        type="text"
                                        placeholder="yourstore"
                                        aria-label="Enter your store name"
                                        className="flex-1 min-w-0 px-4 sm:px-5 py-3 text-base sm:text-lg outline-none bg-white"
                                    />
                                    <div className="px-2 sm:px-3 flex items-center text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        .growo.store
                                        {storeAvailable !== null && (
                                            <div
                                                className={`text-sm font-medium text-green-600
                                                    }`}
                                            >
                                                {storeAvailable
                                                    ? <div className='ml-2 text-emerald-800'>
                                                        <Check className='h-4' />
                                                    </div>
                                                    : null}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (!domain.trim()) return;
                                            setIsLoading(true);
                                            try {
                                                const response = await fetch(
                                                    `${import.meta.env.VITE_API_URL}/api/user/check-storename`,
                                                    {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({ storename: domain }),
                                                    }
                                                );
                                                const responseData = await response.json();
                                                setStoreAvailable(responseData.data);
                                            } catch (error) {
                                                console.error("Error checking store:", error);
                                                setStoreAvailable(false);
                                            } finally {
                                                setIsLoading(false);
                                            }
                                        }}
                                        disabled={isLoading}
                                        className={`bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold hover:from-emerald-600 hover:to-green-600 transition-colors whitespace-nowrap ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg
                                                    className="animate-spin h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    ></path>
                                                </svg>
                                                Checking...
                                            </div>
                                        ) : (
                                            "Check"
                                        )}
                                    </button>
                                </div>

                                {/* Availability Message */}
                                {storeAvailable !== null && (
                                    <div
                                        className={`mt-2 text-sm font-medium ${storeAvailable ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {storeAvailable
                                            ? <div className='flex items-center justify-center'><Check className='h-4' /> Store name is available! <button onClick={() => navigate("/signup")} className='ml-1 font-bold text-black'>Signup now <span aria-hidden="true">&rarr;</span></button></div>
                                            : "❌ This store name is already taken."}
                                    </div>
                                )}
                                <div className="text-xs text-gray-500 mt-3">
                                    Free forever • No credit card • Easy to setup
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* HOW IT WORKS — 3 step + CTA (early in flow to reduce friction) */}
            <section className="relative z-10 py-12 bg-white/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">How it works — 3 simple steps</h2>
                    <p className="text-gray-600 mb-8">From Instagram profile to checkout — no tech, just sales.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
                            <div className='flex justify-center w-full'><div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold mb-4">1</div></div>
                            <h3 className="font-semibold mb-2">Create your store</h3>
                            <p className="text-sm text-gray-600">Sign up and pick a theme. Your store is mobile-ready automatically.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
                            <div className='flex justify-center w-full'><div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold mb-4">2</div></div>
                            <h3 className="font-semibold mb-2">Add products</h3>
                            <p className="text-sm text-gray-600">Upload photos, prices, and stock. Use quick templates to save time.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
                            <div className='flex justify-center w-full'><div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold mb-4">3</div></div>
                            <h3 className="font-semibold mb-2">Share & sell</h3>
                            <p className="text-sm text-gray-600">Share your store link in bio or DMs. Accept payments via Razorpay or COD.</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button onClick={() => navigate('/signup')} className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700">
                            Start Free — It takes 2 min
                        </button>
                    </div>
                </div>
            </section>

            {/* FEATURES — logical justification */}
            <section className="relative z-10 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">Everything you need to sell online</h2>
                        <p className="text-gray-600 mt-2">Designed for creators, small brands & D2C teams who want simplicity and trust.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 text-center transition-all hover:scale-105 ${activeFeature === i ? 'ring-2 ring-emerald-200' : ''}`}>
                                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 text-white mb-3">
                                    {f.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
                                <p className="text-sm text-gray-600">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PERFECT FOR (audience personalization) */}
            <section className="relative z-10 py-16 bg-white/80">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Perfect for creators, makers & small brands</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {creators.map((c, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">{c.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{c.title}</h3>
                                        <p className="text-sm text-gray-600">{c.subtitle}</p>
                                        <p className="text-xs text-gray-500 mt-2">{c.items}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PERFECT FOR EVERY CREATOR */}
            <section className="relative z-10 bg-white/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4">
                    {/* JOIN INSTAGRAM SELLERS CTA */}
                    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-lime-500 rounded-3xl p-10 text-white shadow-2xl text-center">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-6">Join 1000+ Instagram Sellers</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 max-w-3xl mx-auto">
                            <div>
                                <div className="text-3xl font-bold mb-1">2 min</div>
                                <div className="text-sm opacity-90">Setup</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">5000+</div>
                                <div className="text-sm opacity-90">Daily Sales</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">24/7</div>
                                <div className="text-sm opacity-90">Selling</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">₹0</div>
                                <div className="text-sm opacity-90">Platform Fees</div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                            <a href="https://youtu.be/P3uvqfF1cRY?si=cPubx4YBNvPfGCCf" target="_blank"
                                className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
                            >
                                See How It Works →
                            </a>
                            <button
                                onClick={() => navigate('/signup')}
                                className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-all"
                            >
                                Create Your Store Now →
                            </button>
                        </div>
                        <p className="text-xs opacity-75">*Only payment gateway charges apply</p>
                    </div>
                </div>
            </section>

            {/* PRICING — transparent and comparison-focused */}
            <section className="relative z-10 py-8 bg-white/90 rounded-lg">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        Choose the Right Plan to Grow Your Store
                    </h2>
                    <p className="text-gray-600 mb-10 text-sm sm:text-base">
                        Start free, sell smarter, and upgrade when you're ready to scale your business.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Plan 1: Free */}
                        <div className="bg-white border border-emerald-100 rounded-3xl shadow-md p-8 flex flex-col justify-between hover:shadow-lg transition-all">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Free</h3>
                                <p className="text-gray-600 mb-4">Perfect for beginners</p>
                                <div className="text-4xl font-extrabold text-green-700 mb-1">₹0</div>
                                <div className="text-xs text-gray-500 mb-6">Forever free</div>
                                <div className="text-left space-y-3 mb-6">
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Subdomain store (.growo.store)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Up to 5 products</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Razorpay checkout (UPI/cards)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Email order alerts</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Discount codes (1 active at a time)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Basic analytics (7-day history)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Share digital files via external links</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Automated SEO optimization</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-400">
                                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        <span>Inventory tracking</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-400">
                                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        <span>Custom domain</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-400">
                                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        <span>Digital file delivery</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => navigate("/signup")} className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all">
                                Create Your Free Store
                            </button>
                        </div>

                        {/* Plan 2: Go */}
                        <div className="bg-white border border-emerald-100 rounded-3xl shadow-md p-8 flex flex-col justify-between hover:shadow-lg transition-all">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Go</h3>
                                <p className="text-gray-600 mb-4">Ideal for Growing digital sellers</p>
                                <div className="text-4xl font-extrabold text-green-700 mb-1">₹149</div>
                                <div className="text-xs text-gray-500 mb-6">per month (₹1,490/year) <span className='text-green-800'>(3 months free)</span></div>
                                <div className="space-y-3 mb-6 text-left">
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Everything in Free</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Up to 50 products</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>WhatsApp Payment Checkout</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Upload Digital Files (Upto 5 files)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Inventory tracking & low-stock alerts</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Discount codes (3 active at a time)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Analytics dashboard (30-day history)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Storage & bandwidth (500MB secure delivery)</span>
                                    </div>

                                    <div className="flex items-start gap-2 text-sm text-gray-400">
                                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        <span>Professional Special Template</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-400">
                                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        <span>Custom domain (brand.com)</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => navigate("/signup")} className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all">
                                Upgrade to Go
                            </button>
                        </div>

                        {/* Plan 3: Plus (Most Popular) */}
                        <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-3xl shadow-xl p-8 flex flex-col justify-between transform hover:shadow-2xl transition-all">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                Most Popular
                            </span>
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Plus</h3>
                                <p className="text-gray-600 mb-4">Ideal for Scaling brands</p>
                                <div className="text-4xl font-extrabold text-green-700 mb-1">₹299</div>
                                <div className="text-xs text-gray-500 mb-6">per month (₹2,990/year) <span className='text-green-800'>(3 months free)</span></div>
                                <div className="text-left space-y-3 mb-6">
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Everything in Go</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Up to 200 products</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Custom domain + SSL</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Upload Digital Files (Upto 10 files)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Analytics dashboard (90-day history)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Discount codes (25 active at a time)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Storage & bandwidth (1GB secure delivery)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Email Support</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-400">
                                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        <span>Professional Special Template</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-400">
                                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                        <span>Unlimited active discount codes</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => navigate("/signup")} className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all">
                                Upgrade to Plus
                            </button>
                        </div>

                        {/* Plan 4: Max */}
                        <div className="bg-white border border-emerald-100 rounded-3xl shadow-md p-8 flex flex-col justify-between hover:shadow-lg transition-all">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Max</h3>
                                <p className="text-gray-600 mb-4">Scale your catalog with our highest limits</p>
                                <div className="text-4xl font-extrabold text-green-700 mb-1">₹599</div>
                                <div className="text-xs text-gray-500 mb-6">per month (₹5,990/year) <span className='text-green-800'>(3 months free)</span></div>
                                <div className="text-left space-y-3 mb-6">
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Everything in Plus</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Up to 500 products</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Custom domain + SSL</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Unlimited active discount codes at once</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Upload Digital Files (Upto 20 files)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Analytics dashboard (365-day history)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Professional Special Template</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Storage & bandwidth (2 GB secure delivery)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Priority Support</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => navigate("/signup")} className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all">
                                Upgrade to Max
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-xs text-gray-500">
                        All plans include secure Razorpay payments. Standard payment gateway fees apply.
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="relative z-10 py-16 bg-gradient-to-br from-green-50 to-emerald-100">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-10 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        Loved by Instagram Sellers
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 flex flex-col items-center text-center"
                            >
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, star) => (
                                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 italic mb-5">"{t.content}"</p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-white font-semibold">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{t.name}</h4>
                                        <p className="text-sm text-gray-600">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* TRUST & SECURITY (logos + reassurance) */}
            <section className="relative z-10 py-12 bg-white/90">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h3 className="text-xl font-bold mb-4">Payments & Security</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">We use Razorpay for payments — secure, trusted and widely used across India. Your payouts are fast and data is private.</p>

                    <div className="flex flex-wrap justify-center gap-6 items-center mb-6">
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-emerald-100">
                            <CreditCard className="w-5 h-5 text-emerald-600" />
                            <div className="text-sm text-gray-700">Razorpay integrated</div>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-emerald-100">
                            <Lock className="w-5 h-5 text-emerald-600" />
                            <div className="text-sm text-gray-700">SSL & secure checkout</div>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-emerald-100">
                            <BadgeCheck className="w-5 h-5 text-emerald-600" />
                            <div className="text-sm text-gray-700">Trusted by thousands</div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500">Growo does not hold your payments — funds are routed securely via Razorpay to your account (subject to Razorpay T&Cs).</p>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative z-10 py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-3xl p-10 text-white shadow-2xl text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to stop taking orders in DMs?</h2>
                        <p className="mb-6 text-sm opacity-95">Create a professional store link today — free, fast and trusted by creators across India.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate('/signup')} className="bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
                                Create Your Free Store
                            </button>
                            <a href="https://youtu.be/P3uvqfF1cRY?si=cPubx4YBNvPfGCCf" target="_blank" rel="noopener noreferrer" className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition">
                                Watch Demo
                            </a>
                        </div>
                        <p className="mt-4 text-xs opacity-80">No credit card required • ₹0 platform fees • Free Forever</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
