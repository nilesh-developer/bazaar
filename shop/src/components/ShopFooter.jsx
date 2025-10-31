import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Globe, CornerDownLeft, Youtube, Shield, Facebook, Twitter } from 'lucide-react';

export default function ShopFooter({ store, color1, color2 }) {
    return (
        <footer className={`border-t border-gray-200 bg-gray-50`}>
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 lg:py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-2 lg:mb-4">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{store?.name}</h3>
                        <p className='mt-3 text-gray-600 text-justify text-sm tracking-tight'>
                            {store.bio}
                        </p>
                        <div className="flex gap-2 lg:gap-3 mt-3">
                            {store?.whatsapp && <Link to={store?.whatsapp} className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <MessageCircle className="w-5 h-5 text-gray-600" />
                            </Link>}
                            {store?.instagram && <Link to={store?.instagram} className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <Instagram className="w-5 h-5 text-gray-600" />
                            </Link>}
                            {store?.facebook && <Link to={store?.facebook} className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <Facebook className="w-5 h-5 text-gray-600" />
                            </Link>}
                            {store?.twitter && <Link to={store?.twitter} className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <Twitter className="w-5 h-5 text-gray-600" />
                            </Link>}
                            {store?.youtube && <Link to={store?.youtube} className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <Youtube className="w-5 h-5 text-gray-600" />
                            </Link>}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to={"/shop"} className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Shop All Products
                                </Link>
                            </li>
                            <li>
                                <Link to={"/about"} className="text-gray-600 hover:text-gray-900 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to={"/contact"} className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Get Support
                                </Link>
                            </li>
                            <li>
                                <Link to={`https://wa.me/91${store?.whatsapp}?text=Hello%20${store?.name}`} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies & Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Policies & Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to={"/privacy"} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                                    <Shield className="w-4 h-4" />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to={"/terms"} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to={"/shipping"} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="1" y="3" width="15" height="13" />
                                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                        <circle cx="5.5" cy="18.5" r="2.5" />
                                        <circle cx="18.5" cy="18.5" r="2.5" />
                                    </svg>
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link to={"/refunds"} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                                    <CornerDownLeft className="w-4 h-4" />
                                    Refunds
                                </Link>
                            </li>
                            <li>
                                <Link to={"/contact"} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="text-xs flex flex-col md:flex-row justify-between items-center gap-4 lg:text-sm text-gray-500">
                        <p>© 2025 {store?.name}. All rights reserved.</p>
                        <div className="flex items-center gap-3 lg:gap-6">
                            <div className="flex items-center gap-1">
                                <Shield className="w-4 h-4" />
                                <span>Secure Payments</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>Powered by</span>
                                <a href="https://growo.store" target="_blank" className="text-gray-900 font-medium hover:underline">
                                    growo.store
                                </a>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        This store operates in compliance with Indian e-commerce regulations and data protection laws.
                    </p>
                </div>
            </div>
        </footer>
    );
}