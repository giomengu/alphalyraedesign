
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
        title: 'Card Title 1',
        description: 'This is a description for Card 1.',
        buttonText: 'Click Me'
        },
        {
        id: 1,
        image: require("../assets/ProductDesign.png"),
        title: 'Card Title 2',
        description: 'This is a description for Card 2.',
        buttonText: 'Click Me'
        },
        {
        id: 2,
        image: require("../assets/3dPrinting.png"),
        title: 'Card Title 2',
        description: 'This is a description for Card 2.',
        buttonText: 'Click Me'
        },
        {
        id: 3,
        image: require("../assets/projectManagment.png"),
        title: 'Card Title 3',
        description: 'This is a description for Card 3.',
        buttonText: 'Click Me'
        },
        // Add more cards as needed
    ]
  };
  
  export default config;
  