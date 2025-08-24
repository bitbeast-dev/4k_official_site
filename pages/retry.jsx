import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid3X3,
  Camera,
  Fingerprint,
  Shield,
  Eye,
  Laptop,
  Printer,
  Server,
  Wifi,
  BookOpen,
  Plus,
  ArrowLeft,
  Star,
} from "lucide-react";

const AmazingData = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [newHomePage, setNewHomePage] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: "all", name: "All Products", icon: <Grid3X3 /> },
    { id: "cctv", name: "CCTV", icon: <Camera /> },
    { id: "fingerprint", name: "Fingerprint", icon: <Fingerprint /> },
    { id: "laptops", name: "Laptops", icon: <Laptop /> },
    { id: "office", name: "Office Suppliers", icon: <BookOpen /> },
    { id: "facial", name: "Facial recognition", icon: <Eye /> },
    { id: "printers", name: "Printers", icon: <Printer /> },
    { id: "servers", name: "Servers", icon: <Server /> },
    { id: "ups", name: "UPS Units", icon: <Shield /> },
    { id: "lan", name: "LAN & WLAN", icon: <Wifi /> },
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
      
        const res=await axios.get("http://localhost:5000/product/read")

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAllProducts(res.data);
        
        // Select random 8 products for homepage
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8);
        setNewHomePage(selected);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get filtered products based on selected category
  const getDisplayProducts = () => {
    if (currentView === "home") {
      return newHomePage;
    }
    
    if (selectedCategory === "all") {
      return allProducts;
    }
    
    return allProducts.filter(product => product.category === selectedCategory);
  };

  // Get related products for product detail view
  const getRelatedProducts = (currentProduct) => {
    if (!currentProduct) return [];
    
    const relatedProducts = allProducts.filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category === currentProduct.category
    );

    return relatedProducts.slice(0, 6);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView("product");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedProduct(null);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView("products");
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    
    // Show success feedback
    alert(`${product.title} added to cart!`);
  };

  const ProductCard = ({ product, isRelated = false }) => (
    <div
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
        isRelated ? "w-full" : ""
      }`}
    >
      <div className="relative overflow-hidden bg-gray-100 w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-74 mb-4 rounded-2xl">
        {/* Mock image placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">
                <img  src={`http://localhost:5000/uploads/${product.image}`}  alt="" />
            </div>
            <div className="text-sm text-gray-600">{product.category}</div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-black text-white py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
          >
            <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
            Quick Add
          </button>
        </div>
      </div>

      <div
        onClick={() => handleProductClick(product)}
        className="space-y-1 sm:space-y-2"
      >
        <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 group-hover:text-[#202b44] transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.5)</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-gray-900 font-bold text-sm sm:text-base md:text-lg">
            Rwf {product.price?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );

  const CategoryGrid = () => (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              selectedCategory === category.id
                ? "border-[#202b44] bg-[#202b44] text-white"
                : "border-gray-200 hover:border-[#202b44] hover:bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="text-2xl">{category.icon}</div>
              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const ProductGrid = ({ products, title }) => (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {currentView === "products" && (
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">No products found in this category.</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );

  const ProductDetail = ({ product }) => (
    <div className="max-w-7xl mx-auto p-4">
      <button
        onClick={handleBackToHome}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-lg text-gray-600">{product.category}</div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-gray-600">(4.5 stars)</span>
            </div>
            <div className="text-3xl font-bold text-[#202b44] mb-4">
              Rwf {product.price?.toLocaleString()}
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
          
          {product.features && (
            <div>
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-[#202b44] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 border-2 border-[#202b44] text-[#202b44] rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {getRelatedProducts(product).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getRelatedProducts(product).map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                isRelated={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render different views
  if (currentView === "product" && selectedProduct) {
    return <ProductDetail product={selectedProduct} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <CategoryGrid />
      
      {currentView === "home" ? (
        <ProductGrid 
          products={getDisplayProducts()} 
          title="Featured Products" 
        />
      ) : (
        <ProductGrid 
          products={getDisplayProducts()} 
          title={`${categories.find(c => c.id === selectedCategory)?.name || 'All Products'}`}
        />
      )}
      
      {/* Cart indicator */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-[#202b44] text-white px-4 py-2 rounded-full shadow-lg">
          Cart ({cart.length})
        </div>
      )}
    </div>
  );
};

export default AmazingData;