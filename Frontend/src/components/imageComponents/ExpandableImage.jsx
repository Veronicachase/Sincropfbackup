import { useState } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const ExpandableImage = ({ src, alt }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onClick={handleImageClick}
      sx={{
        width: isExpanded ? "400px" : "100px",
        height: isExpanded ? "400px" : "100px",
        transition: "width 0.3s ease, height 0.3s ease",
        marginRight: "1em",
        cursor: "pointer",
      }}
    />
  );
};

ExpandableImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default ExpandableImage;
