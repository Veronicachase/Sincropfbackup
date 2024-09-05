import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import Modal from "react-modal";
import { Button, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";

Modal.setAppElement("#root");

function base64ToFile(base64, filename) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const EditableImage = ({ src, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState("move");

  const stageRef = useRef(null);
  const imageRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(src, { mode: "cors" });
        const blob = await response.blob();
        const img = new window.Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => setImage(img);
      } catch (error) {
        console.error("Error fetching the image", error);
      }
    };

    fetchImage();
  }, [src]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleStartDrawing = (e) => {
    if (mode !== "draw") return;
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleDrawing = (e) => {
    if (!isDrawing || mode !== "draw") return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const uri = stageRef.current.toDataURL();

    const file = base64ToFile(uri, "edited-image.png");
    onSave(file);
    handleCloseModal();
  };

  const handleModeChange = (event, newMode) => {
    if (newMode === "move") {
      setIsDrawing(false);
    }
    setMode(newMode);
  };

  return (
    <Box>
      <Box
        component="img"
        src={src}
        alt="Thumbnail"
        onClick={handleOpenModal}
        sx={{
          cursor: "pointer",
          width: "150px",
          height: "100px",
          zIndex: 100,
          border: "1px solid black",
          objectFit: "cover",
        }}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Image"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "100%" : "90%",
            maxWidth: "800px",
            height: isMobile ? "100%" : "auto",
            overflow: "auto",
            maxHeight: "80vh",
            zIndex: 2000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1em",
          }}
        >
          <h2>Edit Image</h2>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            aria-label="drawing mode"
            sx={{ marginBottom: "1em" }}
          >
            <ToggleButton value="draw" aria-label="draw mode">
              Draw
            </ToggleButton>
            <ToggleButton value="move" aria-label="move mode">
              Move
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Stage
          width={isMobile ? window.innerWidth * 0.95 : window.innerWidth * 0.8}
          height={
            isMobile ? window.innerHeight * 0.7 : window.innerHeight * 0.8
          }
          onMouseDown={handleStartDrawing}
          onMouseMove={handleDrawing}
          onMouseUp={handleStopDrawing}
          onTouchStart={handleStartDrawing}
          onTouchMove={handleDrawing}
          onTouchEnd={handleStopDrawing}
          ref={stageRef}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            margin: "auto",
            display: "block",
          }}
        >
          <Layer>
            <Image
              image={image}
              ref={imageRef}
              draggable={mode === "move"}
              onDragStart={() => setIsDrawing(false)}
              onDragEnd={() => setIsDrawing(false)}
            />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="red"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
        </Stage>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1em",
          }}
        >
          <Button variant="contained" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

EditableImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditableImage;
