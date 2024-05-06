import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Switched to HashRouter
import Navigation from './components/Navigation';
import Home from './components/HomePage';
import Gallery from './components/GalleryPage';
import Contact from './components/ContactPage';
import config from './assets/config';
import Footer from './components/Footer';
import ProjectsPage from './components/ProjectsPage';
import ProjectPage from './components/ProjectPage';
import projectsConfig from './assets/projects/projectsConfig';
function App() {
  const mainContentStyle = {
    paddingTop: '100px',  // Adjust this value based on the actual height of your navigation bar
    background: config.colors.darkAccent,
    height: `calc(100vh - 150px)`
  };
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/projects', label: 'Projects', standardPage: ProjectPage,
    subPaths: projectsConfig.map(project => (
        {label:project.title,
        path:`'/projects'/${project.nameid}`, 
        project}
      )),
    },
    { path: '/contact', label: 'Contact' }
  ];
  const sub = routes.filter(route => route.subPaths).map(route => route.subPaths.map(subPath =>
    `${route.path}/${subPath.path}`
  ));
  return (
    <Router> {/* Removed style from here as Router does not accept style prop */}
      <div style={mainContentStyle}>
        <Navigation routes={routes}/>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          {routes.filter(route => route.subPaths).map(route => route.subPaths.map(subPath =>
            (<Route path= {subPath.path} element={<route.standardPage project={subPath.project} />} />)
          ))}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;