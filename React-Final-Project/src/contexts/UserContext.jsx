import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import LoaderContext from './LoaderContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const {setLoader} = useContext(LoaderContext)
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [image , setImage] = useState('')
  const fetchUserData = async () => {
setLoader(true)
    try {
        const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage

        // if (!token) {
        //     throw new Error('JWT token not found');
        // }

        const response = await axios.get('http://127.0.0.1:3000/api/v1/auth/get-user', {
            headers: {
              'Content-Type': 'multipart/form-data',
              'jwt': localStorage.getItem('token') // Use Bearer token format
            }
        });
        setUserData(response?.data?.result);
        setImage(response?.data?.result?.imageUrl?.images[0])
        setLoader(false)
      } catch (err) {
        setUserData({})
        setToken('')
        console.error('Error fetching user data:', err);
        setLoader(false)
    }
};

    useEffect(() => {
      setToken(localStorage.getItem('token'))
      
        
    }, [localStorage.getItem('token')]);

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <UserContext.Provider value={{ token, setToken, userData, setUserData , fetchUserData , image }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
