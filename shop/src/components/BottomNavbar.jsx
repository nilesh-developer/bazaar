import { Home, ShoppingBag, Store, UserCircle } from 'lucide-react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function BottomNavbar({ color1 }) {
    return (
        <div data-theme="light" className="btm-nav h-14 lg:hidden bottom-0">
            <NavLink to="/" className={({ isActive }) => `${isActive ? "active text-black-600 font-bold" : ""}`} style={({ isActive }) => (isActive ? { color: color1 } : {})}>
                <Home className='w-6 h-6 text-fill-current' />
                <span className="btm-nav-label text-xs lg:text-sm">Home</span>
            </NavLink>
            <NavLink to="shop" className={({ isActive }) => `${isActive ? "active text-black-600 font-bold" : ""}`} style={({ isActive }) => (isActive ? { color: color1 } : {})}>
                <Store className='w-6 h-6 text-fill-current' />
                <span className="btm-nav-label text-xs lg:text-sm">Shop</span>
            </NavLink>
            <NavLink to="cart" className={({ isActive }) => `${isActive ? "active font-bold" : ""}`} style={({ isActive }) => (isActive ? { color: color1 } : {})}>
                <ShoppingBag className='w-6 h-6 text-fill-current' />
                <span className="btm-nav-label text-xs lg:text-sm">Bag</span>
            </NavLink>
            <NavLink to="account" className={({ isActive }) => `${isActive ? `active font-bold` : ""}`} style={({ isActive }) => (isActive ? { color: color1 } : {})}>
                <UserCircle className='w-6 h-6 text-fill-current'/>
                <span className="btm-nav-label text-xs lg:text-sm">Account</span>
            </NavLink>

        </div>
    )
}

export default BottomNavbar