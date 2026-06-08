import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import './Cart.css';

export default function Cart({ cart, onUpdateCartQty, onRemoveFromCart, onClearCart }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Subtotal Calculation
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Shipping calculation (free over $150)
  const shippingFee = subtotal >= 150 ? 0 : (subtotal > 0 ? 15 : 0);
  
  // Discount calculation
  const discountAmount = subtotal * discount;
  
  // Grand Total
  const total = subtotal + shippingFee - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscount(0.10); // 10% off
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "WELCOME10"');
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  if (checkoutSuccess) {
    return (
      <div className="container cart-success-view section-padding text-center animate-fade-in">
        <div className="success-icon-wrapper">
          <ShieldCheck size={64} className="success-check-icon" />
        </div>
        <h2 className="text-serif">Order Confirmed</h2>
        <p className="order-number">Order #LL-2026-{Math.floor(100000 + Math.random() * 900000)}</p>
        <p className="success-msg">
          Thank you for choosing LuxeLoft. A receipt and shipping schedule will be dispatched to your email address shortly.
        </p>
        <div className="success-actions">
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container animate-fade-in">
      <div className="cart-header">
        <h1 className="cart-title text-serif">Your Bag</h1>
        <span className="cart-summary-qty">({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-view text-center">
          <ShoppingBag size={48} className="empty-cart-icon" />
          <h2 className="text-serif">Your Bag is Empty</h2>
          <p>You haven't added any styles to your wardrobe collection yet.</p>
          <Link to="/shop" className="btn btn-primary empty-cart-btn">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-column">
            <div className="cart-items-header desktop-only">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <div className="cart-items-list">
              {cart.map((item, index) => {
                const { product, quantity, size, color } = item;
                return (
                  <div key={`${product.id}-${size}-${color}`} className="cart-item-card">
                    {/* Image */}
                    <div className="cart-item-img-box">
                      <img src={product.image} alt={product.title} />
                    </div>

                    {/* Meta info */}
                    <div className="cart-item-info">
                      <span className="cart-item-brand">{product.brand}</span>
                      <h3 className="cart-item-title">
                        <Link to={`/product/${product.id}`}>{product.title}</Link>
                      </h3>
                      <div className="cart-item-specs">
                        <span>Size: <strong>{size}</strong></span>
                        <span>Color: <strong>{color}</strong></span>
                      </div>
                      
                      {/* Mobile controls inside info column */}
                      <div className="cart-item-mobile-actions mobile-only">
                        <div className="cart-qty-adjuster">
                          <button onClick={() => onUpdateCartQty(index, quantity - 1)}>-</button>
                          <span>{quantity}</span>
                          <button onClick={() => onUpdateCartQty(index, quantity + 1)}>+</button>
                        </div>
                        <button 
                          className="mobile-delete-btn"
                          onClick={() => onRemoveFromCart(index)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price - Desktop */}
                    <div className="cart-item-price-desktop desktop-only">
                      ${product.price.toFixed(2)}
                    </div>

                    {/* Qty - Desktop */}
                    <div className="cart-item-qty-desktop desktop-only">
                      <div className="cart-qty-adjuster">
                        <button onClick={() => onUpdateCartQty(index, quantity - 1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => onUpdateCartQty(index, quantity + 1)}>+</button>
                      </div>
                    </div>

                    {/* Total - Desktop */}
                    <div className="cart-item-total-desktop desktop-only">
                      ${(product.price * quantity).toFixed(2)}
                    </div>

                    {/* Delete action - Desktop */}
                    <button 
                      className="cart-item-delete-btn desktop-only"
                      onClick={() => onRemoveFromCart(index)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="cart-extra-note">
              <span className="info-icon"><HelpCircle size={16} /></span>
              <p>Standard delivery is complimentary on purchases exceeding $150. Returns are accepted on tag-intact garments within 30 days.</p>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="cart-summary-column">
            <div className="summary-card">
              <h2 className="summary-card-title">Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Estimated Delivery</span>
                <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              {promoApplied && (
                <div className="summary-row promo-discount-row">
                  <span>Promo (WELCOME10 -10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <hr className="summary-divider" />

              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="promo-form">
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                  disabled={promoApplied}
                />
                <button 
                  type="submit" 
                  className="btn btn-secondary promo-btn"
                  disabled={promoApplied}
                >
                  Apply
                </button>
              </form>
              
              {promoApplied && <p className="promo-msg success">10% discount applied successfully.</p>}
              {promoError && <p className="promo-msg error">{promoError}</p>}
              
              <p className="promo-tip">Tip: Use code <strong>WELCOME10</strong> for 10% off</p>

              <button onClick={handleCheckout} className="btn btn-primary checkout-action-btn">
                Proceed to Checkout <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>

              <div className="security-badge">
                <ShieldCheck size={16} className="shield-icon" />
                <span>SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
