import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import HoverButton from './HoverButton';
import config from '../assets/config';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function FullScreenButton({ toggleFullScreen }) {
  return (
    <HoverButton 
      icon={faExpand}
      config={config}
      onClick={toggleFullScreen}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontSize: '40px',
        transform: 'translate(-50%, -50%)',
        padding: '10px 20px'
      }}
    />
  );
}

function ResizeButton({ toggleFullScreen }) {
  return (
    <HoverButton 
      config={config}
      icon={faCompress}
      onClick={toggleFullScreen}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '40px',
        padding: '10px 20px'
      }}
    />
  );
}

function Viewer({ modelUrl }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef();
  const cardRef = useRef();
  const [showFrostedLayer, setShowFrostedLayer] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      enableScroll(); // Ensure scrolling is enabled when component unmounts
    };
    
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setScrollY(rect.top);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      enableScroll(); // Ensure scrolling is enabled when component unmounts
    };
  }, []);
  return (
    <div ref={cardRef} style={{ padding: '30px', height: '400px', width: '90vw', maxWidth: '700px' }}>
      <AnimatePresence>
        <motion.div
          ref={containerRef}
          initial={{ height: '400px', width: '90vw', maxWidth: '700px' }}
          animate={{
            width: isFullScreen ? '100vw' : '100%',
            maxWidth: isFullScreen ? '100vw' : '',
            height: isFullScreen ? '100vh' : '100%',
            top: isFullScreen ? 0 : '',
            left: isFullScreen ? 0 : '',
            borderRadius: isFullScreen ? '0px' : '30px',
            zIndex: isFullScreen ? 1000 : 'auto',
            position: isFullScreen ? 'fixed' : 'relative', // Set to fixed when full screen
          }}
          transition={{ duration: 0.5 }}
          style={{
            background: '#282c34',
            overflow: 'hidden',
          }}
          onAnimationStart={() => setShowFrostedLayer(true)}
        >
          {(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showFrostedLayer ? [1, 1, 0] : 0, zIndex: showFrostedLayer ? 1 : 0 }}
              transition={{ duration: 2, times: [0.05, 0.8, 0.95] }}
              style={{
                position: 'absolute',
                opacity: 1,
                width: '100%',
                height: '100%',
                backdropFilter: 'blur(1000px)',
                backgroundColor: 'rgba(71, 142, 196, 0.1)',
                zIndex: 1
              }}
              onAnimationComplete={() => setShowFrostedLayer(false)}
            />
          )}
          <Canvas 
            style={{ width: '100%', height: '100%' }}
            onCreated={() => setLoaded(true)}
          >
            <ambientLight intensity={2}/>
            <pointLight intensity={25} color={'#ffeec5'} position={[2,1,3]}/>
            <pointLight intensity={25} color={'#ffeec5'} position={[2,-1,-3]}/>
            {loaded && !showFrostedLayer && <ControlledOrbitControls scrollY={scrollY} enable={!isFullScreen} initialCameraPosition = {{ x: 5, y: 2, z: 3}} initialCameraTarget = {{ x: 3, y: 0.5, z: 0}}/>}
            <Model url={modelUrl} />
          </Canvas>

          {!isFullScreen && <FullScreenButton toggleFullScreen={toggleFullScreen} style />}
          {isFullScreen && <ResizeButton toggleFullScreen={toggleFullScreen} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
function ControlledOrbitControls({ scrollY, responseMultiplier = 0.1, smoothingFactor = 0.1,initialCameraPosition = { x: 0, y: 0, z: 0 },initialCameraTarget= { x: 0, y: 0, z: 0 }}) {
    const { camera } = useThree();
    const controlsRef = useRef();
    const [prevScrollY, setPrevScrollY] = useState(scrollY);
    const [targetRotation, setTargetRotation] = useState(0);
    const [currentRotation, setCurrentRotation] = useState(0);
    useEffect(() => {
        camera.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z);
        if (controlsRef.current) {
            controlsRef.current.target.set(initialCameraTarget.x, initialCameraTarget.y, initialCameraTarget.z);
            controlsRef.current.update();
          }
      }, [camera, initialCameraPosition,initialCameraTarget]);
    useFrame(() => {
      const zoomFactor = 1 + scrollY / window.innerHeight; // Adjust this factor as needed
      const distance = 10 / zoomFactor; // Adjust distance based on scroll
      const rotationDelta = ((scrollY - prevScrollY) / window.innerHeight) * Math.PI * responseMultiplier; // Calculate rotation delta with response multiplier
  
      //camera.fov = 75 / zoomFactor; // Adjust FOV based on scroll
      camera.updateProjectionMatrix(); // Update camera projection
  
      if (controlsRef.current) {
        //controlsRef.current.target.set(-5, scrollY / 300, 0); // Adjust target based on scroll
        controlsRef.current.update();
  
        // Set target rotation and smooth it out
        setTargetRotation(rotationDelta);
        setCurrentRotation(currentRotation + (targetRotation - currentRotation) * smoothingFactor);
        camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotation);
      }
  
      // Update previous scroll position
      setPrevScrollY(scrollY);
    });
  
    return <OrbitControls ref={controlsRef} />;
  }
  export default Viewer;