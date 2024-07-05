import React, { useState, useContext, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';
import LoaderContext from '../../contexts/LoaderContext';
import CategoryContext from '../../contexts/CategoriesContext';
import cart2Image from '../../../public/8038874_25098.jpg';
export default function Categories1() {
    const [flipped, setFlipped] = useState({});
    const navigate = useNavigate();
    const { color } = useContext(ColorContext);
    const { loader, setLoader } = useContext(LoaderContext);
    const { categories, fetchCategories } = useContext(CategoryContext);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (categories?.categories) {
            setLoader(false);
        }
    }, [categories, setLoader]);

    const handleNavigate = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <Box sx={{backgroundImage:`url(${cart2Image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '16px'  }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Categories
            </Typography>
            <Grid container spacing={2}>
                {categories?.categories?.map((category) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={category._id} sx={{ display: 'flex' }}>
                        <Card
                            sx={{
                                width: '100%',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                margin: 1,
                                height: 330,
                                perspective: '1000px',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleNavigate(category._id)}
                        >
                            <div style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s', transformStyle: 'preserve-3d', transform: flipped[category._id] ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden' }}>
                                    <CardMedia sx={{ height: 140 }} image={category.imageUrl.images[0]} />
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                            {category.title}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ marginBottom: 1 }}>
                                            {category.price}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {category.description}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
                </Box>
    );
}
