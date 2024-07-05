import React, { useContext, useEffect, useState } from "react";
import "./Auth.css";
import { Box, Button, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ColorContext from "../contexts/ColorContext";
import { toast } from "react-toastify";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import CheckOTP from "./CheckOTP";
import ResetPassword from "./ResetPassword";
import { NotificationContext } from "../contexts/NotificationContext";
import LoaderContext from "../contexts/LoaderContext";

export default function Auth() {
  const {fetchNotifications, notifications} = useContext(NotificationContext)
  const { color ,lightColor } = useContext(ColorContext);
  const navigate = useNavigate();
const {setLoader} = useContext(LoaderContext)
  const { setToken } = useContext(UserContext);
useEffect(()=>{
  setLoader(false)
},[])
  const handleSignIn = async (signInForm) => {
    (signInForm);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/login",
        signInForm
      );
      if (response) {
        (response);
        setToken(response.data.user.token.token);
        (response.data.user.token.token);
        localStorage.setItem("token", response.data.user.token.token);
        toast.success('Logged in successfully');
        if(response.data.user.token.user.role === "66423da09340e35f38c0f02d"){
        localStorage.setItem('role' , 'admin')
          navigate('/dashboard');
        }
        else{

           navigate('/home');
        }
        fetchNotifications();
      } else {
        // This block might never be reached because `response` is always truthy when the request is successful
        toast.error('Log in failed');
        console.error("Token not found in response:", response);
      }
    } catch (error) {
      toast.error('Log in failed'); // Add this line to ensure the toast is shown
      console.error("Signin failed:", error);
    }
  };  

  const handleSignUp = async (signUpForm) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/signup",
        signUpForm
      );
      toast.success('Signed up successfully');
      handleToLogin();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const [fade, setFade] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleToLogin = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('login');
      setFade(false);
    }, 300);
  };

  const handleToRegister = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('register');
      setFade(false);
    }, 300);
  };

  const handleToForget = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('forget');
      setFade(false);
    }, 300);
  };

  const handleToOtp = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('otp');
      setFade(false);
    }, 300);
  };

  const handleToReset = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentView('reset');
      setFade(false);
    }, 300);
  };


  return (
    <>
    <Box sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', width: {
      xs: '100%',  
      sm: '100%', 
      md: '50%',   
    },
    height:{
      xs: 'auto',  
      sm: 'auto',  
      md: 'auto',   
    }}}  margin={'auto'} marginY={'5vh'} position={'relative'}>
      <Box sx={{zIndex:'-1'}}  className={`clipped-element ${currentView === 'register' ? "move-bottom" : ""}`}>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270">
    <defs>
      <style>
        {`
          .cls-1{fill:${lightColor};}
          .cls-2{fill:${color};}
        `}
      </style>
    </defs>
    <title>Asset 2</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="visual">
        <path className="cls-1" d="M0,0C27.9,22.3,55.8,44.5,89.2,54.7s72.2,8.4,101,25.1,47.6,52.1,59.2,86.9,16.1,69,20.6,103.3H0Z"/>
        <path className="cls-2" d="M0,135c13.9,11.1,27.9,22.3,44.6,27.4s36.1,4.1,50.5,12.5,23.8,26,29.6,43.4,8.1,34.6,10.3,51.7H0Z"/>
      </g>
    </g>
  </svg>

      </Box>
      {currentView === 'login' && (
        <SignIn 
          fade={fade} 
          handleSignIn={handleSignIn}
          handleToRegister={handleToRegister}
          handleToForget={handleToForget}
        />
      )}
      {currentView === 'register' && (
        <SignUp 
          fade={fade} 
          handleSignUp={handleSignUp}
          handleToLogin={handleToLogin}
        />
      )}
      {currentView === 'forget' && (
        <ForgetPassword 
          fade={fade}
          handleToLogin={handleToLogin}
          handleToOtp={handleToOtp}
        />
      )}
      {currentView === 'otp' && (
        <CheckOTP 
          fade={fade}
          handleToForget={handleToForget}
          handleToReset={handleToReset}
        />
      )}
      {currentView === 'reset' && (
        <ResetPassword 
          fade={fade}
          handleToForget={handleToForget}
          handleToLogin={handleToLogin}
        />
      )}
    </Box>
    </>
    
  );
}
