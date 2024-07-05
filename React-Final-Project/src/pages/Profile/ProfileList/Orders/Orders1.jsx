import React, { useContext, useEffect } from 'react';
import { Grid, Avatar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { OrderContext } from '../../../../contexts/OrderContext';


const Orders1 = () => {
    const {userOrders , getUserOrders} = useContext(OrderContext)
    useEffect(()=>{
        getUserOrders()
    },[])
    return (
        <Box sx={{ padding: 4, borderRadius: 2}}>
            <Grid container spacing={2}>
                {userOrders?.orders?.map((order) => (
                    <Grid key={order._id} item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ padding: 2, border: '1px solid #E0E0E0', borderRadius: 2 , boxShadow:'2px 5px 2px 2px rgba(0, 0, 255, .2) ' }}>
                            <Typography variant="h6" sx={{fontWeight:'bold'}}>Order Id</Typography>
                            <Typography variant="subtitle1">{order._id}</Typography>
                            <Typography variant="h6" sx={{fontWeight:'bold'}}>Order Status</Typography>
                            <Typography variant="subtitle1">{order.status}</Typography>
                            <Typography variant="h6" sx={{fontWeight:'bold'}}>Ship To</Typography>
                            <Typography variant="subtitle1">{order.userId.firstName} {order.userId.lastName}</Typography>
                            <Typography variant="h6" sx={{fontWeight:'bold'}}>Total</Typography>
                            <Typography variant="subtitle1">{order.totalAmount} EGP</Typography>

                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Orders1;