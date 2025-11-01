import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { useOutletContext, Link } from 'react-router-dom'
import { Category, ProductCard } from '../components';
import ShuffledProducts from '../components/ShuffledProducts';
import { MessageCircle, Instagram, Youtube, Facebook, Twitter, Globe } from 'lucide-react';

export default function Home() {
    const { store, color1, color2, products, recommendedProducts } = useOutletContext()

    const handleShare = async () => {
        const shareData = {
            title: store?.name,
            text: store?.bio,
            url: window.location.origin,  // Replace with your desired link
        };

        // Check if the Web Share API is available
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Content shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback for browsers that don't support the Web Share API
            alert('Your browser does not support the Web Share API.');
        }
    }

    return (
        <div className='bg-white'>
            {/* Hero Banner Section */}
            <div className="relative h-64 sm:h-[400px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
                {/* Background Image */}
                <div className="hidden lg:block absolute inset-0">
                    <img
                        src={store?.desktopBanner}
                        alt="Banner background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="block lg:hidden absolute inset-0">
                    <img
                        src={store?.mobileBanner}
                        alt="Banner background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Overlay */}
                {/* <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-full flex flex-col justify-center">
                        <div className="text-white space-y-3 max-w-2xl">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-widest">
                                HAMMER
                            </h1>
                            <p className="text-base sm:text-lg font-light tracking-wide">
                                WE PROVIDE
                            </p>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                SMARTER
                            </h2>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-300 tracking-wide">
                                ALTERNATIVES
                            </h2>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs flex items-center gap-1">
                        <span>Made with Swiggy Minis</span>
                        <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-xs">ⓘ</span>
                    </div>
                </div> */}
            </div>

            {/* Store Info Section */}
            <div className="max-w-7xl mx-auto lg:px-8">
                <div className="relative -mt-12 sm:-mt-16">
                    {/* Logo */}
                    <div className="mb-6 ml-4 lg:ml-0">
                        {store?.logo ?
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg flex items-center justify-center">
                                <img className='bg-white rounded-2xl' src={store?.logo} alt={store?.name} srcset="" />
                            </div>
                            :
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg flex items-center justify-center" style={{ color: color1, backgroundColor: color2 }}>
                                <span className="font-bold text-sm sm:text-base tracking-wider">
                                    {store?.name}
                                </span>
                            </div>
                        }
                    </div>

                    {/* Info Card */}
                    <div className="bg-white rounded-lg p-4">
                        {/* Header with Share Button */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: color1 }}>{store?.name}</h1>
                                <p className="text-sm sm:text-base text-gray-500">Audio devices, Electronics</p>
                            </div>
                            <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Status Alert */}
                        {!store?.status && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                            <div className="flex items-center">
                                <span className="text-red-500 mr-2 text-lg">⚠</span>
                                <p className="text-red-700 font-medium text-sm sm:text-base">Currently not taking orders</p>
                            </div>
                        </div>}

                        {/* Description */}
                        <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            <p>
                                {store?.bio}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3 mt-3">
                            {store?.whatsapp && <a href={`https://api.whatsapp.com/send?phone=${store?.whatsapp}&text=Hello%20${store?.name}`} target="_blank"
                                className="w-full h-10 text-emerald-700 gap-1 bg-white border border-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
                                <MessageCircle className="w-5 h-5" /> WhatsApp
                            </a>}
                            {store?.instagram && <Link to={store?.instagram} className="w-full h-10 text-pink-700 gap-1 bg-white border border-pink-700 rounded-full flex items-center justify-center hover:bg-pink-100 transition-colors">
                                <Instagram className="w-5 h-5" /> Instagram
                            </Link>}
                            {store?.facebook && <Link to={store?.facebook} className="w-full h-10 text-blue-700 gap-1 bg-white border border-blue-700 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                                <Facebook className="w-5 h-5" /> Facebook
                            </Link>}
                            {store?.twitter && <Link to={store?.twitter} className="w-full h-10 text-gray-900 gap-1 bg-white border border-gray-900 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors">
                                <Twitter className="w-5 h-5" /> Twitter
                            </Link>}
                            {store?.youtube && <Link to={store?.youtube} className="w-full h-10 text-red-700 gap-1 bg-white border border-red-700 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors">
                                <Youtube className="w-5 h-5" /> YouTube
                            </Link>}
                            {store?.website && <Link to={store?.youtube} className="w-full h-10 text-yellow-700 gap-1 bg-white border border-yellow-700 rounded-full flex items-center justify-center hover:bg-yellow-100 transition-colors">
                                <Globe className="w-5 h-5" /> Website
                            </Link>}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {store.hideCategory ? <></> : <Category categories={store?.categories} color1={color1} color2={color2} />}

                {recommendedProducts.length !== 0 &&
                    <section id="products" className="pb-8 lg:py-8 bg-white">
                        <div className="max-w-7xl mx-auto px-3 md:px-8">
                            <h2 className="text-2xl lg:text-4xl font-bold mb-5 mt-4 lg:mt-6 lg:text-center" style={{ color: color1 }}>Featured Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
                                {recommendedProducts.map(product => {
                                    if (product.recommended) {
                                        return <div key={product._id}>
                                            <ProductCard product={product} color1={color1} color2={color2} />
                                        </div>
                                    } else {
                                        return null
                                    }
                                })}
                            </div>
                        </div>
                    </section>
                }
                <ShuffledProducts products={products} color1={color1} color2={color2} />
            </div>
        </div>
    );
}