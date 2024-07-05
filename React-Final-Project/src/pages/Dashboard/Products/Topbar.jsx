/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { AppBar, Toolbar, Avatar, Typography, styled } from '@mui/material';
import ColorContext from '../../../contexts/ColorContext';
import UserContext from '../../../contexts/UserContext';

// Custom styles for gradient text
const GradientTypography = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

const Topbar = () => {
    const { color, lightColor } = useContext(ColorContext);
    const { userData } = useContext(UserContext);

    return (
        <AppBar
            position="relative"
            sx={{
                background: `linear-gradient(270deg, ${color} 30%,${lightColor} 110%)`,
                margin: 'auto',
                width: '90%',
                borderRadius: '0 0 20px 20px',
                boxShadow: 'none',
                top:'0'
            }}
        >
            <Toolbar>
                <Avatar alt="Sara" src={`${userData?.imageUrl?.images[0]}`} sx={{ marginRight: 2 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Hello, <span style={{ color: '#fff' }}>{userData?.firstName}</span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
