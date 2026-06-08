import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-background-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <span className="hero-subtitle">Summer Collection 2026</span>
          <h1 className="hero-title">
            Redefining <br />
            Modern Minimalism
          </h1>
          <p className="hero-description">
            Discover a curated collection of refined essentials, tailored silhouettes, and premium fabrics designed to elevate your everyday style.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-gold hero-btn">
              Shop Collection <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </Link>
            <span className="btn btn-outline-gold hero-btn-secondary">
              View Editorial
            </span>
          </div>
        </div>
      </div>
      
      {/* Floating features footer */}
      <div className="hero-features-bar">
        <div className="container features-container">
          <div className="feature-item">
            <span className="feature-number">01</span>
            <div className="feature-text">
              <h4>Premium Fabrics</h4>
              <p>100% cashmere, silk & linen</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-number">02</span>
            <div className="feature-text">
              <h4>Tailored Fit</h4>
              <p>Crafted to perfection</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-number">03</span>
            <div className="feature-text">
              <h4>Global Shipping</h4>
              <p>Free delivery on orders over $150</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
