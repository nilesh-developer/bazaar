import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { Star } from 'lucide-react';
import ProductCard from './ProductCard';

function ShuffledProducts({ products, color1, color2 }) {
    const { addToCart } = useCart();
    const [shuffledProducts, setShuffledProducts] = useState([]);
    const [imageLoaded, setImageLoaded] = useState({}); // Store loading status for each product
    const navigate = useNavigate()

    // Shuffle products using Fisher-Yates algorithm and limit to 8 products
    useEffect(() => {
        const shuffleArray = (array) => {
            let shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        const shuffled = shuffleArray(products);
        setShuffledProducts(shuffled.slice(0, 8)); // Limit to 8 products
    }, [products]);

    // Handle image load
    const handleImageLoad = (id) => {
        setImageLoaded((prevState) => ({ ...prevState, [id]: true }));
    };

    return (
        <section data-theme="light" className='bg-white px-3'>
            <h2 className="text-2xl md:text-4xl font-bold mb-5 mt-4 lg:mt-6 lg:text-center" style={{color: color1}}>All Products</h2>
            <div className="max-w-7xl mx-auto sm:px-6 md:px-8 mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5">
                {shuffledProducts.map((product, index) => {
                    if (product?.status === true && product?.stockStatus === true) {
                        return (
                            <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition group flex flex-col">
                                <Link to={`/product/${product._id}`} >
                                    <div className="relative aspect-square w-full mb-3 md:mb-4 overflow-hidden rounded-t-xl">
                                        {!imageLoaded[product._id] && (
                                            <div
                                                className="h-full w-full object-cover object-center skeleton rounded-none flex items-center justify-center"
                                            >
                                            </div>
                                        )}
                                        <img
                                            src={product.images.featuredImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition"
                                            onLoad={() => handleImageLoad(product._id)}
                                        />
                                        {product.originalPrice && (
                                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow" style={{ color: color2, backgroundColor: color1 }}>{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}% OFF</span>
                                        )}
                                        {/* <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow hover:shadow-md transition">
                                              <Heart className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition" />
                                            </button> */}
                                    </div>
                                    <h3 className="text-base md:text-lg font-bold mx-3 text-gray-900 mb-1 group-hover:text-black transition">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2 mx-3">{product.brand}</p>
                                    <div className="flex items-center gap-2 mb-4 mx-3">
                                        <span className="text-base md:text-lg font-bold text-gray-900">&#8377;{product.salePrice}</span>
                                        {product.originalPrice && <span className="text-xs text-gray-400 line-through">&#8377;{product.originalPrice}</span>}
                                    </div>
                                </Link>
                                <div className='mx-3 mb-3'>
                                    <button
                                        onClick={() => addToCart({ ...product, quantity: 1 })}
                                        style={{
                                            color: color2,
                                            backgroundColor: color1,
                                        }}
                                        className="mt-auto w-full py-2 rounded-full font-semibold transition"
                                    >Add to Cart</button>
                                </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="text-center mt-10 mb-10">
                <Link
                    to="/shop"
                    className="px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:opacity-85 transition"
                    style={{
                        color: color2,
                        backgroundColor: color1
                    }}
                >View All Products</Link>
            </div>
        </section>
    );
}

export default ShuffledProducts;
