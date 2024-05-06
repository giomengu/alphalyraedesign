import React, { useState, useEffect, useRef } from 'react';
import Button from './Button'; // Assuming Button is your custom button component
import { useNavigate } from 'react-router-dom';

function MultiSelector({ isMobile, config }) {
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState('/alphalyraedesign'); // Default to home route
    const [capsuleStyle, setCapsuleStyle] = useState({});
    const homeRef = useRef(null);
    const galleryRef = useRef(null);
    const contactRef = useRef(null);
    const projectsRef = useRef(null);

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
        color: 'white'  // And perhaps a different text color
    };

    useEffect(() => {
        updateCapsulePosition(activeRoute);
    }, [activeRoute]);

    const handleNavigation = (route) => {
        navigate(route);
        setActiveRoute(route);
    };

    const updateCapsulePosition = (route) => {
        let activeRef;
        if (route === '/alphalyraedesign') activeRef = homeRef;
        else if (route === '/alphalyraedesign/gallery') activeRef = galleryRef;
        else if (route === '/alphalyraedesign/contact') activeRef = contactRef;
        else if (route === '/alphalyraedesign/projects') activeRef = projectsRef;

        if (activeRef && activeRef.current) {
            const { offsetWidth, offsetLeft,offsetHeight,offsetTop} = activeRef.current;
            setCapsuleStyle({
                zIndex: 999,
                height: '19px',
                width: isMobile ? '100%' : `${offsetWidth + 1}px`,
                left: "0",
                top: '0',
                transform: isMobile ? `translateY(${offsetTop}px)`:`translateX(${offsetLeft}px)`,
                padding: '10px 0px',
                transition: 'transform 0.3s ease',
                
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
            padding: '0px 0px',
            boxShadow: `inset -2px -2px 5px rgba(255, 255, 255, 0.3),inset 3px 3px 5px rgba(0, 0, 0, 0.3)`
        }}>
            <div style={{ position: 'absolute', backgroundColor: config.colors.secondary, borderRadius: '30px', ...capsuleStyle }} />
            <button style={activeRoute === '/alphalyraedesign' ? activeButtonStyle : buttonStyle} ref={homeRef} onClick={() => handleNavigation('/alphalyraedesign')}>Home</button>
            <button style={activeRoute === '/alphalyraedesign/gallery' ? activeButtonStyle : buttonStyle} ref={galleryRef} onClick={() => handleNavigation('/alphalyraedesign/gallery')}>Gallery</button>
            <button style={activeRoute === '/alphalyraedesign/projects' ? activeButtonStyle : buttonStyle} ref={projectsRef} onClick={() => handleNavigation('/alphalyraedesign/projects')}>Projects</button>
            <button style={activeRoute === '/alphalyraedesign/contact' ? activeButtonStyle : buttonStyle} ref={contactRef} onClick={() => handleNavigation('/alphalyraedesign/contact')}>Contact</button>
        </div>
    );
}

export default MultiSelector;
