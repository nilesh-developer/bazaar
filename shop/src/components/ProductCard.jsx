import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, color1, color2 }) {
    const { addToCart } = useCart()

    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className="max-w-full bg-white">
            <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Product Image Section */}
                <Link to={`/product/${product._id}`} >
                <div className="relative w-44 h-44">
                    {/* Recommended Badge */}
                    <div className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-xl" style={{color: color2, backgroundColor: color1}}>
                        Recommended
                    </div>

                    {!imageLoaded && (
                        <div
                            className="w-44 h-44 object-cover rounded-sm skeleton flex items-center justify-center"
                        >
                        </div>
                    )}
                    <img
                        src={product.images.featuredImage}
                        alt="product image"
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
</Link>
                {/* Product Details Section */}
                <div className="flex-1 p-3 flex flex-col justify-between">
                    <Link to={`/product/${product._id}`} >
                    <div>
                        <h3 className="text-gray-900 font-semibold text-sm leading-tight mb-3">
                            {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-lg font-bold text-gray-900">₹{product.salePrice}</span>
                            <span className="text-green-600 text-sm font-semibold">({Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}% OFF)</span>
                        </div>

                        <div className="text-gray-500 text-sm line-through mb-4">
                            ₹{product.originalPrice}
                        </div>
                    </div>
            </Link>

                    <button
                        onClick={() => addToCart({ ...product, quantity: 1 })}
                        style={{
                            color: color2,
                            backgroundColor: color1,
                        }}
                        className="w-full bg-white b py-2.5 rounded-lg text-sm hover:opacity-85 font-semibold transition-colors">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}