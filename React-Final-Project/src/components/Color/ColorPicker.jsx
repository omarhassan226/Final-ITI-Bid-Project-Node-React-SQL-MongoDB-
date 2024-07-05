import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import ColorContext from "../../contexts/ColorContext";
import { FaCog } from "react-icons/fa";

const colors = [
  "#5daa60",
  "#ff5722",
  "#2196f3",
  "#9c27b0",
  "#09102C",
  "#000",
  "red",
  "blue",
  "gray",
  "blueViolet"
];

const ColorPicker = () => {
  const { color, setColor } = useContext(ColorContext);
  const [show, setShow] = useState(false);

  const handleColorChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          position: "fixed",
          right: show ? "0" : "-150px",
          transition: "right 0.5s ease", // Adjusted transition property
          zIndex: 9,
          flexWrap: "wrap",
          py: "170px" // Shorthand for paddingY
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#ccc",
            color: color,
            padding: 1,
            height: 30,
            mt: 2,
            cursor: "pointer"
          }}
          onClick={() => {
            setShow(!show);
          }}
        >
          <FaCog />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            flexWrap: "wrap",
            py: "10px",
            width: 150,
            backgroundColor: "#ccc"
          }}
        >
          {colors.map((color) => (
            <Box
              display={"flex"}
              key={color}
              sx={{
                display: "flex",
                width: 30,
                height: 30,
                backgroundColor: color,
                cursor: "pointer",
                borderRadius: "50%",
                mx: 0.5,
                mt: 0.5
              }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ColorPicker;
