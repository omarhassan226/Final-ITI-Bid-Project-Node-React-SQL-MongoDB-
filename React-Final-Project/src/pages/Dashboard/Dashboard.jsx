import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from './Components/Sidebar';
import Topbar from './Products/Topbar';
import Content from './Products/Content';
import OrderList from './Orders/Components/OrderList';
import Categories from './Categories/Categories';
import AllPosts from './Post/AllPosts';
import LoaderContext from '../../contexts/LoaderContext';

const Dashboard = () => {
    const {setLoader}= useContext(LoaderContext)
    const [selectedMenuItem, setSelectedMenuItem] = useState('products');
useEffect(()=>{
setLoader(false)
},[])
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <Grid container sx={{height:'100%' }}>
            <Grid item xs={12} md={3} lg={2}>
                <Sidebar onMenuItemClick={handleMenuItemClick} />
            </Grid>
            <Grid item xs={12} md={7} lg={10} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Topbar />
                {/* <Box sx={{ flexGrow: 1, overflow: 'auto', height:'100vh' }}> */}
                    {selectedMenuItem === 'products' && <Content />}
                    {selectedMenuItem === 'orders' && <OrderList />}
                    {selectedMenuItem === 'categories' && <Categories />}
                    {selectedMenuItem === 'posts' && <AllPosts />}
                {/* </Box> */}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
