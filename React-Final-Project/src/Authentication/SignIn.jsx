/* eslint-disable no-case-declarations */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { NotificationContext } from "../contexts/NotificationContext";
import ColorContext from "../contexts/ColorContext";

export default function SignIn({ fade, handleSignIn, handleToRegister, handleToForget }) {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
const {color,lightColor}=useContext(ColorContext)
  const handleSignInInputChange = (e) => {
    const { name, value } = e.target;
    setSignInForm({
      ...signInForm,
      [name]: value,
    });

    // Validate field as the user types
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "email":
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
        if (!emailRegex.test(value)) {
          errorMsg = "Please enter a valid email address ending with .com, .net, or .org";
        }
        break;
      case "password":
        if (value.length < 6) {
          errorMsg = "Password must be at least 6 characters long";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const textFieldStyle = {
    width: "100%",
    marginBottom: "16px",
    backgroundColor: "white",
    color:color,
    "& .MuiInputBase-input": {
      color: color, // Text color
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: color,
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: color,
      },
    },
  };

  const buttonStyle = {
    backgroundColor: color,
    "&:hover": {
      backgroundColor: lightColor,
    },
    color: "#fff",
    padding: "10px 20px",
    fontSize: "18px",
    borderRadius: "30px",
    width: "100%",
  };

  const linkStyle = {
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    textDecoration: "underline",
    color: color,
  };

  const { fetchNotifications, notifications } = useContext(NotificationContext);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications, notifications]);

  return (
    <Box sx={{ height: {xs:'100%',md:'90vh'}, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', textAlign: 'center', color: 'white' }}>
      <Box className={`inputs ${fade ? "fade-out" : "fade-in"}`} sx={{ width: "50%", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', textAlign: 'center', color: 'white' }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" margin={1} sx={{color:color}}>Vibe Verse</Typography>
          <Typography variant="h5" margin={1} sx={{color:color}}>Log In to your account</Typography>
        </Box>
        <Grid container display={'flex'} justifyContent="center" alignItems="center" sx={{}}>
          <Grid item xs={12} margin={1}>
            <TextField
              sx={textFieldStyle}
              InputLabelProps={{ style: { color: color} }}
              label="Email"
              name="email"
              value={signInForm.email}
              onChange={handleSignInInputChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} margin={1}>
            <TextField
              sx={textFieldStyle}
              InputLabelProps={{ style: { color: color } }}
              label="Password"
              name="password"
              type="password"
              value={signInForm.password}
              onChange={handleSignInInputChange}
              onBlur={handleBlur}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12} margin={1}>
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={() => handleSignIn(signInForm)}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} margin={1} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography marginTop={1} color={{color:color}} sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
              Don't have an account?
              <Typography
                marginX={1}
                sx={linkStyle}
                onClick={handleToRegister}
              >
                Register
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} margin={1}>
            {/* <Typography
              sx={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={handleToForget}
            >
              Forgot Password?
            </Typography> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
