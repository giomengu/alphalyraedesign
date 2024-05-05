import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import useResponsive from './useResponsive';
function ContactPage() {
  const handleButtonClick = (id) => {
    console.log('Button clicked for card:', id);
  };
  const isMobile = useResponsive();
  return (
      <Stack direction="h" style={{backgroundColor:config.colors.darkAccent, height:`calc(100vh - 250px)`}} titleLevel='h1' titlestyle={{color:"white"}} enableScrollButtons={true}>
        {config.teamCardsData.map(card => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            config={config}
            style={{backgroundColor:'rgba(255,255,255,0.95)'}}
            onButtonClick={() => console.log('Clicked', card.title)}
            direction={'auto'} 
            imageStyle={{width: isMobile ? '35vh' : '300px'}}
          />
        ))}
      </Stack>
      
    );
}

export default ContactPage;

// Repeat for Gallery.js and Contact.js with appropriate content changes
