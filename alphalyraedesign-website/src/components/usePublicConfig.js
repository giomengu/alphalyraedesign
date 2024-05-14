import { useState, useEffect } from 'react';

function usePublic(path='/projects/projectsConfig.js') {
    const projectsPh = 
    [
      {
        id: 0,
        nameid:'none',
        title: 'placeHolder',
        description: `Placeholder
        `,
        buttonText: 'PlaceHolder',
      }
    ];  
    const [projects, setProjects] = useState([]);
    const pathi = `${process.env.PUBLIC_URL}${path}`;
    console.log('defPath');
    console.log(`${process.env.PUBLIC_URL}`);
    console.log('fullPath');
    console.log(pathi);
    useEffect(() => {  
        fetch(pathi)
          .then(response => response.json())
          .then(data => setProjects(data))
          .catch(error => setProjects(projectsPh));
      }, []);

    return projects;
}
export default usePublic;