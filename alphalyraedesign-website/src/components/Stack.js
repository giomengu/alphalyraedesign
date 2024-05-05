import React, { useState, useRef, useEffect } from 'react';
import useResponsive from './useResponsive';
import Button from './Button';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need
function Stack({ children, direction = 'h', style, title, titleLevel = 'h2', titleStyle, enableScrollButtons = false, config,AlignItems,columnsJustification='center'}) {
    const isMobile = useResponsive();
    const scrollContainerRef = useRef(null);
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    let direct = "h";

    useEffect(() => {
        const element = scrollContainerRef.current;
        if (!enableScrollButtons) {
            setShowScrollButtons(false);
            return;
        }

        const checkOverflow = () => {
            const element = scrollContainerRef.current;
            if (!element) return;
            const isOverflowing = element.scrollWidth > element.clientWidth;
            setShowScrollButtons(isOverflowing);
        };

        const updateButtonStates = () => {
            setIsAtStart(element.scrollLeft <= 0);
            setIsAtEnd(element.scrollLeft + element.clientWidth >= element.scrollWidth);
        };

        element.addEventListener('scroll', updateButtonStates);
        window.addEventListener('resize', checkOverflow);

        checkOverflow();

        return () => {
            window.removeEventListener('resize', checkOverflow);
            element.removeEventListener('scroll', updateButtonStates);
        };
    }, [children, enableScrollButtons]);

    const scroll = (direction) => {
        const element = scrollContainerRef.current;
        if (element) {
            const scrollAmount = direction === 'left' ? -element.clientWidth/3 : element.clientWidth/3;
            element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const containerStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
    };

    const baseStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: columnsJustification,
        flexDirection: direct === 'v' ? 'column' : 'row',
        overflowX: direct === 'h' ? 'auto' : 'hidden',
        overflowY: direct === 'v' ? 'auto' : 'hidden',
        scrollSnapType: direct === 'h' ? 'x mandatory' : 'none',
        alignItems: AlignItems
    };

    const buttonStyle = {
        position: 'relative',
        border: 'none',
        padding: '10px 20px',
        zIndex: 10
    };

    const TitleTag = `${titleLevel}`;
    const titleStyles = {
        width: '100%',
        textAlign: 'center',
        fontSize: '40px',
        color: "black",
        fontWeight: 700,
        ...titleStyle
    };
    if(direction === "auto"){
        if(isMobile){
            direct = "v";
        }else{
            direct = 'h';
        }
    }
    if(direction === "auto-inv"){
        if(isMobile){
            direct = "h";
        }else{
            direct = 'v';
        }
    }
    if(direction === 'h') direct='h';
    if(direction === 'v') direct='v';
    if (direct === 'v'){
        baseStyle.flexDirection = 'column';
        baseStyle.overflowX = 'auto'; // Enable horizontal scroll on desktop
    }
    if (direct === 'h'){
        baseStyle.flexDirection = 'row';
        baseStyle.overflowY = 'auto'; // Enable vertical scroll on mobile
    }
    return (
        <div style={containerStyle}>
            {title && <TitleTag style={titleStyles}>{title}</TitleTag>}
            <div ref={scrollContainerRef} style={baseStyle}>
                {React.Children.map(children, child => (
                    <div style={{ scrollSnapAlign: 'center',width:'unset'}}>{child}</div>
                ))}
            </div>
            { enableScrollButtons &&
                <div style={{display:'flex',padding:'10px'}}>
                {config && enableScrollButtons && showScrollButtons && direct === 'h' && 
                <Button icon={faChevronLeft} config={config} style={{...buttonStyle,borderRadius:'20px 0px 0px 20px'}} onClick={() => scroll('left')} disabled={isAtStart}></Button>
                }
                {config && enableScrollButtons && showScrollButtons && direct === 'h' && 
                <Button icon={faChevronRight} config={config} style={{...buttonStyle,borderRadius:'0px 20px 20px 0px'}} onClick={() => scroll('right')} disabled={isAtEnd}></Button>
                }
                </div>
            }   
        </div>
    );
}

export default Stack;
