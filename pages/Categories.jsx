import { useState, useEffect } from "react";
import Home from "./Home"; // Assuming this is a separate component for the hero section
import {
  Filter,
  Heart,
  ShoppingCart,
  Star,
  Search,
  ArrowRight,
  Plus,
  Minus,
  ArrowLeft,
  ChevronRight,
  User,
  // Add missing icons from lucide-react
  Grid3X3,
  Camera,
  Fingerprint,
  Laptop,
  BookOpen,
  Printer,
  Server,
  Shield,
  Wifi,
  LucideLayoutDashboard,
  Dot,
  Eye, EyeOff, Mail, Lock,  Sparkles
} from "lucide-react";
import React from "react";
import Services from "./Services"; // Assuming these are separate components
import Footer from "./Footer";
import Contact from "./Contact";
import { ToastContainer,toast } from "react-toastify";
import Partners from "./Partners";
import Mission from "./Mission";
import CoreValues from "./CoreValues";
import Internship from "./Internship";
import axios from "axios";
import TeamMembers from "./Team";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Amazing = () => {
  // All state variables
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [doubleTapHearts, setDoubleTapHearts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [newHomePage, setNewHomePage] = useState([]); // Products for the initial homepage display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [userCard, setUserCard] = useState([]);
  const [currentValues, setCurrentValues] = useState([]);
  const [currentInternship, setCurrentInternship] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSevices, setShowServices] = useState(false);
  const [islogged,setIsLogged]=useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {handleSubmit,register,reset,getValues}=useForm()
  

  const [isLocked, setIsLocked] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    adminCode: ''
  });

  // Products currently being displayed in the grid

  // Data arrays (moved outside Amazing component to avoid re-creation on every render)

    const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const RegisterAdmin = async (data) => {
  
  try {
    setIsLoading(true);

   
    const endpoint = isLogin
      ? ""
      : "https://fourk-backend-i5ps.onrender.com/admin/signup";

    
    const response = await axios.post(endpoint, data);

    console.log("Server Response:", response.data);

    setIsLoading(false);

    if (isLogin) {
      alert(" Login successful!");
      
      localStorage.setItem("admin", JSON.stringify(response.data));
    
    } else {
      alert(" Registration successful!");
    }
  } catch (error) {
    setIsLoading(false);

    
    if (error.response && error.response.status === 401) {
      alert(" Wrong email or password!");
    } else {
      alert(error.response?.data?.message || "Something went wrong!");
    }

    console.error("Login/Register Error:", error.response?.data || error.message);
  }
};

const unlockDB = async () => {
  try {
    const email = getValues("email");
    const password = getValues("password");

    if (!email || !password) {
      toast.error("Please enter email and password to unlock!");
      return;
    }

    const res = await axios.put("https://fourk-backend-i5ps.onrender.com/admin/unlock", {
      email,
      password,
    });

    // Toast success
    toast.success(res.data.message || "Account unlocked successfully!");

    // Optionally, re-enable your inputs
    setIsLocked(false);
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to unlock account");
    console.error(err);
  }
};



useEffect(() => {
    axios.get("https://fourk-backend-i5ps.onrender.com/admin/check")
      .then(res => {
        if (res.data.isLocked) {
          setIsLocked(true);
        }
      })
      .catch(err => console.log(err));
  }, []);

