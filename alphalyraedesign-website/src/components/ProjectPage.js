import React from 'react';
import Stack from './Stack';
import config from '../assets/config';
import Gallery from './Gallery';

function ProjectPage({ project }) {

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <Stack 
            direction="v" 
            style={{backgroundColor:config.colors.darkAccent,marginTop:'10px',width:'100%'}}
            title={project.title}
            titleStyle={{color:'white'}}
        >
            <Stack 
                direction='h'
                enableScrollButtons='true'
                style={{backgroundColor:config.colors.accent, width:'100%'}}
                config={config}

            >
                {project.gallery && project.gallery.map(image => (
                    <div>
                    <img src={image} alt={'gallery'} style={{
                        padding:'30px',
                        objectFit: 'cover',
                        maxWidth: '90vw'
                        
                    }} />
                    </div>
                ))}
            </Stack>
            {project.gallery && <Gallery style={{}} modalEnabled={true} images={project.gallery}> </Gallery>}
        </Stack>
    );
}

export default ProjectPage;
