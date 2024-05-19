import React from 'react';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import Gallery from './Gallery';
function GalleryPage() {
  return (
    <Stack direction="v" style={{backgroundColor:config.colors.darkAccent, overflow:'auto',marginTop:'10px'}}>
      <Gallery style={{}} modalEnabled={true}> </Gallery>
    </Stack>
      
    );
}

export default GalleryPage;

// Repeat for Gallery.js and Contact.js with appropriate content changes
