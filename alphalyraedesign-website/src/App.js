import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/HomePage';
import Gallery from './components/GalleryPage';
import Contact from './components/ContactPage';

function App() {
  const mainContentStyle = {
    marginTop: '100px'  // Adjust this value based on the actual height of your navigation bar
};
  return (
    <Router>
      <div  style={mainContentStyle}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<navigate replace to="/" />} /> // Redirect any unmatched routes to Home
          <Route path="/alphalyraedesign" element={<navigate replace to="/" />} /> // Redirect any unmatched routes to Home
        </Routes>
      </div>
    </Router>
  );
}

export default App;
