// src/components/Menubar/Menubar.jsx

import React, { useEffect, useState, useContext } from 'react';
import './Menubar.css';
import Logo from './../../assets/logo.png';
import CartIcon from './../../assets/cartUser.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../components/context/StoreContext';
import UserLogo from '../../assets/userLogo.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const Menubar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems, token, setToken, setQuantities } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.custom-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  const getActiveClass = (path) => location.pathname === path ? 'active-link' : '';

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common["Authorization"];
    setToken("");
    setQuantities({});
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <nav className={`glass-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" height={65} width={65} />
        </Link>

        <ul className="nav-links">
          <li><Link to="/" className={getActiveClass('/')}>Home</Link></li>
          <li><Link to="/explore" className={getActiveClass('/explore')}>Explore</Link></li>
          <li><Link to="/contact" className={getActiveClass('/contact')}>Contact Us</Link></li>
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-wrapper">
            <div className="cart-icon glass-hover">
              <img src={CartIcon} alt="Cart" height={32} width={32} />
              <span className="badge">{getTotalItems()}</span>
            </div>
          </Link>

          {!token ? (
            <>
              <button className="glass-btn" onClick={() => navigate('/login')}>Login</button>
              <button className="glass-btn" onClick={() => navigate('/register')}>Register</button>
            </>
          ) : (
            <div className="custom-dropdown">
              <div className="avatar-wrapper" onClick={() => setShowDropdown(prev => !prev)}>
                <img
                  src={UserLogo}
                  alt="User"
                  width={32}
                  height={32}
                  className="avatar-image"
                />
              </div>
              {showDropdown && (
                <div className="dropdown-menu-custom">
                  <div className="dropdown-item-custom" onClick={() => navigate('/myorders')}>My Orders</div>
                  <div className="dropdown-item-custom" onClick={logout}>Logout</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
