import React, { useState } from 'react';
import Button from './Button';
import config from '../assets/config'; // Import the config file
import useResponsive from './useResponsive';
import { faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons'; // Example icon, replace with the one you need
import Stack from './Stack';
// Define your images here, or you could pass them as props
const images_standard = [
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242629728_5169979393028592_8784995202411991108_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DROXE1gsCVUQ7kNvgHYQtXE&_nc_ht=scontent.fcia7-1.fna&oh=00_AfAX2AFyg_DPweGvYYD8JZuCqbvahBg6pJobQt7ByZyVKw&oe=663D7E39",
    "https://scontent.fcia7-2.fna.fbcdn.net/v/t39.30808-6/242653424_5169974453029086_7451598415045420395_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HBwO2EbygiQQ7kNvgG6jxuz&_nc_ht=scontent.fcia7-2.fna&oh=00_AfDHdvR4CnCyAkAD-JJpQG72Fr8soKN0T-FzCkDK-pShmA&oe=663D538E",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242651758_5170216536338211_4968916256311060243_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xt06Qfzx6h0Q7kNvgHiFAv3&_nc_ht=scontent.fcia7-1.fna&oh=00_AfA-I40dO5fnd5-Wn31TbM1zwbdXb87KNnFJNPcCJww7xQ&oe=663D7D03",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242646193_5170215109671687_7978507386877736307_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rRT5Nnje08wQ7kNvgElrHZh&_nc_ht=scontent.fcia7-1.fna&oh=00_AfC2flC7W8Wr3yKutQ4u4xoonjR5Uh40fETJgkQ-sTMTCQ&oe=663D6817",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242629728_5169979393028592_8784995202411991108_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DROXE1gsCVUQ7kNvgHYQtXE&_nc_ht=scontent.fcia7-1.fna&oh=00_AfAX2AFyg_DPweGvYYD8JZuCqbvahBg6pJobQt7ByZyVKw&oe=663D7E39",
    "https://scontent.fcia7-2.fna.fbcdn.net/v/t39.30808-6/242653424_5169974453029086_7451598415045420395_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HBwO2EbygiQQ7kNvgG6jxuz&_nc_ht=scontent.fcia7-2.fna&oh=00_AfDHdvR4CnCyAkAD-JJpQG72Fr8soKN0T-FzCkDK-pShmA&oe=663D538E",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242651758_5170216536338211_4968916256311060243_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xt06Qfzx6h0Q7kNvgHiFAv3&_nc_ht=scontent.fcia7-1.fna&oh=00_AfA-I40dO5fnd5-Wn31TbM1zwbdXb87KNnFJNPcCJww7xQ&oe=663D7D03",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242646193_5170215109671687_7978507386877736307_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rRT5Nnje08wQ7kNvgElrHZh&_nc_ht=scontent.fcia7-1.fna&oh=00_AfC2flC7W8Wr3yKutQ4u4xoonjR5Uh40fETJgkQ-sTMTCQ&oe=663D6817",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242629728_5169979393028592_8784995202411991108_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DROXE1gsCVUQ7kNvgHYQtXE&_nc_ht=scontent.fcia7-1.fna&oh=00_AfAX2AFyg_DPweGvYYD8JZuCqbvahBg6pJobQt7ByZyVKw&oe=663D7E39",
    "https://scontent.fcia7-2.fna.fbcdn.net/v/t39.30808-6/242653424_5169974453029086_7451598415045420395_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HBwO2EbygiQQ7kNvgG6jxuz&_nc_ht=scontent.fcia7-2.fna&oh=00_AfDHdvR4CnCyAkAD-JJpQG72Fr8soKN0T-FzCkDK-pShmA&oe=663D538E",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242651758_5170216536338211_4968916256311060243_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xt06Qfzx6h0Q7kNvgHiFAv3&_nc_ht=scontent.fcia7-1.fna&oh=00_AfA-I40dO5fnd5-Wn31TbM1zwbdXb87KNnFJNPcCJww7xQ&oe=663D7D03",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242646193_5170215109671687_7978507386877736307_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rRT5Nnje08wQ7kNvgElrHZh&_nc_ht=scontent.fcia7-1.fna&oh=00_AfC2flC7W8Wr3yKutQ4u4xoonjR5Uh40fETJgkQ-sTMTCQ&oe=663D6817",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242629728_5169979393028592_8784995202411991108_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DROXE1gsCVUQ7kNvgHYQtXE&_nc_ht=scontent.fcia7-1.fna&oh=00_AfAX2AFyg_DPweGvYYD8JZuCqbvahBg6pJobQt7ByZyVKw&oe=663D7E39",
    "https://scontent.fcia7-2.fna.fbcdn.net/v/t39.30808-6/242653424_5169974453029086_7451598415045420395_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HBwO2EbygiQQ7kNvgG6jxuz&_nc_ht=scontent.fcia7-2.fna&oh=00_AfDHdvR4CnCyAkAD-JJpQG72Fr8soKN0T-FzCkDK-pShmA&oe=663D538E",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242651758_5170216536338211_4968916256311060243_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xt06Qfzx6h0Q7kNvgHiFAv3&_nc_ht=scontent.fcia7-1.fna&oh=00_AfA-I40dO5fnd5-Wn31TbM1zwbdXb87KNnFJNPcCJww7xQ&oe=663D7D03",
    "https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242646193_5170215109671687_7978507386877736307_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rRT5Nnje08wQ7kNvgElrHZh&_nc_ht=scontent.fcia7-1.fna&oh=00_AfC2flC7W8Wr3yKutQ4u4xoonjR5Uh40fETJgkQ-sTMTCQ&oe=663D6817"

    // Add as many images as you want
];

function Gallery({modalEnabled=false,style, images=images_standard}) {
    const isMobile = useResponsive()
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
        width:'95%',
        overflow: 'auto',
        background: 'transparent',
        ...style
    };
    
    const imageStyle = {
        minWidth: '100px',
        maxWidth: '400px',
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
    
    return (
            <div style={galleryStyle}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Gallery item ${index + 1}`}
                    style={imageStyle} onClick={() => openModal(index)} />
                ))}
                {modalEnabled && currentIndex !== null && (
                    <Stack direction='auto' style={modalStyle} onClick={closeModal} AlignItems={'center'}>
                        <span style={closeBtnStyle} onClick={closeModal}>&times;</span>
                        {!isMobile && <Button icon={faChevronLeft} config={config} style={buttonStyle} onClick={showPrev} disabled={currentIndex === 0}/>}
                        
                        <img src={images[currentIndex]} alt="Selected" style={modalImageStyle} onClick={e => e.stopPropagation()} />
                
                        {isMobile && 
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
                        <Button icon={faChevronLeft} config={config} style={buttonStyle} onClick={showPrev} disabled={currentIndex === 0}/>
                        <Button icon={faChevronRight} config={config} style={buttonStyle} onClick={showNext} disabled={currentIndex === images.length - 1}/>
                        </div>
                        }
                        
                        {!isMobile && <Button icon={faChevronRight} config={config} style={buttonStyle} onClick={showNext} disabled={currentIndex === images.length - 1}/>}
                    </Stack>
                )}
            </div>
    );
}


export default Gallery;