import React, { useState } from 'react';
import Button from './Button';
import config from '../assets/config'; // Import the config file
import useResponsive from './useResponsive';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need
import Stack from './Stack';

const images_standard = [
    'https://lh3.googleusercontent.com/wIw2A3n9CTd5aWtg_j93laIEvubiHPjFJQvQHLebvx26rbypkPnJXqUmh4QbR8ceuggxnZzl8jLShTWIxPpa5rdlQ0IDYr9TgceN483_bY16dDEw=w1280'
];

function Gallery({ modalEnabled = false, style, images = images_standard }) {
    const isMobile = useResponsive();
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

    const galleryStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '50px 8px',
        width: '95%',
        overflow: 'auto',
        background: 'transparent',
        ...style
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
        maxWidth: '100%',
        maxHeight: '90%',
        padding: '5px',
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

    const imageContainerStyle = {
        minWidth: '100px',
        maxWidth: '400px',
        boxSizing: 'border-box',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        margin: '10px',
        borderRadius: '30px',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        display: 'block',
    };

    const standardTail = `
        m-4 rounded-[30px]
        box-border
        cursor-pointer
        max-w-[400px] min-w-[100px]
        
        overflow-hidden
        transition-all
        bg-secondary
        hover:shadow-[-2px_-2px_5px_rgba(214,_255,_111,_1),_inset_2px_2px_5px_rgba(79,_94,_41,_0.4)]
        hover:text-white
        disabled:bg-slate-400
        disabled:cursor-not-allowed
        transition 
        duration-150 
        ease-in-out 
        active:translate-y-1
        motion-reduce:transition-none 
    `;
    const standardTail1 = ` 
    relative
    rounded-[30px]
    m-4
    shadow-[-2px_-2px_10px_rgba(255,_255,255,_0.1),_2px_5px_5px_rgba(0,0,0,_0.2)]
    max-w-[400px] min-w-[100px]
    overflow-hidden
    cursor-pointer
    scale-100 hover:scale-95 
    ease-in-out transition duration-150
`;
    return (
        <div style={galleryStyle}>
            {images.map((image, index) => (
                <div key={index} className={standardTail1}>
                    <img
                        className=' '
                        src={image}
                        alt={`Gallery item ${index + 1}`}
                        onClick={() => openModal(index)}
                    />
                    <div className="
                    absolute
                    rounded-[30px]
                    top-0
                    left-0
                    h-full
                    w-full
                    ease-in-out transition duration-150
                    hover:shadow-[inset_-2px_-2px_10px_rgba(255,_255,_255,_0.3),inset_2px_2px_10px_rgba(0,0,0,_0.5)]
                    "></div>
                </div>
            ))}
            {modalEnabled && currentIndex !== null && (
                <Stack direction='auto' style={modalStyle} onClick={closeModal} AlignItems={'center'}>
                    <span style={closeBtnStyle} onClick={closeModal}>&times;</span>
                    {!isMobile && <Button icon={faChevronLeft} config={config} style={buttonStyle} onClick={showPrev} disabled={currentIndex === 0} />}
                    
                    <img src={images[currentIndex]} alt="Selected" style={modalImageStyle} onClick={e => e.stopPropagation()} />
            
                    {isMobile && 
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button icon={faChevronLeft} config={config} style={buttonStyle} onClick={showPrev} disabled={currentIndex === 0} />
                        <Button icon={faChevronRight} config={config} style={buttonStyle} onClick={showNext} disabled={currentIndex === images.length - 1} />
                    </div>
                    }
                    
                    {!isMobile && <Button icon={faChevronRight} config={config} style={buttonStyle} onClick={showNext} disabled={currentIndex === images.length - 1} />}
                </Stack>
            )}
        </div>
    );
}

export default Gallery;
