// src/AddPost.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from '@mui/material';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import ColorContext from '../../../contexts/ColorContext';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PostsContext from '../../../contexts/PostsContext';

const AddPost = () => {
    const { userData } = useContext(UserContext);
    const { color } = useContext(ColorContext);
    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const {fetchPostsData} = useContext(PostsContext)
    const navigate = useNavigate();

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setPostContent('');
        setPostTitle('');
        setImageFiles([]);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
    };

    useEffect(()=>{
        fetchPostsData()
    },[]) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('content', postContent);
        formData.append('author', userData._id);
        imageFiles.forEach(file => formData.append('images', file));

        try {
           const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/blogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token'),
                },
            });
            (response);
            handleClose();

            
         await   fetchPostsData()
        } catch (err) {
            console.error('Error adding post:', err.response ? err.response.data : err);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', my: 2, width:"10%"}}>
            <IconButton onClick={handleClickOpen} sx={{ backgroundColor: color, color: 'white', mt: 'auto',"&:hover":{color:color, backgroundColor:'white', outline:`2px solid ${color}`}, padding:'10px' }}>
                <FaPen />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ backgroundColor: color, color: 'white' }}>Add a New Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <TextField
                            label="Post Title"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Post Content"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                        <input
                            type="file"
                            id="upload-file"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload-file">
                            <Button variant="outlined" component="span" sx={{ color }}>
                                Upload Images
                            </Button>
                        </label>
                        {imageFiles.length > 0 && (
                            <Typography variant="body2" color="textSecondary">
                                {imageFiles.length} file(s) selected
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" sx={{ backgroundColor: color, color: 'white' }}>
                            Add Post
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" sx={{ color }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddPost;
