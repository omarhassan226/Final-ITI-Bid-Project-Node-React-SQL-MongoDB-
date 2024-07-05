import React, { useContext } from 'react';
import { Container, Grid } from '@mui/material';
import CardHeader from './CardHeader.jsx';
import MainCard from './MainCard.jsx';
import ProductsContext from '../../../contexts/ProductsContext.jsx';
import { useNavigate } from 'react-router-dom';

const ProductsSection = () => {
  const { products } = useContext(ProductsContext);
const navigate = useNavigate()
  if (!products.products) {
    return null;
  }

  return (
    <Container>
      <CardHeader>Products</CardHeader>
      <Grid container spacing={2}>
        {products.products.slice(0, 4).map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} onClick={()=>{navigate(`/product-details/${product._id}`)}} >
            <MainCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsSection;
