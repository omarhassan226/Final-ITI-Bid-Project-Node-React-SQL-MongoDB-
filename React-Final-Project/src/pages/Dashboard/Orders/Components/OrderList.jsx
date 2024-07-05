import React, { useContext, useState, useEffect } from "react";
import { Grid, Typography, Box, InputBase, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { OrderRow } from "./OrderRow";
import { OrderContext } from "../../../../contexts/OrderContext";
import ColorContext from "../../../../contexts/ColorContext";

const OrderList = () => {
  const { orders } = useContext(OrderContext);
  const { color, lightColor } = useContext(ColorContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (orders?.orders) {
      const results = orders.orders.filter(order =>
        order?.userId?.firstName?.toLowerCase().includes(searchTerm)
      );
      setFilteredOrders(results);
    }
  }, [searchTerm, orders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(45deg, ${color} 30%, ${lightColor} 70%)`,
    WebkitBackgroundClip: "text",
    display: "flex",
    justifyContent: "center",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
  }));

  return (
    <Box sx={{ width: '90%', margin: 'auto', padding: '24px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <SearchIcon sx={{ color: color }} />
        <InputBase
          placeholder="Search by first name…"
          sx={{ color: color, marginLeft: 1, flexGrow: 1 }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      <Grid
        container
        sx={{
          height: "100%",
          alignContent: "flex-start",
          alignItems: "center",
          display: "flex",
          backgroundColor: "#fff",
          borderRadius: "8px",
          justifyContent: "space-around",
        }}
      >
        {filteredOrders.map((order, index) => (
          <OrderRow key={index} order={order} />
        ))}
      </Grid>
    </Box>
  );
};

export default OrderList;
