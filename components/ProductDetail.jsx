import React, { useState } from 'react';
import { Heart, Minus, Plus, ShoppingCart, ArrowLeft, ChevronRight, Star } from 'lucide-react';

const ProductDetailPage = ({ product, handleBackToHome, toggleLike, addToCart, likes, getRelatedProducts }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const relatedProducts = getRelatedProducts(product);

  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={handleBackToHome}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 capitalize">{product.category}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden relative">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Like button on main image */}
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
              >
                <Heart 
                  className={`w-6 h-6 transition-all duration-200 ${
                    likes.has(product.id) 
                      ? 'fill-red-500 text-red-500 scale-110' 
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                />
              </button>
            </div>
            
            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <div className="flex flex-col">
                  <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="text-green-600 font-semibold">
                    Save ${product.originalPrice - product.price}
                  </span>
                </div>
              )}
            </div>

            {/* Features */}
            <div>
              <h3 className="font-bold text-xl mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-bold text-xl mb-4">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-full border-2 font-semibold transition-all ${
                      selectedColor === color 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    alert('Added to cart!');
                  }}
                  className="flex-1 bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">You might also like</h2>
              <p className="text-gray-600 text-lg">Discover more amazing products in the same category</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} isRelated />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
