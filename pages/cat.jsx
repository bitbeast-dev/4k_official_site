import { useState, useEffect } from "react";
import Home from "./Home";
import {
  SaveAll,
  CctvIcon,
  FingerprintIcon,
  ScanFace,
  ScanEye,
  ComputerIcon,
  PrinterIcon,
  ServerIcon,
  NetworkIcon,
  NotebookIcon,
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
  Strikethrough,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Zap,
  Sparkles,
  Flame,
} from "lucide-react";
import React from "react";
import Services from "./Services";
import Footer from "./Footer";
import Contact from "./Contact";
import Partners from "./Partners";
import Mission from "./Mission";
import CoreValues from "./CoreValues";
import ServicesPro from "./ServicesPro";
import Internship from "./Internship";

const Amazing = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [doubleTapHearts, setDoubleTapHearts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);

  const ServicesModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('development');

    const services = {
      development: [
        {
          title: "Web Development",
          description: "Custom websites and web applications built with modern frameworks like React, Next.js, and Vue.",
          icon: "💻"
        },
        {
          title: "Mobile App Development",
          description: "iOS and Android apps developed with React Native or Flutter for cross-platform efficiency.",
          icon: "📱"
        },
        {
          title: "Cloud Solutions",
          description: "AWS, Azure, and Google Cloud implementations for scalable infrastructure.",
          icon: "☁️"
        },
        {
          title: "API Development",
          description: "RESTful and GraphQL APIs designed for seamless integration.",
          icon: "🔌"
        }
      ],
      design: [
        {
          title: "UI/UX Design",
          description: "User-centered interfaces with intuitive workflows and beautiful aesthetics.",
          icon: "🎨"
        },
        {
          title: "Product Design",
          description: "End-to-end product design from concept to high-fidelity prototypes.",
          icon: "✏️"
        },
        {
          title: "Design Systems",
          description: "Consistent, scalable design systems for your entire product suite.",
          icon: "🖌️"
        }
      ],
      consulting: [
        {
          title: "Tech Strategy",
          description: "Roadmaps and architecture planning aligned with business goals.",
          icon: "🧭"
        },
        {
          title: "Digital Transformation",
          description: "Modernizing legacy systems and workflows for the digital age.",
          icon: "🔄"
        },
        {
          title: "Security Audit",
          description: "Comprehensive security assessments and hardening recommendations.",
          icon: "🔒"
        }
      ]
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl max-w-4xl w-full mx-auto overflow-hidden border border-white/10 shadow-2xl">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="px-8 pt-8 pb-6 border-b border-white/10">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Our Tech Services
              </h2>
              <p className="mt-2 text-white/80 max-w-lg">
                Comprehensive technology solutions tailored to your business needs
              </p>
            </div>
            
            <div className="flex border-b border-white/10">
              {Object.keys(services).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
              {services[activeTab].map((service, index) => (
                <div 
                  key={index}
                  className="group relative bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <span className="text-7xl">{service.icon}</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
                    <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center group-hover:underline">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-8 py-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-t border-white/5">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Need a custom solution?</h3>
                  <p className="text-white/70 text-sm mt-1">We can build exactly what you need</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200">
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ... rest of your existing component code (categories, products, etc.)

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

            {/* Search */}
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

            {/* Mobile Search */}
            <div className="md:hidden flex-1 max-w-xs mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.value)}
                  className="w-full pl-8 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent placeholder-gray-300 text-white text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors duration-300">
                <User className="w-5 sm:w-6 h-5 sm:h-6" />
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

          {/* Desktop Menu */}
          <div className="ml-80 hidden md:flex space-x-3 text-white py-4">
            {[
              "All Products",
              "Internship",
              "Mission",
              "Partners",
              "Values",
              "Contact",
              "Our Services"
            ].map((item) => (
              item === "Our Services" ? (
                <a
                  key={item}
                  onClick={() => setShowServicesModal(true)}
                  className="relative group px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-offset-2 focus:ring-sky-400 cursor-pointer"
                >
                  <span className="transition-colors duration-200 text-white">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
              ) : (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-offset-2 focus:ring-sky-400"
                >
                  <span className="transition-colors duration-200 text-white">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
              )
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
                "Contact",
              ].map((item) => (
                item === "Our Services" ? (
                  <a
                    key={item}
                    onClick={() => {
                      setShowServicesModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="relative group px-3 py-2 rounded-md text-sm font-light transition-colors focus:outline-none focus:ring-offset-2 focus:ring-sky-400 cursor-pointer"
                  >
                    <span className="transition-colors duration-200 text-white">
                      {item}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </a>
                ) : (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative group px-3 py-2 rounded-md text-sm font-light transition-colors focus:outline-none focus:ring-offset-2 focus:ring-sky-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="transition-colors duration-200 text-white">
                      {item}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </a>
                )
              ))}
            </div>
          )}
        </div>
      </header>

      <Home />

      {/* Main Content */}
      {currentView === "home" ? (
        <HomePage />
      ) : (
        <ProductDetailPage product={selectedProduct} />
      )}

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Services Modal */}
      <ServicesModal isOpen={showServicesModal} onClose={() => setShowServicesModal(false)} />

      {/* Overlays */}
      {(showCart || showServicesModal) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            if (showCart) setShowCart(false);
            if (showServicesModal) setShowServicesModal(false);
          }}
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

      <Partners/>
      <Mission/>
      <CoreValues/>
      <ServicesPro/>
      <Internship/>
      <div className="mt-10">
        <Footer/>
      </div>
    </div>
  );

  // ... rest of your component methods (ProductCard, UserCase, TrendsComponent, etc.)
  // Make sure to include all your existing methods here
};

export default Amazing;