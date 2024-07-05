import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import GreenButton from '../../../../../components/StyledButton/StyedButton';
import ManIcon from '@mui/icons-material/Man';
import Woman2Icon from '@mui/icons-material/Woman2';
import UserContext from '../../../../../contexts/UserContext';
import UpdateProfilePopup from './Components/UpdateProfilePopup';
import axios from 'axios';
import ColorContext from '../../../../../contexts/ColorContext';
import LoaderContext from '../../../../../contexts/LoaderContext';

const ProfileInfo1 = () => {
    const { setLoader } = useContext(LoaderContext);
    const { color } = useContext(ColorContext);
    const { userData, fetchUserData } = useContext(UserContext);
    const [updatedProfile, setUpdatedProfile] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDay: '',
    });
    const [openPopup, setOpenPopup] = useState(false);

    const handleOpen = () => {
        setOpenPopup(true);
    };

    useEffect(() => {
        setLoader(false);
    }, []);

    useEffect(() => {
        const loadData = async () => {
            await fetchUserData();
        };
        loadData();
    }, []);

    useEffect(() => {
        if (userData) {
            setUpdatedProfile({
                email: userData.email || '',
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                phoneNumber: userData.phoneNumber || '',
                birthDay: formatDate(userData.birthDay) || '',
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleProfileUpdate = async () => {
        const userForm = new FormData();
        userForm.append('birthDay', updatedProfile.birthDay);
        userForm.append('phoneNumber', updatedProfile.phoneNumber);
        userForm.append('lastName', updatedProfile.lastName);
        userForm.append('firstName', updatedProfile.firstName);
        userForm.append('email', updatedProfile.email);

        try {
            await axios.put('http://127.0.0.1:3000/api/v1/auth/edit-user', userForm, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': localStorage.getItem('token'),
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date).split('/').join('/');
    };

    return (
        <Box component="main" sx={{ marginTop: '30px' }}>
            <Box bgcolor={'#F4F4F4'} sx={{ boxShadow: '2', padding: '20px' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    color={color}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    fontWeight={"bold"}
                    margin={0}
                    marginBottom={4}
                >
                    Profile info
                </Typography>

                {/* Section 1 */}
                <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            value={updatedProfile.email}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            disabled={true}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={updatedProfile.firstName}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            disabled={true}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={updatedProfile.lastName}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            disabled={true}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Section 2 */}
                <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={updatedProfile.phoneNumber}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            disabled={true}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            id="birthday"
                            name="birthDay"
                            label="Birthday"
                            value={updatedProfile.birthDay}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            disabled={true}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Update Profile */}
                <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={12}>
                        <button className='update-button' onClick={handleOpen} style={{ backgroundColor: color, color: 'white' }}>
                            Update Profile
                        </button>
                    </Grid>
                </Grid>
            </Box>

            {/* Update Profile Popup */}
            {
                openPopup &&
                <UpdateProfilePopup
                    handleProfileUpdate={handleProfileUpdate}
                    updatedProfile={updatedProfile}
                    setUpdatedProfile={setUpdatedProfile}
                    handleChange={handleChange}
                    setOpen={setOpenPopup}
                    open={openPopup}
                />}
        </Box>
    );
};

export default ProfileInfo1;
