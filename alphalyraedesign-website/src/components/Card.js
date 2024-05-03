import React from 'react';
import Stack from './Stack';
import Button from './Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
function Card({ image, title, description, buttonText, config,onButtonClick,style,imageStyle,columnsJustification}) {
  return (
    <div style={{ 
        minWidth: '300px', 
        margin: '10px', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        borderRadius: '30px',
        padding: '10px',
        background: config.colors.background,
        overflow:'hidden',
        ...style
        }}>
    <Stack direction='h' style={{justifyContent: columnsJustification}}>
      <img src={image} alt={title} style={{ width: '50%', height: "auto", objectFit: 'cover',borderRadius: '20px',...imageStyle}} />
      <div style={{ paddingLeft: '10px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
        <h3 style={{ color: config.colors.accent,whiteSpace: 'pre-wrap' }}>{title}</h3>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
            </ReactMarkdown>
        <Button config={config} onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </Stack>
    </div>
  );
}

export default Card;
