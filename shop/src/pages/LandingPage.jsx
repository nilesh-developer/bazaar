import React, { useEffect, useState } from 'react';
import { ShoppingCart, X, Star, Heart, Truck, Shield, RefreshCw, Instagram, Twitter, Facebook, Mail, ArrowRight, Play, User } from 'lucide-react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import LazyLoadingPage from '../components/LazyLoadingPage';
import { useCart } from '../store/CartContext';
import { Category } from '../components';
import { Helmet } from 'react-helmet';
import ShuffledProducts from '../components/ShuffledProducts';

const categories = [
  {
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
    description: "Sustainable footwear for every step"
  },
  {
    name: "Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    description: "Premium clothing essentials"
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    description: "Thoughtfully designed accessories"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Amazing quality and fast shipping. These sneakers are incredibly comfortable for daily wear.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    location: "New York, NY"
  },
  {
    name: "Mike Chen",
    text: "Love the minimalist design and sustainable materials. Will definitely order again!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    location: "San Francisco, CA"
  },
  {
    name: "Emma Davis",
    text: "Best online shopping experience I've had. Products exceeded my expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    location: "Austin, TX"
  }
];

// --- HERO ---
const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center bg-gray-50">
    <div className="absolute inset-0">
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop"
        alt="Hero"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Sustainable Style
        <br />
        <span className="text-3xl md:text-5xl">Redefined</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
        Discover our collection of premium, eco-friendly products designed for the modern lifestyle
      </p>
      <button
        onClick={() => setCurrentPage('products')}
        className="bg-white text-black px-8 py-4 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium text-lg"
      >
        Shop Collection
      </button>
    </div>
  </section>
);

// --- SCROLLABLE BANNER ---
const BannerCarousel = ({ store, banners }) => {

  const [current, setCurrent] = useState(0);
  const [imagesLoading, setImagesLoading] = useState(true)

  // Simple auto-scroll
  useEffect(() => {
    if (banners?.length) {
      const interval = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 4000);
      return () => clearInterval(interval);
    }
  }, [banners?.length]);

  if (!store) {
    return (
      <div
        data-theme="light"
        className="flex justify-center skeleton rounded-none items-center text-4xl w-full h-96 font-bold"
      >
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden h-64 md:h-64 lg:h-96 mb-4"> {/* Increased height for mobile */}
      {banners?.length > 0 ?
        <>
          {banners.map((banner, i) => (
            <>
              {imagesLoading && (
                <div
                  data-theme="light"
                  className="flex justify-center skeleton rounded-none items-center text-4xl w-full h-96 font-bold"
                >
                </div>
              )}

              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={banner}
                  alt="banner"
                  className="w-full h-full object-cover object-center"
                  onLoad={() => setImagesLoading(false)}
                />
              </div>
            </>
          ))}
        </>
        :
        <div
          className="flex justify-center items-center text-4xl w-full h-96 font-bold"
          style={{ backgroundColor: store.themeColorOne, color: store.themeColorTwo }}
        >
          Sample Banner Text
        </div>
      }

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full ${i === current ? 'bg-white' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div >
  );
};

// --- CATEGORIES ---
const CategoriesSection = () => (
  <section className="py-4 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">Shop by Category</h2>
      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
        {categories.map((cat, i) => (
          <div key={i} className="min-w-[180px] max-w-[200px] bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center group cursor-pointer border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-200 to-gray-50 flex items-center justify-center mb-3 shadow-inner">
              <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded-full group-hover:scale-105 transition" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-black transition">{cat.name}</h3>
            <p className="text-gray-500 text-xs mb-2 text-center">{cat.description}</p>
            <a href="#products" className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-900 transition">Shop Now</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- FEATURED PRODUCTS ---
const FeaturedProductsSection = ({ products, addToCart, color1, color2 }) => {
  const featuredProducts = products.slice(0, 8);
  return (
    <section id="products" className="pb-8 lg:py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map(product => {
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
                  className="mt-auto w-full py-2 rounded-full font-semibold hover:opacity-75 transition">Add to Cart</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

// --- TESTIMONIALS ---
const TestimonialsSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Features Section 
const FeatureSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-black" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-600">Free shipping on orders over &#8377;75</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="h-8 w-8 text-black" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">30-day return policy</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-black" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
          <p className="text-gray-600">Your payment information is safe</p>
        </div>
      </div>
    </div>
  </section>
)

// --- FOOTER ---
const Footer = () => (
  <footer className="bg-black text-gray-200 py-16 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="mb-6 md:mb-0">
        <h2 className="text-2xl font-extrabold tracking-tight">LUXE</h2>
        <p className="text-gray-400 mt-2 max-w-xs">Premium, sustainable products for the modern lifestyle.</p>
      </div>
      <form className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
        <input type="email" placeholder="Subscribe to newsletter" className="bg-transparent border-none outline-none text-gray-200 placeholder-gray-400 px-2 py-1 w-48" />
        <button type="submit" className="bg-white text-black rounded-full px-4 py-2 font-semibold hover:bg-gray-200 transition">Subscribe</button>
      </form>
      <div className="flex space-x-6 mb-6 md:mb-0">
        <a href="#" className="hover:text-white"><Instagram className="h-6 w-6" /></a>
        <a href="#" className="hover:text-white"><Twitter className="h-6 w-6" /></a>
        <a href="#" className="hover:text-white"><Facebook className="h-6 w-6" /></a>
        <a href="#" className="hover:text-white"><Mail className="h-6 w-6" /></a>
      </div>
      <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} LUXE. All rights reserved.</div>
    </div>
  </footer>
);

// --- NEW SHOP PAGE ---
const ShopPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition group p-3 flex flex-col cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-xl">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span>
              )}
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-black transition">{product.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SINGLE PRODUCT PAGE ---
const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  if (!product) return <div className="text-center py-20">Product not found.</div>;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 mt-2">
            {product.images.map((img, idx) => (
              <img key={idx} src={img} alt={product.name} className="w-16 h-16 object-cover rounded-md border border-gray-200 cursor-pointer" />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-500">{product.brand}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && <span className="text-base text-gray-400 line-through">${product.originalPrice}</span>}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <ul className="list-disc list-inside text-gray-500 text-sm mb-4">
            {product.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          <button className="bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN LANDING PAGE ---
const LandingPage = () => {
  const { store, color1, color2, products, cartOpen, setCartOpen } = useOutletContext();
  const { addToCart, cart, removeFromCart, updateQuantity, calculateTotal } = useCart();
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  if (!store || !products) {
    return <LazyLoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>{store.metaTitle}</title>
        <meta name="description" content={store.metaDescription} />
        <meta property="og:title" content={store.metaTitle} />
        <meta property="og:description" content={store.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.hostname} />
      </Helmet>

      <div className="bg-white min-h-screen flex flex-col">
        {/* <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          calculateTotal={calculateTotal}
          store={store}
          color1={color1}
          color2={color2}
          navigate={navigate}
        /> */}
        <BannerCarousel store={store} banners={store?.sliderImages} />
        {/* <HeroSection /> */}
        {store.hideCategory ? <></> : <Category categories={store?.categories} />}
        {/* <CategoriesSection /> */}
        <FeaturedProductsSection products={products} addToCart={addToCart} color1={color1} color2={color2} />
        <ShuffledProducts products={products} color1={color1} color2={color2} />
        <FeatureSection />
        <TestimonialsSection />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default LandingPage;
export { ShopPage, ProductPage };