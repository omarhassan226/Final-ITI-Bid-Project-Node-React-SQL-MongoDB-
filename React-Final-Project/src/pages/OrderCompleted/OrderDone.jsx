import React, { useContext, useEffect } from 'react';
import { Typography, Container, Box, styled } from '@mui/material';
import { OrderContext } from '../../contexts/OrderContext';
import LoaderContext from '../../contexts/LoaderContext';

const useStyles = styled((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url('background_image_url')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: theme.spacing(2),
    },
    content: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    image: {
        width: '50%',
    },
}));

const OrderDone = () => {
    const { orders, userOrders, createOrder, getOrder, getUserOrders, setOrders} = useContext(OrderContext);

    const classes = useStyles();
const {setLoader}= useContext(LoaderContext)
    useEffect(() => {
        getUserOrders()
        setLoader(false)
    }, []);

    return (
        <Container className={classes.root} sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Box>
            <Typography variant="h4" className={classes.content} gutterBottom>
                Relax, your order is on the way!
            </Typography>
            <img src="orderPlaceDone.png" alt="Order placed" className={classes.image} />
        </Box>

            <Box mt={4} width="100%">
                {
                    userOrders?.orders?.map((order) => (
                        <Container key={order._id} sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                            <Typography variant="h5" gutterBottom>
                                Order Details
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Order ID: {order._id}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Total Amount: {order.totalAmount.toFixed(2)} EGP
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Status: {order.status}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Products:
                            </Typography>
                            <ul>
                                {order?.items?.map((item) => (
                                    <li key={item?.productId?._id}>
                                        Quantity: {item?.quantity}
                                    </li>
                                ))}
                            </ul>
                        </Container>
                    ))
                }
            </Box>
        </Container>
    );
};

export default OrderDone;
