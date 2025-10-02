import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return (
    <div className="header-overlay-wrapper">
      <div className="glass-content-card">
        <h1 className="glass-title">Order Your Food</h1>
        <p className="glass-subtitle">Fast delivery | Fresh ingredients | 24/7 Support</p>
        <Link to="/explore" className="glass-button">Explore Now</Link>
      </div>
    </div>
  )
}

export default Header
