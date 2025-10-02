import React from 'react';
import './LoadingSpinner.css';

/**
 * Loading Spinner Component
 * Reusable loading indicator following Single Responsibility Principle
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...',
  fullScreen = false 
}) => {
  const sizeClass = `spinner-${size}`;
  const colorClass = `spinner-${color}`;
  const containerClass = fullScreen ? 'spinner-fullscreen' : 'spinner-container';

  return (
    <div className={containerClass}>
      <div className={`spinner ${sizeClass} ${colorClass}`}>
        <div className="spinner-inner"></div>
      </div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
