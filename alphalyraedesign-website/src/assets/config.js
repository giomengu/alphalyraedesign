
const config = {
    siteName: "Alpha Lyrae Design",
    logo: require("../assets/ALPHALYRAE.jpeg"), // ensure the path is correct based on where you store your assets
    colors: {
      accent: "#478ec4",
      darkAccent : "#39739f",
      darkSecondary: "#80a327",
      secondary: "#a9d734",
      background: "#FFFFFF",
      backgrounddark: "#22252a",
      text: "#333333"
    },
    selector:{

    },
    fonts: {
      primary: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    },
    clients:[

    ],
    mainGallery:[
      //require("../assets/projects/pyrgi580/RIB001-RENDERMODEL-5-3.png"),
      //require(`../assets/projects/classe950/Class950-1.png`)
    ],
    cardsData : 
    [
        {
        id: 0,
        image: require("../assets/YachtDesign.png"),
        title: 'Yacht Design',
        description: `We deliver comprehensive yacht designs, from initial concepts to detailed digital twin models. Our adaptable workflows cater to customizations, rebuilds, and new builds, ensuring tailored solutions for every project.
`,
        buttonText: 'More Info'
        },
        {
        id: 1,
        image: require("../assets/ProductDesign.png"),
        title: `Product Design`,
        description: `Specializing in marine industry designs, we use rapid prototyping and 3D printing for swift modifications. We work with plastics and composites, ready to explore new technologies and industries.
        `,
        buttonText: 'More Info'
        },
        {
        id: 2,
        image: require("../assets/3dPrinting.png"),
        title: '3d Printing',
        description: `Our 3D printing services support our yacht and product designs, offering facilities for custom prints. We focus on our models, ensuring seamless integration with our design processes.
        `,
        buttonText: 'More Info'
        },
        {
        id: 3,
        image: require("../assets/projectManagment.png"),
        title: 'Project Managment',
        description:`
Flexible project management services enhance our design and printing workflows. We integrate smoothly into any project, providing coordination and execution expertise across all our services.
        `,
        buttonText: 'More Info'
        },
        // Add more cards as needed
    ],
    teamCardsData : 
    [
        /*{
        id: 0,
        image: ("https://scontent.fcia7-1.fna.fbcdn.net/v/t1.6435-1/57289508_387807475280771_7122387555932176384_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DyxSaN14DakQ7kNvgFsIls9&_nc_ht=scontent.fcia7-1.fna&oh=00_AfBOqlvS_4a8Ab7BKRvuXq06GPy6-HaWH4LBAQJl63uNqw&oe=665C7E37"),
        title: 'Michele Molino',
        description: 
`- Yacht Design

- Yacht Engineering

- Project Management

- Rating Optimization`
        },*/
        {
        id: 1,
        image: ("https://media.licdn.com/dms/image/C4E03AQGK5PcJUz9hxA/profile-displayphoto-shrink_800_800/0/1620821041558?e=2147483647&v=beta&t=VqWKrZe3bKL5TVxopRYlzKnOGgsVy9e7BJNiwiJVvgg"),
        title: 'Giovanni Mengucci',
        description: 
        `
- Yacht Design

- Yacht Engineering

- Software Dev.

- Data Analysis`
        }
    ],
    footerCardsData : 
    {
        id: 0,
        image: ("https://www.aemconsultingsrl.it/wp-content/uploads/2021/12/B796F112-76C4-4AAC-9E4F-162C723D0794-1024x1024.png"),
        title: '',
        description: 
        `?#478ec4?Alpha Lyrae Design®?#478ec4? - A & M Consulting s.r.l.

        Via Courmayeur, 12 00135 Roma | Partita Iva 01001521002

`
    }
  };
  
  export default config;