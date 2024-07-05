import React, { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);


const fetchNotifications = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/auth/get-notification', {
        headers: {
            'Content-Type': 'multipart/form-data',
            'jwt': localStorage.getItem('token')
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
  
      const data = await response.json();
      ('this is notification',data.result);
      setNotifications(data.result);
    } catch (error) {
      console.error(error);
    }
  };
    

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
