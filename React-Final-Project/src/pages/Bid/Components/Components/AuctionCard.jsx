/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Button, TextField, Container } from "@mui/material";
import axios from "axios";
import UserContext from "../../../../contexts/UserContext";
import { toast } from "react-toastify";
import ColorContext from "../../../../contexts/ColorContext";
import { NotificationContext } from "../../../../contexts/NotificationContext";

export default function AuctionCard({ highestBid, highestBidderName, socketBid, hours, minutes, seconds, id, auction, setHighestBid }) {
  const { color } = useContext(ColorContext);
  const [expired, setExpired] = useState(false);
  const [bidderName, setBidderName] = useState("");
  const [progress, setProgress] = useState({ hours, minutes, seconds });
  const [bidAmount, setBidAmount] = useState("");
  const [confirmBid, setConfirmBid] = useState(false);
  const { token } = useContext(UserContext);
  const {notifications, fetchNotifications} = useContext(NotificationContext)

  useEffect(()=>{
    fetchNotifications()
  },[notifications])

  useEffect(() => {
    if (seconds < 0 || minutes < 0 || hours < 0) {
      setExpired(true);
    }
  }, [seconds, minutes, hours]);

  useEffect(() => {
    setProgress({ hours, minutes, seconds });
  }, [hours, minutes, seconds]);

  const handleOneBid = () => {
    setConfirmBid(true);
  };

  const confirmBidHandler = async () => {
    if (bidAmount <= highestBid) {
      toast.error('You must place a higher bid.');
    } else {
      if (token) {
        const bidAmountNumber = parseInt(bidAmount);
        if (isNaN(bidAmountNumber) || bidAmountNumber <= 0) {
          console.error("Invalid bid amount");
          return;
        }

        const bidDetails = { amount: bidAmountNumber, auctionId: id };

        try {
          const response = await axios.post(
            "http://127.0.0.1:3000/api/v1/auth/add-bid",
            bidDetails,
            {
              headers: {
                "Content-Type": "application/json",
                jwt: localStorage.getItem("token"),
              },
            }
          );

          if (response.data && response.data.msg) {
            (response.data.msg);
          } else {
            setHighestBid(bidAmountNumber);
            setBidderName("Your Name"); // Update this with actual bidder's name logic
          }
        } catch (err) {
          console.error(err.response ? err.response.data : err.message);
        }

        setBidAmount("");
        socketBid(bidAmountNumber);
        setConfirmBid(false);
        fetchNotifications()
      } else {
        toast.error('You must login first');
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const { hours, minutes, seconds } = prevProgress;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          setExpired(true);
          return prevProgress;
        }
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        if (newSeconds < 0) {
          newMinutes -= 1;
          newSeconds = 59;
          if (newMinutes < 0) {
            newHours -= 1;
            newMinutes = 59;
          }
        }
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds = progress.hours * 3600 + progress.minutes * 60 + progress.seconds;
  const progressValue = ((12 * 3600 - totalSeconds) / (12 * 3600)) * 100;

  return (
    <Container sx={{ padding: "0 15px" }}>
      <CircularProgressWithLabel
        bidderName={bidderName}
        highestBid={highestBid}
        value={progressValue}
        highestBidderName={highestBidderName}
        hours={progress.hours}
        minutes={progress.minutes}
        seconds={progress.seconds}
        auction={auction}
        expired={expired}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {!expired && (
          <>
            <TextField
              label="Place Bid"
              variant="outlined"
              InputLabelProps={{ style: { color: color } }}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontWeight: "bold",
                  color: "black",
                  borderColor: color,
                  "&:hover fieldset": {
                    borderColor: color,
                  },
                  "& fieldset": {
                    borderColor: color,
                    backgroundColor: "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: color,
                  },
                },
                width: { xs: "100%", sm: "70%" },
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              mt={2}
              sx={{ width: { xs: "100%", sm: "70%" }, justifyContent: "center" }}
            >
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: color,
                  "&:hover": { backgroundColor: color }
                }}
                variant="contained"
                color="primary"
                onClick={confirmBid ? confirmBidHandler : handleOneBid}
              >
                {confirmBid ? "Confirm" : "Place Bid"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

function CircularProgressWithLabel({ auction, highestBidderName, highestBid, value, hours, minutes, seconds, expired }) {
  const { color } = useContext(ColorContext);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height:'50vh',
        borderRadius: "50%",
        padding:'0px', margin:'10px'
      }}
    >
      {!expired && (
        <>
          <CircularProgress
            variant="determinate"
            value={100}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "400px",
              maxHeight: "400px",
              "& circle[stroke-width]": {
                strokeWidth: "2px",
              },
              color: "#E9EEF1",
              position: "absolute",
              margin:'10px'
            }}
            thickness={2}
            strokeLinecap={"round"}
          />
          <CircularProgress
            variant="determinate"
            value={value}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "400px",
              maxHeight: "400px",
              "& circle[stroke-width]": {
                strokeWidth: "2px",
              },
              color: color,
              borderRadius: "50%",
              strokeLinecap: "rounded",
            }}
            thickness={2}
          />
        </>
      )}

      <Box
        sx={{
          top: 30,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 10px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: { xs: "20px", md: "28px" },
          }}
        >
          {auction?.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: { xs: "20px", md: "28px" },
            backgroundColor: color,
            borderRadius: "10px",
            padding: "0px 17px",
            color: "#fff",
          }}
        >
          {highestBid}$
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: { xs: "20px", md: "28px" },
          }}
        >
          {highestBidderName}
        </Typography>
        {!expired && (
          <>
            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: "15px",
                fontSize: { xs: "12px", md: "13px" },
                fontWeight: "bold",
              }}
            >
              Time left
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "20px", md: "25px" },
                padding: "0px 20px",
                margin: "0",
                borderRadius: "5px",
                marginBottom: "15px",
                backgroundColor: color,
                fontWeight: "bold",
                color: "#fff",
              }}
              variant="caption"
              component="div"
            >
              {hours}:{minutes}:{seconds}
            </Typography>
          </>
        )}
        {expired && (
          <Typography
            sx={{
              fontSize: { xs: "20px", md: "25px" },
              padding: "0px 20px",
              margin: "0",
              borderRadius: "5px",
              marginBottom: "15px",
              backgroundColor: color,
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="caption"
            component="div"
          >
            The auction has ended
          </Typography>
        )}
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  highestBid: PropTypes.number.isRequired,
  highestBidderName: PropTypes.string.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  expired: PropTypes.bool.isRequired,
  auction: PropTypes.object.isRequired,
};
