import React, { useState } from 'react';
import { Card, CardActions, CardContent, Box, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutCard = ({ img, name, children, src }) => {

  const [showOverlay, setShowOverlay] = useState(false);

  const handleCardFlip = () => {
    if (!showOverlay) {
      setTimeout(() => {
        setShowOverlay(true);
      }, 100);
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
        zIndex: '3',
        paddingTop:'10px'
      }}
    >
      <Card
        sx={{
          zIndex: '3',
          // width: '300px',
          height: '400px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          backgroundColor:'#fff'
        }}
      >
        <Link to={src}>
        <CardContent>
          <CardMedia
            sx={{
              width:'250px',
              height: 370,
              zIndex: '3',
              opacity: showOverlay ? 0.3 : 1,
            }}
            image={img}
            title={name}
          />
        </CardContent>
        </Link>

        {showOverlay && (
          <Link to={src}>
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
          </Link>
        )}
      </Card>
    </div>
  );
};

export default AboutCard;
