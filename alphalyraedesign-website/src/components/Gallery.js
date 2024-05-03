import React, { useState } from 'react';

// Define your images here, or you could pass them as props
const images = [
    "https://lh5.googleusercontent.com/tYyhKKLp971_H_JkA9F51Y6LYFuwa02SlAcws6ZjVdTX9pgEsb2oYmCgIqUkRnjaSrQorHw0s0HqXzMyh_b7Clc=w16383",
    "https://lh4.googleusercontent.com/7gtmX0oK7CZNEXdWZ_RXRQfgymjcu7UbD3vwlGbkXsV2NWa-XWSBpuWgvccE-C8YWi8Fm0oYz_QaPLjyGbT9gBg=w16383",
    "https://lh6.googleusercontent.com/Kl5Mve2C7RifQP699CWYc82XRuHhfWCDbx5OO1sZhbrowPRdr0nUz1nLVXxIvpbU5p2Cp8diMiKMjxwiqsiMlDo=w16383",
    "https://lh5.googleusercontent.com/KuoRxdC2it2CpbLPq-8xwRLtCSujWdJJBJ3huyQtZvPh1leEq83p3n2sV1DBGbjAnA45DDeFvLbzVFbBYQJOUlU=w16383"

    // Add as many images as you want
];

function Gallery(modal=false) {
    const [selectedImg, setSelectedImg] = useState(null);
    return (
        <div style={galleryStyle}>
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Gallery item ${index + 1}`} style={imageStyle} onClick={() => setSelectedImg(image)}/>
            ))}
            {modal && selectedImg && (
                <div style={modalStyle} onClick={() => setSelectedImg(null)}>
                    <img src={selectedImg} alt="Selected" style={modalImageStyle} />
                </div>
            )}
        </div>
    );
}

// Gallery container style
const galleryStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '8px'
    
};

// Individual image style
const imageStyle = {
    width: '30%', // Adjust based on your preference
    boxSizing: 'border-box',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    borderRadius: '30px',
    margin: "10px"
};

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalImageStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
};
export default Gallery;
