import React from "react";

import { useState } from "react";

import {
  Heart,
  ShoppingCart,
  Star,
  Filter,
  Search,
  Menu,
  User,
  ArrowRight,
  Plus,
  Minus,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 bg-[#202b44] border-b border-none text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="./logo.png" alt="" className="h-12" />
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="w-6 h-6 text-white " />
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
       
      </header>
      
    </>
  );
};

export default Navbar;
