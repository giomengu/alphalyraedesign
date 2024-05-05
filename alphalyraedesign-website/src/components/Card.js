import React from 'react';
import Stack from './Stack';
import Button from './Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import config from '../assets/config';
import MarkdownComponent from './MarkdownComponent';
function Card({ image, title, description, buttonText, config,onButtonClick,style,imageStyle,columnsJustification,direction='h'}) {
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
    <Stack direction={direction} columnsJustification={columnsJustification} style={{justifyContent: columnsJustification}} config={{config}}>
      {image && <img src={image} alt={title} style={{  objectFit: 'cover',borderRadius: '20px',...imageStyle}} />}
      <div style={{ paddingLeft: direction==='h'? '10px':'0px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center',width:'100%'}}>
        {title && <h3 style={{ color: config.colors.accent,whiteSpace: 'pre-wrap',width:'100%',textAlign:'center', marginBottom:'0px'}}>{title}</h3>}
        <MarkdownComponent markdown={description.trim().replace(/[ \t]+/g, ' ')}/>
        {buttonText && <Button config={config} onClick={onButtonClick}>{buttonText}</Button>}
      </div>
    </Stack>
    </div>
  );
}

export default Card;
