import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import CustomSelect from '../AddAuction/Components/CustomSelect';
import CategoryContext from '../../contexts/CategoriesContext';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';
import styled from 'styled-components';
import LoaderContext from '../../contexts/LoaderContext';
import "./AddProduct.css";
import { toast } from 'react-toastify';

export default function AddProduct() {
  const { color, lightColor } = useContext(ColorContext);
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext);
  const { token } = useContext(UserContext);
  const catgs = categories?.categories?.map(({ _id, title }) => ({ value: _id, label: title })) || [];
  const {loader, setLoader} = useContext(LoaderContext)

  const StyledSpan = styled.span`
    width: 100px;
    height: 100px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    margin: 50px 100px;
    background-color: #eee;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      height: 40px;
      transform: rotate(45deg) translate(30%, 40%);
      background: ${color};
      box-shadow: 32px -34px 0 5px ${color};
      animation: slide 2s infinite ease-in-out alternate;
    }

    &::after {
      content: "";
      position: absolute;
      left: 10px;
      top: 10px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: ${color};
      transform: rotate(0deg);
      transform-origin: 35px 145px;
      animation: rotate 2s infinite ease-in-out;
    }

    @keyframes slide {
      0%, 100% { bottom: -35px }
      25%, 75% { bottom: -2px }
      20%, 80% { bottom: 2px }
    }

    @keyframes rotate {
      0% { transform: rotate(-15deg) }
      25%, 75% { transform: rotate(0deg) }
      100% { transform: rotate(25deg) }
    }
  `;

  useEffect(() => {}, [categories, token]);

  useEffect(() => {
    setLoader(false);
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    location: '',
    images: [],
    quantity: '',
    productStatus: '',
    categoryId: '',
    price: '',
    productDetails: '',
    userId: '6643d585dd8c6b0c1065f2b5',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (field = null) => {
    let tempErrors = { ...errors };

    const validateField = (name, value) => {
      switch (name) {
        case 'title':
          tempErrors.title = value ? "" : "This field is required.";
          if (value && value.length < 3) tempErrors.title = "Title must be at least 3 characters long.";
          break;
        case 'price':
          tempErrors.price = value ? "" : "This field is required.";
          if (value && isNaN(value)) tempErrors.price = "Price must be a number.";
          if (value && value <= 0) tempErrors.price = "Price must be greater than 0.";
          break;
        case 'quantity':
          tempErrors.quantity = value ? "" : "This field is required.";
          if (value && isNaN(value)) tempErrors.quantity = "Quantity must be a number.";
          if (value && value <= 0) tempErrors.quantity = "Quantity must be greater than 0.";
          break;
        case 'productDetails':
          tempErrors.productDetails = value ? "" : "This field is required.";
          if (value && value.length < 3) tempErrors.productDetails = "product details must be at least 3 characters long.";
          break;
        case 'location':
          tempErrors.location = value ? "" : "This field is required.";
          if (value && value.length < 5) tempErrors.location = "Location must be at least 5 characters long.";
          break;
        case 'productStatus':
          tempErrors.productStatus = value ? "" : "This field is required.";
          break;
        case 'categoryId':
          tempErrors.categoryId = value ? "" : "This field is required.";
          break;
        case 'images':
          tempErrors.images = formData.images.length > 0 ? "" : "This field is required.";
          if (formData.images.length > 0) {
            const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
            formData.images.forEach(image => {
              if (!validFormats.includes(image.type)) {
                tempErrors.images = "Only JPEG, PNG, and GIF formats are allowed.";
              }
            });
          }
          break;
        default:
          break;
      }
    };
    

    if (field) {
      validateField(field, formData[field]);
    } else {
      Object.keys(formData).forEach(name => validateField(name, formData[name]));
    }

    setErrors(tempErrors);

    if (field) {
      return tempErrors[field] === "";
    } else {
      return Object.values(tempErrors).every(x => x === "");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validate(name);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
    setTouched({
      ...touched,
      images: true
    });
    validate('images');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const productForm = new FormData();
      productForm.append('title', formData.title);
      productForm.append('categoryId', formData.categoryId);
      productForm.append('quantity', formData.quantity);  // Ensure quantity is appended
      productForm.append('location', formData.location);
      productForm.append('price', formData.price);
      productForm.append('productStatus', formData.productStatus);
      productForm.append('productDetails', formData.productDetails);
      productForm.append('userId', formData.userId);
      formData.images.forEach((image) => {
        productForm.append('images', image);
      });

      try {
        const response = await axios.post('http://127.0.0.1:3000/api/v1/products/add-product', productForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'jwt': localStorage.getItem('token')
          }
        });
        setFormData({
          title: '',
          name: '',
          location: '',
          images: [],
          quantity: '',
          productStatus: '',
          categoryId: '',
          price: '',
          productDetails: '',
          userId: '6643d585dd8c6b0c1065f2b5',
        });
        navigate('/products');
        window.location.reload();
      } catch (err) {
        console.error('Error adding product:', err.response ? err.response.data : err);
        toast.error('failed to add product')
      }
    }
    else{
      toast.error('failed to add product')
    }
  };

  return (
    <Container style={{ marginBottom: '5%' }}>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
          <StyledSpan />
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Upload Images</Typography>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {touched.images &&  <Typography color="error">{errors.images}</Typography>}
        </label>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Title</Typography>
            <TextField
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              error={touched.title && !!errors.title}
              helperText={touched.title && errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Price</Typography>
            <TextField
              name="price"
              value={formData.price}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              error={touched.price && !!errors.price}
              helperText={touched.price && errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Quantity</Typography>
            <TextField
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              error={touched.quantity && !!errors.quantity}
              helperText={touched.quantity && errors.quantity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">product details</Typography>
            <TextField
              name="productDetails"
              value={formData.productDetails}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              error={touched.productDetails && !!errors.productDetails}
              helperText={touched.productDetails && errors.productDetails}
            />
          </Grid>
          <Grid item sx={{ display: 'flex', paddingTop: '16px', '@media(max-width:600px)':{
            flexDirection: 'column',
          } }} xs={12} sm={12}>
            <Grid item xs={12} sm={6} >
              <Typography variant="h6">Location</Typography>
              <TextField
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                variant="outlined"
                multiline
                rows={6}
                sx={{ mt: 1 }}
                error={touched.location && !!errors.location}
                helperText={touched.location && errors.location}
              />
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column', width: '50%' , '@media(max-width:600px)':{
              width: '100%',
            }}}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <Typography variant="h6">Status</Typography>
                  <CustomSelect
                    width={130}
                    name="productStatus"
                    value={formData.productStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                      { value: 'used', label: 'Used' },
                      { value: 'new', label: 'New' },
                    ]}
                    sx={{ mt: 1 }}
                  />
                  {touched.productStatus && errors.productStatus && <Typography color="error">{errors.productStatus}</Typography>}
                </Grid>
                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6">Category</Typography>
                  <CustomSelect
                    width={130}
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={catgs}
                    sx={{ mt: 1 }}
                  />
                  {touched.categoryId && errors.categoryId && <Typography color="error">{errors.categoryId}</Typography>}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width:'60%',
                    backgroundColor: color,
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: color,
                      outline: `2px solid ${color}`,
                    },
                    '@media (max-width: 600px)': { 
                      width:'80%'
                    },
                    '@media (max-width: 1440px)': { 
                      width:'60%'
                    },
                  }}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
