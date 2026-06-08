import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const { id, title, brand, price, originalPrice, rating, badge, image, hoverImage } = product;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      // Default to first size and color for quick add
      const selectedSize = product.sizes && product.sizes[0] !== 'One Size' ? product.sizes[0] : 'One Size';
      const selectedColor = product.colors ? product.colors[0] : 'Default';
      onAddToCart(product, 1, selectedSize, selectedColor);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-image-container">
        {/* Badges */}
        {badge && <span className="product-badge">{badge}</span>}
        
        {/* Product Images */}
        <img src={image} alt={title} className="product-img main-img" loading="lazy" />
        {hoverImage && (
          <img src={hoverImage} alt={`${title} hover`} className="product-img hover-img" loading="lazy" />
        )}

        {/* Quick Add Overlay */}
        <div className="quick-add-overlay">
          <button 
            onClick={handleQuickAdd} 
            className="btn btn-primary quick-add-btn"
            aria-label={`Quick add ${title} to cart`}
          >
            <ShoppingCart size={16} style={{ marginRight: '8px' }} />
            Quick Add
          </button>
        </div>
      </Link>

      <div className="product-info">
        <span className="product-brand">{brand}</span>
        <h3 className="product-title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'} 
              />
            ))}
          </div>
          <span className="rating-val">({rating})</span>
        </div>

        <div className="product-pricing">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
