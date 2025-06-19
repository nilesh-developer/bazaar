import React, { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom';

function Category() {
    const { id } = useParams();
    const { setCartOpen } = useOutletContext();
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [color1, setColor1] = useState("")
    const [color2, setColor2] = useState("")
    const [loading, setLoading] = useState(false)

    const subdomain = window.location.hostname;

    const getCategoryProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/data/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const responseData = await response.json()
                setCategory(responseData.data)
                setProducts(responseData.data.products)
            }

            const storeResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/store/subdomain/${subdomain}`)
            const storeResponseData = await storeResponse.json()
            if (storeResponse.ok) {
                setColor1(storeResponseData.data.themeColorOne)
                setColor2(storeResponseData.data.themeColorTwo)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setCartOpen(false)
        getCategoryProducts()
    }, [])

    if (loading) {
        return <div className='flex h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="mx-auto px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-4 mb-10">
            <h2 className="text-xl lg:text-3xl font-bold tracking-tight text-gray-900">{category?.name}</h2>
            {products ?
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {products.map(product => (
                        <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition group p-3 md:p-4 flex flex-col">
                            <Link to={`/product/${product._id}`} >
                                <div className="relative aspect-square w-full mb-3 md:mb-4 overflow-hidden rounded-xl">
                                    <img src={product.images.featuredImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                                    {product.originalPrice && (
                                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow" style={{ color: color2, backgroundColor: color1 }}>{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}% OFF</span>
                                    )}
                                    {/* <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow hover:shadow-md transition">
                                    <Heart className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition" />
                                  </button> */}
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-black transition">{product.name}</h3>
                                <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-base md:text-lg font-bold text-gray-900">&#8377;{product.salePrice}</span>
                                    {product.originalPrice && <span className="text-xs text-gray-400 line-through">&#8377;{product.originalPrice}</span>}
                                </div>
                            </Link>
                            {/* <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                              </div> */}
                            <button
                                onClick={() => addToCart({ ...product, quantity: 1 })}
                                style={{
                                    color: color2,
                                    backgroundColor: color1,
                                }}
                                className="mt-auto w-full py-2 rounded-full font-semibold hover:opacity-75 transition">Add to Cart</button>
                        </div>
                    ))}
                </div>
                :
                <div className='h-full w-full flex justify-center items-center'>
                    <p className='font-bold text-xl lg:text-2xl'>No products</p>
                </div>
            }
        </div>
    )
}

export default Category