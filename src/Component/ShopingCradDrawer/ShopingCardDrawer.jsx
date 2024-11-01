import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Badge from "@mui/material/Badge"; // Import Badge

// Styled component for item container
const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2), // Space between rows
}));

export default function ShoppingCardDrawer() {
  const [open, setOpen] = React.useState(false);

  // Sample item data
  const [items, setItems] = React.useState([
    {
      id: 1,
      name: "Item 1 gjjgkjgjkgk",
      qty: 1,
      price: 10.0,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Item 2",
      qty: 2,
      price: 20.0,
      img: "https://via.placeholder.com/150",
    },
  ]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleQtyChange = (index, newQty) => {
    const newItems = [...items];
    newItems[index].qty = newQty;
    setItems(newItems);
  };

  // Calculate total quantity of items
  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  const ItemList = (
    <Box
      sx={{ padding: 2 }}
      style={{ width: "50wh" }}
      role="presentation"
      onClick={(event) => event.stopPropagation()} 
    >
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" gutterBottom>
        Items
      </Typography>
      <Divider />
      {items.map((item, index) => (
        <ItemContainer key={item.id}>
          <CardMedia
            component="img"
            image={item.img}
            alt={item.name}
            sx={{ marginRight: 3, width: 80, height: 80 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">{item.name}</Typography>
            <Typography variant="body2">
              Price: ${(item.price * item.qty).toFixed(2)} {/* Fixed toFixed */}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Button
              onClick={() => handleQtyChange(index, Math.max(item.qty - 1, 1))}
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
              sx={{ mx: 1, width: "40px" }}
            />
            <Button onClick={() => handleQtyChange(index, item.qty + 1)}>
              +
            </Button>
          </Box>
        </ItemContainer>
      ))}
    </Box>
  );

  return (
    <div>
      <Badge badgeContent={items.length} color="primary"  onClick={toggleDrawer(true)}> 
        <ShoppingCartOutlined
          onClick={toggleDrawer(true)}
          style={{ fontSize: "20px", cursor: 'pointer' }} 
        />
      </Badge>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)} 
      >
        {ItemList}
      </Drawer>
    </div>
  );
}
