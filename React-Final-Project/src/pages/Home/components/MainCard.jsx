import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from 'react';
import { LoveContext } from '../../../contexts/LoveContext';
import { useEffect } from 'react';

export default function MainCard({ product }) {
  const { handleLoveClick, selectedLove, getFavorite } = useContext(LoveContext);



  useEffect(()=>{
    getFavorite()
  },[])
  const productImage = product?.imagesUrl?.images[0] || product?.imageUrl?.images[0];
  const isLoved = selectedLove?.includes(product._id);

  return (
    <Card sx={{ width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', height:'100%' }}>
      {productImage && (
        <CardMedia
          sx={{ height: 140 }}
          image={productImage}
          title={product.title}
        />
      )}
      <CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">{product?.title}</Typography>
          <Typography variant="body2" color="text.secondary">{product?.price}</Typography>
          <div onClick={() => handleLoveClick(product)} style={{ cursor: 'pointer' }}>
            {
              product.price && (
                isLoved ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />
              )
            }
          </div>
        </CardActions>
        <Typography sx={{textAlign:'left'}} gutterBottom variant="h5" component="div">{product?.title}</Typography>
        <Typography sx={{textAlign:'left'}} variant="body2" color="text.secondary">{product?.location}</Typography>
        <Typography sx={{textAlign:'left'}} variant="body2" color="text.secondary">{product?.categoryId?.title}</Typography>
        <Typography sx={{textAlign:'left'}} variant="body2" color="text.secondary">{product?.addingDate}</Typography>
      </CardContent>
    </Card>
  );
}
