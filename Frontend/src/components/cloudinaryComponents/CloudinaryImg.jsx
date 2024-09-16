
import  { useState } from 'react';
import { Box } from '@mui/material';
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

 const ExpandableImage = ({ uploadedImg, className, ...props }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dcmnj8rrj",
    },
  });

  const myImage = cld.image(uploadedImg);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '10px',
        margin: '5px',
        cursor: 'pointer',
        transition: 'width 0.3s ease, height 0.3s ease',
        width: isExpanded ? '400px' : '100px',
        height: isExpanded ? '400px' : '100px',
      }}
      onClick={handleImageClick}
    >
      <AdvancedImage
        {...props}
        className={className}
        cldImg={myImage}
        plugins={[lazyload(), placeholder({ mode: "blur" })]}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};


export default ExpandableImage;




