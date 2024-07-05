import React, { createContext, useState, useEffect } from 'react';
import { lighten, darken } from 'polished';
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {

  const [color, setColor] = useState('#09102C');


  const lightColor = lighten(0.2, color);
  
  // const handleItemClick = (item) => {
  //     setSelectedItem(item);
  //     onMenuItemClick(item);
  // };


  return (
    <ColorContext.Provider value={{ color, setColor ,lightColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
