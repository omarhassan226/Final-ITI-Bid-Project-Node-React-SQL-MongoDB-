
import React from 'react';
import { Box, Typography, Button, Grid, Avatar } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

const orders = [
    {
        id: '1',
        orderPlaced: '9 Mar 2024',
        total: '23.900',
        shipTo: 'Sara Ayman',
        items: [
            {
                _id: '123',
                folderName: 'macbook',
                imagesUrl: { images: ['macbook.jpg'] },
                description: "Macbook Air MGN63 13'' Apple M1 Chip With 8-Core Processor"
            },
        ],
    },
    {
        id: '2',
        orderPlaced: '9 May 2024',
        total: '23.900',
        shipTo: 'Sara Ayman',
        items: [
            {
                _id: '124',
                folderName: 'clothes',
                imagesUrl: { images: ['clothes.jpg'] },
                description: 'T-Shirt, Pants and shoes by Pull&Bear'
            },
        ],
    },
    {
        id: '3',
        orderPlaced: '9 Jun 2024',
        total: '23.900',
        shipTo: 'Sara Ayman',
        items: [
            {
                _id: '125',
                folderName: 'jacket',
                imagesUrl: { images: ['jacket.jpg'] },
                description: 'Cool leather jacket for everyday use water proof'
            },
        ],
    },
];

const OrderDetails = () => {
    const { id } = useParams();
    const order = orders.find((order) => order.id === id);

    // if (!order) {
    //     return <Typography variant="h6">Order not found</Typography>;
    // }

    return (
        <Box sx={{ padding: 4, backgroundColor: '#E5F6E5', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 4 }}>Order Details</Typography>
            <Grid container spacing={2}>
                {order?.items.map((item) => (
                    <Grid key={item._id} item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ padding: 2, border: '1px solid #E0E0E0', borderRadius: 2 }}>
                            <Avatar
                                variant="square"
                                src={`/images/${item.folderName}/${item.imagesUrl.images[0]}`}
                                sx={{ width: '100%', height: '200px', borderRadius: 2, marginBottom: 2 }}
                            />
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                {item.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" component={Link} to="/order" sx={{ backgroundColor: '#66BB6A', color: 'white', marginTop: 4 }}>
                Back to Orders
            </Button>
        </Box>
    );
};

export default OrderDetails;

