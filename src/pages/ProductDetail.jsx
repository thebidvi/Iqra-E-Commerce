import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Star, Minus, Plus, ShoppingBag, Heart, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import './ProductDetail.css';

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  // If product not found
  if (!product) {
    return (
      <div className="container product-not-found section-padding text-center">
        <AlertCircle size={48} className="error-icon" />
        <h2 className="text-serif">Garment Not Found</h2>
        <p>The style you are looking for does not exist in our catalog.</p>
        <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  
  // Accordion Toggles
  const [openSection, setOpenSection] = useState('description');

  // Reset page parameters on product change
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors ? product.colors[0] : 'Default');
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product]);

  const handleQuantityChange = (type) => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    setAddingToCart(true);
    if (onAddToCart) {
      onAddToCart(product, quantity, selectedSize, selectedColor);
    }
    setTimeout(() => {
      setAddingToCart(false);
    }, 1200);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  // Find related products (same category, excluding current product, up to 3)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="product-detail-page container animate-fade-in">
      {/* Breadcrumbs */}
      <div className="breadcrumb detail-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className="active-path">{product.title}</span>
      </div>

      {/* Main product wrapper */}
      <div className="product-detail-grid">
        
        {/* Left Side: Images Viewport */}
        <div className="product-gallery">
          <div className="main-image-viewport">
            <img src={activeImage} alt={product.title} className="gallery-main-img" />
          </div>
          
          {/* Image Thumbnails */}
          {product.hoverImage && (
            <div className="gallery-thumbnails">
              <button 
                className={`thumb-btn ${activeImage === product.image ? 'active-thumb' : ''}`}
                onClick={() => setActiveImage(product.image)}
              >
                <img src={product.image} alt="Main view" />
              </button>
              <button 
                className={`thumb-btn ${activeImage === product.hoverImage ? 'active-thumb' : ''}`}
                onClick={() => setActiveImage(product.hoverImage)}
              >
                <img src={product.hoverImage} alt="Detail view" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="product-purchase-details">
          <span className="detail-brand">{product.brand}</span>
          <h1 className="detail-title text-serif">{product.title}</h1>

          {/* Rating */}
          <div className="detail-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} 
                />
              ))}
            </div>
            <span className="rating-text">{product.rating} / 5.0 ({product.reviewsCount} verified reviews)</span>
          </div>

          {/* Price */}
          <div className="detail-price-box">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="detail-original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="discount-tag">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
              </>
            )}
          </div>

          <p className="brief-description">{product.description}</p>

          <hr className="divider" />

          {/* Color Selector */}
          {product.colors && (
            <div className="selector-group">
              <span className="selector-label">Color: <strong>{selectedColor}</strong></span>
              <div className="color-swatches">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-swatch-btn ${selectedColor === color ? 'active-color' : ''}`}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      // Mock swatch color matches
                      backgroundColor: 
                        color.includes('Black') ? '#121212' : 
                        color.includes('Sand') || color.includes('Oatmeal') ? '#c8b49b' :
                        color.includes('Navy') ? '#1c2e4a' :
                        color.includes('Champagne') ? '#f3e5d8' :
                        color.includes('Emerald') ? '#0c3b2e' :
                        color.includes('Red') || color.includes('Cherry') || color.includes('Crimson') ? '#7a0010' :
                        color.includes('White') || color.includes('Cream') ? '#fcf8f2' :
                        color.includes('Grey') ? '#808080' : '#8d6e63'
                    }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="selector-group">
            <span className="selector-label">Size: <strong>{selectedSize}</strong></span>
            <div className="size-boxes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-box-btn ${selectedSize === size ? 'active-size' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {product.sizes[0] !== 'One Size' && (
              <span className="size-guide-link">Sizing & Measurement Guide</span>
            )}
          </div>

          {/* Actions & Quantity */}
          <div className="purchase-actions-grid">
            <div className="quantity-adjuster">
              <button 
                onClick={() => handleQuantityChange('dec')}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange('inc')}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <button 
              onClick={handleAddToCart} 
              disabled={addingToCart}
              className={`btn btn-primary add-to-cart-action ${addingToCart ? 'adding' : ''}`}
            >
              <ShoppingBag size={18} style={{ marginRight: '10px' }} />
              {addingToCart ? 'Adding to Bag...' : 'Add to Bag'}
            </button>

            <button className="wishlist-action-btn" aria-label="Add to Wishlist">
              <Heart size={20} />
            </button>
          </div>

          <hr className="divider" />

          {/* Product Info Accordions */}
          <div className="accordions-container">
            <div className="accordion-item">
              <button className="accordion-trigger" onClick={() => toggleSection('description')}>
                <span>Product Information</span>
                {openSection === 'description' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <div className={`accordion-panel ${openSection === 'description' ? 'panel-open' : ''}`}>
                <p>Designed with meticulous attention to tailoring. Made with ethical labor guidelines and fully structured lining for long-term shape retention.</p>
                <ul className="details-bullets">
                  <li>Premium structural composition</li>
                  <li>Hand-finished detailing details</li>
                  <li>Imported fabrics sourced sustainably</li>
                  <li>Professional dry clean only</li>
                </ul>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-trigger" onClick={() => toggleSection('shipping')}>
                <span>Complimentary Delivery & Returns</span>
                {openSection === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <div className={`accordion-panel ${openSection === 'shipping' ? 'panel-open' : ''}`}>
                <p>Enjoy free standard global delivery on orders over $150. All purchases are shipped in custom LuxeLoft garment cases for protective transit.</p>
                <p>We accept exchanges and returns on unworn items with original tags within 30 days of shipment receipt.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Items Section */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section section-padding">
          <div className="section-title">
            <p>Atelier Recommendations</p>
            <h2>Complete the Look</h2>
          </div>
          <div className="grid-cols-3 product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
