import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ListFood from './pages/ListFood/ListFood';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import AddFood from './pages/AddFood/AddFood';
import Orders from './pages/Orders/Orders';
import './App.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar sidebarVisible={sidebarVisible} />

      <div id="page-content-wrapper">
        <Menubar toggleSidebar={toggleSidebar} />
        <ToastContainer />

        {/* Main admin panel content with Japanese bg */}
        <div className="container-fluid admin-page-bg">
          <Routes>
            <Route path="/add" element={<AddFood />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/list" element={<ListFood />} />
            <Route path="/" element={<ListFood />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
