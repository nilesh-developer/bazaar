import React, { useEffect, useState } from 'react';
import { BottomNavbar, CartSidebar, Footer, Navbar } from '../components'
import { Outlet, useNavigate } from 'react-router-dom';
import changeFavicon from '../Hooks/changeFavicon';
import LazyLoadingPage from '../components/LazyLoadingPage';
import { useCustomerAuth } from '../store/customerAuth';
import { Search, X } from 'lucide-react';
import ShopFooter from '../components/ShopFooter';
import { Share2, ShoppingBag, User2 } from 'lucide-react';

export default function MiniLayout() {
    const [store, setStore] = useState({});
    const [color1, setColor1] = useState("#000000");
    const [color2, setColor2] = useState("#f2f2f2");
    const { setStoreId } = useCustomerAuth();
    const [loading, setLoading] = useState(true);
    const [openSearch, setOpenSearch] = useState(false);
    const [query, setQuery] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const [loadingRecommendedProducts, setLoadingRecommendedProducts] = useState(true)
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);

    const pathname = window.location.pathname;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const subdomain = window.location.hostname;

    const getThemeColor = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/subdomain/${subdomain}`);
            if (!response.ok) throw new Error('Failed to fetch store data');
            const data = await response.json();
            setStore(data.data);
            setStoreId(data.data._id);
            setColor1(data.data.themeColorOne || "#000000");
            setColor2(data.data.themeColorTwo || "#f2f2f2");
        } catch (error) {
            console.error('Error fetching store data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRecommendedProducts = async () => {
        try {
            setLoadingRecommendedProducts(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/get-recommended/${store._id}`);
            if (!response.ok) throw new Error('Failed to fetch products data');
            const data = await response.json();
            setRecommendedProducts(data.data);
        } catch (error) {
            console.error('Error fetching recommended product data:', error);
        } finally {
            setLoadingRecommendedProducts(false);
        }
    };

    useEffect(() => {
        if (store?._id) {
            getRecommendedProducts()
        }
    }, [store])

    useEffect(() => {
        getThemeColor();
    }, []);

    changeFavicon(store.favicon);

    const handleSearch = () => {
        setOpenSearch(false)
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };

    if (loading || loadingRecommendedProducts) return <div className='flex min-h-dvh h-full w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>

    // if (loading) return <LazyLoadingPage />;

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Header */}
            {pathname === "/" ? <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'
                }`}>
                <div className="px-4 h-14 flex items-center justify-between">
                    {scrolled && (
                        <h1 className="text-lg font-bold" style={{ color: color1 }}>{store?.name}</h1>
                    )}
                    <div className={`${scrolled ? '' : 'ml-auto'} flex justify-center gap-2`}>
                        <button onClick={() => navigate("/account")} className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-gray-100' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40'
                            }`}>
                            <User2 className={`w-5 h-5`} style={scrolled ? { color: color1 } : { color: "#fff" }} />
                        </button>
                        <button onClick={() => navigate("/cart")} className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-gray-100' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40'
                            }`}>
                            <ShoppingBag className={`w-5 h-5`} style={scrolled ? { color: color1 } : { color: "#fff" }} />
                        </button>
                    </div>
                </div>
            </header>
                :
                <div className='h-16 lg:h-0'>
                    <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white
                        }`}>
                        <div className="px-4 h-14 flex items-center justify-between">
                            <h1 onClick={() => navigate("/")} className="text-lg font-bold" style={{ color: color1 }}>{store?.name}</h1>
                            <div className={`flex justify-center gap-2`}>
                                <button onClick={() => navigate("/account")} className={`p-2 rounded-full transition-colors hover:bg-gray-100
                                    }`}>
                                    <User2 className={`w-5 h-5`} style={{ color: color1 }} />
                                </button>
                                <button onClick={() => navigate("/cart")} className={`p-2 rounded-full transition-colors hover:bg-gray-100
                                    }`}>
                                    <ShoppingBag className={`w-5 h-5`} style={{ color: color1 }} />
                                </button>
                            </div>
                        </div>
                    </header>
                </div>
            }

            {/* Desktop Header - Hidden on mobile */}
            <div className='h-16 bg-white hidden lg:block '>
                <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white
                    }`}>
                    <div className="px-4 lg:px-24 h-16 flex items-center justify-between">
                        <h1 onClick={() => navigate("/")} className="text-lg font-bold" style={{ color: color1 }}>{store?.name}</h1>
                        <div className={`flex justify-center gap-2`}>
                            <button onClick={() => navigate("/account")} className={`p-2 rounded-full transition-colors hover:bg-gray-100
                                    }`}>
                                <User2 className={`w-6 h-6`} style={{ color: color1 }} />
                            </button>
                            <button onClick={() => navigate("/cart")} className={`p-2 rounded-full transition-colors hover:bg-gray-100
                                    }`}>
                                <ShoppingBag className={`w-6 h-6`} style={{ color: color1 }} />
                            </button>
                        </div>
                    </div>
                </header>
            </div>

            <Outlet context={{
                store,
                color1,
                color2,
                products: store.products,
                openSearch: openSearch,
                setOpenSearch: setOpenSearch,
                cartOpen: cartOpen,
                setCartOpen: setCartOpen,
                isMenuOpen: isMenuOpen,
                setIsMenuOpen: setIsMenuOpen,
                recommendedProducts: recommendedProducts
            }} />
            <ShopFooter store={store} color1={color1} color2={color2} />
        </div>
    );
}