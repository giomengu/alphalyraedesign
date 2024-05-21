import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Button from './Button';
function MultiSelector({ isMobile, config, routes,style, CapsuleStyle,onSelect,ActiveButtonStyle,depth}) {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location object   routes.findIndex(r => r.path === route.path);
    const [activeRoute, setActiveRoute] = useState(
        routes[routes.findIndex(r => r.path.split('/')[depth] === location.pathname.split('/')[depth])] || location.pathname); // Set initial active route based on current path
    const [activeRouteName, setActiveRouteName] = useState(
        depth > 1 ? null :  routes[routes.findIndex(r => r.path.split('/')[depth] === location.pathname.split('/')[depth])].label || null); // Set initial active route based on current path
    
    const refs = useRef(routes.map(() => React.createRef()));
    const [capsuleStyle, setCapsuleStyle] = useState();

    const buttonStyle = {
        padding:'10px',
        width:'100%',
        fontSize: '16px',
        color: 'rgb(29, 59, 82)',
        backgroundColor: 'rgba(0,0,0,0)',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.3s ease',  // Smooth transition for background color
    };
    const baseCapsuleStyle = {
        opacity: activeRouteName? 1:0,
        padding:'10px',
        color: 'white',
        position: 'absolute',
        backgroundColor: config.colors.secondary,
        fontSize: '16px',
        border: 'none',
        transition: 'transform 0.3s ease,height 0.3s ease',
        borderRadius:'20px',
        boxShadow: `-2px -2px 5px rgba(214, 255, 111,0.3), 3px 3px 5px rgba(79, 94, 41, 0.6)`
    };
    const activeButtonStyle = {
        ...buttonStyle,
        color: 'white' ,
        ...ActiveButtonStyle // And perhaps a different text color
    };
    
    useEffect(() => {
        updateCapsulePosition(activeRoute);
    }, [activeRoute, isMobile,activeRouteName]);

    const handleNavigation = (route) => {
        setActiveRouteName(route.label);
        onSelect(route.path);
        navigate(route.path);
        setActiveRoute(route);
    };
    
    const updateCapsulePosition1 = (route) => {
        const index = routes.findIndex(r => r.path === route.path);
        const ref = refs.current[index];
        
        if (ref && ref.current) {
            const { offsetWidth, offsetLeft, offsetTop } = ref.current;
            setCapsuleStyle({
                width: `${offsetWidth}px`,
                left:isMobile ? "5px" : '0px',
                top: isMobile ? '0px' : '5px',
                transform: isMobile ? `translateY(${offsetTop}px)` : `translateX(${offsetLeft}px)`,
            });
        }
    };
    const updateCapsulePosition = (route) => {
        const index = routes.findIndex(r => r.path === route.path);
        const ref = refs.current[index];

        if (ref && ref.current) {
            const { offsetWidth, offsetLeft, offsetTop } = ref.current;
            setCapsuleStyle({
                width: `${offsetWidth}px`,
                left: isMobile ? '' : `${offsetLeft}px`,
                top: isMobile ? `${offsetTop}px` : '',
            });
        }
    };
    const standardTail = `
    absolute
    p-[10px] rounded-full
    items-center
    text-white
    shadow-[-2px_-2px_5px_rgba(214,_255,_111,_0.2),_2px_5px_5px_rgba(79,_94,_41,_0.4)]
    transition-all
    bg-secondary
    enabled:hover:shadow-[inset_-2px_-2px_5px_rgba(214,_255,_111,_1),inset_2px_2px_5px_rgba(79,_94,_41,_0.4)]
    enabled:hover:text-white
    disabled:bg-slate-400
    disabled:cursor-not-allowed
    transition 
    duration-700 
    ease-in-out 
    active:translate-y-1
    motion-reduce:transition-none 
`;
    return (
        <div className={`flex 
        ${isMobile ? 'flex-col' : 'flex-row'} min-w-[200px] 
        justify-center items-center transition-all duration-300 rounded-[25px] relative
        shadow-[inset_-2px_-2px_5px_rgba(149,_208,_255,0.3),inset_2px_2px_5px_rgba(0,_0,_0,_0.4)]`} >
            {activeRouteName && (
                <motion.button
                    className={standardTail}
                    style={{ ...capsuleStyle, ...CapsuleStyle }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => handleNavigation(activeRoute)}
                    >
                    {activeRouteName}
                </motion.button>
            )}
            {routes.map((route, index) => (
                <button
                    key={route.path}
                    ref={refs.current[index]}
                    className='text-[16px]  min-h-[44px]'
                    style={activeRoute === route.path ? activeButtonStyle : buttonStyle}
                    onClick={() => handleNavigation(route)}
                >
                    {(route.icon && <FontAwesomeIcon className="px-5" icon={route.icon} /> || route.label)}

                </button>
            ))}
        </div>
    );
}

export default MultiSelector;
