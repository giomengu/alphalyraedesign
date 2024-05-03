import React from 'react';
import Card from './Card';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import Gallery from './Gallery';
function GalleryPage() {
  const handleButtonClick = (id) => {
    console.log('Button clicked for card:', id);
  };

  return (
    <Stack direction="v" style={{backgroundColor:config.colors.darkAccent}}>
      <Gallery> </Gallery>
    </Stack>
      
    );
}

export default GalleryPage;

// Repeat for Gallery.js and Contact.js with appropriate content changes
