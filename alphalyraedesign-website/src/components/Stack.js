import React from 'react';
import useResponsive from './useResponsive'; // Assume useResponsive is in a separate file
function Stack({ children, direction = 'h',style, title,titleLevel = 'h2', titlestyle}) {
    const isMobile = useResponsive();
    let direct = "h";

    const baseStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'auto', // Allow scrolling for horizontal stacks
        overflowY: 'hidden', // Prevent vertical scrolling unless it's a vertical stack
        ...style
        
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
    const titleStyle = {
        width: '100%',
        textAlign: 'center',
        fontSize: '40px',  // You can adjust the font size as needed
        color: "black",  // Adjust color to fit your design
        fontWeight: 700,
        ...titlestyle
    };
    // Dynamic Tag based on titleLevel
    const TitleTag = `${titleLevel}`;

    return (
        <div>
            {title && <TitleTag style={titleStyle}>{title}</TitleTag>}
            <div style={baseStyle}>
                {children}
            </div>
        </div>
    );
}

export default Stack;
