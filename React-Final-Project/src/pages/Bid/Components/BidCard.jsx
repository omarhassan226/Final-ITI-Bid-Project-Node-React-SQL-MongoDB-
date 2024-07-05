import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Container,
    Grid,
} from "@mui/material";
import CircularWithValueLabel from "./Components/AuctionCard";

const BidCard = ({
    auction,
    highestBid,
    setHighestBid,
    handleBid,
    highestBidderName,
}) => {
    const now = Date.now();
    const expirDate = new Date(auction?.expirationDate);
    const differenceInMs = expirDate - now;
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

    const product = auction;

    return (
        <Container sx={{ marginTop: "15px" }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={`${product?.imagesUrl?.images[0]}`}
                            alt="Villa"
                            style={{ maxWidth: "100%", height: "79vh", marginTop: "50px" }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
                    >
                        <Typography variant="h5" sx={{ marginBottom: "18px" }}>
                            Villa for sale in Badya
                        </Typography>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#fff",
                                height: "100%",
                                boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <CircularWithValueLabel
                                    highestBidderName={highestBidderName}
                                    socketBid={handleBid}
                                    setHighestBid={setHighestBid}
                                    highestBid={highestBid}
                                    auction={auction}
                                    hours={+hours}
                                    minutes={+minutes}
                                    seconds={+seconds}
                                    id={auction._id}
                                />
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

};

export default BidCard;
