import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import config from '../assets/config';
import Button from './Button';
import Stack from './Stack';
import { useNavigate } from 'react-router-dom';
const MarkdownComponent = ({ markdown }) => {
  const navigate = useNavigate();
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
  const Paragraph = ({ children,filter=''}) => {
    // Convert children to an array and process for custom styles
    const childrenArray = React.Children.toArray(children);
    const styledChildren = parseCustomStyles(childrenArray);
    return <p>{styledChildren}</p>;
  };
  // Custom Table Components
  const Table = ({ children }) => <div style={{backgroundColor:config.colors.secondary,borderRadius:'20px',padding:'2px'}}><table style={{ width: '100%',overflow:'hidden',borderRadius:'20px',borderCollapse:'collapse'}}>{children}</table></div>;
  const TableHead = ({ children }) => <thead>{children}</thead>;
  const CustomImg = ({ children }) => <p>{children}</p>;
  const TableBody = ({ children }) => <tbody style={{borderColor:'inherit'}}>{children}</tbody>;
  const TableRow = ({ children }) => <tr style={{borderBottom: '1px solid #ececec' }}>{children}</tr>;
  const H1 = ({ children }) => {
    const color = children.split('#')[1] || 'black';
    const text = children.split('#')[2] || '';
    return <h1 style={{color:`#${color}` }}>{text}</h1>
  };
  const TableCell = ({ children, isHeader }) => {
    if(children === '!null!'){
      return;
    }
    // Extract attribute value and clean text
    const extractAndCleanAttribute = (text, pattern) => {
        const regex = new RegExp(pattern, 'i'); // Case insensitive match
        const matches = regex.exec(text);
        const value = matches && matches[1] ? parseInt(matches[1], 10) : 1;
        const cleanedText = text.replace(regex, ''); // Remove the attribute from text
        return [value, cleanedText];
    };
    
    // Process children to extract attributes and clean up text
    let cleanedChildren = children;
    let colspan = 1;
    let rowspan = 1;

    if (typeof children === 'string') { // Ensure children is a string before processing
        [colspan, cleanedChildren] = extractAndCleanAttribute(children, /colspan=['"]?(\d+)['"]?/);
        [rowspan, cleanedChildren] = extractAndCleanAttribute(cleanedChildren, /rowspan=['"]?(\d+)['"]?/);
    }

    const cellStyle = {
        padding: '8px 16px',
        border: `1px solid ${config.colors.secondary}`,
        backgroundColor: isHeader ? config.colors.secondary : 'white'
    };

    // Select tag based on header status
    const CellTag = isHeader ? 'th' : 'td';
    const cellProps = {
        style: cellStyle,
        colSpan: colspan !== 1 ? colspan : undefined, // Only add attribute if not default
        rowSpan: rowspan !== 1 ? rowspan : undefined
    };

    return <CellTag {...cellProps}>{cleanedChildren}</CellTag>;
};
  const isExternalUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('www.');
  };
  const handleNavigation = (url) => {
    if (isExternalUrl(url)) {
        // If the URL is external, use window.location to navigate
        window.location.href = url;
    } else {
        // If the URL is internal, use the navigate function from React Router
        navigate(url);
    }
  };
  // Button renderer, assuming links with "button:" are buttons
  const ButtonRenderer = ({ node, ...props }) => {
    if (props.children.startsWith("button")) {
      const buttonProp = props.children.split('button')[1]; // Strip "button:" prefix
      const buttonText = buttonProp.split(':')[1]; // Strip "button:" prefix
      const buttonStyle = buttonProp.split(':')[0]; // Strip "button:" prefix
      const buttonUrl = props.href; // Strip "button:" prefix
      switch(buttonStyle){
        case '-inline-small' : return <Button style={{display: '',paddingTop:'5px',paddingBottom:'5px'}} config={config} onClick={() => handleNavigation(buttonUrl)}>{buttonText}</Button>;
        case '-inline' : return <Button style={{display: ''}} config={config} onClick={() =>handleNavigation(buttonUrl)}>{buttonText}</Button>;
      }
      return <Button config={config} onClick={() => handleNavigation(buttonUrl)}>{buttonText}</Button>;
      
    }else{
      return <a href={props.href} target="_blank" rel="noopener noreferrer" style={{ textEmphasis:3, color: config.colors.secondary, textDecoration: 'underline' }}>
      {props.children}
    </a>
    }
  };
  const CustomHr = ({ node, ...props }) => {
    // You can add more sophisticated logic to determine the style based on additional props
    let style = {};
    switch (node.type) {
      case 'thematicBreak_***':
        style = { borderTop: '3px dotted #ccc' };
        break;
      case 'thematicBreak_---':
        style = { borderTop: '3px solid #333' };
        break;
      case 'thematicBreak___':
        style = { borderTop: '3px dashed #666' };
        break;
      default:
        style = { borderTop: '1px solid #a9d734' }; // Default style
    }
  
    return <hr style={style} />;
  };
  const preprocessMarkdown = (markdown) => {
    // Split the markdown into sections based on horizontal rules with specific annotations
  
    const sections = markdown.trim().replace(/[ \t]+/g, ' ').split('---v');
    let processedSections = [];
    let currentFlexDirection = 'row'; // Default flex direction

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        processedSections.push({ content: section, flexDirection: currentFlexDirection });
    }
    return processedSections;
};

const processText = (text) => {
  let returnString = { alignment: 'start', text: '' };
  if (!text) return returnString;  // Default return if no text

  const alignments = [
    { prefix: '[TA-CENTER]', alignment: 'center' },
    { prefix: '[TA-START]', alignment: 'start' },
    { prefix: '[TA-END]', alignment: 'end' }
  ];
  const sections = [
    { prefix: '[DESCRIPTION]', alignment: 'center' },
    { prefix: '[TA-START]', alignment: 'start' },
    { prefix: '[TA-END]', alignment: 'end' }
  ];

  for (const { prefix, alignment } of alignments) {
    if (text.startsWith(prefix)) {
      return { alignment, text: text.split(prefix)[1] };
    }
  }

  return { alignment: 'start', text };  // Default alignment if no prefix is found
};

  const sections = preprocessMarkdown(markdown);
  
  return (
    <Stack style={{width:'100%'}} direction='auto' columnsJustification='space-evenly'>
        {sections.map((section, index) => {
            const { alignment, text } = processText(section.content.trim());
            if (text && text!==''){
              return(
                <div key={index} style={{textAlign:alignment}} >
                    <ReactMarkdown
                        children={text}
                        remarkPlugins={[gfm]}
                        components={{
                          h1:H1,
                          p: Paragraph,
                          a: ButtonRenderer,
                          table: Table,
                          thead: TableHead,
                          tbody: TableBody,
                          tr: TableRow,
                          th: ({ node, ...props }) => <TableCell isHeader={true} {...props} />,
                          td: TableCell,
                          hr: CustomHr,
                          img : CustomImg
                        }}
                    />
                </div>
                )
            }
            
    })}
    </Stack>
);
};

export default MarkdownComponent;