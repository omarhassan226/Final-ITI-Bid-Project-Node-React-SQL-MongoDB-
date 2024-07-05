import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BuildIcon from '@mui/icons-material/Build';
import { FaHammer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ColorContext from '../../contexts/ColorContext';
import { useContext } from 'react';
import { LoveContext } from '../../contexts/LoveContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/material';
import { CartContext } from '../../contexts/CartContext';

export default function ProductCard({ product, addToCart }) {
  const { handleLoveClick, selectedLove, getFavorite, favorites } = useContext(LoveContext);
const {cartItems} = useContext(CartContext)

  const navigate = useNavigate();
  const { color } = useContext(ColorContext)
  const navigateToDetails = (id) => {
    if (!product.expirationDate) {
      navigate(`/product-details/${id}`);
    }
  };

  const navigateToBidDetail = (id) => {
    navigate(`/bid/${id}`);
  };

  React.useEffect(() => {
    getFavorite()
  }, [])

  const isLoved = selectedLove?.includes(product._id);

  return (
    <Grid item xs={12} sm={4} md={4} lg={3} sx={{ display: 'flex' }}>
      <Card
        sx={{
          width: '100%',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          margin: 1,
          height: 330,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}

      >

        <CardMedia onClick={() => {
          navigateToDetails(product._id);
        }} sx={{ height: '250px', cursor: 'pointer' }} image={product?.imagesUrl?.images[0]}
        />

        {product?.expirationDate && (
          <>
            <CardMedia onClick={() => {
              navigateToDetails(product._id);
            }} height={'250px'} image={product?.imagesUrl?.images[0]}
            />
            <FaHammer
              sx={{ position: 'absolute', top: '10px', right: '5px' }}
              style={{ position: 'absolute', top: '10px', right: '5px' }}
            />
          </>
        )}

        <CardContent sx={{ flex: '1 0 auto', display: "flex", flexDirection: 'column', alignItems: 'flex-start', width: '100%', height:'50%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1,maxWidth:'100%' }}>
              {product?.title}
            </Typography>

            {
              !product?.expirationDate && (
                <>
                  <div onClick={() => handleLoveClick(product)} style={{ cursor: 'pointer' }}>
                    {
                      product.price && (
                        isLoved ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />
                      )
                    }
                  </div>
                </>
              )
            }
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1,maxWidth:'100%' }}>
            {product?.categoryId?.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{ marginBottom: 1 }}>
            {product?.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product?.addingDate}
          </Typography>
        </CardContent>
        <CardActions>
          {!product?.expirationDate &&  cartItems.filter(cartItem => cartItem.productId._id === product._id).length!== 0&&  (
            <>
              <Button sx={{
                width: '100%', backgroundColor: color, color: '#fff', "&:hover": {
                  backgroundColor: "#fff",
                  color: color,
                  outline: `2px solid ${color}`,
                },
              }} onClick={addToCart}>
                delete
              </Button>
            </>
          )}


{!product?.expirationDate &&  cartItems.filter(cartItem => cartItem.productId._id === product._id).length === 0&&  (
            <>
              <Button sx={{
                width: '100%', backgroundColor: color, color: '#fff', "&:hover": {
                  backgroundColor: "#fff",
                  color: color,
                  outline: `2px solid ${color}`,
                },
              }} onClick={addToCart}>
                Add To Cart
              </Button>
            </>
          )}

          {product?.expirationDate && (
            <Button
              sx={{
                width: '100%', backgroundColor: color, color: '#FFF', "&:hover": {
                  backgroundColor: "#fff",
                  color: color,
                  outline: `2px solid ${color}`,
                }
              }}
              onClick={() => {
                navigateToBidDetail(product._id);
              }}
            >
              Place Bid
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
