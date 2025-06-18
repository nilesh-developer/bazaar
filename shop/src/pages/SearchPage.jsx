import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';

function SearchPage() {
    const { color1, color2 } = useOutletContext();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/search?q=${query}`);
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false)
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    // Handle image load
    const handleImageLoad = (id) => {
        setImageLoaded((prevState) => ({ ...prevState, [id]: true }));
    };

    if (loading) return <div className='flex h-[720px] lg:min-h-dvh w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>

    return (
        <div className="bg-white">
            <div className="mx-auto px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-4">
                <h2 className="text-base lg:text-2xl font-bold tracking-tight text-gray-900">Search Results for "{query}"</h2>
                {products.length !== 0 ?
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {products.map(product => {
                            return (
                                <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition group p-3 md:p-4 flex flex-col">
                                    <Link to={`/product/${product._id}`} >
                                        <div className="relative aspect-square w-full mb-3 md:mb-4 overflow-hidden rounded-xl">
                                            {!imageLoaded[product._id] && (
                                                <div
                                                    className="w-full h-full object-cover rounded-sm skeleton flex items-center justify-center"
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
                                        </div>
                                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-black transition">{product.name}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-base md:text-lg font-bold text-gray-900">&#8377;{product.salePrice}</span>
                                            {product.originalPrice && <span className="text-xs text-gray-400 line-through">&#8377;{product.originalPrice}</span>}
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => addToCart({ ...product, quantity: 1 })}
                                        style={{
                                            color: color2,
                                            backgroundColor: color1,
                                        }}
                                        className="mt-auto w-full py-2 rounded-full font-semibold hover:opacity-75 transition">Add to Cart</button>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className='h-[680px] lg:h-[500px] lg:text-lg flex justify-center items-center'>
                        <p>Product not found</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default SearchPage;
