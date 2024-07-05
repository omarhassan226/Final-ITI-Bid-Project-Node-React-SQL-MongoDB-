import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const totalPrice = cartItems?.reduce((acc, curr) => (acc + curr.productId?.price)*curr.quantity, 0);

    const { token } = useContext(UserContext)
    useEffect(() => {
        if (token) {
            getCart();
        }

    }, []);

    const getCart = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/v1/auth/cart', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });
            setCartItems(response.data.cart);
            (cartItems);

        } catch (err) {
            console.error(err);
            alert('Failed to fetch cart items');
        }
    };


    const deleteCartItem = async (id) => {
        try {
            ("Deleting item from cart...");
            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/auth/remove-from-cart',
                { cartId: id },
                {
                    headers: {
                        'Content-Type': 'application/json', // Adjust content type as necessary
                        jwt: localStorage.getItem('token'),
                    },
                }
            );
            console.log(response);
            getCart()
            if (response.status === 200) {
                (`Item ${id} deleted successfully.`);
                setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    async function addToCart(productId) {
        const productForm = new FormData();
        productForm.append("productId", productId);
        
            const itemExists =  cartItems.filter(cartItem => cartItem.productId._id === productId);

            if (itemExists.length ==0) {
              console.log(itemExists);
              console.log(cartItems);
            //  await addToCart(product._id);
             await  getCart();
             toast.success('Added successfully');
            } else {
                console.log(itemExists);
              await  deleteCartItem(itemExists[0]._id);
                await  getCart();
              toast.error('Deleted from cart');
                return;
            }
          
          





        if (token) {

            try {
                const token = localStorage.getItem("token");
                (token);
                const response = await axios.post(
                    "http://127.0.0.1:3000/api/v1/auth/add-to-cart",
                    productForm,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            jwt: token,
                        },
                    }
                );
                getCart()
// toast.success('product added successfully')
            } catch (err) {
                console.error(err);
            }


        }
        else {
            toast.error('you must login first')
        }
    }

    const deleteAllCartItems = async () => {
        if (token) {
            try {
                await axios.delete('http://127.0.0.1:3000/api/v1/auth/delete-cart', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'jwt': localStorage.getItem('token')
                    }
                });
                setCartItems([]);
                toast.success('Order done successfully');
            } catch (err) {
                console.error(err);
                toast.error('Failed to complete the order');
            }
        } else {
            toast.error('You must log in first');
        }
    };

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId._id === id ? { ...item, quantity } : item
            )
        );
    };

    const totalItems = 0

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, totalItems,deleteCartItem, setCartItems, getCart, deleteAllCartItems,totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
