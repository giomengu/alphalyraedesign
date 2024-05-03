import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({ children, config, onClick, icon }) {
    // State to handle hover
    const [isHovered, setIsHovered] = React.useState(false);

    // Style configurations
    const defaultStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: isHovered ? config.colors.darkSecondary : config.colors.secondary,
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease'  // Smooth transition for background color
    };

    return (
        <button
            onClick={onClick}
            style={defaultStyle}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onMouseDown={({ target }) => target.style.transform = 'scale(0.95)'}
            onMouseUp={({ target }) => target.style.transform = 'scale(1)'}
        >
            {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '1px',marginLeft: '1px'}} />}
            {children}
        </button>
    );
}

export default Button;