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
import { faHouse,faUser,faImage,faFolder} from '@fortawesome/free-solid-svg-icons';
import usePublic from './components/usePublicConfig';


function App() {
  const projects = usePublic('/projects/projectsConfig.json');
  const mainContentStyle = {
    paddingTop: '100px',  // Adjust this value based on the actual height of your navigation bar
    height: '100%'
  };
  const routes = [
    { path: '/', label: 'Home',icon:faHouse },
    { path: '/gallery', label: 'Gallery',icon:faImage },
    { path: '/projects', label: 'Projects', icon: faFolder,standardPage: ProjectPage,
    subPaths: projects.map(project => (
        {label:project.title,
        path:`/projects/${project.nameid}`, 
        project}
      )),
    },
    { path: '/contact', label: 'Contact',icon:faUser}
  ];
  return (
    <Router> {/* Removed style from here as Router does not accept style prop */}
      <div style={mainContentStyle} className={`bg-gradient-to-r from-darkAccent to-accent`}>
        <Navigation routes={routes}/>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/projects" element={<ProjectsPage projectsPath={'/projects/projectsConfig.json'}/>} />
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