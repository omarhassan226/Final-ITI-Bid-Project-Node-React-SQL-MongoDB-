import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import ColorContext from '../../contexts/ColorContext';

const GreenButton = ({children}) => {
    const {color} = useContext(ColorContext)
    return (
        <Button variant="contained" sx={{ backgroundColor: 'white', color: color, '&:hover':{backgroundColor:color , color:'white' , outline:'2px solid white'} }}>
            {children}
        </Button>
    );
};

export default GreenButton;
