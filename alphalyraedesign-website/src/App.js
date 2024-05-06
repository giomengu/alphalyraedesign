import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/HomePage';
import Gallery from './components/GalleryPage';
import Contact from './components/ContactPage';
import config from './assets/config';
import Footer from './components/Footer';
import ProjectsPage from './components/ProjectsPage';
function App() {
  const mainContentStyle = {
    paddingTop: '100px',  // Adjust this value based on the actual height of your navigation bar
    background: config.colors.darkAccent,
    height:`calc(100vh - 150px)`
};
  return (
    <Router style={{background: config.colors.darkAccent}}>
      <div  style={mainContentStyle}>
        <Navigation />
        <Routes>
          <Route path="/alphalyraedesign" element={<Home />} />
          <Route path="/alphalyraedesign/gallery" element={<Gallery />} />
          <Route path="/alphalyraedesign/projects" element={<ProjectsPage />} />
          <Route path="/alphalyraedesign/contact" element={<Contact />} />
          <Route path="*" element={<navigate replace to="/alphalyraedesign" />} /> // Redirect any unmatched routes to Home
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
