import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({ children, config, onClick, icon ,style,disabled,inset=true,...props}) {
    // State to handle hover
    const [isHovered, setIsHovered] = React.useState(false);
    const defaultColors = {
        secondary: "gray", // default background color
        darkSecondary: "black" // default hover background color
    };
    const colors = config.colors || defaultColors;
    
    // Style configurations
    const defaultStyle = {
        padding: '10px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: isHovered ? colors.darkSecondary : colors.secondary,
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',  // Smooth transition for background color
        boxShadow: inset ? `inset -2px -2px 5px rgba(214, 255, 111,0.3), inset 3px 3px 5px rgba(79, 94, 41, 0.6)`: ` -2px -2px 5px rgba(214, 255, 111,0.3), 3px 3px 5px rgba(79, 94, 41, 0.6)`,
        ...style
    };
    const disabledStyle = {
        color: '#aaa', // Text color when disabled
        backgroundColor: '#ccc', // Background color when disabled
        cursor: 'not-allowed', // Cursor style when disabled
        opacity: 0.65 // Opacity when disabled
    };
    const combinedStyle = disabled ? 
        { ...defaultStyle, ...disabledStyle } : 
        defaultStyle;
    return (
        <button
            onClick={onClick}
            style={combinedStyle}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onMouseDown={({ target }) => target.style.transform = 'scale(0.95)'}
            onMouseUp={({ target }) => target.style.transform = 'scale(1)'}
            disabled={disabled}
            {...props}
        >
            {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '0px',marginLeft: '0px',width:'20px'}} />}
            {children}
        </button>
    );
}

export default Button;