import * as React from "react";
import { CssBaseline, Box, TextField, Typography, List, ListItem, ListItemText } from "@mui/material";
import ProductsContext from "../../../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const { products } = React.useContext(ProductsContext);
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredProducts = products?.products?.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <Box
        className="d-flex justify-content-center align-items-center m-auto"
        sx={{ height: "92vh", width: "100%" }}
      >
        <Box />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            overflow: "hidden",
          }}
        >
          <video
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            autoPlay
            muted
            loop
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          >
            <source
              src="/public/Falling Stars Motion Background, Twinkling Star Background Video Loop - Free Stock Footage.mp4"
              type="video/mp4"
            />
          </video>
        </Box>
        <Box
          sx={{
            position: "relative",
            top: { xs: "20%", md: "30%" },
            height: "100%",
            width: "100%",
            zIndex: 1,
            textAlign: "center",
            color: "white",
            padding: "0px",
            border: "0px",
          }}
        >
          <Typography variant="h3" margin={"30px"}>
            VibeVerse Buy and Sell anything
          </Typography>
          <TextField
            placeholder="Enter your text here"
            value={query}
            autoComplete="off"
            onChange={handleSearch}
            sx={{
              width: { xs: "80%", md: "50%" },
              margin: "auto",
              background: "#ccc",
              borderRadius: "20px",
              "& fieldset": {
                border: "none",
              },
            }}
          />
          {query && (
            <Box
              sx={{
                marginTop: "20px",
                width: { xs: "80%", md: "50%" },
                margin: "auto",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "20px",
                padding: "10px",
                textAlign: "left",
              }}
            >
              {filteredProducts.length > 0 ? (
                <List>
                  {filteredProducts.map((product) => (
                    <ListItem key={product.id} onClick={() => navigate(`/product-details/${product._id}`)}>
                      <ListItemText primary={product.title} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No products found</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