const navigate=useNavigate()
  const LoginAdmin=async(data)=>{
   
    await axios.post("https://fourk-backend-i5ps.onrender.com/admin/login",data)

    .then(()=>{
     toast.success("Login successfully !")
      navigate("/dashboard")
    })
    .catch((err)=>{
      toast.error("Wrong Person ! Account have blocked")
      
      setIsLogged(false)
    })
  }


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      adminCode: ''
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-backend-i5ps.onrender.com/show/read");
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setUserCard(selected);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-backend-i5ps.onrender.com/product/read");
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        setTrendsData(selected);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-backend-i5ps.onrender.com/cat/read");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Helper functions
  const handleDoubleClick = (e, productId) => {
    const x = e.clientX;
    const y = e.clientY;

    const newHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setDoubleTapHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setDoubleTapHearts((prev) =>
        prev.filter((heart) => heart.id !== newHeart.id)
      );
    }, 1500);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };




  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("https://fourk-backend-i5ps.onrender.com/product/read");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        setAllProducts(res.data);
        // setProducts(res.data); // This state is not used consistently, replaced by displayProducts

        // Select random 8 products for homepage
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8);
        setNewHomePage(selected);
        setDisplayProducts(selected); // Set initial display products to homepage selection
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

    return allProducts.filter(
      (product) => product.category === selectedCategory
    );
  };

  // Get related products for product detail view
  const getRelatedProducts = (currentProduct) => {
    if (!currentProduct) return [];

    const related = allProducts.filter(
      (p) =>
        p.id !== currentProduct.id && p.category === currentProduct.category
    );

    return related.slice(0, 6);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView("product");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedProduct(null);
    setDisplayProducts(newHomePage); // Reset display products to homepage selection
    setSelectedCategory("all"); // Reset selected category
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView("products");
    if (categoryId === "all") {
      setDisplayProducts(allProducts);
    } else {
      setDisplayProducts(
        allProducts.filter((product) => product.category === categoryId)
      );
    }
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

  };

  // Components
  const ProductCard = ({ product, isRelated = false }) => (
    <div
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
        isRelated ? "w-full" : ""
      }`}
    >
      <div className="relative overflow-hidden bg-gray-100 w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-74 mb-4 rounded-2xl">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <div className="text-center">
            {/* Assuming product.image is a path relative to public or a full URL */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering handleProductClick
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

  const CategorySection = () => (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`capitalize flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold whitespace-nowrap transition-all text-xs sm:text-sm ${
                  selectedCategory === category.id
                    ? "bg-[#202b44] opacity-70 text-white"
                    : ""
                }`}
              >
                {category.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const ProductGridSection = ({ productsToDisplay, title }) => (
    <section id="all-products" className="py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-gray-600 text-sm">
              {productsToDisplay.length} products
            </span>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading products...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        ) : productsToDisplay.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 h-100 overflow-y-auto">
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const UserCaseSection = () => {
    return (
      <section id="user-showcase" className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 ">
            <h2 className="text-xl sm:text-2xl font-bold">
              Showcase From Our Users
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 h-100 overflow-y-auto">
            {userCard.map(
              (
                usecard // Map directly over userCard
              ) => (
                <div
                  key={usecard.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105"
                  onDoubleClick={(e) => handleDoubleClick(e, usecard.id)}
                >
                  <div className="relative overflow-hidden bg-gray-100 w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-74 mb-4 rounded-2xl mt-5 flex">
                    <img
                      src={usecard.image}
                      alt={usecard.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:blur-xl"
                    />
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-white">
                        <h3 className="font-bold p-2">{usecard.created_at}</h3>
                        <p className="font-light p-2">
                          "{usecard.description}"
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleProductClick(usecard)} // Use usecard for click
                    className="space-y-1 sm:space-y-2"
                  >
                    <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 group-hover:text-[#202b44] transition-colors line-clamp-2">
                      {usecard.title}
                    </h3>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    );
  };

  const TrendsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
      let interval;
      if (isAutoPlaying) {
        interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % trendsData.length);
        }, 5000);
      }
      return () => clearInterval(interval);
    }, [isAutoPlaying, trendsData.length]);

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };

    const currentProduct = trendsData[currentSlide]; // Use trendsData from parent scope

    return (
      <section id="trends" className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 ">
            <h2 className="text-xl sm:text-2xl font-bold">Trends Now</h2>
          </div>

          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {trendsData.length > 0 && (
                <div className="relative aspect-[16/9] md:aspect-auto md:h-auto">
                  {trendsData.map((trend, index) => (
                    <div
                      key={trend.id}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentSlide
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row h-full">
                        {/* Product Image */}
                        <div className="w-full md:w-1/2 h-96 md:h-auto relative">
                          <img
                            src={trend.image}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-4 left-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            {trend.title}
                          </div>
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${
                                    i < Math.floor(trend.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="ml-1 text-sm text-gray-600">
                                {trend.style}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                          <div className="mb-2 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {trend.category}
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 leading-tight">
                            {trend.name}
                          </h2>
                          <p className="text-gray-600 mb-4 text-lg">
                            {trend.description}
                          </p>

                          {/* Features List */}
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-700 mb-2">
                              Key Features:
                            </h3>
                            <ul className="space-y-2"></ul>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between mt-auto">
                            <div className="mb-4 sm:mb-0">
                              <span className="text-xs text-gray-500">
                                Starting at
                              </span>
                              <div className="text-2xl font-bold text-[#202b44]">
                                Rwf {trend.price}
                              </div>
                            </div>
                            <div className="flex space-x-3">
                              <button className="bg-[#202b44] hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                                Buy Now
                              </button>
                              <button className="border border-[#202b44] text-[#202b44] hover:bg-gray-100 px-6 py-3 rounded-lg transition duration-300">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                {trendsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-6 bg-[#202b44]"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) => (prev + trendsData.length - 1) % trendsData.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <span className="text-2xl">&#10094;</span>
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % trendsData.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <span className="text-2xl">&#10095;</span>
              </button>
            </div>

            {/* Auto-play Toggle and Featured Products */}
            <div className="flex flex-col mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Featured Products
                </h3>
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  {isAutoPlaying ? (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <rect x="6" y="4" width="3" height="12" rx="1" />
                        <rect x="13" y="4" width="3" height="12" rx="1" />
                      </svg>
                      Pause Slides
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.8L17.2 10 6.3 17.2V2.8z" />
                      </svg>
                      Play Slides
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trendsData.map((trend, index) => (
                  <div
                    key={trend.id}
                    className={`border border-gray-300 rounded-lg p-3 cursor-pointer transition-all ${
                      currentSlide === index
                        ? "ring-2 ring-gray-400 bg-gray-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="aspect-square mb-2">
                      <img
                        src={trend.image}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <h4 className="font-medium text-gray-800 truncate">
                      {trend.title}
                    </h4>
                    <div className="text-[#202b44] font-semibold">
                      Rwf {trend.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ProductDetailView = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const relatedProducts = getRelatedProducts(product);

    // Ensure product.image is the first image, then add others from newHomePage
    const productImages = [
      product.image, // Assuming product.image is a path
      ...newHomePage
        .filter((p) => p.id !== product.id) // avoid duplicate of same product
        .map((p) => product.image),
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <button
                onClick={handleBackToHome}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4" /> Back to Home
              </button>
              <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
              <span className="text-gray-600 capitalize">
                {product.category}
              </span>
              <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
              <span className="font-semibold truncate">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div
                className="aspect-square rounded-2xl sm:rounded-3xl bg-gray-100 overflow-hidden relative"
                onDoubleClick={(e) => handleDoubleClick(e, product.id)}
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail images */}
              <div className="flex w-full h-16 sm:h-20 overflow-x-auto gap-2">
                <div className="flex gap-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 aspect-square w-16 sm:w-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {product.description}
                </p>
                <p className="font-medium mt-5 flex text-xl sm:text-2xl text-gray-900">
                  Rwf {product.price?.toLocaleString()}
                </p>
              </div>

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="font-medium text-lg sm:text-xl mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.isArray(product.features) ? (
                      product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <span className="font-light text-sm sm:text-base">
                            {feature}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className="font-light text-sm sm:text-base">
                          {product.features}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Colors (Placeholder, as no color data is provided) */}
              <div>
                <h3 className="font-medium text-lg sm:text-xl mb-4">
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {/* Render color options here if available */}
                  <span className="text-gray-500 text-sm">N/A</span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg sm:text-xl mb-4">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 sm:p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 sm:w-5 h-4 sm:h-5" />
                    </button>
                    <span className="text-xl sm:text-2xl font-bold w-12 sm:w-16 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 sm:p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#202b44] p-3 sm:p-5 text-white w-full sm:w-auto rounded-xl hover:cursor-pointer text-sm sm:text-base">
                    Order
                  </button>
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                    }}
                    className="flex-1 bg-[#202b44] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-2xl font-bold text-sm sm:text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6" />
                    Add to Cart - Rwf {(product.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  You might also like
                </h2>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                  Discover more amazing products in the same category
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    isRelated
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CartSidebar = () => (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        showCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 sm:p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">
            Shopping Cart ({cart.length})
          </h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border border-gray-200 rounded-lg"
              >
                <img
                  src={`https://fourk-backend-i5ps.onrender.com/uploads/${item.image}`} // Assuming item.image is a path
                  alt={item.name}
                  className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm sm:text-base">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Rwf {item.price?.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border border-gray-300 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 sm:p-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base sm:text-lg font-semibold">Total:</span>
            <span className="text-xl sm:text-2xl font-bold">
              Rwf {getTotalPrice()}
            </span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
            Checkout
          </button>
        </div>
      )}
    </div>
  );

  // HomePage component to encapsulate the main product display
  const HomePage = () => {
    return (
      <>
        <CategorySection />
        <ProductGridSection
          productsToDisplay={getDisplayProducts()}
          title={
            currentView === "home"
              ? "Featured Products"
              : `${
                  categories.find((c) => c.id === selectedCategory)?.name ||
                  "All Products"
                }`
          }
        />
        <UserCaseSection />
        <TrendsSection />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Double-tap heart animations */}
      {doubleTapHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: heart.x - 25,
            top: heart.y - 25,
            animation: "heartFloat 1.5s ease-out forwards",
          }}
        >
          <Heart className="w-8 sm:w-12 h-8 sm:h-12 fill-red-500 text-red-500 animate-ping" />
        </div>
      ))}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#202b44] via-[#2a3654] to-[#202b44] border-b border-none text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="./logo.png" alt="Logo" className="h-8 sm:h-12" />
            </div>

            {/* Search - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent placeholder-gray-300 text-white"
                />
              </div>
            </div>

            {/* Mobile Search Toggle */}
            <div className="md:hidden flex-1 max-w-xs mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent placeholder-gray-300 text-white text-sm"
                />
              </div>
            </div>
   

   {islogged && (
     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-10">
         



  



    <div className="relative z-10 w-full max-w-md">
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
    
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#24304b] rounded-full mb-4 shadow-lg">
        <Shield
        onClick={()=>{
          unlockDB()
        }}
        className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-300">
        {isLogin ? 'Welcome back, Admin!' : 'Create your admin account'}
      </p>
    </div>

    {/* Form Toggle */}
    <div className="flex bg-white/10 rounded-lg p-1 mb-6 border border-white/10">
      <button
        onClick={() => setIsLogin(true)}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
          isLogin 
            ? 'bg-[#24304b] text-white shadow-lg' 
            : 'text-gray-300 hover:text-white'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => setIsLogin(false)}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
          !isLogin 
            ? 'bg-[#24304b] text-white shadow-lg' 
            : 'text-gray-300 hover:text-white'
        }`}
      >
        Register
      </button>
    </div>

    {/* Forms */}
    {isLogin ? (
      <form onSubmit={handleSubmit(LoginAdmin)} className="space-y-4">
        <div className="relative">
     
          <input
            type="email"
            {...register("email")}
            placeholder="Admin Email"
            className="w-full rounded-md border border-gray-400 outline-none p-3"
            required
            disabled={isLocked}
          />
        </div>
        <div className="relative">
      
          <input
            type={showPassword ? 'text' : 'password'}
            {...register("password")}
            placeholder="Password"
            className="w-full rounded-md border border-gray-400 outline-none p-3"
            required
            disabled={isLocked}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-[#24304b] text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          Sign In
        </button>
      </form>
    ) : (
      <form onSubmit={handleSubmit(RegisterAdmin)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
         className="p-3 w-full outline-none border border-gray-400 rounded-md" 
            type="text"
            {...register("firstname")}
            placeholder="First Name"
            
            required
            disabled={isLocked}
          />
          <input
            type="text"
            {...register("lastname")}
            placeholder="Last Name"
            className="w-full p-3 outline-none rounded-md border border-gray-400"
            required
            disabled={isLocked}
          />
        </div>
        <input
          type="email"
          {...register("email")}
          placeholder="Admin Email"
          className="w-full p-3 outline-none rounded-md border border-gray-400"
          required
          disabled={isLocked}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          {...register("password")}
          placeholder="Password"
          className="w-full p-3 outline-none rounded-md border border-gray-400"
          required
          disabled={isLocked}
        />
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="w-full p-3 outline-none rounded-md border border-gray-400"
          required
          disabled={isLocked}
        />
        <input
          type="text"
          {...register("accesscode")}
          placeholder="Admin Access Code"
          className="w-full p-3 outline-none rounded-md border border-gray-400"
          required
          disabled={isLocked}
        />
        <button
          type="submit"
          className="w-full bg-[#24304b] text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          Create Account
        </button>
      </form>
    )}

    {/* Footer */}
    <div className="mt-6 text-center">
      <p className="text-gray-300 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="ml-1 text-purple-400 hover:text-purple-300 font-semibold"
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>

  </div>
</div>

            </div>
   )}

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors duration-300">
                <User className="w-5 sm:w-6 h-5 sm:h-6" onClick={()=>{
                  setIsLogged(true)
                }}/>

              </button>

              <button
                onClick={() => setShowCart(true)}
                className="p-2 hover:bg-white/20 rounded-full relative transition-colors duration-300"
              >
                <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </button>
            </div>
          </div>
          {showSevices && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
                <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
                  <span className="ml-3 p-2"><LucideLayoutDashboard/></span>
                  Our Services
                </h1>
                <ul className="">
                   
                  <li className="mt-5 flex">
                  <span><Dot/></span>
                  FortiGate Firewalls & Licenses (deployment & renewal)</li>
                  <li className="mt-5 flex">
                    <span><Dot/></span>
                    Microsoft Licensing (SQL Server, Office 365, enterprise
                  productivity tools)</li>
                  
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    LAN Network Deployment (structured cabling, router/switch
                    setup){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    WLAN Network Deployment (wireless access points installation
                    & configuration){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    Video Surveillance Systems (HD IP & analog CCTV with remote
                    monitoring){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    Biometric Security Solutions (fingerprint, facial
                    recognition, door access control){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    Attendance Management Systems (digital tracking integrated
                    with HR systems){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    Web Application Development (HR, finance, inventory,
                    education systems){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    Mobile Application Development (Android & iOS apps) </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    System Integration (compatibility across new & legacy
                    systems){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    IT Equipment Supply (laptops, desktops, printers, servers,
                    UPS units, etc.){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    Office Supplies (printer paper, notebooks, pens, staplers,
                    sticky notes, office furniture){" "}
                  </li>
                  <li className="mt-5 flex">
                     <span><Dot/></span>
                    Preventive IT Equipment Maintenance (diagnostics, updates,
                    inspections, cleaning){" "}
                  </li>
                  <li className="mt-5 flex">
                    <span><Dot/></span>
                    Corrective IT Equipment Maintenance (emergency
                    troubleshooting & component replacement){" "}
                  </li>
                </ul>
                <button className="border border-gray-100 p-3 bg-[#1e2939] mt-5 w-45 rounded-md ml-5 hover:cursor-pointer"
                onClick={()=>{
                  setShowServices(false)
                }}
                >Hide</button>
                <div className="flex space-x-3 mt-6"></div>
              </div>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="ml-80 hidden md:flex space-x-3 text-white py-4">
            {[
              "All Products",
              "Internship",
              "Mission",
              "Partners",
              "Values",
              "Contact",
              "Our Services",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`} // Ensure valid href for sections
                className="relative group px-3 py-2 rounded-md text-sm  transition-colors focus:outline-none focus:ring-offset-2 focus:ring-sky-400"
                onClick={() => {
                  if (item.toLowerCase() === "our services") {
                    setShowServices(true);
                  }
                }}
              >
                <span className="transition-colors duration-200 text-white">
                  {item}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden flex flex-col space-y-2 text-white py-4">
              {[
                "All Products",
                "Our Services",
                "Internship",
                "Mission",
                "Partners",
                "Values",
                "Contact"
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="relative group px-3 py-2 rounded-md text-sm font-light transition-colors focus:outline-none focus:ring-offset-2 focus:ring-sky-400"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item === "Our Services") {
                      setShowServices(true)
                    }
                  }}
                >
                  <span className="transition-colors duration-200 text-white">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          )}
        </div>
      </header>
      <Home /> {/* Assuming Home is your hero section */}
      {/* Main Content based on currentView */}
      {currentView === "home" || currentView === "products" ? (
        <HomePage />
      ) : (
        <ProductDetailView product={selectedProduct} />
      )}
      {/* Cart Sidebar */}
      <CartSidebar />
      {/* Overlay for cart */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowCart(false)}
        ></div>
      )}
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          15% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes slideInUp {
          0% {
            transform: translateY(100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <Partners />
      <Mission />
      <CoreValues />
      <TeamMembers />
      <Internship />
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Amazing;
