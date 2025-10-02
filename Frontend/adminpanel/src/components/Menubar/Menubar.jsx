import React from 'react';

const Menubar = ({ toggleSidebar }) => {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        backgroundColor: '#fff', // light background
        padding: '0.8rem 1.5rem',
        borderBottom: '1px solid #eee',
      }}
    >
      <div className="container-fluid">
        {/* Sidebar Toggle Button */}
        <button
          className="btn"
          id="sidebarToggle"
          onClick={toggleSidebar}
          style={{
            backgroundColor: '#FFD700', // Warm Gold
            color: '#0F2347',
            border: 'none',
            borderRadius: '10px',
            padding: '0.5rem 0.75rem',
          }}
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        {/* Navbar Links - shifted slightly to left using marginRight */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav mt-2 mt-lg-0"
            style={{ marginLeft: 'auto', marginRight: '2rem' }}
          >
            <li className="nav-item active">
              <a className="nav-link fw-semibold" href="#!" style={{ color: '#0F2347' }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#!" style={{ color: '#0F2347' }}>
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fw-semibold"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ color: '#0F2347' }}
              >
                Dropdown
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
                style={{
                  minWidth: '180px',
                  border: '1px solid #eee',
                  boxShadow: '0 0 12px rgba(0,0,0,0.1)',
                }}
              >
                <a className="dropdown-item" href="#!" style={{ color: '#0F2347' }}>
                  Action
                </a>
                <a className="dropdown-item" href="#!" style={{ color: '#0F2347' }}>
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#!" style={{ color: '#0F2347' }}>
                  Something else
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
