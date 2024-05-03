
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
    fonts: {
      primary: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    },
    cardsData : 
    [
        {
        id: 0,
        image: require("../assets/YachtDesign.png"),
        title: 'Yacht Design',
        description: 'This is a description for Card 1.',
        buttonText: 'More Info'
        },
        {
        id: 1,
        image: require("../assets/ProductDesign.png"),
        title: 'Product Design',
        description: 'This is a description for Card 2.',
        buttonText: 'More Info'
        },
        {
        id: 2,
        image: require("../assets/3dPrinting.png"),
        title: '3d Printing',
        description: 'This is a description for Card 2.',
        buttonText: 'More Info'
        },
        {
        id: 3,
        image: require("../assets/projectManagment.png"),
        title: 'Project Managment',
        description: 'This is a description for Card 3.',
        buttonText: 'More Info'
        },
        // Add more cards as needed
    ],
    teamCardsData : 
    [
        {
        id: 0,
        image: ("https://scontent.fcia7-1.fna.fbcdn.net/v/t1.6435-1/57289508_387807475280771_7122387555932176384_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DyxSaN14DakQ7kNvgFsIls9&_nc_ht=scontent.fcia7-1.fna&oh=00_AfBOqlvS_4a8Ab7BKRvuXq06GPy6-HaWH4LBAQJl63uNqw&oe=665C7E37"),
        title: 'Michele Molino',
        description: 
`- Yacht Design
- Yacht Engineering
- Project Management
- Rating Optimization`
        },
        {
        id: 1,
        image: ("https://scontent.fcia7-2.fna.fbcdn.net/v/t39.30808-1/277102492_5360755053946489_4990907134283626138_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-h0O8aEcK9QQ7kNvgG_8bNF&_nc_ht=scontent.fcia7-2.fna&oh=00_AfBUvYyv5YzjXOGbzgBDh0LAQ6Ls40Crc9kZziYiM1EAfQ&oe=663AF9DE"),
        title: 'Giovanni Mengucci',
        description: 
        `- Yacht Design
- Yacht Engineering
- Software Dev.
- Data Analysis`
        },
        // Add more cards as needed
    ]
  };
  
  export default config;
  