import React from 'react'
import { Link, NavLink } from "react-router-dom"

export default function Footer() {
    return (


        <footer className="bg-zinc-950 text-gray-300 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Eazzy</h3>
              <ul className="space-y-2">
                <li><a href="about-us" className="hover:text-white transition-colors duration-200">About Us</a></li>
                {/* <li><a href="pricing" className="hover:text-white transition-colors duration-200">Pricing</a></li> */}
                <li><a href="contact-us" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="terms-and-conditions" className="hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="shipping-policy" className="hover:text-white transition-colors duration-200">Shipping Policy</a></li>
                <li><a href="cookie-policy" className="hover:text-white transition-colors duration-200">Cookie Policy</a></li>
                <li><a href="refund-policy" className="hover:text-white transition-colors duration-200">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <p>© 2025 Eazzy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}
