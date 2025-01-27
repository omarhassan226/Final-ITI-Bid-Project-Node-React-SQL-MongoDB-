import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function ResetPassword({ fade, handleToForget, handleToLogin }) {
  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleResetInputChange = (e) => {
    const { name, value } = e.target;
    setResetForm({
      ...resetForm,
      [name]: value,
    });
  };

  return (
    <Box className={`inputs ${fade ? "fade-out" : "fade-in"}`} sx={{ width: "100%" }}>
      <Typography variant="h5" margin={1}>Reset Password</Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} margin={1}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="New Password"
            name="password"
            type="password"
            value={resetForm.password}
            onChange={handleResetInputChange}
          />
        </Grid>
        <Grid item xs={12} margin={1}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color: "#79987a" } }}
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={resetForm.confirmPassword}
            onChange={handleResetInputChange}
          />
        </Grid>
        <Grid item xs={12} margin={1}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={handleToLogin}
          >
            Reset Password
          </Button>
        </Grid>
        <Grid item xs={12} margin={1}>
          <Typography
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleToForget}
          >
            Go back
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

const textFieldStyle = {
  width: "100%",
  marginBottom: "16px",
  backgroundColor: "rgba(0, 255, 0, 0.1)",
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(150, 187, 124)",
    color: "rgb(150, 187, 124)",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "rgb(150, 187, 124)",
    },
  },
};

const buttonStyle = {
  backgroundColor: "rgb(150, 187, 124)",
  "&:hover": {
    backgroundColor: "rgb(160, 200, 100)",
  },
  color: "#fff",
  padding: "10px 20px",
  fontSize: "18px",
  borderRadius: "30px",
  width: "100%",
};
