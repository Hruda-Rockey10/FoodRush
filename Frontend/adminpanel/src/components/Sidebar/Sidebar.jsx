import React from 'react';
import { Link } from 'react-router-dom';
import Add from '../../assets/add.png';
import Order from '../../assets/cart.png';
import List from '../../assets/list.png';
import Logo from '../../assets/logo.png';

const Sidebar = ({ sidebarVisible }) => {
  return (
    <div
      className={`shadow-sm ${sidebarVisible ? '' : 'd-none'}`}
      id="sidebar-wrapper"
      style={{
        backgroundColor: '#fcfbf9ff',
        minHeight: '100vh',
        padding: '1rem',
        borderRight: '2px solid #fcfbf9ff',
      }}
    >
      {/* Logo Section */}
      <div className="text-center mb-4">
        <img src={Logo} height={40} width={40} alt="Logo" />
      </div>

      {/* Navigation Links */}
      <div className="list-group list-group-flush">
        {[['/add', Add, 'Add Food'], ['/list', List, 'List Food'], ['/orders', Order, 'Orders']].map(
          ([path, icon, label]) => (
           <Link
  key={path}
  className="list-group-item list-group-item-action d-flex align-items-center gap-3 rounded-3 mb-3"
  to={path}
  style={{
    backgroundColor: '#FFF',
    color: '#0F2347',
    fontWeight: '600',
    padding: '1.2rem 1.5rem',
    fontSize: '1.15rem',
    letterSpacing: '0.3px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  }}
>
              <img src={icon} alt={label} style={{ width: '40px', height: '40px', flexShrink: 0 }} />
  {label}
</Link>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
