import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import usePublic from './usePublicConfig';
import useResponsive from './useResponsive';
import { useNavigate } from 'react-router-dom';
function ProjectsPage({projectsPath}) {
    const projects = usePublic(projectsPath);
    const navigate = useNavigate();
    const isMobile = useResponsive();
    return (
    <Stack 
    direction="h" 
    style={{backgroundColor:config.colors.darkAccent, height:`calc(100vh - 250px)`}} 
    titleLevel='h1' 
    titlestyle={{color:"white"}} 
    enableScrollButtons='true' 
    config={config}>
        {projects.map(card => (
            <Card
                key={card.id}
                image={`${process.env.PUBLIC_URL}/projects/${card.nameid}/${card.image}`}
                title={card.title}
                description={card.description}
                config={config}
                style={{backgroundColor:'rgba(255,255,255,0.95)',...(isMobile ? { minWidth: '90vw',display: 'flex',justifyContent:'center',alignItems:'center'} : {})}}
                buttonText={card.buttonText}
                onButtonClick={() => navigate(`/projects/${card.nameid}`)}
                direction={'v'} 
                imageStyle={{maxWidth: isMobile ? '35vh' : '600px',...(isMobile ? { width: '100%',margin:'auto'} : {})}}
                itemsStyle={{margin:'auto',width:'100%',height:'100%',display:'flex'}}
                notificationImage={require(`../assets/${card.filterImage}`)}
            />
        
        ))}
        
    </Stack>
    );
}

export default ProjectsPage;

// Repeat for Gallery.js and Contact.js with appropriate content changes
