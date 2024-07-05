import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import UserContext from '../../../contexts/UserContext';
import { CartContext } from '../../../contexts/CartContext';

const CardContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '180px',
  borderRadius: '15px',
  background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
  color: 'white',
  padding: '20px',
  position: 'relative',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

const Shape1 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-50px',
  left: '-50px',
  width: '200px',
  height: '200px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
}));

const Shape2 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-50px',
  right: '-50px',
  width: '200px',
  height: '200px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
}));

const PaymentCard = ({ handlePaymentClick }) => {

  const {userData} = useContext(UserContext)
  const {totalPrice, cartItems} = useContext(CartContext)
 
  return (
    <CardContainer onClick={()=>{handlePaymentClick(userData._id , totalPrice)}}  sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%',alignItems:'center' }}>
            {/* <Shape1 /> */}
            <Shape2 />
            <Typography variant="body2" sx={{ marginBottom: '20px' }}>
              Credit
            </Typography>
            <Typography variant="h6">Pay With Credit</Typography>
            <Box sx={{ position: 'absolute', top: '20px', right: '20px', width:'20%' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" />
            </Box>
          </Box>
        </>
    </CardContainer>
  );
};

export default PaymentCard;
