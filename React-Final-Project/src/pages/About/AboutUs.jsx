import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import ServiceBox from './Components/ServiceBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import AboutCard from './Components/AboutCard';
import AboutInfoHeader from './Components/AboutInfoHeader';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaidIcon from '@mui/icons-material/Paid';
import { colors } from '../../Util/utilities';
import "./About.css"
import Loader from '../../components/loader/Loader.jsx';
import LoaderContext from '../../contexts/LoaderContext.jsx';
import cart2Image from '../../../public/8038874_25098.jpg';


export default function AboutUs() {
 const {loader,setLoader} = useContext(LoaderContext)
  const members = [
    { img: '/public/Omar.jpg', src:'https://www.linkedin.com/in/omar-hassan97/', name: 'Omar Hassan' },
    { img: '/public/omar1.jpg', src:'https://www.linkedin.com/in/omar-gaber-tolba/', name: 'Omar Tolba' },
    { img: '/public/Ali.jpg', src:'https://www.linkedin.com/in/ali-magdi-46a364193/', name: 'Ali' },
    { img: '/public/Mohamed Ayman.jpg', src:'https://www.linkedin.com/in/mohamed-aymanuiux/', name: 'Mohamed Ayman' },
    { img: '/public/Sara.jpg', src:'https://www.linkedin.com/in/sara-ayman-64a46720a/', name: 'Sara' }
  ]

  useEffect(()=>{
setLoader(false)
  },[])
  return (
    <Box sx={{backgroundImage:`url(${cart2Image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

    <Container style={{paddingTop:'5%'}}>
{/*     
    
    {loader&& 
    <Loader></Loader>}
    */}
      {/* First section */}
      <AboutInfoHeader />

      {/* Team section */}
      <Box sx={{paddingTop:'8%'}}>
        <Typography variant="h3" paddingTop={3} textAlign="center">
          Our Team
        </Typography>
        <Box paddingY={3}>
          <Grid  sx={{ display: 'flex', flexWrap: 'wrap' }} justifyContent="center">
            <Grid item xs={6} sm={4} md={3} sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            
            </Grid>
          </Grid>
        </Box>
      </Box>



      <Box sx={{paddingTop:'8%' , display:{xs:'block' , xl:'none' }}}>
       
        <Box paddingY={3}>
          <Grid spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }} justifyContent="center">
            <Grid item xs={6} sm={4} md={3} sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              paddingTop:'-50px'
            }}>
              {
                members.map((member) => {
                  return (
                    <AboutCard key={member.name} img={member.img} name={member.name}>{member.name}</AboutCard>
                  )
                })
              }
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box className="container w-75 m-auto" sx={{width:'75%' ,display:{xs:'none' , xl:'flex' } }}>
    <div>
      <div className="content1">
        <h2>Omar Hassan</h2>
        <span>Full-Stack Developer</span>
      </div>
    </div>
    <div>
      <div className="content1">
        <h2>Omar Gaber</h2>
        <span>Full-Stack Developer</span>
      </div>
    </div>
    <div>
      <div className="content1">
        <h2>Ali Magdi</h2>
        <span>Full-Stack Developer</span>
      </div>
    </div>
    <div>
      <div className="content1">
        <h2>Mohamed Ayman</h2>
        <span>UI & UX Designer</span>
      </div>
    </div>
    <div>
      <div className="content1">
        <h2>Sara Ayman</h2>
        <span>UI & UX Designer</span>
      </div>
    </div>
  </Box>


      {/* Last section */}
      {/* <Container> */}
        <Grid   sx={{paddingTop:'8%', display:{xs:'block' ,md:'flex'},justifyContent:'space-between'}}>
          <Grid item xs={12} md={12} container sx={{}}>
            <Grid item xs={12} md={12} sx={{ }}>
              <Box sx={{  }}>
                <Box sx={{width:'100%'}}>
                  <Typography variant='h6' sx={{ fontWeight: '800', fontSize: '28px', justifyContent:'flex-start', textAlign:'left', width:'100%' }}>Our Working Progress</Typography>
                  <Typography variant='h' sx={{ color: colors.gray , textAlign:{xs:'center' , md:'left' , width:'100%'} }}>At our company, we continuously strive to improve and innovate. Our goal is to exceed customer expectations through high-quality products and exceptional service..</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} sx={{ display: 'flex' }}>
              <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                <ServiceBox title={'Payment Secure'} text={'Your payment security is our priority. We employ cutting-edge technology to keep your financial information safe.'}>
                  <PaymentsIcon sx={{ width: '65%' }} />
                </ServiceBox>
              </Grid>
              <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                <ServiceBox title={'Payment Secure'} text={'We use advanced encryption methods to ensure your payment information is secure. Shop with confidence knowing your data is protected.'}>
                  <PaymentsIcon sx={{ width: '65%' }} />
                </ServiceBox>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <img
              style={{ height: 320 , paddingBottom:'2%'}}
              src='/public/team2.jpg'
              title="green iguana"
            />
          </Grid>
        </Grid>
      </Container>
    
      </Box>
    // </Container>
  );
}
