import React, { useState, useRef, useEffect } from 'react';
import useResponsive from './useResponsive';
import Button from './Button';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need
function Stack({ children, direction = 'h', style, title, titleLevel = 'h2', titleStyle, enableScrollButtons = false, config,AlignItems,columnsJustification='center',parentStyle}) {
    const isMobile = useResponsive();
    const scrollContainerRef = useRef(null);
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const [isAtStart, setIsAtStart] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    let direct = "h";

    useEffect(() => {
        const element = scrollContainerRef.current;
        const items = Array.from(element.children);
        setItemCount(items.length)
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
            const element = scrollContainerRef.current;
            if (!element) return;

            const children = Array.from(element.children);
            let targetIndex = children.findIndex(child => {
                const childRect = child.getBoundingClientRect();
                const parentRect = element.getBoundingClientRect();
                const tolerance = 5;
                return (childRect.left + tolerance) >= parentRect.left && (childRect.right - tolerance) <= parentRect.right;
                
            });
            if(targetIndex != -1){
                setCurrentItemIndex(targetIndex);
                if(targetIndex === 0){
                    setIsAtEnd(false);
                    setIsAtStart(true);
                }else if(targetIndex === children.length-1){
                    setIsAtEnd(true);
                    setIsAtStart(false);
                }else{
                    setIsAtEnd(false);
                    setIsAtStart(false);
                }
            }
        };

        element.addEventListener('scroll', updateButtonStates);
        window.addEventListener('resize', checkOverflow);

        checkOverflow();

        return () => {
            window.removeEventListener('resize', checkOverflow);
            element.removeEventListener('scroll', updateButtonStates);
        };
    }, [children, enableScrollButtons]);

    const scroll1 = (direction) => {
        const element = scrollContainerRef.current;
        if (element) {
            // Get all children that can be snapped
            const items = Array.from(element.children);
            setItemCount(items.length)
            // Find the currently visible item's index
            if (direction === 'left') {
                // Move to the previous item
                if(items[currentItemIndex - 1]){
                    items[currentItemIndex - 1].scrollIntoView({ behavior: 'smooth', block:'nearest', inline: 'start' });
                    setCurrentItemIndex(currentItemIndex - 1);
                }
                
            } else if (direction === 'right') {
                // Move to the next item
                if(items[currentItemIndex + 1]){
                    items[currentItemIndex + 1].scrollIntoView({ behavior: 'smooth',  block:'nearest', inline: 'start' });
                    setCurrentItemIndex(currentItemIndex + 1);
                }
            }
        }
        
    };
    const scroll = (direction) => {
        const element = scrollContainerRef.current;
        if (!element) return;
        const children = Array.from(element.children);
        let targetIndex = currentItemIndex;

        if (direction === 'left') {
            targetIndex = Math.max(targetIndex - 1, 0);
        } else if (direction === 'right') {
            targetIndex = Math.min(targetIndex + 1, children.length - 1);
        }

        if (children[targetIndex]) {
            setCurrentItemIndex(targetIndex);
            children[targetIndex].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
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
    if(!enableScrollButtons){
        baseStyle.overflow = 'hidden';
    }else{
        baseStyle.overflow = 'scroll';
        baseStyle.justifyContent = 'flex-start';
    }
    return (
        <div style={containerStyle}>
            {title && <TitleTag style={titleStyles}>{title}</TitleTag>}
            <div ref={scrollContainerRef} style={baseStyle}>
                {React.Children.map(children, child => (
                    <div className="scrollItem" style={{ scrollSnapAlign: 'center',width:'unset',...parentStyle}}>{child}</div>
                ))}
            </div>
            { enableScrollButtons &&
                <div style={{display:'flex',padding:'10px'}}>
                {config && enableScrollButtons && showScrollButtons && direct === 'h' && 
                <Button icon={faChevronLeft} config={config} style={{...buttonStyle,borderRadius:'20px 0px 0px 20px'}} onClick={() => scroll('left')} disabled={isAtStart}></Button>
                }
                {!isMobile && config && enableScrollButtons && showScrollButtons && direct === 'h' && 
                <Button config={config} style={{...buttonStyle,borderRadius:'0px 0px 0px 0px'}}>{currentItemIndex+1} of {itemCount}</Button>
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
