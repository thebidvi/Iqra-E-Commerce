import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container newsletter-container">
          <div className="newsletter-text">
            <h3 className="newsletter-title text-serif">Join the Luxe Club</h3>
            <p className="newsletter-desc">Subscribe to receive early access to new collections, exclusive editorials, and private sales.</p>
          </div>
          
          <div className="newsletter-form-wrapper">
            {subscribed ? (
              <p className="subscription-success animate-fade-in">Thank you for subscribing. Welcome to LuxeLoft.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  Subscribe <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-links-section">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              LUXE<span>LOFT</span>
            </Link>
            <p className="footer-statement">
              Crafting premium wardrobe items designed for timeless durability and effortless elegance. We believe in slow fashion, structural tailoring, and high-integrity materials.
            </p>
            <div className="social-links">
              <span className="social-icon-btn" aria-label="Instagram">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </span>
              <span className="social-icon-btn" aria-label="Facebook">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </span>
              <span className="social-icon-btn" aria-label="Email"><Mail size={18} /></span>
            </div>
          </div>

          <div className="footer-link-col">
            <h4 className="footer-heading">Shop Collections</h4>
            <ul className="footer-links-list">
              <li><Link to="/shop?category=Tailoring">Tailoring & Shirts</Link></li>
              <li><Link to="/shop?category=Casual">Minimalist Casual</Link></li>
              <li><Link to="/shop?category=Accessories">Bags & Accessories</Link></li>
              <li><Link to="/shop?category=Footwear">Fine Footwear</Link></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <h4 className="footer-heading">Client Services</h4>
            <ul className="footer-links-list">
              <li><span className="mock-footer-link">Complimentary Shipping</span></li>
              <li><span className="mock-footer-link">Returns & Exchanges</span></li>
              <li><span className="mock-footer-link">Garment Care Guide</span></li>
              <li><span className="mock-footer-link">Custom Fitting</span></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <h4 className="footer-heading">The House</h4>
            <ul className="footer-links-list">
              <li><span className="mock-footer-link">Our Atelier Story</span></li>
              <li><span className="mock-footer-link">Ethical Sourcing</span></li>
              <li><span className="mock-footer-link">Sustainability Pledge</span></li>
              <li><span className="mock-footer-link">Careers</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-container">
          <p className="copyright">&copy; {new Date().getFullYear()} LuxeLoft Atelier. All rights reserved.</p>
          <div className="legal-links">
            <span className="mock-footer-link">Privacy Policy</span>
            <span className="mock-footer-link">Terms of Service</span>
            <span className="mock-footer-link">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
