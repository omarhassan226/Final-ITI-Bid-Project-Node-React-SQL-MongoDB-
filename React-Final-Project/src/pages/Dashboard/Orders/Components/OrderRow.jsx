import React, { useContext, useState, useEffect } from "react";
import { Grid, Typography, Avatar, Button, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";

import { OrderContext } from "../../../../contexts/OrderContext";
import ColorContext from "../../../../contexts/ColorContext";

export const OrderRow = ({ order, imageUrl }) => {
    const { color, lightColor } = useContext(ColorContext);
    const { deleteOrder, updateOrderStatus } = useContext(OrderContext);

    const [status, setStatus] = useState(order?.status || "Pending");
    (order);

    useEffect(() => {
        setStatus(order?.status || "Pending");
    }, [order?.status]);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
await updateOrderStatus(order._id, newStatus);
    };

    const TotalButton = styled(Button)({
        background: `linear-gradient(45deg, ${color} 30%, ${lightColor} 90%)`,
        borderRadius: "20px",
        color: "#fff",
        fontWeight: "bold",
    });

    return (
        <Grid
            container
            alignItems="center"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                padding: "16px 0",
                borderBottom: `2px solid ${color}`,
                color: color,
                textAlign: 'center'
            }}
        >
            <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                <TotalButton>{`Total ${order?.totalAmount}`}</TotalButton>
            </Grid>
            <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ width: "60%", fontSize: '10px' }}>{order?._id}</Typography>
            </Grid>
            <Grid item xs>
                <Typography>{order?.userId?.firstName}</Typography>
                <Typography variant="body2">{order?.email}</Typography>
            </Grid>
            {/* <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>{order.payment}</Typography>
            </Grid> */}
            {/* <Grid item xs>
                <Avatar
                    src={imageUrl}
                    alt="product"
                    sx={{ width: 56, height: 56 }}
                />
            </Grid> */}
            {/* <Grid item xs>
                <Typography>{order.delivery}</Typography>
            </Grid> */}
            <Grid item xs>
                {/* <Select
                    value={status}
                    onChange={handleStatusChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Order Status' }}
                >
                    <MenuItem value="Pending" selected>Pending</MenuItem>
                    <MenuItem value="Accepted">Accepted</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                </Select> */}

                <select value={status} onChange={handleStatusChange} name="hall" id="hall">
                    <option value={"pending"} >Pending</option>
                    <option value={"success"}>Accepted</option>
                    <option value={"cancelled"}>Canceled</option>
                </select>
            </Grid>
        </Grid>
    );
};
