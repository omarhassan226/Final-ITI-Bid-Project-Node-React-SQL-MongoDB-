import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography, Container, Paper, Avatar, IconButton } from '@mui/material';
import SimilarItems from '../../components/SimilarItems/SimilarItems';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ProductsContext from '../../contexts/ProductsContext';
import HoverRating from './Components/HoverRating';
import ColorContext from '../../contexts/ColorContext';
import MainCard from '../Home/components/MainCard';
import { CartContext } from '../../contexts/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import "./ProductDetails.modules.css";
import LoaderContext from '../../contexts/LoaderContext';

import cart2Image from '../../../public/8038874_25098.jpg';
const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'; // Define the path to your placeholder image
export default function ProductDetails() {
  const { color } = useContext(ColorContext);
  const { products } = useContext(ProductsContext);
  const { id } = useParams();
  const { cartItems, deleteCartItem,addToCart,getCart } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const {setLoader} = useContext(LoaderContext)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/v1/products/get-product/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt': localStorage.getItem('token'),
          },
        });
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
useEffect(()=>{
  setLoader(false)

},[])
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open,id) => async(event) => {
    if(open){
await addToCart(id)
await getCart()
    }
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const getImage = (images, index) => images && images[index] ? images[index] : placeholderImage;

  return (
    <>
    <Box sx={{backgroundImage:`url(${cart2Image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

      <Box sx={{ width: '75%', padding: '50px' , marginX:'auto' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5} className="carousel-container">
            <Box className="carousel__thumbnails" style={{ overflow: 'hidden' }}>
              <li>
                <label htmlFor="slide-1"><img src={getImage(product?.imagesUrl?.images, 0)} alt="Product Image 1" /></label>
              </li>
              <li>
                <label htmlFor="slide-2"><img src={getImage(product?.imagesUrl?.images, 1)} alt="Product Image 2" /></label>
              </li>
              <li>
                <label htmlFor="slide-3"><img src={getImage(product?.imagesUrl?.images, 2)} alt="Product Image 3" /></label>
              </li>
            </Box>
            <div className="carousel">
              <input type="radio" name="slides" defaultChecked id="slide-1" />
              <input type="radio" name="slides" id="slide-2" />
              <input type="radio" name="slides" id="slide-3" />
              <Box className="carousel__slides" sx={{ height: '45vh' }}>
                <li className="carousel__slide">
                  <figure>
                    <img src={getImage(product?.imagesUrl?.images, 0)} alt="Product Image 1" />
                  </figure>
                </li>
                <li className="carousel__slide">
                  <figure>
                    <img 
                      src={getImage(product?.imagesUrl?.images, 1)} 
                      alt="Product Image 2" 
                      style={{ 
                        width: '100%',  
                        height: 'auto', 
                        objectFit: 'contain', 
                        maxHeight: '100%' 
                      }} 
                      />
                  </figure>
                </li>
                <li className="carousel__slide">
                  <figure>
                    <img src={getImage(product?.imagesUrl?.images, 2)} alt="Product Image 3" />
                  </figure>
                </li>
              </Box>
            </div>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography variant='h4' sx={{ marginBottom: '10px' }}>{product?.title}</Typography>
            <Box sx={{ display: 'flex', my: 2 }}>
              {/* <HoverRating /> */}
            </Box>
            <Typography margin={1} sx={{textAlign:'left'}}>Publisher: {product?.userId?.firstName} {product?.userId?.lastName}</Typography>
            <ul>
              <li>Status: {product.status?.status}</li>
              <li>Category: {product.categoryId?.title}</li>
              <li>Location: {product.location}</li>
              <li>Price: {product.price}$</li>
              <li>Quantity: {product.quantity}</li>
              <li>details: {product?.productDetails}</li>
            </ul>
            <Link to={`/chat/${product?.userId?._id}`}>
              <Button variant="contained" sx={{ marginRight: '5px', backgroundColor: color, '&:hover': { color: 'black', backgroundColor: '#FAAF00' } }}>Chat With Seller</Button>
            </Link>
            <Button variant="contained" onClick={toggleDrawer('right', true , product._id)}  sx={{ backgroundColor: color, '&:hover': { color: 'black', backgroundColor: '#FAAF00' } }}>Add</Button>
            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
              
            {cartItems.length === 0 && 
        <Typography width={300}>Cart is empty!</Typography>
      }
              {cartItems?.map(item => (
                <Paper key={item.productId?._id} sx={{ p: 2, marginBottom: '0px' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={2} height="100px">
                      <Avatar variant="square" src={getImage(item.productId?.imagesUrl.images, 0)} sx={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography>Title - <Typography component="span" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.productId?.title}</Typography></Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.productId?.price} EGP</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <IconButton color="secondary" onClick={() => { deleteCartItem(item._id) }}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Drawer>
          </Grid>
        </Grid>
        <Container>
          <Typography variant="h4" mb={7} mt={15}>
            You May Also Like:
          </Typography>
          <Grid container spacing={2}>
            {products?.products?.slice(0, 4).map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MainCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
            </Box>
    </>
  );
}
