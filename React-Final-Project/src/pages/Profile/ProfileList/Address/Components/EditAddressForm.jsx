import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import ColorContext from '../../../../../contexts/ColorContext';
import { AddressContext } from '../../../../../contexts/AddressContext';
import UserContext from '../../../../../contexts/UserContext';

const EditAddressForm = ({ open, handleClose, address }) => {
    const { color } = useContext(ColorContext);
    const { editAddress, fetchAddresses } = useContext(AddressContext);
    const { userData } = useContext(UserContext);

    const [formData, setFormData] = useState({
        userId: '',
        id: '',
        street: '',
        city: '',
        zip: '',
        country: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (address) {
            setFormData({
                userId: address.userId._id,
                id: address._id,
                street: address.street || '',
                city: address.city || '',
                zip: address.zip || '',
                country: address.country || '',
            });
        }
    }, [address]);

    useEffect(() => {
        fetchAddresses();
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateField = (name, value) => {
        let tempErrors = { ...errors };

        switch (name) {
            case 'street':
            case 'city':
            case 'country':
                tempErrors[name] = /^[A-Za-z0-9\s]+$/.test(value) ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} should contain only characters`;
                break;
            case 'zip':
                tempErrors.zip = /^\d+$/.test(value) ? '' : 'ZIP should contain only numbers';
                break;
            default:
                break;
        }

        setErrors(tempErrors);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.street = /^[A-Za-z0-9\s]+$/.test(formData.street) ? '' : 'Street should contain only characters';
        tempErrors.city = /^[A-Za-z0-9\s]+$/.test(formData.city) ? '' : 'City should contain only characters';
        tempErrors.zip = /^\d+$/.test(formData.zip) ? '' : 'ZIP should contain only numbers';
        tempErrors.country = /^[A-Za-z0-9\s]+$/.test(formData.country) ? '' : 'Country should contain only characters';

        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            await editAddress(address._id, formData);
            await fetchAddresses();
            handleClose();
        }
    };

    if (!open) return null;

    return (
        <Container component="main">
            <Paper style={{ padding: 20 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Address
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="street"
                        label="Street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.street}
                        helperText={errors.street}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.city}
                        helperText={errors.city}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="zip"
                        label="ZIP"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.zip}
                        helperText={errors.zip}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.country}
                        helperText={errors.country}
                    />
                    <Button
                        sx={{ backgroundColor: color, "&:hover": { color: color, backgroundColor: 'white', outline: `2px solid ${color}` } }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Save Changes
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditAddressForm;
