import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HoverButton({ className, children, config, onClick, icon ,style,disabled,inset=true,...props}) {
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
    
    const standardTail = `
    px-4 py-2 rounded-full
    flex items-center gap-2 
    text-slate-500
    shadow-[-2px_-2px_10px_rgba(214,_255,_111,_0.3),_2px_5px_10px_rgba(79,_94,_41,_0.4)]
    transition-all
    bg-secondary
    enabled:hover:shadow-[-1px_-1px_5px_rgba(214,_255,_111,_0.6),_1px_1px_5px_rgba(79,_94,_41,_0.4),inset_-2px_-2px_5px_rgba(214,_255,_111,_1),inset_2px_2px_4px_rgba(79,_94,_41,_0.3)]
    enabled:hover:text-white
    disabled:bg-slate-400
    disabled:cursor-not-allowed
`;
    return (
        <button
        disabled={disabled}
        className={standardTail+className}
        
        onClick={onClick}
        >
        {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '0px',marginLeft: '0px',width:'20px'}} />}
        {children}
        </button>
    );
}


export default HoverButton;