import React from 'react';
import ProductCard from './ProductCard';
import { ArrowRight, Filter } from 'lucide-react';

const HomePage = ({ displayProducts, selectedCategory, categories, setSelectedCategory }) => (
  <>
    {/* Hero Section */}
    <section className="relative bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Next Level Tech
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the latest in cutting-edge electronics. Premium quality, unbeatable prices.
          </p>
          <button 
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-10"></div>
    </section>

    {/* Categories */}
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Products Grid */}
    <section id="products" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            {selectedCategory === 'all' ? 'Featured Products' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{displayProducts.length} products</span>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </section>
  </>
);

export default HomePage;
