/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { LoveContext } from '../../contexts/LoveContext';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import LoaderContext from '../../contexts/LoaderContext';
import cart2Image from '../../../public/8038874_25098.jpg';
const FavoritePage = () => {
    const { favorites, getFavorite } = useContext(LoveContext);
    const { loader, setLoader } = useContext(LoaderContext);

    useEffect(() => {
        getFavorite();
        if(favorites)
        setLoader(false)
    }, []);

    return (

        <div style={{paddingBottom:'5%', padding:'5%' ,backgroundImage:`url(${cart2Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Welcome To Your Wishlist
            </Typography>
            <Grid container spacing={2} >
                {favorites?.length > 0 ? (
                    favorites?.map(product => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    sx={{height:'250px'}}
                                    image={`${product.imagesUrl.images[0]}`}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1">{product.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" sx={{padding:3}} color="textSecondary">
                        No favorite items found. <br/>
                        Careful what you wish for !
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default FavoritePage;
