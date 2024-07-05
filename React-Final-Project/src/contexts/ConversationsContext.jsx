import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
    const { userData } = useContext(UserContext);
    const [Conversations, setConversations] = useState([]);
    
    const API_URL = 'http://127.0.0.1:3000/api/v1/auth';

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
          try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/conversation",
        { sender: userData?._id }
      );
      const x = await response.data;
      setConversations(x);
      return x.length;
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
    };


    return (
        <ConversationContext.Provider value={{ Conversations }}>
            {children}
        </ConversationContext.Provider>
    );
};

export default ConversationProvider;