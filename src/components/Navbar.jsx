import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ cartCount, onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
      navigate('/shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Mobile menu toggle */}
        <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          LUXE<span>LOFT</span>
        </Link>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${isMenuOpen ? 'nav-active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link mock-link">Collections</span>
            </li>
            <li className="nav-item">
              <span className="nav-link mock-link">Editorial</span>
            </li>
          </ul>
        </nav>

        {/* Icon Utilities */}
        <div className="navbar-utilities">
          <button 
            className="utility-btn search-toggle" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle Search"
          >
            <Search size={20} />
          </button>

          <span className="utility-btn mock-btn desktop-only">
            <Heart size={20} />
          </span>

          <Link to="/cart" className="utility-btn cart-btn" aria-label="View Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Floating search drawer */}
      <div className={`search-drawer ${isSearchOpen ? 'search-drawer-active' : ''}`}>
        <div className="container search-drawer-content">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
              type="text" 
              placeholder="Search style, garment, collection..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
              autoFocus={isSearchOpen}
            />
            <button type="submit" className="search-submit-btn">
              <Search size={20} />
            </button>
          </form>
          <button className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
            <X size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
