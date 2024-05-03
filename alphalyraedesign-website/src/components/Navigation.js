import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../assets/config'; // Import the config file
import Button from './Button';
function Navigation() {
  const navigate = useNavigate(); // Correctly initialized navigate function from useNavigate hook
  const navStyle = {
    position: 'fixed',  // This will fix the navigation bar at the top of the viewport
    top: 0,  // Aligns the navigation bar to the top of the viewport
    left: 0,  // Aligns the navigation bar to the left of the viewport
    right: 0,  // Ensures the navigation bar extends full width
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: config.colors.accent,
    zIndex: 1000,  // Ensures the navigation bar stays on top of other content
    boxShadow: '0 2px 4px rgba(0,0,0,0.25)'  // Optional, adds shadow for depth
};
return (
  <div style={navStyle}>
      <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={config.logo} alt="Logo" style={{ height: '80px' }} />
          </Link>
      </div>
      <nav>
          <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '300px', margin: 0, padding: 0 }}>
              <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link></li>
              <li><Link to="/gallery" style={{ textDecoration: 'none', color: 'black' }}>Gallery</Link></li>
              <li><Button config={config} onClick={() => navigate('/contact')}>Contact</Button></li>
          </ul>
      </nav>
  </div>
);
}
export default Navigation;
