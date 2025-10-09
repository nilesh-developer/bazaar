import React, { useState, useEffect } from 'react';
import {
    ShoppingBag,
    Zap,
    Globe,
    CreditCard,
    Users,
    TrendingUp,
    CheckCircle,
    Star,
    ArrowRight,
    Play,
    Smartphone,
    Monitor,
    DollarSign,
    IndianRupee,
    Shield
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
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
            title: "Launch in Seconds",
            description: "Create your online store instantly with our intuitive builder"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Custom Domain",
            description: "Get a free subdomain or connect your own custom domain"
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: "Built-in Payments",
            description: "Integrated payment gateway with weekly payouts"
        },
        {
            icon: <Shield className="text-white" size={32} />,
            title: "No Subscription Fees",
            description: "Only 5% on successful online payments. No hidden costs or monthly fees"
        },
        {
            icon: <Smartphone className="text-white" size={32} />,
            title: "Social Media Ready",
            description: "Perfect for creators and influencers to monetize their audience"
        },
        {
            icon: <IndianRupee className="text-white" size={32} />,
            title: "5% Fee Only (Online)",
            description: "No hidden charges, 0% on Cash on Delivery(COD)"
        }
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Handicraft Seller, Jaipur",
            content: "I launched my online store in minutes and started getting orders from all over India. The weekly payouts are super convenient!",
            avatar: "PS",
            rating: 5
        },
        {
            name: "Amit Verma",
            role: "T-shirt Brand Owner, Delhi",
            content: "No monthly fees and only 5% on online payments? Bazaar helped me grow my business without worrying about commissions on COD.",
            avatar: "AV",
            rating: 5
        },
        {
            name: "Sneha Patil",
            role: "Home Baker, Mumbai",
            content: "Perfect for small businesses! I just share my store link on WhatsApp and Instagram, and orders keep coming in.",
            avatar: "SP",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden font-sans">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-green-400 to-teal-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '6s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-emerald-300 to-green-400 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pb-20 pt-40 lg:pt-48 sm:pb-32">
                <div className="max-w-3xl sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="mb-4 md:mb-6 flex flex-col items-center w-full">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-4">
                                    <span className="block bg-gradient-to-r from-green-700 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient-flow animate-hero-text-fadein" style={{ animationDelay: '0.1s', animationDuration: '1.2s', animationFillMode: 'both' }}>
                                        Build Your
                                    </span>
                                    <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-flow animate-hero-text-fadein" style={{ animationDelay: '0.5s', animationDuration: '1.2s', animationFillMode: 'both' }}>
                                        Online Store
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
                                    Perfect for creators, influencers & small businesses.
                                    <span className="font-semibold text-green-700">No subscription fees.</span> 
                                    Get your free subdomain and start selling in seconds.
                                </p>
                                {/* <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
                                    Perfect for small businesses. <span className="font-semibold text-green-700">No subscription fees.</span> Get your free subdomain and start selling in seconds.
                                </p> */}
                            </div>
                        </div>

                        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 lg:mb-14">
                                <Link to="/signup" className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"><button >Create Store Now<ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" /></button></Link>
                                <a href="https://youtu.be/P3uvqfF1cRY?si=cPubx4YBNvPfGCCf" className="group flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold border border-green-500/40 hover:border-green-400 backdrop-blur-sm hover:bg-green-500/5 transition-all text-black"><Play className="mr-2 group-hover:scale-110 transition-transform" size={20} /> Watch Demo</a>
                            </div>

                            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-700">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Free subdomain</span>
                                </div>
                                {/* <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>No monthly fees</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Weekly payouts</span>
                                </div> */}
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>0% commission on COD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-12 sm:py-20 bg-white/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
                            <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                                Everything You Need for Bharat
                            </span>
                        </h2>
                        <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto">
                            Built for Indian entrepreneurs who want to start selling instantly
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-green-100 flex flex-col items-center text-center justify-between ${activeFeature === index ? 'ring-2 ring-green-300 bg-gradient-to-br from-green-50 to-emerald-50' : ''}`}
                            >
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 mx-auto">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 text-center">{feature.title}</h3>
                                <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 py-12 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
                        <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                            Simple, Fair Pricing for India
                        </span>
                    </h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-green-100 max-w-2xl mx-auto flex flex-col items-center">
                            <div className="text-5xl sm:text-6xl font-bold mb-2 sm:mb-4">
                                <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                                    Free
                                </span>
                            </div>
                            {/* <p className="text-lg sm:text-2xl text-gray-700 mb-4">to start, then just</p>
                        <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-2 sm:mb-4">5% per Online Transaction</div>
                        <div className="text-base sm:text-lg text-green-700 mb-4">0% commission on Cash on Delivery (COD)</div> */}
                            <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-8 w-full text-left max-w-md mx-auto">
                                {[
                                    "Free subdomain",
                                    "5% on Online Payment",
                                    "0% on Cash on Delivery (COD)",
                                    // "Built-in UPI & card payments",
                                    // "Weekly payouts",
                                    "Mobile-optimized storefront",
                                    "24/7 customer support",
                                    "No setup fees",
                                    // "No monthly subscriptions"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center space-x-2 sm:space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 text-xs sm:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg w-full max-w-xs">
                                Start Your Store Now
                            </button>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-green-100 max-w-2xl mx-auto flex flex-col items-center">
                            <div className="text-5xl sm:text-6xl font-bold mb-2 sm:mb-4">
                                <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                                    {/* Free */}
                                    ₹99/month
                                </span>
                            </div>
                            {/* <p className="text-lg sm:text-2xl text-gray-700 mb-4">to start, then just</p>
                        <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-2 sm:mb-4">5% per Online Transaction</div>
                        <div className="text-base sm:text-lg text-green-700 mb-4">0% commission on Cash on Delivery (COD)</div> */}
                            <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-8 w-full text-left max-w-md mx-auto">
                                {[
                                    "Free subdomain",
                                    "Connect your own domain",
                                    "3% on Online Payment",
                                    "0% on Cash on Delivery (COD)",
                                    // "Built-in UPI & card payments",
                                    // "Weekly payouts",
                                    "Mobile-optimized storefront",
                                    "24/7 customer support",
                                    "No setup fees",
                                    // "No monthly subscriptions"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center space-x-2 sm:space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 text-xs sm:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg w-full max-w-xs">
                                Start Your Store Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative z-10 py-12 sm:py-20 bg-white/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 transition-all hover:scale-105 border border-green-100">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-bold mb-4">1</div>
                            <h3 className="text-xl font-semibold mb-2">Sign Up & Create</h3>
                            <p className="text-gray-600">Register in seconds and use our drag-and-drop builder to create your store</p>
                        </div>
                        <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 transition-all hover:scale-105 border border-green-100">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-bold mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-2">Add Products & Share</h3>
                            <p className="text-gray-600">Upload your products and share your store link on social media</p>
                        </div>
                        {/* <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 transition-all hover:scale-105 border border-green-100">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-bold mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-2">Get Paid Weekly</h3>
                            <p className="text-gray-600">Receive payments every week minus our 5% fee on successful online transactions</p>
                        </div> */}
                        <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 transition-all hover:scale-105 border border-green-100">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-bold mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-2">Start Getting Orders</h3>
                            <p className="text-gray-600">Receive Orders from your audience</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="relative z-10 py-12 sm:py-20 bg-white/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
                            <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                                Loved by Indian Sellers
                            </span>
                        </h2>
                        <p className="text-base sm:text-xl text-gray-700">Join thousands of successful Indian online sellers</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                                <div className="flex items-center mb-2 sm:mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">"{testimonial.content}"</p>
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</div>
                                        <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-12 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                            Ready to Start Selling in India?
                        </h2>
                        <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90">
                            Join thousands of Indian creators already building their dream stores
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button onClick={() => navigate("/signup")} className="bg-white text-green-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                                Create Your Store
                            </button>
                            <a href='https://youtu.be/P3uvqfF1cRY?si=cPubx4YBNvPfGCCf' className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300">
                                Watch Demo
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tailwind CSS custom animation (add to your CSS if not present) */}
            <style jsx global>{`
        @layer utilities {
          .animate-hero-text-fadein {
            @apply opacity-0 translate-y-8;
            animation: heroTextFadeIn 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
          }
          .animate-gradient-flow {
            background-size: 200% 200%;
            animation: gradientFlow 3s linear infinite;
          }
        }
        @keyframes heroTextFadeIn {
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
        </div>
    );
};

export default LandingPage;