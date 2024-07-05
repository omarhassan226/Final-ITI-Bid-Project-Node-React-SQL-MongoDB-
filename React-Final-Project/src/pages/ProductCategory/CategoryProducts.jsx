/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductsContext from "../../contexts/ProductsContext";
import CategoryContext from "../../contexts/CategoriesContext";
import AuctionContext from "../../contexts/AuctionContext";
import axios from "axios";
import cart2Image from '../../../public/8038874_25098.jpg';
import {
  Box,
  Container,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Pagination,
  Button,
  Typography,
} from "@mui/material";
import { CartContext } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import ColorContext from "../../contexts/ColorContext";

export default function CategoryProducts() {
    const {color} = useContext(ColorContext)
  const {id} = useParams()
  const [toggle, setToggle] = useState(false);
  const { products } = useContext(ProductsContext);
  const { auction } = useContext(AuctionContext);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchCategory, setSearchCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Number of products to display per page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const { getCart, addToCart } = useContext(CartContext);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    filterByCategory()
    console.log(currentProducts);
    }, [id]);

  function filterByCategory() {
    setSearchCategory(id);
    setCurrentPage(1);
      const dp = products?.products?.filter(
        (product) =>
          product?.categoryId?._id === id 
      );
      setDisplayedProducts(dp);
    setCurrentPage(1);
  }


  return (
    <>
    <Box sx={{backgroundImage:`url(${cart2Image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Flex direction changes based on screen size
          paddingTop: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '100%' }, // Adjust width for smaller screens
            display: 'flex',
            flexDirection: 'column',
          }}
          >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {toggle
              ? auction?.map((product) => (
                <ProductCard
                key={product._id}
                addToCart={() => {
                  addToCart(product._id);
                  getCart();
                }}
                    product={product}
                  />
                ))
              : currentProducts?.map((product) => (
                <ProductCard
                    key={product._id}
                    addToCart={() => {
                      addToCart(product._id);
                      getCart();
                    }}
                    product={product}
                    />
                ))}

                {displayedProducts?.length === 0 && <>
                <Typography variant="h3" paddingY={14}>
                sorry, no items founded to this Category</Typography>
                </>}
          </Box>
        </Box>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination
          count={Math.ceil(displayedProducts?.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '{color}', // Change this to your desired color
            },
            '& .Mui-selected': {
              backgroundColor: color, // Change this to your desired color for selected item
              color: '#fff', // Optional: Set text color for selected item
            },
            paddingBottom:'20px'
          }}
          />
      </Container>
          </Box>
    </>
  );
}
