import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Categories.css';

export default function Categories() {
  const categoriesList = [
    {
      id: 'tailoring',
      name: 'Tailoring & Shirts',
      tag: 'Sharp Silhouettes',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600',
      gridClass: 'category-item-large',
      categoryQuery: 'Tailoring'
    },
    {
      id: 'casual',
      name: 'Minimalist Casual',
      tag: 'Relaxed Elegance',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600',
      gridClass: 'category-item-medium-1',
      categoryQuery: 'Casual'
    },
    {
      id: 'accessories',
      name: 'Essential Accents',
      tag: 'Bags & Accessories',
      image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=600',
      gridClass: 'category-item-medium-2',
      categoryQuery: 'Accessories'
    }
  ];

  return (
    <section className="categories-section section-padding">
      <div className="container">
        <div className="section-title">
          <p>Curated Selections</p>
          <h2>Shop By Collection</h2>
        </div>

        <div className="categories-grid">
          {categoriesList.map((category) => (
            <Link 
              key={category.id}
              to={`/shop?category=${category.categoryQuery}`}
              className={`category-card ${category.gridClass}`}
            >
              <div className="category-img-wrapper">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-img" 
                  loading="lazy"
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-details">
                <span className="category-tag">{category.tag}</span>
                <h3 className="category-name">{category.name}</h3>
                <span className="category-link">
                  Explore <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
