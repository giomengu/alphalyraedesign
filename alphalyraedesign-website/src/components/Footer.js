import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import useResponsive from './useResponsive';
function Footer() {
  const handleButtonClick = (id) => {
    console.log('Button clicked for card:', id);
  };
  const isMobile = useResponsive();
  return (
      <Stack direction="h" style={{backgroundColor:config.colors.darkAccent, height: isMobile ? `150px` : '150px'}} enableScrollButtons={true}>
          <Card
            key={0}
            title={config.footerCardsData.title}
            image={!isMobile ? config.footerCardsData.image : ''}
            description={config.footerCardsData.description}
            config={config}
            style={{backgroundColor:'rgba(255,255,255,0.95)',}}
            onButtonClick={() => console.log('Clicked')}
            direction={'auto'} 
            imageStyle={{height: isMobile ? '0' : '90px'}}
          />
      </Stack>
      
    );
}

export default Footer;

// Repeat for Gallery.js and Contact.js with appropriate content changes
