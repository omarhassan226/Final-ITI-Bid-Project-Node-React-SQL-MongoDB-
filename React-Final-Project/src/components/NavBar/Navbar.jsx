/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge, Grid, Switch } from "@mui/material";
import FlipCard from "../FlibCard/FlipCard";
import CategoryContext from "../../contexts/CategoriesContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../contexts/CartContext";
import ColorContext from "../../contexts/ColorContext";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { LoveContext } from "../../contexts/LoveContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationContext } from "../../contexts/NotificationContext";
import LoaderContext from "../../contexts/LoaderContext";
import { FaComments } from "react-icons/fa";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { ConversationContext } from "../../contexts/ConversationsContext";

const pages = ["Products", "Categories", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const currentPath = location.pathname;
 const{Conversations} = useContext(ConversationContext)
  const { id } = useParams();
  const { love, getFavorite } = useContext(LoveContext);
  const { userData, token, fetchUserData, setToken } = useContext(UserContext);
  const { categories } = useContext(CategoryContext);
  const { totalItems, cartItems, getCart } = useContext(CartContext);
  const { notifications = [], fetchNotifications } = useContext(NotificationContext);
    const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [hoveredPage, setHoveredPage] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [notificationCount, setNotificationCount] = useState(
    notifications?.length
  );
  const [showDone, setShowDone] = useState(
    Array(notifications?.length).fill(false)
  );

  const navigate = useNavigate();
  const { color } = useContext(ColorContext);
  const { setLoader } = useContext(LoaderContext);
  const handleProfileClick = () => {
    if (token !== "" || token) {
      token;
      setLoader(true);
      navigate("/profile");
    } else {
      toast.error("You must login first");
    }
  };

  const handleDashboardClick = () => {
    if (token !== "" || token) {
      token;
      setLoader(true);
      navigate("/dashboard");
    } else {
      toast.error("You Are Not Admin ");
    }
  };

  const handleLogOutClick = () => {
    localStorage.setItem("token", "");
    setToken("");
    navigate("/login");
  };

  useEffect(() => {
    fetchUserData();
    userData;
    getFavorite();
    getCart();
   
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    event.currentTarget;
  };

  const handleCloseNavMenu = () => {
    handleNavigate("/categories");
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageHover = () => {
    setHoveredPage(true);
  };

  const handlePageHoverOut = () => {
    setHoveredPage(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
    setNotificationCount(0);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleNavigate = (keyword) => {
    if (currentPath !== keyword) {
      setLoader(true);
    }
     navigate(`${keyword}`)
  };

  const notificationOnClick = (auctionId) => {
    navigate(`/bid/${auctionId}`);
  };
  const extractAuctionId = (notification) => {
    const auctionIdMatch = notification.match(/auction id is (\w+)/);
    return auctionIdMatch ? auctionIdMatch[1] : null;
  };

  const getNotificationTextWithoutAuctionId = (notification) => {
    return notification.replace(/and the auction id is \w+/, "");
  };

  const handleNotificationDeleteClick = (index) => {
    console.info(`You clicked the Chip at index ${index}.`);
  };

  const handleNotificationDelete = async (index) => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:3000/api/v1/auth/delete-notification",
        {
          headers: {
            jwt: localStorage.getItem("token"),
          },
          data: {
            notificationIndex: index,
          },
        }
      );

     
      setShowDone((prevShowDone) => {
        const updatedShowDone = [...prevShowDone];
        updatedShowDone[index] = true;
        return updatedShowDone;
      });

      fetchNotifications();

      setTimeout(() => {
        setShowDone(Array(notifications.length).fill(false));
      }, 700);
    } catch (error) {
      toast.error("Error deleting notification. Please try again.");
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:3000/api/v1/auth/clear-notifications",
        {
          headers: {
            jwt: localStorage.getItem("token"),
          },
        }
      );
      fetchNotifications();
    } catch (error) {
      toast.error("Error clearing notifications. Please try again.");
    }
  };

  return (
    <AppBar position="static" sx={{ background: color, zIndex: 9 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", width: "10%" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ccc",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ cursor: "pointer", width: "70%" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleNavigate("/products");
                }}
              >
                <Typography sx={{ fontWeight: "bold" }} textAlign="center" >
                  Products
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: "bold" }}
                onClick={() => {
                  handleNavigate("/about");
                }}
              >
                <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                  About Us
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: "bold" }}
                onClick={() => {
                  handleNavigate("/post");
                }}
              >
                <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                  Posts
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: "bold" }}
                onClick={handleCloseNavMenu}
              >
                <Link to={"/categories"}>
                  <Typography sx={{ fontWeight: "bold" }} textAlign="center">
                    Categories
                  </Typography>
                </Link>
              </MenuItem>
            {categories &&
  categories.categories &&
  categories.categories.map((category) => (
    <Link to={`/products/${category._id}`} key={category._id} style={{ textDecoration: 'none', color: 'inherit' }}>
      <FlipCard category={category}>
        {category.title}
      </FlipCard>
    </Link>
  ))}

            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              textAlign: "center",
            }}
          >
            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link
                to="/products"
                onClick={() => {
                  handleNavigate("/products");
                }}
                className="text-decoration-none h5 mx-2"
              >
                Products
              </Link>
            </Box>

            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link
                to="/about"
                onClick={() => {
                  handleNavigate("/about");
                }}
                className="text-decoration-none h5 mx-2"
              >
                About Us
              </Link>
            </Box>

            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link
                onClick={() => {
                  handleNavigate("/post");
                }}
                to="/post"
                className="text-decoration-none h5 mx-2"
              >
                Posts
              </Link>
            </Box>

            <Box
              onMouseEnter={handlePageHover}
              onMouseLeave={handlePageHoverOut}
              sx={{ my: 2, textAlign: "center", position: "relative" }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
                }}
                // component={Link}
                onClick={()=>{handleNavigate('/categories')}}
                className="text-decoration-none h5 mx-2"
              >
                <Link
                  to={"/categories"}
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Categories
                </Link>
              </Typography>
              {hoveredPage && (
                <Grid
                  sx={{
                    position: "absolute",
                    top: "100%",
                    background: "white",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                    borderRadius: "5px",
                    display: "flex",
                    py: 1,
                    px: 2,
                    zIndex: 3,
                    justifyContent: "flex-start",
                  }}
                >
                  <Grid
                    className="d-flex flex-wrap"
                    sx={{ zIndex: "999", height: "100%", width: "680px" }}
                  >
                    {categories &&
                      categories.categories &&
                      categories.categories.map((category) => (
                        <Link
                          to={`/products/${category._id}`}
                          key={category._id}
                        >
                          <FlipCard category={category} key={category._id}>
                            {category.title}
                          </FlipCard>
                        </Link>
                      ))}
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>

















          {!token && (
            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link to="/login" className="text-decoration-none h4 mx-2">
                <Button
                  sx={{
                    backgroundColor: "#fff",
                    color: color,
                    "&:hover": {
                      backgroundColor: color,
                      color: "#fff",
                      outline: "3px solid #fff",
                    },
                  }}
                  variant="contained"
                >
                  Log In
                </Button>
              </Link>
            </Box>
          )}

          {token && (
            <>
              <IconButton color="inherit" onClick={handleOpenNotificationsMenu}>
                <Badge badgeContent={notificationCount} color="secondary">
                  <NotificationsIcon
                    sx={{ cursor: "pointer", color: "white" }}
                  />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <Badge badgeContent={love} color="secondary">
                  <Link to={"/favorite"}>
                    {" "}
                    <FavoriteIcon sx={{ cursor: "pointer", color: "white" }} />
                  </Link>
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <Badge badgeContent={Conversations?.length} color="secondary">
                  <Link to={"/chat"}>
                    {" "}
                    <FaComments size={25} color="#FFF" />
                  </Link>
                </Badge>
              </IconButton>

              <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
                <Link to="/sell" className="text-decoration-none h4 mx-2">
                  <Button
                    sx={{
                      backgroundColor: "white",
                      color: color,
                      "&:hover": {
                        color: "white",
                        backgroundColor: color,
                        outline: "2px solid white",
                      },
                    }}
                    variant="contained"
                  >
                    List
                  </Button>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 0, display: "flex" }}>
                <Tooltip title="Open settings">
                  <>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <img
                        src={userData?.imageUrl?.images[0]}
                        alt="User Photo"
                        style={{
                          cursor: "pointer",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                    <IconButton color="inherit">
                      <Badge
                        badgeContent={cartItems?.length || 0}
                        color="secondary"
                      >
                        <Link
                          style={{ margin: "0" }}
                          to="/cart"
                          className="text-decoration-none h5"
                        >
                          <ShoppingCartIcon />
                        </Link>
                      </Badge>
                    </IconButton>
                  </>
                </Tooltip>

                {/* <Switch checked={darkMode} onChange={toggleDarkMode} /> */}

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* <MenuItem key={"3"} onClick={handleCloseUserMenu}>
                    <Typography
                      onClick={handleDashboardClick}
                      textAlign="center"
                    >
                      Dashboard
                    </Typography>
                  </MenuItem> */}

                  <MenuItem key={"1"} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleProfileClick} textAlign="center">
                      Profile
                    </Typography>
                  </MenuItem>

                  <MenuItem key={"2"} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogOutClick} textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}

          <Menu
            id="notifications-menu"
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotificationsMenu}
            PaperProps={{
              style: {
                width: "auto",
                maxHeight: "80vh",
                overflowY: "auto",
              },
            }}
          >
            {notifications?.map((notification, index) => {
              const auctionId = extractAuctionId(notification);
              const notificationText =
                getNotificationTextWithoutAuctionId(notification);

              return (
                <MenuItem
                  key={index}
                  onClick={() => {
                    if (auctionId) {
                      notificationOnClick(auctionId);
                    }
                    handleCloseNotificationsMenu();
                  }}
                >
                  {notificationText}
                  <Stack direction="row" spacing={0}>
                    <Chip
                      onClick={() => handleNotificationDeleteClick(index)}
                      onDelete={() => handleNotificationDelete(index)}
                      deleteIcon={
                        !showDone[index] ? <DeleteIcon /> : <DoneIcon />
                      }
                    />
                  </Stack>
                </MenuItem>
              );
            })}
            <MenuItem
              onClick={handleClearAllNotifications}
              style={{
                justifyContent: "center",
                textAlign: "center",
                color: "blue",
              }}
            >
              Clear All
            </MenuItem>{" "}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
