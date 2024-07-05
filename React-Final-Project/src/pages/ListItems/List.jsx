import React, { useContext, useEffect } from 'react';
import { Container, Card, Typography, Grid } from '@mui/material';
import { FaDollarSign } from 'react-icons/fa';
import { GiHammerBreak } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';
import LoaderContext from '../../contexts/LoaderContext';
export default function List() {
  const {color} = useContext(ColorContext)
    const navigate = useNavigate()
    const{setLoader} = useContext(LoaderContext)
 useEffect(()=>{
  setLoader(false)
 },[])
    return (
    <Container sx={{marginBottom:'3%'}}>
      <Grid container spacing={3} marginY={3} justifyContent="center">
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-product')}}>
          <Card sx={{ paddingY: 13, textAlign: 'center', border:`2px solid ${color}` , "&:hover":{backgroundColor:color , color:'#fff'} }}>
            <FaDollarSign size={59}  />
            <Typography variant="h4">Sell an Item</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-auction')}}>
          <Card sx={{ paddingY: 13, textAlign: 'center' , border:`2px solid ${color}` , "&:hover":{backgroundColor:color , color:'#fff'}}}>
          <GiHammerBreak size={59}  />
            <Typography variant="h4">Start an Auction</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
