import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const { token } = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const API_URL = 'http://127.0.0.1:3000/api/v1/auth';

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${API_URL}/addresses`, {
                headers: {
                    "Content-Type": "application/json",
                    "jwt":localStorage.getItem('token')
                },
            });
            setAddresses(response.data);
            (response.data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const addAddress = async (addressData) => {
        try {
            const response = await axios.post(`${API_URL}/add-address`, addressData, {
                headers: {
                    "Content-Type": "application/json",
                    "jwt":localStorage.getItem('token')
                },
            });
            setAddresses([...addresses, response.data]);
            (response.data);
            fetchAddresses()
            
        } catch (error) {
            console.error("Error adding address:", error);
        }
    };

    const deleteAddress = async (id) => {
        try {
            await axios.delete(`${API_URL}/delete-address/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "jwt":localStorage.getItem('token')
                },
            });
            setAddresses(addresses.filter(address => address.id !== id));
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };

    const editAddress = async (id, addressData) => {
        try {
            const response = await axios.post(`${API_URL}/edit-address/${id}`, addressData, {
                headers: {
                    "Content-Type": "application/json",
                    "jwt":localStorage.getItem('token')
                },
            });
            (id);
            setAddresses(addresses.map(address => address.id === id ? response.data : address));
        } catch (error) {
            console.error("Error editing address:", error);
        }
    };

    return (
        <AddressContext.Provider value={{ addresses, addAddress, deleteAddress, editAddress, fetchAddresses }}>
            {children}
        </AddressContext.Provider>
    );
};

export default AddressProvider;