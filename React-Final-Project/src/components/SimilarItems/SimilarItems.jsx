import React from 'react';
import { Badge, Box, Card, CardContent, CardMedia, IconButton, Typography, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SimilarItems = ({ products }) => {
    const productList = products?.products?.slice(0, 4);

    return (
        <Box mt={4}>
            <Grid container spacing={2}>
                {Array.isArray(productList) && productList.length > 0 ? (
                    productList.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="270"
                                    image={`${product?.imagesUrl?.images[0]}`}
                                    alt={product.title}
                                />
                                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1">{product.title}</Typography>
                                    <IconButton color="inherit">
                                        <Badge sx={{ color: 'green' }}>
                                            <FavoriteBorderIcon />
                                        </Badge>
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="textSecondary">
                        No similar items found.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default SimilarItems;
