import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Drawer,
  Button,
  Typography,
  Divider,
  IconButton,
  Badge,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import LoginDrawer from "../DrawerLogin/DrawerLogin";

const DrawerContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: "360px",
  position: "relative",
  background: "#f9f9f9",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const Footer = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  textAlign: "center",
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function ShoppingCardDrawer() {
  const { logout, cusId, isLogin } = useUser();

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const cartLength = useSelector((state) => state.cart.length);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleQtyChange = (index, newQty) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: { index, qty: Math.max(1, newQty) },
    });
  };

  const handleRemoveItem = (id, size) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id, size },
    });
  };
  const handleButtonClick = () => {
    setOpen(false)
    navigate("checkout");
  };

  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  const totalPrice = items.reduce((acc, item) => acc + item?.selectedSize?.price * item.qty, 0).toFixed(2);

  const ItemList = (
    <DrawerContent>
      <Header>
        <Typography variant="h6">Shopping Cart</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Header>
      <Divider />
      {items.length > 0 ? (
        items.map((item, index) => (
          <ItemContainer key={`${item.id}-${item.selectedSize}`}>
            <CardMedia
              component="img"
              image={item?.images[0].url}
              alt={item.name}
              sx={{ width: 60, height: 60, borderRadius: 1, marginRight: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" noWrap>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rs {(item?.selectedSize?.price * item.qty).toFixed(2)}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Button
                  size="small"
                  onClick={() => handleQtyChange(index, item.qty - 1)}
                  sx={{ minWidth: "30px" }}
                >
                  -
                </Button>
                <TextField
                  size="small"
                  value={item.qty}
                  inputProps={{ min: 1, style: { textAlign: "center" } }}
                  onChange={(e) =>
                    handleQtyChange(index, Math.max(1, Number(e.target.value)))
                  }
                  sx={{ mx: 1, width: "50px" }}
                />
                <Button
                  size="small"
                  onClick={() => handleQtyChange(index, item.qty + 1)}
                  sx={{ minWidth: "30px" }}
                >
                  +
                </Button>
              </Box>
            </Box>
            <IconButton
              onClick={() => handleRemoveItem(item.id, item.selectedSize.name)}
              color="error"
              aria-label="remove"
              sx={{ marginLeft: 2 }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </ItemContainer>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
          Your cart is empty
        </Typography>
      )}
      {items.length > 0 && (
        isLogin ? (
          <Footer>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Total: Rs {totalPrice}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleButtonClick}
              sx={{ padding: "10px 0" }}
            >
              Proceed to Checkout
            </Button>
          </Footer>
        ) : (
          <>
            <Footer>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Total: Rs {totalPrice}
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Log in to your Account
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "10px 0" }}
              >
                <LoginDrawer />
              </Button>
            </Footer>


          </>
        )
      )}

    </DrawerContent>
  );

  return (
    <div>
      <Badge badgeContent={cartLength} color="primary" onClick={toggleDrawer(true)}>
        <ShoppingCartOutlined className="text-white fw-bolder" style={{ fontSize: "24px", cursor: "pointer" }} />
      </Badge>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {ItemList}
      </Drawer>
    </div>
  );
}
