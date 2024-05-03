import React from 'react';
import Button from './Button';
function Card({ image, title, description, buttonText, config,onButtonClick }) {
  return (
    <div style={{ 
        width: '300px', 
        margin: '10px', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        borderRadius: '30px',
        padding: '10px',
        background: config.colors.background
        }}>
      <img src={image} alt={title} style={{ width: '50%', height: "auto", objectFit: 'cover',borderRadius: '20px',}} />
      <div style={{ padding: '0px' }}>
        <h3 style={{ color: config.colors.accent }}>{title}</h3>
        <p style={{ color: config.colors.accent }}>{description}</p>
        <Button config={config} onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </div>
  );
}

export default Card;
