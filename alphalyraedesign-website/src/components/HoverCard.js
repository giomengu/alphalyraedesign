import React, { useRef } from "react";

import Stack from './Stack';
import Button from './Button';
import HoverButton from './HoverButton';
import MarkdownComponent from './MarkdownComponent';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

function HoverCard({ image, title, description, buttonText, config,onButtonClick,style,imageContainerStyle,imageStyle,columnsJustification,direction='h',scrollable=false,itemsStyle,notificationImage}){
  const ROTATION_RANGE = 35;
  const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        minWidth: '200px',
        margin: '10px', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        borderRadius: '30px',
        padding: '10px',
        ...style
        
      }}
      className="relative bg-white"
    >
      <Stack direction={direction} columnsJustification={columnsJustification} style={{transform: "translateZ(50px)", transformStyle: "preserve-3d",justifyContent: columnsJustification,height: '100%'}} enableScrollButtons={scrollable} config={{config}} parentStyle={itemsStyle}>
      {image && (
            <div style={{padding:'5px',width: '100%',display:'flex',...imageContainerStyle }}>
              <img src={image} alt={title} style={{
                objectFit: 'cover',
                borderRadius: '15px',
                maxHeight: 'calc(100vh - 300px)',
                margin:'5px', // Ensure the image covers the container
                boxShadow: ` -2px -2px 5px rgba(200, 200, 200,0.3), 3px 3px 5px rgba(77, 77, 77, 0.6)`,
                ...imageStyle
              }} />

              <div style={{
                
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}>
                {notificationImage && <img src={notificationImage} alt="Filter" style={{ height: '50px', width: '50px',borderRadius:'10px',boxShadow: `-2px -2px 5px rgba(149, 208, 255,0.3), 3px 3px 5px rgba(0, 0, 0, 0.3)`, }} />}
              </div>
            </div>
          )}
        <div className='textContainer' style={{ transform: "translateZ(50px)", paddingLeft: direction==='h'? '10px':'0px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
          {title && <h3 style={{ color: config.colors.accent,whiteSpace: 'pre-wrap',width:'100%',textAlign:'center', marginBottom:'0px'}}>{title}</h3>}
          <MarkdownComponent markdown={description}/>
          {buttonText && <HoverButton config={config} onClick={onButtonClick}>{buttonText}</HoverButton>}
        </div>
      </Stack>
    </motion.div>
  );
};

export default HoverCard;