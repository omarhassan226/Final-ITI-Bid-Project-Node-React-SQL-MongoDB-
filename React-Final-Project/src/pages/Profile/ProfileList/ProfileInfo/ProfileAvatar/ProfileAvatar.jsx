import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ColorContext from '../../../../../contexts/ColorContext';
import axios from 'axios';
import UserContext from '../../../../../contexts/UserContext';

const ProfileAvatar = () => {
  const { color } = useContext(ColorContext);
  const [userForm, setUserForm] = useState(new FormData()); // Use state to track userForm
const {userData,fetchUserData} = useContext(UserContext)

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    (files);

    const updatedForm = new FormData(); // Create a new FormData object
    files.forEach((image) => {
      updatedForm.append('images', image);
    });
    setUserForm(updatedForm); // Update userForm state
  };

useEffect(()=>{
    (userData);
},[])

  const handleImage = async () => {
    try {
      const response = await axios.put(
        'http://127.0.0.1:3000/api/v1/auth/edit-user-image',
        userForm, // Pass userForm to the request
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            jwt: localStorage.getItem('token'),
          },
        }
      );
      (response);
      fetchUserData()
    } catch (err) {
      console.error('Error adding photo:', err.response ? err.response.data : err);
    }
  };
  return (
    <Box sx={{ textAlign: 'center', backgroundColor: '#F4F4F4', boxShadow: '2', padding: '20px' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
        <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <img
              src={userData?.imageUrl?.images[0]}
              alt="Upload Photo"
              style={{ cursor: 'pointer', width: '150px', height:'150px' , borderRadius:'50%' }}
            />
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '10px' }}></Typography>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
              required
            />
          </label>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: color, fontWeight: 'bold' }}>{userData?.firstName} {userData?.lastName}</Typography>
          {/* <Typography variant="h6" sx={{ color: color, fontWeight: 'bold' }}>Ismailia, EG</Typography> */}
        </Grid>
        <Grid item xs={12}>
        
          <Button  sx={{ backgroundColor: 'white', color: color, '&:hover':{backgroundColor:color , color:'white' , outline:'2px solid white'} }} onClick={handleImage}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileAvatar;
