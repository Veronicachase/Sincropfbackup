import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ExpandableImage = memo(({ src, alt, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
    onClick && onClick();
  };

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onClick={handleImageClick}
      sx={{
        width: isExpanded ? '400px' : '100px',
        height: isExpanded ? '400px' : '100px',
        transition: 'width 0.3s ease, height 0.3s ease',
        cursor: 'pointer',
      }}
    />
  );
});

ExpandableImage.displayName = 'ExpandableImage';

ExpandableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};




export default ExpandableImage;



// import  { useState } from 'react';
// import { Box } from '@mui/material';

// export const ExpandableImage = ({ src, alt }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleImageClick = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <Box
//       component="img"
//       src={src}
//       alt={alt}
//       onClick={handleImageClick}
//       sx={{
//         width: isExpanded ? '400px' : '100px', 
//         height: isExpanded ? '400px' : '100px', 
//         transition: 'width 0.3s ease, height 0.3s ease', 
//         cursor: 'pointer', 
//       }}
//     />
//   );
// };


