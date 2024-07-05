/* eslint-disable react-hooks/exhaustive-deps */

import cart2Image from '../../../public/8038874_25098.jpg';
import { useContext, useEffect, useState } from 'react';
import {
    Container,
    Typography,
    IconButton,
    Badge,
    Box,
    Paper,
    Grid,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Avatar
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import ColorContext from '../../contexts/ColorContext';
import LoaderContext from '../../contexts/LoaderContext';

const Cart = () => {
    const {setLoader} = useContext(LoaderContext)
    const { cartItems, updateCartItemQuantity, setCartItems, totalItems, getCart, totalPrice ,addToCart } = useContext(CartContext);
    const { color } = useContext(ColorContext)
    const safeTotalItems = isNaN(totalItems) ? 0 : totalItems;

    const [openDialog, setOpenDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    useEffect(() => { getCart(); setLoader(false)  }, [])


    useEffect(() => {
        ("Fetching cart data...");
console.log(cartItems);
    }, [cartItems]);

    const handleQuantityChange = (id, quantity) => {
        (`Updating quantity for item ${id} to ${quantity}.`);
        updateCartItemQuantity(id, quantity);
    };

    const handleDelete = async (id) => {
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
            getCart()
            if (response.status === 200) {
                (`Item ${id} deleted successfully.`);
                setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const confirmDelete = () => {
        ("Confirming item deletion.");
        handleDelete(deleteItemId);
        setOpenDialog(false);
        setDeleteItemId(null);
    };

    const handleDialogClose = () => {
        ("Closing dialog.");
        setOpenDialog(false);
        setDeleteItemId(null);
    };

    ("Rendering Cart component.");


    const navigate = useNavigate();
    // const totalPrice = cartItems?.reduce((acc, curr) => (acc + curr.productId?.price)*curr.quantity, 0);
    const Tax = 50;
    const totalCash = totalPrice + Tax;

    return (
        <Box sx={{backgroundImage:`url(${cart2Image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

        <Container sx={{ paddingTop: '3%' }}>
            <Box sx={{ color: color }}>
                <Box display="flex" alignItems="center" mb={2} justifyContent={'space-between'} borderBottom={`2px solid ${color}`}>
                    <Box sx={{ display: 'flex' }}>
                        <ShoppingCartIcon fontSize="large" />
                        <Typography variant="h4" ml={1}>Shopping Cart</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: "26px", height: '35px', backgroundColor: color, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                            {cartItems?.length}
                        </Box>
                        <Typography variant="h4" ml={1}>Items</Typography>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {
                            cartItems.length === 0 && (
                                <Typography variant="h5" ml={1}>No Items in the cart !!</Typography>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {cartItems?.map(item => (
                            <Paper key={item.productId?._id} sx={{ p: 2, marginBottom: '25px', border: `2px solid ${color}` }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={2} height={"100px"}>
                                        <Avatar variant="square" src={`${item.productId?.imagesUrl.images[0]}`} sx={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <Grid item xs={12} md={3}>
                                                <Typography>Title - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.productId?.title}</Typography></Typography>
                                                {/* <Typography>Size - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.size}</Typography></Typography> */}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Typography>City - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.productId?.location}</Typography></Typography>
                                                {/* <Typography>Size - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.size}</Typography></Typography> */}
                                            </Grid>
                                          
                                            <Grid item xs={12} md={3}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.productId?.price} EGP</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Typography
                                                    type="number"
                                                    variant='h6'
                                                    inputProps={{ min: 1 }}
                                                    sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}
                                                    fullWidth
                                                >quantity:
                                                <Typography>{item.quantity}</Typography>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                        <IconButton sx={{ fontWeight: 'bold', fontSize: '17px', color: color }} color="secondary" onClick={() => { setDeleteItemId(item._id); setOpenDialog(true); }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ borderLeft: `2px solid ${color}`, borderBottom: `25px solid ${color}`, borderTop: `25px solid ${color}`, borderRight: `2px solid ${color}`, marginBottom: '40px', padding: '8px 60px', fontWeight: 'bold', width: '100%' }} variant="contained" color="primary">
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '20px', color: color, borderBottom: `2px solid ${color}` }}>
                                Order Summary
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: color, borderBottom: `2px solid ${color}` }}>
                                <Typography>Items Price</Typography>
                                <Typography>
                                    {totalPrice} EGP
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: color, borderBottom: `2px solid ${color}` }}>
                                <Typography>Added Tax</Typography>
                                <Typography>
                                    {Tax} EGP
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: color, borderBottom: `2px solid ${color}` }}>
                                <Typography>Total</Typography>
                                <Typography>
                                    {totalCash} EGP
                                </Typography>
                            </Box>
                        </Box>
                        {
                            cartItems.length !== 0 && (

                                <Button onClick={() => navigate('/placeOrder')} sx={{ backgroundColor: color, marginBottom: '40px', fontWeight: 'bold', width: '100%', '&:hover': { backgroundColor: '#09103f' } }} variant="contained">
                                    Checkout
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>

                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this item from the cart?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
                        </Box>
    );
};

export default Cart;
