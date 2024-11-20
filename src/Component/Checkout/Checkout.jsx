import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Container,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Card,
    CardContent,
    Divider,
    Box,
    Grid,
    TextField,
} from "@mui/material";
import { createOrders } from "../../Service/OrderApi";
import { message } from "antd";
import { useUser } from "../../context/UserContext";

const CheckoutPage = () => {
  const { logout, cusId, isLogin } = useUser();

    const [activeStep, setActiveStep] = useState(0);
    const [fData, setfData] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [errors, setErrors] = useState({});

    const items = useSelector((state) => state.cart);
    console.log(items);

    const steps = ["Shipping Details", "Payment Information", "Review & Place Order"];

    const totalPrice = items
        .reduce((acc, item) => acc + item?.selectedSize?.price * item.qty, 0)
        .toFixed(2);

    const validateStep = () => {
        let tempErrors = {};
        if (activeStep === 0) {
            if (!fData.fullName) tempErrors.fullName = "Full name is required.";
            if (!fData.address) tempErrors.address = "Address is required.";
            if (!fData.city) tempErrors.city = "City is required.";
            if (!fData.postalCode) tempErrors.postalCode = "Postal code is required.";
            if (!fData.phone) tempErrors.phone = "Phone number is required.";
        } else if (activeStep === 1) {
            if (!fData.cardNumber) tempErrors.cardNumber = "Card number is required.";
            if (!fData.expiryDate) tempErrors.expiryDate = "Expiry date is required.";
            if (!fData.cvv) tempErrors.cvv = "CVV is required.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = (e) => {
        setfData({ ...fData, [e.target.name]: e.target.value });
    };
    const handleSave = async () => {
        const orderDetails = items.map((item) => ({
            productId: item.id,
            productName: item.name,
            productImg: item.images[0].url,
            productSize: item.selectedSize.name,
            price: item.selectedSize.price,
            qty: item.qty,
        }));
    
        const order = {
            cusId: cusId, 
            date: new Date().toISOString().split('T')[0],
            billingAddress: `${fData.address}, ${fData.city}, ${fData.postalCode}`,
            phoneNumber: fData.phone,
            status: "Pending",
            orderDetails,
        };
    
    
        try {
            const res = await createOrders(order);
            const result = res.data;
            message.success(result, 3);
        } catch (error) {
            console.error("Error placing order:", error);
            message.error("Failed to place order. Please try again.", 3);
        }
    };
    
    return (
        <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Checkout
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Card sx={{ padding: 4, boxShadow: 5, borderRadius: 2 }}>
                {activeStep === 0 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Shipping Details
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    value={fData.fullName}
                                    onChange={handleChange}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Street Address"
                                    name="address"
                                    value={fData.address}
                                    onChange={handleChange}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={fData.city}
                                    onChange={handleChange}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Postal Code"
                                    name="postalCode"
                                    value={fData.postalCode}
                                    onChange={handleChange}
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    value={fData.phone}
                                    onChange={handleChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {activeStep === 1 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Payment Information
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Card Number"
                                    name="cardNumber"
                                    value={fData.cardNumber}
                                    onChange={handleChange}
                                    error={!!errors.cardNumber}
                                    helperText={errors.cardNumber}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Expiry Date"
                                    name="expiryDate"
                                    value={fData.expiryDate}
                                    onChange={handleChange}
                                    error={!!errors.expiryDate}
                                    helperText={errors.expiryDate}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="CVV"
                                    name="cvv"
                                    value={fData.cvv}
                                    onChange={handleChange}
                                    error={!!errors.cvv}
                                    helperText={errors.cvv}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {activeStep === 2 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Review & Place Order
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        {items.map((item, index) => (
                            <CardContent
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 2,
                                    marginBottom: 2,
                                }}
                            >
                                {/* Image Section */}
                                <Box
                                    sx={{
                                        flexShrink: 0,
                                        textAlign: { xs: "center", md: "left" },
                                    }}
                                >
                                    <img
                                        src={item.images[0].url}
                                        alt={item.name}
                                        width={80}
                                        style={{
                                            maxWidth: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </Box>

                                {/* Text Section */}
                                <Box
                                    sx={{
                                        textAlign: { xs: "left", md: "left" },
                                        flex: 1,
                                    }}
                                >
                                    <Typography variant="body1">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Size: {item.selectedSize.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Quantity: {item.qty}
                                    </Typography>

                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Rs {(item.selectedSize.price * item.qty).toFixed(2)}
                                </Typography>
                            </CardContent>
                        ))}

                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="h6" align="right" sx={{ fontWeight: "bold" }}>
                            Total: Rs {totalPrice}
                        </Typography>
                    </Box>

                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <Button
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    {activeStep < steps.length - 1 ? (
                        <Button variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Place Order
                        </Button>
                    )}
                </Box>
            </Card>
        </Container>
    );
};

export default CheckoutPage;
