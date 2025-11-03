import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import { useCart } from '../store/CartContext';

function Shop() {
  const { store, color1, color2, products, setCartOpen, setIsMenuOpen } = useOutletContext();
  const { addToCart } = useCart()

  useEffect(() => {
    setCartOpen(false)
    setIsMenuOpen(false)
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-5 sm:px-6 sm:py-7 lg:max-w-7xl lg:px-4">
        <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-center text-gray-900">Shop</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map(product => {
            const [imageLoaded, setImageLoaded] = useState(false);

            return (
              <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition group p-3 md:p-4 flex flex-col">
                <Link to={`/product/${product._id}`} >
                  <div className="relative aspect-square w-full mb-3 md:mb-4 overflow-hidden rounded-xl">
                    {!imageLoaded && (
                      <div
                        className="w-full h-full object-cover rounded-sm skeleton flex items-center justify-center"
                      >
                      </div>
                    )}
                    <img
                      src={product.images.featuredImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                      onLoad={() => setImageLoaded(true)}
                    />
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
                  className="mt-auto w-full py-2 rounded-full font-semibold transition">Add to Cart</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Shop