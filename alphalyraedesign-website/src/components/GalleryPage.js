import React from 'react';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import Gallery from './Gallery';
import ClientsComponent from './ClientsComponent';
function GalleryPage() {
  return (
    <Stack direction="v" style={{overflow:'auto',marginTop:'10px'}}>
      {false && <Gallery style={{}} modalEnabled={true}> </Gallery>}
      <ClientsComponent/>
    </Stack>
      
    );
}

export default GalleryPage;

// Repeat for Gallery.js and Contact.js with appropriate content changes
