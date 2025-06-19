import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";

// --- CART SIDEBAR ---
const CartSidebar = ({ open, onClose, store, color1, color2}) => {
    const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();
    const navigate = useNavigate()
    return (
        <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
            <div className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-lg font-bold">Your Cart</span>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition"><X className="h-6 w-6" /></button>
                </div>
                <div className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-8">
                            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((product, index) => (
                                <div className="flex gap-3 items-center border-b pb-4">
                                    <img src={product.images.featuredImage} alt="cart" className="w-16 h-16 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900">{product.name}</div>
                                        <div className="text-xs text-gray-500">Qty: {product.quantity}</div>
                                        <div className="text-sm font-bold text-gray-900">&#8377;{product.salePrice.toFixed(2)}</div>
                                    </div>
                                    <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
                                </div>
                            ))}
                            <div className="border-t px-2 py-4 bottom-0">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold">Total: &#8377;{(calculateTotal() + 0.00).toFixed(2)}</span>
                                </div>
                                <button onClick={() => navigate("/checkout")} style={{ backgroundColor: color1, color: color2 }} className="w-full py-3 rounded-full font-semibold hover:opacity-75 transition">Checkout</button>
                                <button onClick={() => navigate("/cart")} style={{ color: color1, backgroundColor: color2 }} className="w-full py-3 mt-3 rounded-full font-semibold hover:opacity-75 transition">View Cart</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default CartSidebar