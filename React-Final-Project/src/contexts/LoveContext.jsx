import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserContext from './UserContext';
import { GradientCircularProgress } from './../components/loader/Loader';

export const LoveContext = createContext();

const LoveProvider = ({ children }) => {
    const [love, setLove] = useState(0);
    const [selectedLove, setSelectedLove] = useState([]);
    const [favorites, setFavorites] = useState([]);
    // const [loading, setLoading] = useState(false); // Add loading state
    const { userData } = useContext(UserContext);

    useEffect(() => {
        getFavorite();
    }, []);

    const getFavorite = async () => {
        // setLoading(true); // Start loading
        try {
            const response = await axios.get("http://127.0.0.1:3000/api/v1/auth/favorites", {
                headers: {
                    "Content-Type": "application/json",
                    jwt: localStorage.getItem("token"),
                },
            });
            setFavorites(response?.data?.result);
            setLove(response?.data?.result?.length);
            setSelectedLove(response?.data?.result?.map(product => product._id));
        } catch (error) {
            setFavorites([]);
            setLove(0);
            setSelectedLove([]);
            console.error("Error fetching favorites:", error);
        } finally {
            // setLoading(false); // Stop loading
        }
    };

    const handleLoveClick = async (product) => {
        const token = localStorage.getItem('token');
        if (token) {
            // setLoading(true); // Start loading
            try {
                if (selectedLove?.includes(product._id)) {
                    await axios.delete("http://127.0.0.1:3000/api/v1/auth/remove-favorite", {
                        headers: {
                            "Content-Type": "application/json",
                            jwt: token
                        },
                        data: {
                            productId: product._id
                        }
                    });
                    setSelectedLove(selectedLove.filter(id => id.toString() !== product._id.toString()));
                    setLove(love - 1);
                    // await getFavorite()
                } else {
                    const response = await axios.post("http://127.0.0.1:3000/api/v1/auth/add-favorite", { productId: product._id }, {
                        headers: {
                            "Content-Type": "application/json",
                            jwt: token,
                        },
                    });
                    setSelectedLove([...selectedLove, product._id]);
                    setLove(love + 1);
                    // await getFavorite()
                }
            } catch (error) {
                console.error("Error updating favorite:", error);
            } finally {
                // setLoading(false); // Stop loading
            }
        } else {
            toast.error('You must log in first');
        }
    };

    return (
        <LoveContext.Provider value={{ love, setLove, handleLoveClick, selectedLove, favorites, getFavorite }}>
            {/* {loading && <GradientCircularProgress />} Display loader */}
            {children}
        </LoveContext.Provider>
    );
};

export default LoveProvider;
