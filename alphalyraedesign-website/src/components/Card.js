import React from 'react';
import Stack from './Stack';
import Button from './Button';
import HoverButton from './HoverButton';
import MarkdownComponent from './MarkdownComponent';
function Card({ image, title, description, buttonText, config,onButtonClick,style,imageContainerStyle,imageStyle,columnsJustification,direction='h',scrollable=false,itemsStyle,notificationImage}) {
  return (
    <div style={{ 
        minWidth: '200px',
        margin: '10px', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        borderRadius: '30px',
        padding: '10px',
        background: config.colors.background,
        overflow:'hidden',
        ...style
        }}
        className='CardComponent'>
    <Stack direction={direction} columnsJustification={columnsJustification} style={{justifyContent: columnsJustification,height: '100%'}} enableScrollButtons={scrollable} config={{config}} parentStyle={itemsStyle}>
    {image && (
          <div className='imageContainer' style={{position: 'relative', padding:'5px',width: '100%',display:'flex',...imageContainerStyle }}>
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
      <div className='textContainer' style={{ paddingLeft: direction==='h'? '10px':'0px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
        {title && <h3 style={{ color: config.colors.accent,whiteSpace: 'pre-wrap',width:'100%',textAlign:'center', marginBottom:'0px'}}>{title}</h3>}
        <MarkdownComponent markdown={description}/>
        {buttonText && <HoverButton config={config} onClick={onButtonClick}>{buttonText}</HoverButton>}
      </div>
    </Stack>
    </div>
  );
}

export default Card;
