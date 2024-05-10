import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import useResponsive from './useResponsive';

function Home() {
  const handleButtonClick = (id) => {
    console.log('Button clicked for card:', id);
  };
  const isMobile = useResponsive()
  return (
    <Stack direction="v" style={{backgroundColor:config.colors.background,padding:'0px'}}>
      {false && <Card
        className={'main'}
        key={0}
        image={'https://scontent.fcia7-1.fna.fbcdn.net/v/t39.30808-6/242629728_5169979393028592_8784995202411991108_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DROXE1gsCVUQ7kNvgHYQtXE&_nc_ht=scontent.fcia7-1.fna&oh=00_AfAX2AFyg_DPweGvYYD8JZuCqbvahBg6pJobQt7ByZyVKw&oe=663D7E39'}
        title={"Chi Siamo"}
        description={
        `
        `}
        config={config}
        columnsJustification={isMobile?'space-between':'space-evenly'}
        buttonText={"premimi"}
        imageStyle={{width: isMobile? '50vw' : "70vw",maxHeight:'90vh'}}
        onButtonClick={() => console.log('Clicked', "Chi Siamo")}
        itemsStyle={{margin:'auto',width:'100%',height:'100%'}}
      />}
      {config.mainGallery.length > 0 &&  <Stack 
        direction='h'
        enableScrollButtons='true'
        style={{backgroundColor:config.colors.darkAccent, width:'100%'}}
        config={config}
      >
        {config.mainGallery.map(image => (
            <div>
            <img src={image} alt={'gallery'} style={{
              padding:'30px',
              objectFit: 'cover',
              maxWidth: '90vw'
            }} />
            </div>
        ))}
      </Stack>}
      {config.clients.length > 0 &&  <Stack 
        direction='h'
        enableScrollButtons='true'
        style={{backgroundColor:config.colors.accent, width:'100%'}}
        config={config}
      >
        {config.clients.map(image => (
            <div>
            <img src={image} alt={'gallery'} style={{
              padding:'30px',
              objectFit: 'cover',
              maxWidth: '90vw'
            }} />
            </div>
        ))}
      </Stack>}
      <Stack className={'ourServices'} direction="auto" style={{backgroundColor:config.colors.darkAccent, width:'100%'}} title={"Our Services"} titleLevel='h1' titleStyle={{color:"white"}} enableScrollButtons='true' config={config}>
        {config.cardsData.map(card => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            config={config}
            direction='auto-inv'
            buttonText={card.buttonText}
            onButtonClick={() => console.log('Clicked', card.title)}
            imageStyle={{width:"150px"}}
            style={{backgroundColor:'rgba(255,255,255,0.95)'}}
            itemsStyle={{margin:'auto',width:'100%',height:'100%'}}
          />
        ))}
      </Stack>
      <Stack className={'ourTeam'} direction="auto" style={{backgroundColor:config.colors.accent, width:'100%'}} title={"Our Team"} titleLevel='h1' titleStyle={{color:"white"}}>
        {config.teamCardsData.map(card => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            config={config}
            buttonText={"Contact Card"}
            imageStyle={{width:"150px"}}
            style={{backgroundColor:'rgba(255,255,255,0.95)'}}
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
