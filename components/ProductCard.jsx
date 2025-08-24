import React from 'react';
import { Heart, Star, Plus } from 'lucide-react';

const ProductCard = ({ product, isRelated, handleDoubleClick, toggleLike, addToCart, likes }) => (
  <div 
    className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${isRelated ? 'w-full' : ''}`}
    onDoubleClick={(e) => handleDoubleClick(e, product.id)}
  >
    <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square mb-4">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      
      {/* Like button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(product.id);
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 z-10"
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-200 ${
            likes.has(product.id) 
              ? 'fill-red-500 text-red-500 scale-110' 
              : 'text-gray-600 hover:text-red-500'
          }`}
        />
      </button>

      {/* Sale badge */}
      {product.originalPrice > product.price && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </div>
      )}

      {/* Quick actions */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Quick Add
        </button>
      </div>
    </div>

    <div 
      onClick={() => handleProductClick(product)}
      className="space-y-2"
    >
      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
        </div>
        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        {product.originalPrice > product.price && (
          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
        )}
      </div>
    </div>
  </div>
);

export default ProductCard;

