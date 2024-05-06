import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

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
  return (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={[gfm]}
      components={{
        p: Paragraph
      }}
    />
  );
};

export default MarkdownComponent;
