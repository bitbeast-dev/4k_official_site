import { useState } from 'react';

const useProductLogic = (homepageProducts, allProducts) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'product'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [doubleTapHearts, setDoubleTapHearts] = useState([]);

  const getDisplayProducts = () => {
    if (currentView === 'home') {
      return homepageProducts.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const getRelatedProducts = (currentProduct) => {
    const relatedProducts = allProducts.filter(p => 
      p.id !== currentProduct.id && 
      p.category === currentProduct.category &&
      !homepageProducts.some(hp => hp.id === p.id)
    );

    if (relatedProducts.length < 4) {
      const additionalProducts = homepageProducts.filter(p => 
        p.id !== currentProduct.id && 
        p.category === currentProduct.category
      );
      relatedProducts.push(...additionalProducts);
    }

    return relatedProducts.slice(0, 6);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const toggleLike = (productId) => {
    const newLikes = new Set(likes);
    if (newLikes.has(productId)) {
      newLikes.delete(productId);
    } else {
      newLikes.add(productId);
    }
    setLikes(newLikes);
  };

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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    selectedCategory,
    setSelectedCategory,
    currentView,
    setCurrentView,
    selectedProduct,
    setSelectedProduct,
    cart,
    setCart,
    likes,
    setLikes,
    searchTerm,
    setSearchTerm,
    showCart,
    setShowCart,
    doubleTapHearts,
    setDoubleTapHearts,
    getDisplayProducts,
    getRelatedProducts,
    handleProductClick,
    handleBackToHome,
    toggleLike,
    addToCart,
    updateQuantity,
    getTotalPrice,
  };
};

export default useProductLogic;
       