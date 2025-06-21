import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { useCustomerAuth } from "../store/customerAuth";
import { useState } from "react";
import { Menu, Search, ShoppingBag, ShoppingCart, X } from "lucide-react";

const Navbar = ({ setCartOpen, store, color1, color2, openSearch, setOpenSearch, isMenuOpen, setIsMenuOpen }) => {
    const [query, setQuery] = useState('');
    const { cart } = useCart()
    const { customerToken } = useCustomerAuth()
    const navigate = useNavigate()

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 lg:h-16">
                <div className="flex items-center md:hidden gap-8">
                    <button className="p-2" aria-label="Menu" onClick={() => setIsMenuOpen(true)}>
                        <Menu className="h-6 w-6" color={color1} />
                    </button>
                </div>

                <div className="flex justify-center">
                    <Link to="/">
                        {store?.logo ?
                            <img className='h-10 lg:h-12 lg:w-auto max-w-36' src={store?.logo} alt="Logo" loading='lazy' />
                            :
                            <span style={{ color: color1 }} className="text-3xl font-extrabold tracking-tight text-gray-900">{store.name}</span>
                        }
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="hidden md:block flex-1 max-w-md mx-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-2 outline-none border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch()
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="items-center gap-8 hidden">
                    <Link to="/" className="hidden md:block text-gray-700 hover:text-black font-medium transition">Home</Link>
                    <Link to="/shop" className="hidden md:block text-gray-700 hover:text-black font-medium transition">Shop</Link>
                    <Link to="/about" className="hidden md:block text-gray-700 hover:text-black font-medium transition">About</Link>
                    <Link to="/contact-us" className="hidden md:block text-gray-700 hover:text-black font-medium transition">Contact</Link>
                </div>

                <div className='flex gap-4'>
                    {customerToken ?
                        <div className='lg:flex items-center gap-4 hidden'>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="lg:w-8 w-7 rounded-full" style={{ color: color1 }}>
                                        <svg className='h-8 fill-current' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                            <path d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 24 7 C 27.883764 7 31 10.116238 31 14 C 31 17.883762 27.883764 21 24 21 C 20.116236 21 17 17.883762 17 14 C 17 10.116238 20.116236 7 24 7 z M 12.5 28 C 10.032499 28 8 30.032499 8 32.5 L 8 33.699219 C 8 36.640082 9.8647133 39.277974 12.708984 41.091797 C 15.553256 42.90562 19.444841 44 24 44 C 28.555159 44 32.446744 42.90562 35.291016 41.091797 C 38.135287 39.277974 40 36.640082 40 33.699219 L 40 32.5 C 40 30.032499 37.967501 28 35.5 28 L 12.5 28 z M 12.5 31 L 35.5 31 C 36.346499 31 37 31.653501 37 32.5 L 37 33.699219 C 37 35.364355 35.927463 37.127823 33.677734 38.5625 C 31.428006 39.997177 28.068841 41 24 41 C 19.931159 41 16.571994 39.997177 14.322266 38.5625 C 12.072537 37.127823 11 35.364355 11 33.699219 L 11 32.5 C 11 31.653501 11.653501 31 12.5 31 z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <ul data-theme="light" tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] py-2 shadow rounded-box w-52">
                                    <li>
                                        <Link to="/account" className="justify-between">
                                            Profile
                                        </Link>
                                    </li>
                                    <li><Link to="orders">Orders</Link></li>
                                    <li><Link to="logout">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                        :
                        <>
                            <div className='hidden lg:block lg:font-semibold text-base tracking-tighter bg-transparent rounded-lg' style={{ color: color1 }}>
                                <Link to="/login" style={{ color: color1 }}>
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="lg:w-8 w-7 rounded-full" style={{ color: color1 }}>
                                            <svg className='h-8 fill-current' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                                <path d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 24 7 C 27.883764 7 31 10.116238 31 14 C 31 17.883762 27.883764 21 24 21 C 20.116236 21 17 17.883762 17 14 C 17 10.116238 20.116236 7 24 7 z M 12.5 28 C 10.032499 28 8 30.032499 8 32.5 L 8 33.699219 C 8 36.640082 9.8647133 39.277974 12.708984 41.091797 C 15.553256 42.90562 19.444841 44 24 44 C 28.555159 44 32.446744 42.90562 35.291016 41.091797 C 38.135287 39.277974 40 36.640082 40 33.699219 L 40 32.5 C 40 30.032499 37.967501 28 35.5 28 L 12.5 28 z M 12.5 31 L 35.5 31 C 36.346499 31 37 31.653501 37 32.5 L 37 33.699219 C 37 35.364355 35.927463 37.127823 33.677734 38.5625 C 31.428006 39.997177 28.068841 41 24 41 C 19.931159 41 16.571994 39.997177 14.322266 38.5625 C 12.072537 37.127823 11 35.364355 11 33.699219 L 11 32.5 C 11 31.653501 11.653501 31 12.5 31 z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    }

                    <div className="flex items-center gap-4">
                        {/* {!openSearch ?
                            <button onClick={(e) => setOpenSearch(true)} style={{ color: color1 }} className='lg:hidden'>
                                <Search className='w-6 h-6 lg:w-7 lg:h-7' />
                            </button>
                            : null} */}
                        <button className="relative p-2 rounded-full" onClick={() => setCartOpen(true)}>
                            <ShoppingBag className="w-6 h-6 lg:w-7 lg:h-7" style={{ color: color1 }} />
                            <span style={{ backgroundColor: color1, color: color2 }} className="absolute -top-0 -right-0 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{cart?.length}</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu drawer - now solid white for visibility */}
            <div className={`fixed inset-0 z-50 transition-all duration-300 ${isMenuOpen ? 'block' : 'pointer-events-none'}`}>
                <div className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
                <div className={`fixed top-0 left-0 h-full w-72 bg-white text-black shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}> {/* bg-white for solid background, text-black for contrast */}
                    <div className="flex items-center justify-between px-4 py-3 border-b" style={{ color: color1 }}>
                        <span className="text-xl font-bold">Menu</span>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition"><X className="h-6 w-6" /></button>
                    </div>
                    <div className="flex bg-white h-screen flex-col gap-2 p-4">
                        <Link to="/" className="font-medium py-2" style={{ color: color1 }}>Home</Link>
                        <Link to="/shop" className="font-medium py-2" style={{ color: color1 }}>Shop</Link>
                        {/* <Link to="/shipping-policy" className="font-medium py-2" style={{ color: color1 }}>Shipping Policy</Link> */}
                        <Link to="/about" className="font-medium py-2" style={{ color: color1 }}>About</Link>
                        {customerToken ?
                            <Link to="/account" className="font-medium py-2" style={{ color: color1 }}>Account</Link>
                            :
                            <Link to="/login" className="font-medium py-2" style={{ color: color1 }}>Login</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar