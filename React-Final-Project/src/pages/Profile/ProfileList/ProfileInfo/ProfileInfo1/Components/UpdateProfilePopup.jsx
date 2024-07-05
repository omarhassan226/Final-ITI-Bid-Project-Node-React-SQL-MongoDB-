import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import ColorContext from '../../../../../../contexts/ColorContext';

const UpdateProfilePopup = ({ handleChange, open, setOpen, handleProfileUpdate, updatedProfile , setUpdatedProfile}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateAndClose = () => {
        handleProfileUpdate();
        handleClose()
    };
    
const {color} =useContext(ColorContext)

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle sx={{color:color, padding:'20px'}}>Update Your Profile</DialogTitle>
            <DialogContent>
                {/* Section 1 */}
                <Grid container spacing={2} marginBottom={5} sx={{paddingTop:'10px'}}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            value={updatedProfile.email}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ style: { color: color } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                    disabled={true}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="firstName"
                            name='firstName'
                            label="First Name"
                            placeholder='Omar'
                            value={updatedProfile.firstName}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
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
                            placeholder='Hassan'
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Section 2 */}
                <Grid container spacing={2} marginBottom={5} >
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder='+201066035716'
                            value={updatedProfile.phoneNumber}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="birthday"
                            name="birthday"
                            label="Birthday"
                            placeholder='06|22|1997'
                            value={updatedProfile.birthDay}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ style: { color: color } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateAndClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateProfilePopup;
