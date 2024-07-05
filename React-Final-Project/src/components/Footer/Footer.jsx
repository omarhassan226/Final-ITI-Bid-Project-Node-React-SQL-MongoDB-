import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ColorContext from "../../contexts/ColorContext";

const Footer = () => {
  const { color } = useContext(ColorContext);
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:3000/api/v1/auth/footer-newsteller", { email });
      toast.success("Successfully subscribed!");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: color,
        padding: "30px",
        color: "white",
        position: "absolute",
        width: "100%",
      }}
    >
      <ToastContainer />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Link to={"/"}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{ cursor: "pointer", width: "70%", height: '50%' }}
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "center", sm: "left" }}}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Categories
            </Typography>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
              <Typography variant="body1">Vehicles</Typography>
              <Typography variant="body1">Mobiles & Tablets</Typography>
              <Typography variant="body1">Electronics & Appliances</Typography>
              <Typography variant="body1">Properties</Typography>
              <Typography variant="body1">Services</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Resources
            </Typography>
            <Box sx={{display:'flex', flexDirection:'column'}}>
              <Typography variant="body1">Developer API</Typography>
              <Typography variant="body1">Tools</Typography>
              <Typography variant="body1">Blog</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Home
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/cart"}>
                Cart
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/about"}>
                About us
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/sell"}>
                List an item
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 4, textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px", textAlign:'left' }}>
              Subscribe To Our Newsletter
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center" }} component="form"
              onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ bgcolor: "white", borderRadius: 1, mr: 2, width: "70%" }}
              />
              <Button
                type="submit"
                sx={{ backgroundColor: color, color: '#FFF', '&:hover': { color: color, backgroundColor: 'white', outline: `2px solid ${color}` } }}
                variant="contained"
                color="primary"
              >
                JOIN
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 4, textAlign: { xs: "center", sm: "left" }, display:'flex', justifyContent:'space-between',  }}>
            <Typography>FOLLOW VIBEVERSE.COM</Typography>
            <Box >
              <Facebook sx={{ cursor: "pointer" }} />
              <Instagram sx={{ mx: 1, cursor: "pointer" }} />
              <Twitter sx={{ mx: 1, cursor: "pointer" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
