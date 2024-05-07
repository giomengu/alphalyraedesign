import React from 'react';
import Stack from './Stack';
import Button from './Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import config from '../assets/config';
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
        }}>
    <Stack direction={direction} columnsJustification={columnsJustification} style={{justifyContent: columnsJustification}} enableScrollButtons={scrollable} config={{config}} parentStyle={itemsStyle}>
    {image && (
          <div style={{ position: 'relative', width: '100%',...imageContainerStyle }}>
            <img src={image} alt={title} style={{
              objectFit: 'cover',
              borderRadius: '20px',
              maxHeight: 'calc(100vh - 300px)',
              width: '100%', // Ensure the image covers the container
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
      <div style={{ paddingLeft: direction==='h'? '10px':'0px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center',width:'100%',height:'100%'}}>
        {title && <h3 style={{ color: config.colors.accent,whiteSpace: 'pre-wrap',width:'100%',textAlign:'center', marginBottom:'0px'}}>{title}</h3>}
        <MarkdownComponent markdown={description}/>
        {buttonText && <Button config={config} onClick={onButtonClick}>{buttonText}</Button>}
      </div>
    </Stack>
    </div>
  );
}

export default Card;
