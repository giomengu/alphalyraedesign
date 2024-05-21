import React, { useState, useRef, useEffect } from 'react';
import { Link} from 'react-router-dom';
import config from '../assets/config'; // Import the config file
import HoverButton from './HoverButton';
import Selector from './Selector';
import useResponsive from './useResponsive'; // Assume useResponsive is in a separate file
import useWrapping from './useWrapping';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { motion,AnimatePresence } from 'framer-motion';

const sroutes = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
];

function Navigation({routes=sroutes}) {
    const isMobile = useResponsive();
    const isWrap = useWrapping(document.querySelector('.navBar'));
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const navBarRef = useRef(null);
    const [navBarHeight, setNavBarHeight] = useState(0);
    const [subMenuHeight, setSubMenuHeight] = useState(0);
    const subMenuRef = useRef(null);

// Usage:
useEffect(() => {
    if (navBarRef.current) {
        setNavBarHeight(navBarRef.current.clientHeight);
    }
    if (subMenuRef.current) {
        setSubMenuHeight(subMenuRef.current.scrollHeight);
    }
}, [showSubMenu]);

  const navStyle = {
    position: 'fixed', 
    top: 0,  // Aligns the navigation bar to the top of the viewport
    left: 0,  // Aligns the navigation bar to the left of the viewport
    right: 0,  // Ensures the navigation bar extends full width
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '10px 15px' : '10px 20px',
    backgroundColor: config.colors.accent,
    zIndex: 2,  // Ensures the navigation bar stays on top of other content
    boxShadow:'0 2px 4px rgba(0,0,0,0.25)',
    transition: 'border-radius 0.5s ease, margin 0.5s ease', // Ensures smooth transitions
    borderRadius: isMobile ? selectedRoute && showSubMenu ?'40px 40px 0px 0px' : '40px' : '0px',
    margin: isMobile ? '5px' : '0px'
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
    if (Rroute.subPaths) {
        setSelectedRoute(Rroute.subPaths);
        setShowSubMenu(true);
    } else {
        setSelectedRoute(null);
        setShowSubMenu(false);
    }
};

const handleMouseEnter = () => {
    setShowSubMenu(true);
};

const handleMouseLeave = () => {
    setShowSubMenu(false);
};


return (
    <
        div 
        style={navStyle1}
    >

        <div className="navBar" ref={navBarRef} style={{...navStyle, justifyContent: isWrap ? 'center' :  'space-between'}}>
            {!isWrap &&
            <div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={config.logo} alt="Logo" style={{ transition: 'height 0.5s ease',height: isMobile ? isWrap ? '30px' :  '45px' : '80px' }} />
                </Link>
            </div>
            }
            {!isMobile && <h1 className="text-white">Alpha Lyrae Design</h1>}
            {isWrap && <h3 className="text-white">Alpha Lyrae Design</h3>}
            <div>
                <Selector isMobile={false} config={config} routes={routes} onSelect={handleSelect} depth={1}/>
            </div>
            
        </div>
        
        <div className="relative" style={{ top: `${navBarHeight}px` }}>
            <AnimatePresence>
                    {showSubMenu && (
            <motion.div
                className={`${isMobile ? 'flex-col' : 'flex-row'} ${isMobile ? 'left-0' : 'left-auto'} ${isMobile ? 'm-[5px]' : 'm-0'} absolute left-0 right-0 bg-accent shadow-lg rounded-b-[40px] p-4 overflow-hidden`}
                style={{ top: `0px`, height: showSubMenu ? subMenuHeight : 0 }}
                initial={{ opacity: 0, y: -subMenuHeight }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -subMenuHeight }}
                transition={{ duration: 0.5 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={subMenuRef}
            >
                <div className="p-4">
                    <HoverButton icon={faChevronUp} onClick={() => setShowSubMenu(false)} config={config} className="rounded-full h-full w-full justify-center" />
                </div>
                {selectedRoute && (
                    <Selector
                        isMobile={true}
                        config={config}
                        routes={selectedRoute}
                        depth={3}
                        CapsuleStyle={{ backgroundColor: 'white', color: config.colors.secondary }}
                        ActiveButtonStyle={{ color: 'black' }}
                        className="relative bg-darkAccent w-full"
                        onSelect={handleMouseLeave}
                    />
                )}
            </motion.div>
                    )}
            </AnimatePresence>
        </div>
    </div>
);
}
export default Navigation;