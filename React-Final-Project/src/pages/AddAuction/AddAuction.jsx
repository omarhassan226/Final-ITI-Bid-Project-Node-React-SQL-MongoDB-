/* eslint-disable no-case-declarations */
import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, TextField, Typography, Button } from '@mui/material';
import CustomSelect from './Components/CustomSelect';
import CategoryContext from '../../contexts/CategoriesContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ColorContext from '../../contexts/ColorContext';
import { useNavigate } from 'react-router-dom';
import LoaderContext from '../../contexts/LoaderContext';

export default function AddAuction() {
    const navigate = useNavigate();
    const { categories } = useContext(CategoryContext);
    const { color } = useContext(ColorContext);
    const { loader, setLoader } = useContext(LoaderContext);
    const catgs = categories?.categories?.map(({ _id, title }) => ({ value: _id, label: title })) || [];

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        quantity: '',
        productStatus: '',
        categoryId: '',
        initialValue: '',
        expirationDays: '',
        images: [],
        userId: '6643d585dd8c6b0c1065f2b5',
    });

    const [errors, setErrors] = useState({
        title: '',
        location: '',
        quantity: '',
        productStatus: '',
        categoryId: '',
        initialValue: '',
        expirationDays: '',
        images: '',
    });

    useEffect(() => {
        setLoader(false);
    }, [setLoader]);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'title':
                error = value ? (value.length < 3 ? 'Title must be at least 3 characters long.' : '') : 'This field is required.';
                break;
            case 'initialValue':
                error = value ? (isNaN(value) ? 'Initial Value must be a number.' : (value <= 0 ? 'Initial Value must be greater than 0.' : '')) : 'This field is required.';
                break;
            case 'quantity':
                error = value ? (isNaN(value) ? 'Quantity must be a number.' : (value <= 0 ? 'Quantity must be greater than 0.' : '')) : 'This field is required.';
                break;
            case 'expirationDays':
                error = value ? (isNaN(value) ? 'Expiration Days must be a number.' : (value <= 0 ? 'Expiration Days must be greater than 0.' : '')) : 'This field is required.';
                break;
            case 'location':
                error = value ? (value.length < 5 ? 'Location must be at least 5 characters long.' : '') : 'This field is required.';
                break;
            case 'productStatus':
                error = value ? '' : 'This field is required.';
                break;
            case 'categoryId':
                error = value ? '' : 'This field is required.';
                break;
            case 'images':
                error = formData.images.length > 0 ? '' : 'This field is required.';
                const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
                formData.images.forEach(image => {
                    if (!validFormats.includes(image.type)) {
                        error = 'Only JPEG, PNG, and GIF formats are allowed.';
                    }
                });
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const error = validateField('images', files);
        setErrors({ ...errors, images: error });
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = {};
        Object.keys(formData).forEach(name => {
            const error = validateField(name, formData[name]);
            formErrors[name] = error;
        });

        if (Object.values(formErrors).some(error => error !== '')) {
            setErrors(formErrors);
            toast.error('Please fix the validation errors.');
            return;
        }

        const productForm = new FormData();
        Object.keys(formData).forEach(name => {
            if (name === 'images') {
                formData.images.forEach(image => productForm.append('images', image));
            } else {
                productForm.append(name, formData[name]);
            }
        });

        try {
            const response = await axios.post('http://127.0.0.1:3000/api/v1/add-auction', productForm, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });
            toast.success('Added successfully');
            navigate('/products');
        } catch (err) {
            console.error(err);
            toast.error('Failed to add auction');
        }
    };

    return (
        <Container style={{ marginBottom: '5%' }}>
            <form onSubmit={handleSubmit}>
                <label style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
                    <img
                        src={'../../public/otp_icon_upload.gif'}
                        alt="Upload Photo"
                        style={{ cursor: 'pointer', width: '30%' }}
                    />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Upload Images</Typography>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        required
                    />
                </label>
                {errors.images && <Typography color="error">{errors.images}</Typography>}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Title</Typography>
                        <TextField
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            onBlur={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Initial Value</Typography>
                        <TextField
                            name="initialValue"
                            value={formData.initialValue}
                            onChange={handleChange}
                            onBlur={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}
                            error={!!errors.initialValue}
                            helperText={errors.initialValue}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Quantity</Typography>
                        <TextField
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            onBlur={handleChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            sx={{ mt: 1 }}
                            error={!!errors.quantity}
                            helperText={errors.quantity}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Expiration Days</Typography>
                        <TextField
                            name="expirationDays"
                            value={formData.expirationDays}
                            onChange={handleChange}
                            onBlur={handleChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            sx={{ mt: 1 }}
                            error={!!errors.expirationDays}
                            helperText={errors.expirationDays}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ paddingLeft:'18px'  }}>
                        <Grid item xs={12} sm={6} md={6} sx={{width:'100%',display: 'flex', flexDirection: 'column', alignItems:'center' }}>
                            <Typography variant="h6" sx={{width:'100%'}}>Location</Typography>
                            <TextField
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                onBlur={handleChange}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={6}
                                sx={{ mt: 1, width:'100%' }}
                                error={!!errors.location}
                                helperText={errors.location}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                    <Typography variant="h6">Status</Typography>
                                    <CustomSelect
                                        width={130}
                                        name="productStatus"
                                        value={formData.productStatus}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                        options={[
                                            { value: 'used', label: 'Used' },
                                            { value: 'new', label: 'New' },
                                        ]}
                                        sx={{ mt: 1 }}
                                        error={!!errors.productStatus}
                                        helperText={errors.productStatus}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="h6">Category</Typography>
                                    <CustomSelect
                                        width={130}
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                        options={catgs}
                                        sx={{ mt: 1 }}
                                        error={!!errors.categoryId}
                                        helperText={errors.categoryId}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button style={{ width: '60%' }} type="submit" variant="contained" sx={{
                                    '@media (max-width: 600px)': {
                                        width: '80%'
                                    },
                                    '@media (max-width: 1440px)': {
                                        width: '60%'
                                    }, backgroundColor: color, color: '#ffffff', '&:hover': { backgroundColor: '#fff', color: color, outline: `2px solid ${color}` }
                                }}>
                                    Add Auction Product
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
