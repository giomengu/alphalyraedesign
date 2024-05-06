import React, { useState, useEffect, useRef } from 'react';
import Button from './Button'; // Assuming Button is your custom button component
import { useNavigate, useLocation } from 'react-router-dom';

function MultiSelector({ isMobile, config, routes,style, CapsuleStyle,onSelect,ActiveButtonStyle}) {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location object
    const [activeRoute, setActiveRoute] = useState(location.pathname); // Set initial active route based on current path
    const [capsuleStyle, setCapsuleStyle] = useState({});
    const refs = useRef(routes.map(() => React.createRef()));
    const buttonStyle = {
        padding: '10px 5px',
        fontSize: '16px',
        color: 'black',
        backgroundColor: 'rgba(0,0,0,0)',
        border: 'none',
        borderRadius: '20px',
        zIndex: 1000,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.3s ease',  // Smooth transition for background color
    };

    const activeButtonStyle = {
        ...buttonStyle,
        color: 'white' ,
        ...ActiveButtonStyle // And perhaps a different text color
    };

    useEffect(() => {
        updateCapsulePosition(activeRoute);
    }, [activeRoute, isMobile]);

    const handleNavigation = (route) => {
        onSelect(route);
        navigate(route);
        setActiveRoute(route);
    };

    const updateCapsulePosition = (route) => {
        console.log(routes);
        console.log(route);
        const index = routes.findIndex(r => r.path === route);
        const ref = refs.current[index];
        
        if (ref && ref.current) {
            const { offsetWidth, offsetLeft, offsetTop } = ref.current;
            
            setCapsuleStyle({
                zIndex: 999,
                height: '19px',
                width: isMobile ? '100%' : `${offsetWidth}px`,
                left: "0",
                top: '0',
                transform: isMobile ? `translateY(${offsetTop}px)` : `translateX(${offsetLeft}px)`,
                padding: '10px 0px',
                transition: 'transform 0.3s ease,height 0.3s ease,border-radius 0.3s ease',
                borderRadius: route.subPaths ? '20px 20px 0px 0px' : '20px',
                ...CapsuleStyle
            });
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease-in-out',
            borderRadius: '20px',
            position: 'relative',
            padding: '0px',
            boxShadow: `inset -2px -2px 5px rgba(255, 255, 255, 0.3), inset 3px 3px 5px rgba(0, 0, 0, 0.3)`,
            ...style
        }}>
            <div style={{ position: 'absolute', backgroundColor: config.colors.secondary, ...capsuleStyle }}/>
            {routes.map((route, index) => (
                <button
                    key={route.path}
                    ref={refs.current[index]}
                    style={activeRoute === route.path ? activeButtonStyle : buttonStyle}
                    onClick={() => handleNavigation(route.path)}
                >
                    {route.label}
                </button>
            ))}
        </div>
    );
}

export default MultiSelector;
