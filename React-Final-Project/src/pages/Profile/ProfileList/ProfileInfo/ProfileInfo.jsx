import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import ProfileInfo1 from "./ProfileInfo1/ProfileInfo1";

function ProfileInfo({ handleOpen, handleClose, handleChange, handleConfirm,  userData = { firstName: '', email: '',lastName:'' , birthDay:'',phoneNumber:'' }, open, selectedIndex }) {
    return (
        <>
            <Stack component="main" sx={{ marginTop: '5%' }}>
                {
                    selectedIndex === 0 && (
                        <>
                            <Container>
                                {/* profile-Avatar */}
                                <ProfileAvatar />

                                {/* Profile-Info */}
                                <ProfileInfo1  handleOpen={handleOpen} />
                            </Container>
                        </>
                    )
                }

                {/* Confirm Profile Updates */}
                {
                    open && (
                        <div>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Edit Data</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        id="name"
                                        label="Name"
                                        name='firstName'
                                        type="text"
                                        fullWidth
                                        value={userData.firstName}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        id="name"
                                        label="Email"
                                        name='email'
                                        type="text"
                                        fullWidth
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button  onClick={handleConfirm}>Confirm</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    )
                }
            </Stack>
        </>
    )
}

export default ProfileInfo;
