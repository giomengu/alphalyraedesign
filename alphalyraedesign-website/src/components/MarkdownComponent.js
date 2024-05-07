
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import config from '../assets/config';
import Button from './Button';
const MarkdownComponent = ({ markdown }) => {
  // Function to parse custom styles within a given array of content parts
  const parseCustomStyles = (parts) => {
    const elements = [];
    let isStyling = false;
    let styleColor = null;

    parts.forEach((part, index) => {
      if (typeof part === 'string') {
        const matches = part.split(/(\?[#][0-9A-Fa-f]{6}\?)/);
        matches.forEach((match) => {
          if (match.match(/\?([#][0-9A-Fa-f]{6})\?/)) {
            if (!isStyling) {
              styleColor = match.slice(1, -1); // Extract color and start styling
              isStyling = true;
            } else {
              isStyling = false; // End styling on second marker
            }
          } else if (isStyling) {
            elements.push(<span key={`${index}-${match}`} style={{ color: styleColor }}>{match}</span>);
          } else {
            elements.push(match);
          }
        });
      } else {
        elements.push(part); // Non-string content is passed through unchanged
      }
    });

    return elements;
  };

  // Custom renderer for paragraph elements to include our style parser
  const Paragraph = ({ children }) => {
    // Convert children to an array and process for custom styles
    const childrenArray = React.Children.toArray(children);
    const styledChildren = parseCustomStyles(childrenArray);
    return <p>{styledChildren}</p>;
  };
  const LinkRenderer = ({ node, ...props }) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer" style={{ textEmphasis:3, color: config.colors.secondary, textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
  // Button renderer, assuming links with "button:" are buttons
  const ButtonRenderer = ({ node, ...props }) => {
    if (props.children.startsWith("button")) {
      const buttonProp = props.children.split('button')[1]; // Strip "button:" prefix
      const buttonText = buttonProp.split(':')[1]; // Strip "button:" prefix
      const buttonStyle = buttonProp.split(':')[0]; // Strip "button:" prefix
      const buttonUrl = props.href; // Strip "button:" prefix
      switch(buttonStyle){
        case '-inline-small' : return <Button style={{display: '',paddingTop:'5px',paddingBottom:'5px'}} config={config} onClick={() => alert(buttonUrl)}>{buttonText}</Button>;
        case '-inline' : return <Button style={{display: ''}} config={config} onClick={() => alert(buttonText)}>{buttonText}</Button>;
      }
      return <Button config={config} onClick={() => alert(buttonUrl)}>{buttonText}</Button>;
      
    }else{
      return <a href={props.href} target="_blank" rel="noopener noreferrer" style={{ textEmphasis:3, color: config.colors.secondary, textDecoration: 'underline' }}>
      {props.children}
    </a>
    }
  };

  return (
    <ReactMarkdown
      children={markdown.trim().replace(/[ \t]+/g, ' ')}
      remarkPlugins={[gfm]}
      components={{
        p: Paragraph,
        a: ButtonRenderer
      }}
    />
  );
};

export default MarkdownComponent;
