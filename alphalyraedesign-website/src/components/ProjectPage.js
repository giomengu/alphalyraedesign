import React, { useState } from 'react';
import Stack from './Stack';
import config from '../assets/config';
import Gallery from './Gallery';
import HoverCard from './HoverCard';
import Viewer from './3dViewer';
import Card from './Card';
import ExampleWrapper from './SpringModal';
function ProjectPage({ project }) {
    const [markdownFileContent, setMarkdownFileContent] = useState('');
    if (!project) {
        return <div>Project not found</div>;
    }
    
    const fetchMarkdown = (filePath) => {
        fetch(filePath)
          .then(response => response.text())
          .then(text => setMarkdownFileContent(text))
          .catch(error => console.error('Error loading the markdown file:', error));
        
    };
    const projectGallery = project.gallery.map(image => `${process.env.PUBLIC_URL}/projects/${project.nameid}/${image}`);
    const project3dModel = `${process.env.PUBLIC_URL}/projects/${project.nameid}/3dModels/model.glb`;
    fetchMarkdown(`${process.env.PUBLIC_URL}/projects/${project.nameid}/${project.markdownFile}`);
    return (
        <Stack 
            direction="v" 
            style={{marginTop:'10px',width:'100%'}}
            title={project.title}
            titleStyle={{color:'white'}}
            justifyContent='center'
            parentStyle={{display:'flex',justifyContent:'center'}}
        >
            <Stack 
                direction='h'
                enableScrollButtons='true'
                style={{width:'100%'}}
                config={config}
            >
                {project.gallery && project.gallery.map(image => (
                    <div>
                    <img src={`${process.env.PUBLIC_URL}/projects/${project.nameid}/${image}`} alt={'gallery'} style={{
                        padding:'30px',
                        objectFit: 'cover',
                        maxWidth: '90vw'
                        
                    }} />
                    </div>
                ))}
            </Stack>
            {project.markdown && 
                <Card config={config} style={{}} direction='v' description={project.markdown}/>
            }
            {!project.markdown && project.markdownFile &&
                <Card config={config} style={{width:'fit-content'}} direction='h' description={markdownFileContent}/>
            }
            {project3dModel && <Viewer modelUrl={project3dModel}/>}
            {project.gallery && <Gallery style={{}} modalEnabled={true} images={projectGallery}> </Gallery>}
        </Stack>
    );
}

export default ProjectPage;
