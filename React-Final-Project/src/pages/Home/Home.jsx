import React, { useContext, useEffect } from "react";
import { Box, Container } from "@mui/material";
import LoaderContext from "../../contexts/LoaderContext.jsx";
import Hero from "./components/Hero.jsx";
import Slider from "./components/Slider.jsx";
import CategoriesSection from "./components/CategoriesSection.jsx";
import ProductsSection from "./components/ProductsSection.jsx";
import bgImage from "../../../public/8038874_25098.jpg";
import "./Home.css";
import ProductsContext from "../../contexts/ProductsContext.jsx";
import CategoryContext from "../../contexts/CategoriesContext.jsx";
import Loader from '../../components/loader/Loader.jsx';

const datas = {
  Shipping: " 📦 Efficient and reliable shipping services ensure that customers receive their products on time. This includes multiple shipping options like standard, express, and overnight delivery.",
  Customer_Support: " 📞 Responsive and helpful customer support services provide assistance to customers via various channels like phone, email, and live chat. This includes handling inquiries.",
  Payment_Processing: " 💳 Secure and seamless payment processing services handle transactions for various payment methods including credit/debit cards, digital wallets, and bank transfers.",
  Product_Management: " 🛍️ Comprehensive product management services involve managing product listings, inventory, and pricing.",
};

const Home = () => {
  const { loader, setLoader } = useContext(LoaderContext);
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    if (products.products || categories.categories) {
      setLoader(false);
    }
  }, [products]);

  if (!products || !products.products || !categories.categories) {
    return (
      <Container>
        {/* <Loader /> */}
      </Container>
    );
  }

  return (
    <>
      {loader && <Loader />}
      <Hero />
      <div
        className="Home"
        style={{
          paddingBottom: "30px",
          paddingTop: "1px",
          backgroundImage: `url(${bgImage})`,
          zIndex: "-1",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Slider />
        <CategoriesSection />
        <Box
          sx={{
            marginTop: "15px",
            display: {
              xs: "block",
              xl: "flex",
            },
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div id="scene" style={{ position: "relative" }}>
            <div id="left-zone">
              <ul className="list">
                {Object.entries(datas).map(([index, val], i) => (
                  <li key={index} className="item">
                    <input
                      type="radio"
                      id={"radio_" + index}
                      name="basic_carousel"
                      value={index}
                      defaultChecked={index === "Shipping"}
                    />
                    <label htmlFor={"radio_" + index} className={"label_" + index}>
                      {index}
                    </label>
                    <div className={"content content_" + index}>
                      <span className="picto"></span>
                      <h1>{index}</h1>
                      <p>{val}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div id="middle-border"></div>
            <div id="right-zone"></div>
          </div>
        </Box>
        <ProductsSection />
      </div>
    </>
  );
};

export default Home;
