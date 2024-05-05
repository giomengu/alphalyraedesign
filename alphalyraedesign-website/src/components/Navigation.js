import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../assets/config'; // Import the config file
import Button from './Button';
import Selector from './Selector';
import useResponsive from './useResponsive'; // Assume useResponsive is in a separate file
function Navigation() {
  const isMobile = useResponsive();
  const navigate = useNavigate(); // Correctly initialized navigate function from useNavigate hook
  const navStyle = {
    top: 0,  // Aligns the navigation bar to the top of the viewport
    left: 0,  // Aligns the navigation bar to the left of the viewport
    right: 0,  // Ensures the navigation bar extends full width
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: config.colors.accent,
    zIndex: 1000,  // Ensures the navigation bar stays on top of other content
    boxShadow:'0 2px 4px rgba(0,0,0,0.25)',
    transition: 'border-radius 0.5s ease, margin 0.5s ease', // Ensures smooth transitions
    borderRadius: isMobile ? '40px' : '0px',
    margin: isMobile ? '10px' : '0px'
};
const navStyle1 = {
    position: 'fixed',  // This will fix the navigation bar at the top of the viewport
    top: 0,  // Aligns the navigation bar to the top of the viewport
    left: 0,  // Aligns the navigation bar to the left of the viewport
    right: 0,  // Ensures the navigation bar extends full width
    background:"linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))",
    zIndex: 1000,  // Ensures the navigation bar stays on top of other content
    
};

return (
    <div style={navStyle1}>

        <div style={navStyle}>
            <div>
                <Link to="/alphalyraedesign" style={{ textDecoration: 'none' }}>
                    <img src={config.logo} alt="Logo" style={{ transition: 'height 0.5s ease',height: isMobile ? '50px' : '80px' }} />
                </Link>
            </div>
            {!isMobile && <h1 style={{color:'white'}}>Alpha Lyrae Design</h1>}
            
            <Selector isMobile={false} config={config} />
        </div>
  </div>
);
}
export default Navigation;
