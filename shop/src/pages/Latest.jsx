import React, { useState, createContext, useContext, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Star, ChevronDown, Filter, Heart, Truck, Shield, RefreshCw, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

// Cart Context for global state management
const CartContext = createContext();

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Dummy product data
const products = [
  {
    id: 1,
    name: "Urban Runner",
    price: 120,
    originalPrice: 150,
    category: "Sneakers",
    brand: "EcoStep",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    ],
    description: "Sustainable sneakers made from recycled materials. Perfect for everyday wear with superior comfort and style.",
    features: ["Recycled materials", "All-day comfort", "Machine washable", "Carbon neutral shipping"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Grey"],
    rating: 4.8,
    reviews: 247
  },
  {
    id: 2,
    name: "Performance Tee",
    price: 45,
    category: "Apparel",
    brand: "ActiveWear",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4ec6?w=400&h=400&fit=crop"
    ],
    description: "Moisture-wicking performance t-shirt designed for active lifestyles. Lightweight and breathable.",
    features: ["Moisture-wicking", "Quick dry", "Odor resistant", "UPF 50+ protection"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "White", "Heather Grey"],
    rating: 4.6,
    reviews: 189
  },
  {
    id: 3,
    name: "Classic Backpack",
    price: 89,
    category: "Accessories",
    brand: "Urban Co.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=400&fit=crop"
    ],
    description: "Minimalist backpack perfect for work or travel. Made with premium materials and thoughtful design.",
    features: ["15\" laptop compartment", "Water resistant", "Lifetime warranty", "Ergonomic design"],
    sizes: ["One Size"],
    colors: ["Black", "Charcoal", "Tan"],
    rating: 4.9,
    reviews: 324
  },
  {
    id: 4,
    name: "Comfort Hoodie",
    price: 75,
    category: "Apparel",
    brand: "Cozy Co.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    ],
    description: "The softest hoodie you'll ever wear. Made from organic cotton blend for ultimate comfort.",
    features: ["Organic cotton", "Pre-shrunk", "Fleece lined", "Kangaroo pocket"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Navy", "Cream"],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 5,
    name: "Trail Runners",
    price: 140,
    category: "Sneakers",
    brand: "OutdoorX",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9739b5f6b6?w=400&h=400&fit=crop"
    ],
    description: "Rugged trail running shoes built for adventure. Superior grip and durability for all terrains.",
    features: ["All-terrain grip", "Waterproof", "Breathable mesh", "Rock protection"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["Black/Red", "Grey/Blue", "Brown/Orange"],
    rating: 4.5,
    reviews: 203
  },
  {
    id: 6,
    name: "Minimalist Watch",
    price: 199,
    category: "Accessories",
    brand: "TimeCore",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1434493651957-d6813ba28b94?w=400&h=400&fit=crop"
    ],
    description: "Clean, minimalist timepiece that complements any style. Swiss movement with premium materials.",
    features: ["Swiss movement", "Sapphire crystal", "Water resistant", "Leather strap"],
    sizes: ["38mm", "42mm"],
    colors: ["Silver", "Gold", "Black"],
    rating: 4.8,
    reviews: 89
  }
];

const categories = [
  { name: "Sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop" },
  { name: "Apparel", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop" }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Amazing quality and fast shipping. These sneakers are incredibly comfortable for daily wear.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
  },
  {
    name: "Mike Chen",
    text: "Love the minimalist design and sustainable materials. Will definitely order again!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    name: "Emma Davis",
    text: "Best online shopping experience I've had. Products exceeded my expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
  }
];

// Cart Provider Component
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size, color) => {
    const cartItem = {
      ...product,
      cartId: `${product.id}-${size}-${color}`,
      size,
      color,
      quantity: 1
    };

    setCartItems(prev => {
      const existingItem = prev.find(item => item.cartId === cartItem.cartId);
      if (existingItem) {
        return prev.map(item =>
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Navbar Component
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <h1 className="text-2xl font-bold text-gray-900">LUXE</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentPage === 'home' ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('products')}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentPage === 'products' ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                Shop All
              </button>
              <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-black cursor-pointer transition-colors duration-200">About</span>
              <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-black cursor-pointer transition-colors duration-200">Contact</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Cart and Menu */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-400 hover:text-black transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-black text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-black w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('products'); setIsMenuOpen(false); }}
                className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-black w-full text-left"
              >
                Shop All
              </button>
              <span className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-black cursor-pointer">About</span>
              <span className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-black cursor-pointer">Contact</span>
              
              {/* Mobile search */}
              <div className="px-3 pt-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Cart Sidebar Component
const CartSidebar = () => {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center space-x-3 border-b pb-4">
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.size} • {item.color}</p>
                      <p className="text-sm font-medium text-gray-900">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total: ${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Product Card Component
const ProductCard = ({ product, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Sale
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-gray-500 line-through">${product.originalPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $75</p>
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

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Discover our curated collections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => setCurrentPage('products')}>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-center group-hover:text-gray-600 transition-colors duration-200">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Our bestsellers and new arrivals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentPage('product-detail');
                }}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
    </div>
  );
};

// Products Page Component
const ProductsPage = ({ setSelectedProduct, setCurrentPage }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <select
              className="ml-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        {showFilters && (
          <div className="mb-8 p-4 bg-white rounded-md shadow-sm">
            {/* Add more filter options here if needed */}
            <span className="text-gray-500">(Additional filters coming soon...)</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">No products found.</div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentPage('product-detail');
                }}
              />
            ))
          )
          }
        </div>
      </div>
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = ({ product, setCurrentPage, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
            <img src={mainImage} alt={product.name} className="h-full w-full object-cover object-center" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.name}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.brand}</p>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <ul className="list-disc list-inside text-gray-500 text-sm mb-4">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <span className="font-medium">Size:</span>
              <div className="flex gap-2">
                {product.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 rounded-md border ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'} font-medium`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-medium">Color:</span>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 rounded-md border ${selectedColor === color ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'} font-medium`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-medium">Quantity:</span>
              <button
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
            <button
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium mt-4"
              onClick={() => addToCart(product, selectedSize, selectedColor)}
            >
              Add to Cart
            </button>
            <button
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium"
              onClick={() => setCurrentPage('products')}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold tracking-tight">LUXE</h2>
          <p className="text-gray-400 mt-2 max-w-xs">Premium, sustainable products for the modern lifestyle.</p>
        </div>
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:text-white"><Instagram className="h-6 w-6" /></a>
          <a href="#" className="hover:text-white"><Twitter className="h-6 w-6" /></a>
          <a href="#" className="hover:text-white"><Facebook className="h-6 w-6" /></a>
          <a href="#" className="hover:text-white"><Mail className="h-6 w-6" /></a>
        </div>
        <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} LUXE. All rights reserved.</div>
      </div>
    </div>
  </footer>
);

// Main Latest Page Component
const Latest = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CartSidebar />
      {currentPage === 'home' && (
        <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
      )}
      {currentPage === 'products' && (
        <ProductsPage setSelectedProduct={setSelectedProduct} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'product-detail' && selectedProduct && (
        <ProductDetailPage product={selectedProduct} setCurrentPage={setCurrentPage} addToCart={addToCart} />
      )}
      <Footer />
    </div>
  );
};

// Export with CartProvider
export default function LatestWithProvider() {
  return (
    <CartProvider>
      <Latest />
    </CartProvider>
  );
}