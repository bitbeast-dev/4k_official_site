import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, Trash2, Heart } from 'lucide-react';

// Main Cart Hook - use this in your main app
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    showCart,
    setShowCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
};

// Cart Icon Component - use this in your header
export const CartIcon = ({ cart, getTotalItems, setShowCart }) => (
  <button 
    onClick={() => setShowCart(true)}
    className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
  >
    <ShoppingCart className="w-6 h-6" />
    {cart.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
        {getTotalItems()}
      </span>
    )}
  </button>
);

// Cart Item Component
const CartItem = ({ item, updateQuantity, removeFromCart }) => (
  <div className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h4>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1 hover:bg-red-100 rounded-full text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        
        <div className="text-right">
          <div className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
          <div className="text-sm text-gray-500">${item.price} each</div>
        </div>
      </div>
    </div>
  </div>
);

// Main Cart Sidebar Component
export const CartSidebar = ({ 
  cart, 
  showCart, 
  setShowCart, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  getTotalPrice,
  getTotalItems 
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully! 🎉');
      clearCart();
      setShowCart(false);
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <>
      {/* Overlay */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setShowCart(false)}
        />
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 z-50 ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <p className="text-sm text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started!</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
                
                {/* Clear Cart Button */}
                {cart.length > 0 && (
                  <div className="pt-4 border-t">
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                    >
                      Clear All Items
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* Order Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-200 ${
                  isCheckingOut
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800 active:scale-95'
                }`}
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Checkout • $${(getTotalPrice() * 1.08).toFixed(2)}`
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Secure checkout powered by Stripe
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Complete Cart System - Main Component (Example usage)
const CartSystem = () => {
  const {
    cart,
    showCart,
    setShowCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  // Sample products for demo
  const sampleProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'MacBook Pro 16"',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'AirPods Pro 2',
      price: 249,
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cart Demo Store</h1>
            <CartIcon 
              cart={cart} 
              getTotalItems={getTotalItems} 
              setShowCart={setShowCart} 
            />
          </div>
        </div>
      </header>

      {/* Demo Products */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">Sample Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-2xl font-bold mb-4">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
      />
    </div>
  );
};

export default CartSystem;