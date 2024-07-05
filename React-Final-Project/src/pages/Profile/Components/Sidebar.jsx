import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useContext } from "react";
import ColorContext from "../../../contexts/ColorContext";

function Sidebar({ drawerWidth, handleListItemClick, selectedIndex }) {
    const {color} =useContext(ColorContext)
    return (
        <div style={{ display: 'flex', marginTop: '5%', width:'100%' }}>
            <Box sx={{ display: 'flex', width:'100%', gap:'20px' }}>

                {/* Sidebar-Section */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: '100%',
                        '& .MuiDrawer-paper': {
                            width: '100%', backgroundColor: color, border: 'none', color: '#FFFFFF', height: '600px', borderRadius: '10px', position: 'unset'
                        },
                    }}
                >
                    <Toolbar sx={{
                        color: '#FFFFFF', fontWeight: '700', lineHeight: '44.98px'
                    }}>Hello Mohamed!
                    </Toolbar>

                    <Box>
                        <List>
                            {['Profile Info', 'Orders', 'Addresses'].map((text, index) => (
                                <ListItem
                                    key={text}
                                    disablePadding
                                    selected={selectedIndex === index}
                                    onClick={() => handleListItemClick(index)}
                                    sx={{ '&.Mui-selected': { bgcolor: '#FFFFFF', color: color, borderLeft: '4px solid black', '& .MuiListItemIcon-root': { color: color } } }}
                                >
                                    <ListItemButton >
                                        <ListItemIcon sx={{ color: '#FFFFFF' }}>
                                            {index === 0 ? <AccountCircleIcon /> : ""}
                                            {index === 1 ? <FactCheckIcon /> : ""}
                                            {index === 2 ? <MapsHomeWorkIcon /> : ""}
                                            {/* {index === 3 ? <PaymentsIcon /> : ""} */}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer >
            </Box>
        </div>
    )
}

export default Sidebar
