import React, { createContext, useState } from 'react';
const LoaderContext = createContext();
export const LoaderProvider = ({ children }) => {

  const [loader, setLoader] = useState(true);

  return (
    <LoaderContext.Provider value={{ loader, setLoader}}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
