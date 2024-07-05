import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography, Box, CardMedia } from '@mui/material';

const FlipCard = ({children , category}) => {
  (category);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setTimeout(() => {
        setShowOverlay(true);
      }, 400); 
    } else {
      setShowOverlay(false);
    }
  };

  return (
    <div
      onMouseEnter={handleCardFlip}
      onMouseLeave={handleCardFlip}
      style={{
        perspective: '1000px', 
        margin: '10px',
        zIndex:'3'
      }}
    >
      <Card
        sx={{
          zIndex:'3',
          width: '200px',
          height:'150px',
          transformStyle: 'preserve-3d', 
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', 
        }}
      >
        <CardContent>
        <CardMedia
        sx={{ height: 140 ,
          zIndex:'3',
          opacity: isFlipped ? 0.3 : 1,
        }}
        image={category?.imageUrl?.images[0]}
        title="green iguana"
      />
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
      {/* Overlay */}
      {showOverlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
{children}
        </Box>
      )}
    </div>
  );
};

export default FlipCard;
