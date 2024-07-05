import React, { useContext, useEffect, useState } from 'react';
import Post from './components/post';
import AddPost from './components/AddPost';
import PostsContext from '../../contexts/PostsContext';
import { Box, Container, Grid, Typography } from '@mui/material';
import ColorContext from '../../contexts/ColorContext';
import LoaderContext from '../../contexts/LoaderContext';


const PostsPage = () => {
    const { color } = useContext(ColorContext);
    const [posts, setPosts] = useState([]);
    const { PostsData ,fetchPostsData} = useContext(PostsContext);
    const {loader ,setLoader} = useContext(LoaderContext)
 
    useEffect(()=>{
        if(PostsData){
            setLoader(false)
        }
    },[PostsData])

    const addPost = (newPost) => {
        newPost.id = posts.length + 1;
        setPosts([...posts, newPost]);
    };

    return (

            <Box sx={{            
                backgroundImage: 'url("/back2.jpg")', 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center', 
                minHeight: '100vh',
                padding: 3, 
                width: '100%',
                margin: 'auto', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' }}>
                <Box sx={{ display: 'flex', width: '80%', margin: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img src="../../../public/posts logo.png" style={{ width:"20%"}} alt="Posts Logo" />
                    <AddPost addPost={addPost}  />
                </Box>
                <Grid container spacing={3} sx={{ width: '80%', marginTop: 2 }}>
                    {PostsData?.map(post => (
                        <Grid  item xs={12} sm={6} md={4} key={post._id}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
    );
};

export default PostsPage;
