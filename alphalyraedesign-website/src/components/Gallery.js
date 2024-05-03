import React, { useState } from 'react';
import Button from './Button';
import config from '../assets/config'; // Import the config file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need

// Define your images here, or you could pass them as props
const images = [
    "https://lh5.googleusercontent.com/tYyhKKLp971_H_JkA9F51Y6LYFuwa02SlAcws6ZjVdTX9pgEsb2oYmCgIqUkRnjaSrQorHw0s0HqXzMyh_b7Clc=w16383",
    "https://lh4.googleusercontent.com/7gtmX0oK7CZNEXdWZ_RXRQfgymjcu7UbD3vwlGbkXsV2NWa-XWSBpuWgvccE-C8YWi8Fm0oYz_QaPLjyGbT9gBg=w16383",
    "https://lh6.googleusercontent.com/Kl5Mve2C7RifQP699CWYc82XRuHhfWCDbx5OO1sZhbrowPRdr0nUz1nLVXxIvpbU5p2Cp8diMiKMjxwiqsiMlDo=w16383",
    "https://lh5.googleusercontent.com/KuoRxdC2it2CpbLPq-8xwRLtCSujWdJJBJ3huyQtZvPh1leEq83p3n2sV1DBGbjAnA45DDeFvLbzVFbBYQJOUlU=w16383"

    // Add as many images as you want
];

function Gallery({modalEnabled=false}) {
    const [currentIndex, setCurrentIndex] = useState(null);
    const openModal = (index) => {
        if (modalEnabled) {
            setCurrentIndex(index);
        }
    };

    const closeModal = () => {
        setCurrentIndex(null);
    };

    const showPrev = (event) => {
        event.stopPropagation();
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const showNext = (event) => {
        event.stopPropagation();
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div>
            <div style={galleryStyle}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Gallery item ${index + 1}`}
                    style={imageStyle} onClick={() => openModal(index)} />
                ))}
                {modalEnabled && currentIndex !== null && (
                    <div style={modalStyle} onClick={closeModal}>
                        <span style={closeBtnStyle} onClick={closeModal}>&times;</span>
                        <Button icon={faChevronLeft} config={config} style={buttonStyle} onClick={showPrev} disabled={currentIndex === 0}>
                        </Button>
                        <img src={images[currentIndex]} alt="Selected" style={modalImageStyle} onClick={e => e.stopPropagation()} />
                        <Button icon={faChevronRight} config={config} style={buttonStyle} onClick={showNext} disabled={currentIndex === images.length - 1}></Button>
                    </div>
                )}
            </div>
        </div>
    );
}

const galleryStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '8px'
};

const imageStyle = {
    width: '30%',
    boxSizing: 'border-box',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    margin: '10px',
    borderRadius: '30px',
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
    padding: '5px'

};

const closeBtnStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: '#fff',
    fontSize: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
};

const buttonStyle = {
    fontSize: '16px',
    padding: '10px',
    margin: '0 10px',
    cursor: 'pointer',
};

export default Gallery;