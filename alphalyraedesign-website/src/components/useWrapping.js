import { useState, useEffect } from 'react';

function isWrapping(container) {
    if(!container){
        return false;
    }
    const children = container.children;
    let firstRowBottom = children[0].getBoundingClientRect().bottom;

    for (let i = 1; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        if (childRect.top >= firstRowBottom) {
            return true; // Child is on a new line
        }
    }
    return false; // All children are on the same line
}
function useWrapping(container) {

    const [isWrapped, setIsWrapped] = useState(typeof window !== 'undefined' ? isWrapping(container) : false);

    useEffect(() => {
        function handleResize() {
            setIsWrapped( isWrapping(container));
        }

        window.addEventListener('resize', handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [container]);

    return isWrapped;
}
export default useWrapping;