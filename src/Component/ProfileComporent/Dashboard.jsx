import React, { useEffect, useState } from "react";
import MyProfile from "./MyProfile";
import MyOrders from "./MyOrders";
import MyAddresses from "./MyAddresses";
import MyWishlist from "./MyWishlist";
import { Drawer, IconButton, List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState("MyOrders");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { logout ,cusId,email } = useUser();
 
    const renderComponent = () => {
        switch (activeComponent) {
            case "MyProfile":
                return <MyProfile cusID={cusId}  email={email}/>;
            case "MyOrders":
                return <MyOrders cusID={cusId} />;
            case "MyAddresses":
                return <MyAddresses />;
            case "MyWishlist":
                return <MyWishlist />;
            default:
                return <MyProfile />;
        }
    };

    const menuItems = [
        { label: "My Orders", value: "MyOrders" },
        // { label: "My Addresses", value: "MyAddresses" },
        { label: "My Wishlist", value: "MyWishlist" },
        { label: "My Profile", value: "MyProfile" },
        { label: "Logout", value: "Logout" },
    ];

    const handleMenuClick = (value) => {
        if (value === "Logout") {
            message.success("Logout Sucessfully..")
            logout()
           navigate("/")
        } else {
            setActiveComponent(value);
        }
        setIsDrawerOpen(false);
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9", marginTop: 8.2 }}>
            <Box
                sx={{
                    display: { xs: "none", md: "block" },
                    width: "250px",
                    background: "linear-gradient(180deg, #646464, #646464)",
                    color: "white",
                    padding: "20px",
                    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",

                }}
            >
                <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "20px" }}>
                    Menu
                </Typography>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.value}
                            button
                            onClick={() => handleMenuClick(item.value)}
                            sx={{
                                backgroundColor: activeComponent === item.value ? "#F68714" : "transparent",
                                borderRadius: "5px",
                                marginY: "10px",
                                cursor:"pointer"

                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                sx={{ display: { xs: "block", md: "none" } }}
            >
                <Box
                    sx={{
                        width: "250px",
                        background: "linear-gradient(180deg, #646464, #646464)",
                        color: "white",
                        height: "100%",
                        padding: "20px",
                    }}
                >
                    <IconButton
                        onClick={() => setIsDrawerOpen(false)}
                        sx={{ color: "white", marginBottom: "10px" }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                key={item.value}
                                button
                                onClick={() => handleMenuClick(item.value)}
                                sx={{
                                    backgroundColor: activeComponent === item.value ? "#81c784" : "transparent",
                                    "&:hover": { backgroundColor: "#66bb6a" },
                                    borderRadius: "5px",
                                    marginY: "10px",
                                }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            {!isDrawerOpen &&
                <IconButton
                    onClick={() => setIsDrawerOpen(true)}
                    sx={{
                        display: { xs: "block", md: "none" },
                        position: "fixed",
                        top: "50px",
                        left: "3px",
                        zIndex: 1201,
                    }}
                >
                    <MenuIcon />
                </IconButton>
            }
            <Box sx={{ flex: 1, padding: "30px", overflowY: "auto" }}>
                {renderComponent()}
            </Box>
        </Box>
    );
};

export default Dashboard;
