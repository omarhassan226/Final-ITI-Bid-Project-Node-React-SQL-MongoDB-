import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Menu, MenuItem, Typography, Grid, Box, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import ColorContext from '../../../contexts/ColorContext';
import PostsContext from '../../../contexts/PostsContext'

const Post = ({ post }) => {
    const { userData } = useContext(UserContext);
    const { color } = useContext(ColorContext);
    const { fetchPostsData, deletePost } = useContext(PostsContext)
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };


    useEffect(() => {
    }, [])

    const handleCommentSubmit = async () => {
        const comment = { userId: userData._id, content: commentText , blog:post._id, author: userData._id  };

        try {
            await axios.post(`http://127.0.0.1:3000/api/v1/auth/blogs/${post._id}/comments`, comment, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': localStorage.getItem('token')
                }
            });
            setCommentText("");
            setOpen(false);
            fetchPostsData()
        } catch (err) {
            console.error('Error adding comment:', err.response ? err.response.data : err);
        }
    };


const fetchPostComments=async (post)=>{
    
    try {
      const response=  await axios.get(`http://127.0.0.1:3000/api/v1/comments/${post._id}`,  {
            headers: {
                'Content-Type': 'application/json',
                'jwt': localStorage.getItem('token')
            }
        });
        setComments(response.data)
    } catch (err) {
        console.error('Error adding comment:', err.response ? err.response.data : err);
    }

}

    const handleClickOpen = async(post) => {
        await fetchPostComments(post)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // const handleDelete = () => {
    //     // Add delete functionality here
    //     ('Delete post:', post.id);
    //     handleMenuClose();
    // };


    return (
        <Grid item xs={12} sm={12} md={12} height={"100%"}>
            <Card sx={{ borderRadius: '5px', marginBottom: '20px', height: '100%' }}>
                <CardContent sx={{ height: '100%' }}>
                    <Grid container spacing={2} height={"100%"}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={post?.author.imageUrl?.images[0]} alt="Post" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                    <Typography sx={{width:'100%'}} variant="body1">{post?.author.firstName || 'User Name'} {post?.author.lastName}</Typography>
                                </Box>

                                {userData?._id == post?.author?._id && (
                                    <>
                                        <IconButton
                                            aria-label="more"
                                            aria-controls={menuOpen ? 'long-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleMenuClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={anchorEl}
                                            open={menuOpen}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: 48 * 4.5,
                                                    width: '20ch',
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={() => deletePost(post._id)}>Delete</MenuItem>

                                        </Menu>
                                    </>
                                )}


                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {post?.imagesUrl?.images[0] && (
                                <img src={post.imagesUrl.images[0]} alt="Post" style={{ width: '100%', height: '50vh' }} />
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{textAlign:'left', display:'flex', justifyContent:'flex-start'}}>
                            <Typography>{post?.content}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button sx={{ backgroundColor: color, color: 'white', "&:hover": { color: color, backgroundColor: 'white', outline: `2px solid ${color}` } }} onClick={()=>{handleClickOpen(post)}}>
                                Show Comments
                            </Button>
                            <Dialog open={open} onClose={handleClose} fullWidth>
                                <DialogTitle>Comments</DialogTitle>
                                <DialogContent>
                                    {comments?.map(comment => (
                                         <Box display="flex" alignItems="center" mb={2} p={2} bgcolor="#f9f9f9" borderRadius={1}>
                                         <Avatar src={comment?.author?.imageUrl?.images[0]} alt={comment?.author?.firstName} sx={{ mr: 2 }} />
                                         <Box>
                                           <Typography variant="subtitle2" fontWeight="bold">
                                             {comment?.author?.firstName}
                                           </Typography>
                                           <Typography variant="body2">
                                             {comment?.content}
                                           </Typography>
                                         </Box>
                                       </Box>
                                    ))}
                                    <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <TextField
                                            label="Write a comment..."
                                            value={commentText}
                                            onChange={handleCommentChange}
                                            fullWidth
                                            required
                                        />
                                        <Button type="submit" sx={{ backgroundColor: color, color: 'white', "&:hover": { color: color, backgroundColor: 'white', outline: `2px solid ${color}` } }} variant="contained">Comment</Button>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} sx={{ backgroundColor: color, color: 'white', "&:hover": { color: color, backgroundColor: 'white', outline: `2px solid ${color}` } }}>
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Post;
