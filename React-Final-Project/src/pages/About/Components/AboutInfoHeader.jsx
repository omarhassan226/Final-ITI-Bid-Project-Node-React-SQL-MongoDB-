import { Box, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import ServiceBox from './ServiceBox'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaidIcon from '@mui/icons-material/Paid';
import { colors } from '../../../Util/utilities';
const AboutInfoHeader = () => {

    return (
        <Container>
            <Grid container spacing={2} alignItems="center" >
                <Grid item xs={12} md={6}>
                    <CardMedia
                        sx={{ height: 320 }}
                        image="/public/team.jpg"
                        title="green iguana"
                    />
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="center" sx={{width:'100%'}}>
                    <Grid item xs={12} md={12} sx={{display:'flex', justifyContent:'flex-start'}}>
                        <Box sx={{display:'flex', width:'100%'}}>
                            <Box sx={{width:'100%'}}>
                                <Typography sx={{fontWeight:'800', fontSize:'28px', maxWidth:'100%', textAlign:'left'}}>Get to know us better</Typography>
                                <Typography sx={{ maxWidth:'100%', textAlign:'left'}}>Welcome to our company! We are dedicated to providing top-notch services and products to our valued customers. Our commitment to excellence has been the cornerstone of our business since its inception.</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ display: 'flex',marginTop:'10px' }}>
                        <Grid item xs={12} md={8} sx={{}}>
                            <ServiceBox title={'Money Guarante'} text={'We stand behind our products with a full money-back guarantee. '}>
                                <PaidIcon sx={{ width: '65%' }} />
                            </ServiceBox>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <ServiceBox title={'Online Suppourt'} text={'Our customer support team is available 24/7 to assist you with any questions or concerns. '}>
                                <HeadsetMicIcon sx={{ width: '65%' }} />
                            </ServiceBox>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex' }}>
                        <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                            <ServiceBox title={'Payment Secure'} text={'We use the latest encryption technologies to ensure that your payment information is safe and secure.'}>
                                <PaymentsIcon sx={{ width: '65%' }} />
                            </ServiceBox>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <ServiceBox title={'30 days Return'} text={'Enjoy a hassle-free return policy with our 30-day return window.'}>
                                <CurrencyExchangeIcon sx={{ width: '65%' }} />
                            </ServiceBox>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AboutInfoHeader
