import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../assets/config'; // Import the config file
import Button from './Button';
import Selector from './Selector';
import useResponsive from './useResponsive'; // Assume useResponsive is in a separate file
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const sroutes = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
];
function Navigation({routes=sroutes}) {
  const isMobile = useResponsive();
  const navigate = useNavigate(); // Correctly initialized navigate function from useNavigate hook
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const navStyle = {
    position: 'fixed', 
    top: 0,  // Aligns the navigation bar to the top of the viewport
    left: 0,  // Aligns the navigation bar to the left of the viewport
    right: 0,  // Ensures the navigation bar extends full width
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: config.colors.accent,
    zIndex: 2,  // Ensures the navigation bar stays on top of other content
    boxShadow:'0 2px 4px rgba(0,0,0,0.25)',
    transition: 'border-radius 0.5s ease, margin 0.5s ease', // Ensures smooth transitions
    borderRadius: isMobile ? selectedRoute && showSubMenu ?'40px 40px 0px 0px' : '40px' : '0px',
    margin: isMobile ? '10px' : '0px'
};
const navStyle1 = {
    position: 'fixed',  // This will fix the navigation bar at the top of the viewport
    top: 0,  // Aligns the navigation bar to the top of the viewport
    left: 0,  // Aligns the navigation bar to the left of the viewport
    right: 0,  // Ensures the navigation bar extends full width
    background:"linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))", // Ensures the navigation bar stays on top of other content
    zIndex: 1, 
};
const handleSelect = (route) => {
    const index = routes.findIndex(r => r.path === route);
    const Rroute = routes[index];
    console.log(Rroute);
    if(Rroute.subPaths){
        setSelectedRoute(Rroute.subPaths);
        setShowSubMenu(true);
        setTimeout(function() {
            setSelectedRoute();
            setShowSubMenu(false);
        }, 3000);
    }else{
        setSelectedRoute();
        setShowSubMenu(false);
    } 
    
    console.log(selectedRoute);
    console.log(routes);
};
return (
    <div style={navStyle1}>

        <div style={navStyle}>
            <div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={config.logo} alt="Logo" style={{ transition: 'height 0.5s ease',height: isMobile ? '50px' : '80px' }} />
                </Link>
            </div>
            {!isMobile && <h1 style={{color:'white'}}>Alpha Lyrae Design</h1>}
            <div>
                <Selector isMobile={false} config={config} routes={routes} onSelect={handleSelect}/>
            </div>
            
        </div>
        <div style={{...navStyle,top: isMobile ? '100px' : '100px',transition: 'transform 0.5s ease, opacity 0.5s ease',borderRadius:'0px 0px 40px 40px',marginTop:'-20px',paddingBottom: '20px',
        transform: showSubMenu ? `translateY(0px)` : `translateY(-100px)`,zIndex: 1,
        opacity: showSubMenu ? 1 : 0,
        left: isMobile ? '0px' : 'auto',
        right:'0px',
        overflow:'hidden'}}>
        <Button icon={faChevronUp} onClick={() => setShowSubMenu(false)} config={config}  style={{borderRadius:'30px',width:'100px',marginRight:'10px',height: '100%',bottom:'0px'}}/>
        {selectedRoute &&  <Selector 
        isMobile={true} config={config} 
        routes={selectedRoute}
        CapsuleStyle={{backgroundColor:'white'}} ActiveButtonStyle={{color:'black'}}
        style={{position:'relative', background:config.colors.secondary,width:'100%',left:'0px'}} 
        onSelect={() => setTimeout(function() {
            setShowSubMenu(false);
        }, 1000)}
        />
}
        </div>
  </div>
);
}
export default Navigation;
