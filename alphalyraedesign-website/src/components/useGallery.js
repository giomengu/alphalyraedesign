import { useState, useEffect } from 'react';

function useGalleryI() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        function importAll(r) {
            return r.keys().map(r);
        }

        const imagesContext = require.context('../../public/gallery', false, /\.(png|jpe?g|svg)$/);
        const images = importAll(imagesContext);
        setImages(images);
    }, []);

    return images;
}

export default useGalleryI;