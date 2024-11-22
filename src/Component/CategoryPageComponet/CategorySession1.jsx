import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Slider,
  Box,
  Typography,
  Button,
  Drawer,
  IconButton,
  Pagination,
} from "@mui/material";
import ItemCard from "../Card/ItemCard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getProduct } from "../../Service/ProductApi";
import { message } from "antd";
import { useSearchParams } from "react-router-dom";

// sizeOptions to be used for size filtering
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export default function CategorySession1() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("c");
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedsubCategory, setSelectedsubCategory] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
 
  useEffect(() => {
    const getProdutData = async () => {
      const response = await getProduct();
      const result = response.data;
      if (result.length > 0) {
        setProductData(result);
      } else {
        message.warning("Products not found ...");
      }
    };
    getProdutData();
  }, []);

  const categoryOptions = [
    ...new Set(productData.map((item) => item?.category).filter(Boolean)),
  ];

  const subCategoryOptions =
    selectedCategory
      ? [
        ...new Set(
          productData
            .filter((item) => item?.category === selectedCategory)
            .map((item) => item?.subCategory)
            .filter(Boolean)
        ),
      ]
      : [
        ...new Set(
          productData
            .map((item) => item?.subCategory)
            .filter(Boolean)
        ),
      ];

  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

  const filteredItems = productData.filter(
    (item) =>
      (!selectedCategory || item.category === selectedCategory) &&
      (selectedsubCategory.length === 0 || selectedsubCategory.includes(item.subCategory)) &&
      (!selectedSize || item.sizes.some((size) => size.name === selectedSize)) &&
      item.sizes.some(
        (size) => size.price >= priceRange[0] && size.price <= priceRange[1]
      )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const renderFilters = () => (
    <Box
      sx={{
        width: 300,
        padding: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filter Products
      </Typography>
      <br />
      <Autocomplete
        sx={{ width: "100%", marginBottom: 2 }}
        options={categoryOptions}
        value={selectedCategory}
        onChange={(event, newValue) => setSelectedCategory(newValue)}
        getOptionLabel={(option) => option || ""}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
      <br />
      <Autocomplete
        sx={{ width: "100%", marginBottom: 2 }}
        multiple
        options={subCategoryOptions || []}
        value={selectedsubCategory}
        onChange={(event, newValue) => setSelectedsubCategory(newValue)}
        getOptionLabel={(option) => option || ""}
        renderInput={(params) => (
          <TextField {...params} label="SubCategory" variant="outlined" />
        )}
      />
      <br />
      <Select
        sx={{ width: "100%", marginBottom: 2 }}
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        displayEmpty
        variant="outlined"
      >
        <MenuItem value="">All Sizes</MenuItem>
        {sizeOptions.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <br />
        <Typography variant="caption" color="textSecondary">
          Price Range: Rs {priceRange[0]} - Rs {priceRange[1]}
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          sx={{
            "& .MuiSlider-thumb": {
              backgroundColor: "#1976d2",
              width: 20,
              height: 20,
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#1976d2",
              height: 6,
            },
            "& .MuiSlider-rail": {
              opacity: 0.5,
              backgroundColor: "#b0bec5",
              height: 6,
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => setDrawerOpen(false)} // Close drawer
        sx={{
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );

  return (
    <div className="p-0" style={{ marginTop: "85px" }}>
      <div className="mt-4">
        <Box sx={{ display: { xs: "block", sm: "flex" }, gap: 1, mb: 4 }}>
          <IconButton
            sx={{
              display: { xs: "block", sm: "none" },
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>{renderFilters()}</Box>

          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {renderFilters()}
          </Drawer>

          <div className="container">
            <h6>
              <span>Category : </span>
              {selectedCategory || "All"} | <span> </span>
              {selectedsubCategory.join(", ") || "All"}
            </h6>
            <hr />
            <Box sx={{ flexGrow: 2 }}>
              <div className="row">
                {currentItems.map((item) => {
                  const prices = item.sizes.map((size) => size.price);
                  const minPrice = Math.min(...prices);
                  const maxPrice = Math.max(...prices);

                  return (
                    <div
                      key={item.id}
                      className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
                    >
                      <ItemCard
                        product={{
                          ...item,
                          priceRange: `Rs ${minPrice} - Rs ${maxPrice}`,
                          availableSizes: item.sizes.map((size) => size.name).join(", "),
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                />
              </Box>
            </Box>
          </div>
        </Box>
      </div>
    </div>
  );
}
