import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { Alert, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProductDialog = ({ open, onClose, product }) => {
  const { role, loading, isLogin } = useUser();

  const [mainImage, setMainImage] = useState(product.images[0].url);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate()
  useEffect(() => {
    setSelectedSize(product.sizes[0]);
  }, [product.sizes]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  };

  const getMaxQuantity = () => selectedSize?.qty || 0;

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Math.min(Number(event.target.value), getMaxQuantity()));
    setQuantity(value);
  };
  const handleBuyNow = () => {
    addToCart()
    navigate("/user/checkout")
  }
  const addToCart = () => {
    // Include selected size and quantity in the payload
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        selectedSize,
        qty: quantity,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          borderRadius: "50%",
          padding: "8px",
          cursor: "pointer",
          color: 'red',
          transition: "background-color 0.3s ease",
        }}
        onClick={() => onClose(true)}
      >
        <CloseIcon />
      </div>
      <DialogContent>
        <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"} gap={isSmallScreen ? 2 : 4}>
          <Box flex={1} display="flex" flexDirection="column" alignItems="center">
            <img
              src={mainImage}
              alt="Main"
              style={{
                width: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                marginBottom: "1rem",
              }}
            />
            <Box display="flex" gap={1} justifyContent="center" flexWrap={isSmallScreen ? "wrap" : "nowrap"}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(image.url)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: mainImage === image ? "3px solid #1976d2" : "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box flex={1} padding={isSmallScreen ? 0 : 2}>
            {product?.new && (<Tag color="success" >New Arrival</Tag>)}

            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {product.category}
            </Typography>

            <Typography variant="body1" color="textSecondary" gutterBottom>
              {product.description}
            </Typography>


            <Typography variant="subtitle1" color="primary" gutterBottom>
              Price: Rs {selectedSize?.price?.toFixed(2)}
            </Typography>

            <Typography variant="subtitle1">Select Size</Typography>
            <Select
              value={selectedSize}
              onChange={handleSizeChange}
              fullWidth
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            >
              {product.sizes.map((size, index) => (
                <MenuItem key={index} value={size}>
                  {size.name}
                </MenuItem>
              ))}
            </Select>

            {selectedSize && (
              <>
                <Typography variant="subtitle1">Quantity ( Available Qty : <span style={{ color: "firebrick" }}>{getMaxQuantity()}</span> )</Typography>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{
                    min: 1,
                    max: getMaxQuantity(),
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: "1rem" }}
                />
              </>
            )}
           {!isLogin && ( <Alert
              message="Please log in to buy products."
              type="warning"
              showIcon
              closable
            />)}
            <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"} gap={2}>
              <button
                type="button"
                style={{
                  width: "100%",
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "15px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={addToCart}
              >
                Add To Cart
              </button>
              <button
                type="button"
                disabled={!isLogin}
                onClick={handleBuyNow}
                style={{
                  width: "100%",
                  backgroundColor: "#F68714",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "15px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Buy Now
              </button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
