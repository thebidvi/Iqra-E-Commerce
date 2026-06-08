import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import './Shop.css';

export default function Shop({ onAddToCart, searchQuery, onClearSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [maxPrice, setMaxPrice] = useState(350);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category state with URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(350);
    setSortBy('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
    if (onClearSearch) onClearSearch();
  };

  // Filter and Sort logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category Filter
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // Price Filter
    const matchesPrice = product.price <= maxPrice;
    
    // Navbar Search Query Filter
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // 'featured' (original catalog order)
  });

  const categories = ['All', 'Tailoring', 'Casual', 'Accessories', 'Footwear'];

  return (
    <div className="shop-page container animate-fade-in">
      {/* Breadcrumb Header */}
      <div className="shop-header">
        <div className="breadcrumb">
          <span>Home</span> / <span className="active-path">Shop</span>
        </div>
        <h1 className="shop-title text-serif">Collections</h1>
      </div>

      {/* Search notification banner */}
      {searchQuery && (
        <div className="search-banner">
          <p>Showing search results for: <strong>"{searchQuery}"</strong></p>
          <button className="clear-search-btn" onClick={onClearSearch}>
            Clear Search <X size={14} style={{ marginLeft: '4px' }} />
          </button>
        </div>
      )}

      {/* Catalog controls */}
      <div className="catalog-controls">
        <button className="filter-toggle-btn" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          <SlidersHorizontal size={16} /> Filters
        </button>

        <span className="results-count">
          Showing {sortedProducts.length} of {PRODUCTS.length} styles
        </span>

        <div className="sort-wrapper">
          <ArrowUpDown size={14} className="sort-icon" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${showMobileFilters ? 'sidebar-active' : ''}`}>
          <div className="sidebar-header mobile-only">
            <h3>Filters</h3>
            <button className="sidebar-close-btn" onClick={() => setShowMobileFilters(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="filter-group">
            <h3 className="filter-heading">Garment Categories</h3>
            <ul className="category-filter-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`category-filter-btn ${selectedCategory === cat ? 'active-cat' : ''}`}
                    onClick={() => {
                      handleCategoryChange(cat);
                      setShowMobileFilters(false);
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3 className="filter-heading">Max Price</h3>
            <div className="price-slider-container">
              <input 
                type="range" 
                min="50" 
                max="350" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-slider-labels">
                <span>$50</span>
                <span className="current-max-price">${maxPrice}</span>
                <span>$350</span>
              </div>
            </div>
          </div>

          <button onClick={handleResetFilters} className="btn btn-secondary reset-filters-btn">
            Reset Filters
          </button>
        </aside>

        {/* Product Grid Area */}
        <main className="shop-main">
          {sortedProducts.length > 0 ? (
            <div className="grid-cols-3 product-grid">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3 className="text-serif">No styles match your filters</h3>
              <p>Try clearing your active filters or adjusting the price threshold.</p>
              <button onClick={handleResetFilters} className="btn btn-primary no-results-btn">
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
