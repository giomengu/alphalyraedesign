import React, { useState, useEffect, useRef } from 'react';
import Button from './Button'; // Assuming Button is your custom button component
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function MultiSelector({ isMobile, config, routes,style, CapsuleStyle,onSelect,ActiveButtonStyle,depth}) {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location object   routes.findIndex(r => r.path === route.path);
    const [activeRoute, setActiveRoute] = useState(routes[routes.findIndex(r => r.path.split('/')[depth] === location.pathname.split('/')[depth])] || location.pathname); // Set initial active route based on current path
    const [activeRouteName, setActiveRouteName] = useState(depth > 1 ? null :  routes[routes.findIndex(r => r.path.split('/')[depth] === location.pathname.split('/')[depth])].label || null); // Set initial active route based on current path

    
    const refs = useRef(routes.map(() => React.createRef()));
    const backgroundStyle = {display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    minWidth:'200px',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out',
    borderRadius: '25px',
    position: 'relative',
    padding: '5px',
    boxShadow: `inset -2px -2px 5px rgba(149, 208, 255,0.3), inset 3px 3px 5px rgba(0, 0, 0, 0.3)`,
    ...style};
    const buttonStyle = {
        padding:'10px 5px',
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
        padding:'10px 0px',
        marginTop: '-1px',
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
    const [capsuleStyle, setCapsuleStyle] = useState({...baseCapsuleStyle,...CapsuleStyle});
    useEffect(() => {
        updateCapsulePosition(activeRoute);
    }, [activeRoute, isMobile,activeRouteName]);

    const handleNavigation = (route) => {
        setActiveRouteName(route.label);
        onSelect(route.path);
        navigate(route.path);
        setActiveRoute(route);
    };
    
    const updateCapsulePosition = (route) => {
        const index = routes.findIndex(r => r.path === route.path);
        const ref = refs.current[index];
        
        if (ref && ref.current) {
            const { offsetWidth, offsetLeft, offsetTop } = ref.current;
            console.log(activeRouteName);
            setCapsuleStyle({
                ...baseCapsuleStyle,
                width: `${offsetWidth}px`,
                left:isMobile ? "5px" : '0px',
                top: isMobile ? '0px' : '5px',
                transform: isMobile ? `translateY(${offsetTop}px)` : `translateX(${offsetLeft}px)`,
                ...CapsuleStyle
            });
        }
    };
    return (
        <div style={backgroundStyle}>
            <button style={capsuleStyle}
             onClick={() => handleNavigation(activeRoute)}
             >{activeRouteName}</button>
            {routes.map((route, index) => (
                <button
                    key={route.path}
                    ref={refs.current[index]}
                    style={activeRoute === route.path ? activeButtonStyle : buttonStyle}
                    onClick={() => handleNavigation(route)}
                >
                    {route.icon && <FontAwesomeIcon style={{paddingInline:'20px'}} icon={route.icon} /> || route.label}

                </button>
            ))}
        </div>
    );
}

export default MultiSelector;
