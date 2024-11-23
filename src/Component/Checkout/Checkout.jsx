import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Container,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardContent,
    Divider,
    Box,
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { createOrders } from "../../Service/OrderApi";
import { Button, message, notification } from "antd";
import { useUser } from "../../context/UserContext";
import { getUserById } from "../../Service/UserDetailsApi";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CheckoutPage = () => {
    const { logout, cusId, isLogin } = useUser();

    const [activeStep, setActiveStep] = useState(0);
    const [invoiceNumber, setIinvoiceNumber] = useState(0);
    const [fData, setfData] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        paymentMethod: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const items = useSelector((state) => state.cart);
    const [api, contextHolder] = notification.useNotification();
    const [isloading, setIsLoading] = useState(false)
    const openNotificationWithIcon = (type, title, description) => {
        api[type]({
            message: title,
            description: description,
            duration: 5,
        });
    };

    const fechUserData = async () => {
        const user = await getUserById(cusId);
        if (user?.id == cusId) {
            setfData({
                fullName: user.name,
                address: user.billingAddress,
                city: user.city,
                postalCode: user.postalCode,
                phone: user.phoneNumber,
                cardNumber: "",
                expiryDate: "",
                cvv: "",
                paymentMethod: ""

            })
        }
    }

    useEffect(() => {
        fechUserData()
    }, [cusId])

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
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Card Number Validation
        const cardNumberRegex = /^\d{13,19}$/;
        if (!fData.cardNumber) {
            tempErrors.cardNumber = "Card Number is required";
            isValid = false;
        } else if (!cardNumberRegex.test(fData.cardNumber)) {
            tempErrors.cardNumber = "Card Number must be between 13 and 19 digits";
            isValid = false;
        }

        const expiryDateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
        if (!fData.expiryDate) {
            tempErrors.expiryDate = "Expiry Date is required";
            isValid = false;
        } else if (!expiryDateRegex.test(fData.expiryDate)) {
            tempErrors.expiryDate = "Invalid Expiry Date format (MM/YY) {03/25}";
            isValid = false;
        } else {
            const [month, year] = fData.expiryDate.split('/');
            const expiryDate = new Date(`20${year}-${month}-01`);
            const currentDate = new Date();
            if (expiryDate < currentDate) {
                tempErrors.expiryDate = "Card has expired";
                isValid = false;
            }
        }

        // CVV Validation
        const cvvRegex = /^\d{3,4}$/;
        if (!fData.cvv) {
            tempErrors.cvv = "CVV is required";
            isValid = false;
        } else if (!cvvRegex.test(fData.cvv)) {
            tempErrors.cvv = "CVV must be 3 or 4 digits";
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    };

    const handleNext = () => {

        if (validateStep()) {
            if (activeStep === 1 & fData.paymentMethod == "Online Payment") {
                if (validate()) {
                    setActiveStep((prev) => prev + 1);
                } else {
                    setActiveStep(1);
                }
            } else {
                setActiveStep((prev) => prev + 1);
            }
        } else if (activeStep === 1 & fData.paymentMethod != "Online Payment") {
            setActiveStep((prev) => prev + 1);
        }
    };



    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = (e) => {
        setfData({ ...fData, [e.target.name]: e.target.value });
    };
    const handleSave = async () => {
        setIsLoading(true);

        const orderDetails = items.map((item) => ({
            productId: item.id,
            productName: item.name,
            productImg: item.images[0].url,
            productSize: item.selectedSize.name,
            price: item.selectedSize.price,
            qty: item.qty,
        }));
        const generateInvoiceNumber = async () => {
            const prefix = 'INV';
            const randomNum = Math.floor(Math.random() * 1000000);
            const invoiceNumber = `${prefix}${randomNum.toString().padStart(6, '0')}`;
            return invoiceNumber;
        };
        const IVN = await generateInvoiceNumber();
        const order = {
            cusId: cusId,
            date: new Date().toISOString().split('T')[0],
            billingAddress: `${fData.address}, ${fData.city}, ${fData.postalCode}`,
            phoneNumber: fData.phone,
            paymentMethod: fData.paymentMethod,
            invoiceNumber: IVN,
            status: "Processing",
            orderDetails,
        };

        try {
            const res = await createOrders(order);
            if (res.status === 200) {
                const result = res.data;
                setTimeout(() => {
                    openNotificationWithIcon(
                        'success',
                        '🎉 Order Placed Successfully!',
                        'Your order has been successfully placed. Check your profile for more details.'
                    );

                }, 2000);

                setTimeout(() => {
                    navigate("/user/profile")
                    setIsLoading(false)

                }, 6000);
            } else {
                setIsLoading(false)

                openNotificationWithIcon(
                    'error',
                    '💥 Order Failed!',
                    'Something went wrong. Please check your account balance and try again.'
                );
            }
        } catch (error) {
            setIsLoading(false)
            console.error("Error placing order:", error);
            openNotificationWithIcon(
                'error',
                '🚨 Error Occurred!',
                'Oops! There was an issue placing your order. Please check your details and try again.'
            );
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

                        <Typography variant="subtitle1" gutterBottom>
                            Choose Payment Method
                        </Typography>
                        <RadioGroup
                            row
                            aria-label="payment-method"
                            name="paymentMethod"
                            value={fData.paymentMethod}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Cash On Delivery" control={<Radio />} label="Cash on Delivery" />
                            <FormControlLabel value="Online Payment" control={<Radio />} label="Card Payment" />
                        </RadioGroup>

                        {fData.paymentMethod === 'Online Payment' && (
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
                                        label="Expiry Date (MM/YY)"
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
                        )}
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
                        color="danger" variant="dashed"
                        icon={<LeftOutlined />}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    {activeStep < steps.length - 1 ? (
                        <>
                            <Button color="primary" variant="dashed" icon={<RightOutlined />} iconPosition="end" onClick={handleNext}>
                                Next
                            </Button>
                        </>
                    ) : (
                        <>
                            {contextHolder}
                            <Button type="primary" loading={isloading} disabled={!items.length > 0} color="primary" onClick={handleSave}>
                                Place Order
                            </Button>
                        </>
                    )}
                </Box>
            </Card>
        </Container>
    );
};

export default CheckoutPage;
