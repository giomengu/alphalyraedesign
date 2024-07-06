import React from 'react';
import Stack from './Stack';
import Gallery from './Gallery';
import useGalleryI from './useGallery';
function GalleryPage()
{
  const aa = useGalleryI()
  console.log(aa);
  return (
    <Stack direction="v" style={{overflow:'auto',marginTop:'10px'}}>
      <Gallery style={{}} images={aa} modalEnabled={true}></Gallery>
    </Stack>
      
    );
}

export default GalleryPage;

// Repeat for Gallery.js and Contact.js with appropriate content changes
