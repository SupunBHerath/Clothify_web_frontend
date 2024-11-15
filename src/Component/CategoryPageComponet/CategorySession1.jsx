import React, { useState } from "react";
import { Autocomplete, TextField, Select, MenuItem, Slider, Box, Typography } from "@mui/material";
import CategoryCard from "../Card/Category";
import a1 from "../../assets/Landing/NewArrivals/1.png";
import a2 from "../../assets/Landing/NewArrivals/2.png";
import a3 from "../../assets/Landing/NewArrivals/3.png";
import a4 from "../../assets/Landing/NewArrivals/4.png";
import ItemCard from "../Card/ItemCard";

const Category = [
  { id: 1, img: a1, name: "Stylish Jacket", description: "Perfect for chilly days", price: 59.99, size: "M" },
  { id: 2, img: a2, name: "Classic Sneakers", description: "Timeless style", price: 79.99, size: "L" },
  { id: 3, img: a3, name: "Elegant Watch", description: "Sophisticated and sleek", price: 120.00, size: "S" },
  { id: 4, img: a4, name: "Trendy Sunglasses", description: "UV protection", price: 35.00, size: "XS" },
  { id: 5, img: a4, name: "Casual T-shirt", description: "Comfy and stylish", price: 25.00, size: "XL" },
  { id: 6, img: a1, name: "Chic Handbag", description: "Elegant and practical", price: 95.00, size: "M" },
  { id: 7, img: a1, name: "Sporty Cap", description: "Stay cool", price: 15.00, size: "XS" },
  { id: 8, img: a4, name: "Leather Wallet", description: "Premium quality", price: 45.00, size: "L" },
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const categoryOptions = [...new Set(Category.map((item) => item.name))];

export default function CategorySession1() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState([0, 150]);

  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

  const filteredItems = Category.filter(
    (item) =>
      (!selectedCategory || item.name === selectedCategory) &&
      (!selectedSize || item.size === selectedSize) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  return (
    <div className="mt-0 p-0">
      <div className="container mt-4">
        <Box sx={{ display: "flex", gap: 5, mb: 4 }}>
          <Autocomplete
            sx={{ width: 250,height:55 }}
            options={categoryOptions}
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
          />

          <Select
            sx={{ width: 150,height:55 }}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">All Sizes</MenuItem>
            {sizeOptions.map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </Select>

          <Box sx={{ width: 200 ,height:55}}>
            <Typography variant="caption" color="textSecondary">
              Price Range: Rs {priceRange[0]} - Rs {priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={150}
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: '#1976d2', 
                  width: 18,
                  height: 18,
                  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    boxShadow: '0px 0px 8px rgba(25, 118, 210, 0.8)',
                  },
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#1976d2', 
                  height: 6,
                },
                '& .MuiSlider-rail': {
                  opacity: 0.4,
                  backgroundColor: '#b0bec5', 
                  height: 6,
                },
              }}
            />
          </Box>
        </Box>

        <div className="row">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
            >
              <ItemCard
                img={item.img}
                name={item.name}
                description={item.description}
                price={`$${item.price}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
