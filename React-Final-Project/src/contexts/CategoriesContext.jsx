import React, { createContext, useState, useEffect } from 'react';

const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/admin/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); 

  return (
    <CategoryContext.Provider value={{ categories,fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
