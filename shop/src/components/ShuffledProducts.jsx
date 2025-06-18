import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { Star } from 'lucide-react';

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
        <section data-theme="light" className='bg-gradient-to-b bg-gray-50'>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">All Products</h2>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5">
                {shuffledProducts.map((product) => {
                    if (product?.status === true && product?.stockStatus === true) {
                        return (
                            <div key={product._id} className="group cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
                                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 relative">
                                    {!imageLoaded[product._id] && (
                                        <div
                                            className="h-full w-full object-cover object-center skeleton flex items-center justify-center"
                                        >
                                        </div>
                                    )}
                                    <img
                                        src={product.images.featuredImage}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                        onLoad={() => handleImageLoad(product._id)}
                                    />

                                    {product.originalPrice && (
                                        <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium" style={{ color: color2, backgroundColor: color1 }}>
                                            Sale
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                                        {/* <div className="flex items-center mt-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-3 w-3 &#8377;{i < Math.floor(5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                                    </div> */}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-md font-semibold text-gray-900">&#8377;{product.salePrice}</p>
                                        {product.originalPrice && (
                                            <p className="text-xs text-gray-500 line-through">&#8377;{product.originalPrice}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="text-center mt-10 mb-10">
                <Link to="/shop" className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-900 transition">View All Products</Link>
            </div>
        </section>
    );
}

export default ShuffledProducts;
