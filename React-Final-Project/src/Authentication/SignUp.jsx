import React, { useContext } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ColorContext from "../contexts/ColorContext";

export default function SignUp({ fade, handleSignUp, handleToLogin }) {
  const { color } = useContext(ColorContext);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{11}$/, "Phone Number is invalid")
      .required("Phone Number is required"),
    birthDay: Yup.date()
      .max(new Date("2018-12-31"), "Birthday cannot be later than 2018")
      .required("Birthday is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDay: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const textFieldStyle = {
    width: "100%",
    marginBottom: "16px",
    backgroundColor: "white",
    "& .MuiInputBase-input": {
      color: color, // Text color
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(150, 187, 124)",
      color: color,
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
      backgroundColor: color,
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        className={`inputs ${fade ? "fade-out" : "fade-in"}`}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "50%", margin: "auto", height: {xs:'100%',md:'90vh'}, color: "white" }}
      >
        <Typography variant="h5" color={color}>Vibe Verse</Typography>
        <Typography variant="h5" color={color}>Create your account</Typography>
        <Grid
          display={"flex"}
          sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
          xs={12}
          md={12}
        >
          <Grid item xs={12} md={5}>
            <TextField
              sx={textFieldStyle}
              InputLabelProps={{ style: { color:color } }}
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && !!formik.errors.firstName}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              sx={textFieldStyle}
              InputLabelProps={{ style: { color:color } }}
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && !!formik.errors.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color:color } }}
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={textFieldStyle}
            label="Phone Number"
            InputLabelProps={{ style: { color:color } }}
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color:color } }}
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={textFieldStyle}
            InputLabelProps={{ style: { color:color } }}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={textFieldStyle}
            label="Birthday"
            name="birthDay"
            type="date"
            value={formik.values.birthDay}
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: true, style: { color:color } }}
            onBlur={formik.handleBlur}
            error={formik.touched.birthDay && !!formik.errors.birthDay}
            helperText={formik.touched.birthDay && formik.errors.birthDay}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={buttonStyle}
            type="submit"
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12} margin={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Typography sx={{ display: "flex", justifyContent: "center", color:color, alignItems:'center'  }} margin={2}>
            Have an account?
            <Typography marginX={1} sx={linkStyle} onClick={handleToLogin}>
              Login
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}
