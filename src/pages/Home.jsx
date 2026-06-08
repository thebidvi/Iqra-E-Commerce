import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import { PRODUCTS } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ onAddToCart }) {
  // Select top 4 products for showcase
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Spotlight */}
      <Hero />

      {/* Collections Grid */}
      <Categories />

      {/* Featured Products Section */}
      <section className="featured-products section-padding">
        <div className="container">
          <div className="section-title">
            <p>Atelier Spotlight</p>
            <h2>Seasonal Highlights</h2>
          </div>

          <div className="grid-cols-4 product-grid">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/shop" className="btn btn-secondary view-all-btn">
              Explore All Garments <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Editorial Showcase */}
      <section className="brand-story-section">
        <div className="container story-container">
          <div className="story-image-col">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800" 
              alt="Tailoring design detail" 
              className="story-image"
              loading="lazy"
            />
          </div>
          <div className="story-content-col">
            <span className="story-tag">Atelier Philosophy</span>
            <h2 className="story-title text-serif">Designed for Longevity</h2>
            <p className="story-text">
              We reject transient trend cycles. Every garment we construct is a study in precision tailoring, premium materials, and subtle architectural lines.
            </p>
            <p className="story-text">
              By working exclusively with family-owned mills in Europe and South Asia, we ensure our wool, silk, and cotton meet the highest ecological and structural standards. Made to be worn, loved, and passed down.
            </p>
            <div className="story-action">
              <span className="btn btn-outline-gold story-btn">Our Sustainability Journey</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
