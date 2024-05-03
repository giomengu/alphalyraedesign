import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
function Home() {
  const handleButtonClick = (id) => {
    console.log('Button clicked for card:', id);
  };

  return (
    <Stack direction="v" style={{backgroundColor:config.colors.darkAccent}}>
      <Stack direction="auto" style={{backgroundColor:config.colors.darkAccent}} title={"Our Services"} titleLevel='h1' titlestyle={{color:"white"}}>
        {config.cardsData.map(card => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            config={config}
            buttonText={card.buttonText}
            onButtonClick={() => console.log('Clicked', card.title)}
          />
        ))}
      </Stack>
    </Stack>
      
    );
}

export default Home;

// Repeat for Gallery.js and Contact.js with appropriate content changes
