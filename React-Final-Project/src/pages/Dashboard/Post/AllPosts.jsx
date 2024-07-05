import React, {  useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Fab } from '@mui/material';
import { Edit, Delete, Add as AddIcon, PostAdd } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

import ProductsContext from '../../../contexts/ProductsContext'
import axios from 'axios';
import ColorContext from '../../../contexts/ColorContext';
import PostsContext from '../../../contexts/PostsContext';

const AllPosts = () => {
    const {PostsData, fetchPostsData} = useContext(PostsContext)
const {products,fetchProducts} = useContext(ProductsContext)
const {color} = useContext(ColorContext)
    const handleDelete =async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:3000/api/v1/auth/blogs/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        jwt: localStorage.getItem("token"),
                    },
                }
            );
            (response);
            fetchPostsData()
          
        } catch (error) {
            console.error("Error fetching Posts history:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '16px', backgroundColor: '#fff', color: '#fff' }}>
            <Typography variant="h5" gutterBottom sx={{ color: color }}>
             </Typography>
            <Grid container spacing={2}>
                {PostsData?.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ backgroundColor: '#fff',padding:'5px' ,border:`1px solid ${color}` }}>
                            <CardMedia
                                component="img"
                                height="340"
                                image={product?.author?.imageUrl?.images[0]}
                                alt={product.title}
                                sx={{height:'250px'}}a
                            />
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6">{product.title}</Typography>
                                    <Typography variant="h6" color="#fff">
                                        {product.price}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '8px' }}>
                                    <IconButton onClick={() => handleDelete(product._id)} sx={{color:color}} ><AutoDeleteIcon /></IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* Repeat for other categories */}
            {/* <Fab color="primary" aria-label="add" sx={{ height: '6%', width: '3%', position: 'fixed', top: 139, right: 16, background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' }}>
                <AddIcon />
            </Fab> */}
        </Box>
    );
};

export default AllPosts;
