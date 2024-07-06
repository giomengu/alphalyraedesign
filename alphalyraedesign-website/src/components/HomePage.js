import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import useResponsive from './useResponsive';
import HoverCard from './HoverCard';
import usePublic from './usePublicConfig';
function Home() {
  const isMobile = useResponsive()
  const projects = usePublic('/projects/projectsConfig.json');
  const projectGallery = projects.map(project => `${process.env.PUBLIC_URL}/projects/${project.nameid}/${project.image}`);
  return (
    <Stack direction="v" style={{padding:'0px',marginTop:'10px'}}>
      {false && <HoverCard
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

      {config.mainGallery.length <= 0 &&  <Stack 
        direction='h'
        enableScrollButtons='true'
        style={{width:'100%'}}
        config={config}
      >
        {projectGallery.map(image => (
            <div>
            <img src={image} alt={'gallery'} className='m-10 p-0 object-cover max-w-[90vw] rounded-[30px] shadow-[-2px_-2px_10px_rgba(255,_255,255,_0.1),_2px_5px_5px_rgba(0,0,0,_0.2)]' />
            </div>
        ))}
      </Stack>}
      {config.clients.length > 0 &&  <Stack 
        direction='h'
        enableScrollButtons='true'
        style={{width:'100%'}}
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
      <Stack className={'ourServices'} direction="auto" style={{width:'100%'}} title={"Our Services"} titleLevel='h1' titleStyle={{color:"white"}} enableScrollButtons='true' config={config}>
        {config.cardsData.map(card => (
          <HoverCard
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            config={config}
            direction='v'
            //buttonText={card.buttonText}
            onButtonClick={() => console.log('Clicked', card.title)}
            imageStyle={{maxWidth: isMobile ? '35vw' : '200px',...(isMobile ? { width: '100%',margin:'auto'} : {})}}
            style={{backgroundColor:'rgba(255,255,255,0.95)'}}
            itemsStyle={{margin:'auto',width:'100%',height:'100%'}}
          />
        ))}
      </Stack>
      <Stack className={'ourTeam'} direction="auto" style={{ width:'100%'}} title={"Our Team"} titleLevel='h1' titleStyle={{color:"white"}}>
        {config.teamCardsData.map(card => (
          <HoverCard
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
