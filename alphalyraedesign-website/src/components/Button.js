import React from 'react';

function Button({ children,config, onClick, style, className }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                color: 'white',
                backgroundColor: config.colors.secondary,
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                ...style, // Allows custom styles to be passed and applied
            }}
            className={className}
            onMouseOver={({ target }) => target.style.backgroundColor = config.colors.darkSecondary} // Darker blue on hover
            onMouseOut={({ target }) => target.style.backgroundColor = config.colors.secondary} // Original color when not hovered
            onMouseDown={({ target }) => target.style.transform = 'scale(0.95)'} // Scales down the button
            onMouseUp={({ target }) => target.style.transform = 'scale(1)'} // Scales it back to normal
        >
            {children}
        </button>
    );
}

export default Button;
