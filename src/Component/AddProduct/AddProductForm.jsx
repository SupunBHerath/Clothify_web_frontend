import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  Paper,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios"; // For Cloudinary API calls
import { AddProduct } from "../../Service/ProductApi";
import { message } from "antd";

const subCategories = [
  { id: 1, name: "Sneakers" },
  { id: 2, name: "Boots" },
  { id: 3, name: "Sandals" },
  { id: 4, name: "Loafers" },
];

const categories = [
  { id: 1, name: "Men" },
  { id: 2, name: "Women" },
  { id: 3, name: "Kids" },
];

const sizeOptions = ["S", "M", "L", "XL"];

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dklmxsahg/image/upload";
const UPLOAD_PRESET = "clothify_img";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subCategory: "",
    images: [],
    sizes: [],
    category: "",
  });

  const [filesToUpload, setFilesToUpload] = useState([]); // Store files to upload on Submit
  const [selectedSize, setSelectedSize] = useState("");
  const [sizePrice, setSizePrice] = useState("");
  const [sizeQty, setSizeQty] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    setFilesToUpload([...filesToUpload, ...files]);
  };

  const addSize = () => {
    if (selectedSize && sizePrice && sizeQty) {
      const sizeObject = { name: selectedSize, price: parseFloat(sizePrice), qty: parseFloat(sizeQty) };
      setFormData({ ...formData, sizes: [...formData.sizes, sizeObject] });
      setSizePrice("");
      setSizeQty("")
      setSelectedSize("")
    }
  };

  const removeSize = (index) => {
    const updatedSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const removeImage = (index) => {
    const updatedFiles = filesToUpload.filter((_, i) => i !== index);
    setFilesToUpload(updatedFiles);
  };

  const handleSubmit = async () => {
    setUploading(true);

    const imageUrls = await Promise.all(
      filesToUpload.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
          const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response.data.secure_url;
        } catch (error) {
          console.error("Error uploading image:", error);
          return null;
        }
      })
    );

    const validUrls = imageUrls.filter((url) => url !== null);

    const formattedImages = validUrls.map((url) => ({ url }));

    const finalFormData = {
      ...formData,
      images: formattedImages,
    };
    try {
      const res = AddProduct(finalFormData);

      if ((await res).data?.id > 0) {
        message.success("Product Added ..", 5)
        console.log("Submitted Data:", (await res).data);
        setFormData({
          name: "",
          description: "",
          subCategory: "",
          images: [],
          sizes: [],
          category: "",
        })
        setFilesToUpload([])
        setSizePrice("");
        setSizeQty("")
        setSelectedSize("")
      } else {
        message.error("Error Found ...", 5)
      }

    } catch (e) {
      message.error("Error Found ...", 5)
      console.log("Error Found : ", e);

    } finally {
      setUploading(false);

    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {filesToUpload.map((file, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index + 1}`}
                  />
                  <CardActions>
                    <IconButton
                      color="error"
                      onClick={() => removeImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 1 }}
            disabled={uploading}
          >
            Select Images
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleFileSelection}
            />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sub Category</InputLabel>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
            >
              {subCategories.map((subCat) => (
                <MenuItem key={subCat.id} value={subCat.name}>
                  {subCat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              fullWidth
            >
              {sizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Qty"
            value={sizeQty}
            onChange={(e) => setSizeQty(e.target.value)}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Price"
            value={sizePrice}
            onChange={(e) => setSizePrice(e.target.value)}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={addSize}
          >
            Add Size
          </Button>
        </Grid>
        <Grid item xs={12}>
          <List>
            {formData.sizes.map((size, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>
                  Size :  {size.name} |  Qtys : {size.qty} |  One Qty Price : Rs{size.price.toFixed(2)}
                </Typography>

                <IconButton onClick={() => removeSize(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </Button>
      </Grid>
    </Paper>
  );
};

export default AddProductForm;
