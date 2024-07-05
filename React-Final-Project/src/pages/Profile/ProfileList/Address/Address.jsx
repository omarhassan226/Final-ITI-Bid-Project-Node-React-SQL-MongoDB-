import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CardActions, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddAddressForm from './Components/AddAddressForm';
import EditAddressForm from './Components/EditAddressForm';
import { AddressContext } from '../../../../contexts/AddressContext';
import ColorContext from '../../../../contexts/ColorContext';

const Address = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const { color } = useContext(ColorContext)

    const { deleteAddress, fetchAddresses, addresses, setAddresses } = useContext(AddressContext);



    useEffect(() => {
        // fetchAddresses();
    }, []);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = async (address) => {
        setEditingAddress(address);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setEditingAddress(null);
        setOpenEdit(false);
    };

    return (
        <Container sx={{ width: '100%' }}>
            <Typography sx={{ padding: '10px' }} variant="h5" gutterBottom>
                Your Addresses
            </Typography>
            {!editingAddress && !openAdd && (
                <Grid container spacing={2} sx={{ padding: '10px' }}>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={handleOpenAdd}
                            sx={{
                                color: color,
                                fontWeight: 'bold',
                                fontSize: '20px',
                                border: `1px solid ${color}`,
                                borderStyle: 'dashed',
                                width: '100%',
                                height: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h1" component="span">+</Typography>
                            <Typography component="span">Add Address</Typography>
                        </Button>
                    </Grid>
                    {addresses && addresses?.map((address) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={address._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '100%', border: `1px solid ${color}`, borderRadius: '10px' }}>
                                <CardContent sx={{ lineHeight: '20px' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1" color={color} gutterBottom>
                                            Country
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
                                            {address.country}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1" color={color} gutterBottom>
                                            City
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
                                            {address.city}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1" color={color} gutterBottom>
                                            Street
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
                                            {address.street}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1" color={color} gutterBottom>
                                            ZIP
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
                                            {address.zip}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '18px' }}>

                                    <EditLocationAltIcon sx={{cursor:'pointer'}} variant="contained" color="primary" size="small" onClick={() => handleOpenEdit(address)}/>

                                    <DeleteForeverIcon sx={{cursor:'pointer'}} color="error" size="small" onClick={async () => { await deleteAddress(address._id); await fetchAddresses() }}/>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            {openAdd && <AddAddressForm open={openAdd} handleClose={handleCloseAdd} />}
            {editingAddress && <EditAddressForm open={openEdit} handleClose={handleCloseEdit} address={editingAddress} />}
        </Container>
    );
};

export default Address;

