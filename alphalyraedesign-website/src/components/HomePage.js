import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
function Home() {
  const handleButtonClick = (id) => {
    console.log('Button clicked for card:', id);
  };

  return (
    <Stack direction="v" style={{backgroundColor:config.colors.background,padding:'0px'}}>
      <Card
            key={0}
            image={'https://lh3.googleusercontent.com/PO_-DpSgYBnWubMUcjp4tjXSQuRG-WhwbAP2ZIcXKEPal1IeXh6w3JeR5Ye3ABZKlek67tbMGfnrMBvNgibS_qM=w16383'}
            title={"Chi Siamo"}
            description={"stocazzo"}
            config={config}
            style={{width:'95%'}}
            columnsJustification={'space-between'}
            buttonText={"premimi stronzo"}
            onButtonClick={() => console.log('Clicked', "Chi Siamo")}
          />
      <Stack direction="auto" style={{backgroundColor:config.colors.darkAccent, width:'100%'}} title={"Our Services"} titleLevel='h1' titlestyle={{color:"white"}}>
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
      <Stack direction="auto" style={{backgroundColor:config.colors.accent, width:'100%'}} title={"Our Team"} titleLevel='h1' titlestyle={{color:"white"}}>
        {config.teamCardsData.map(card => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            config={config}
            buttonText={"Contact Card"}
            imageStyle={{width:"50%"}}
            onButtonClick={() => console.log('Clicked', card.title)
            }
          />
        ))}
      </Stack>
    </Stack>
      
    );
}

export default Home;

// Repeat for Gallery.js and Contact.js with appropriate content changes
