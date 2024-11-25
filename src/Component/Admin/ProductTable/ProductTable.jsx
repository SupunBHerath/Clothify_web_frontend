import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button, Modal, Form, Input, Select, Upload, message } from 'antd';
import { AddProduct, getProduct, updateProduct } from '../../../Service/ProductApi';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { DeleteOutline } from '@mui/icons-material';
import axios from 'axios';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dklmxsahg/image/upload";
const UPLOAD_PRESET = "clothify_img";

function createData(id, name, description, subCategory, images, sizes, category, status, isnew) {
  return { id, name, description, subCategory, images, sizes, category, status, isnew };
}

function Row(props) {
  const { row, reloadTable, openEditModal } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell>{row.subCategory}</TableCell>
        {!row.isnew && <TableCell>NO</TableCell>}
        {row.isnew && <TableCell>Yes</TableCell>}
        <TableCell>{row.status}</TableCell>
        <TableCell align="center">
          <IconButton color="warning" aria-label="edit" onClick={() => openEditModal(row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" aria-label="download">
            <FileDownloadIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} className='bg-body-tertiary'>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Typography>Description: {row.description}</Typography>
              <Typography>Category: {row.category}</Typography>
              <Typography>Sub-Category: {row.subCategory}</Typography>
              <Typography>Status: {row.status}</Typography>
              <Box>
                <Typography>Images:</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {row.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`Product ${index}`}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Typography>Available Sizes:</Typography>
                <Table size="small" aria-label="sizes">
                  <TableHead>
                    <TableRow>
                      <TableCell>Size</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price (Rs)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.sizes.map((size, index) => (
                      <TableRow key={index}>
                        <TableCell>{size.name}</TableCell>
                        <TableCell>{size.qty}</TableCell>
                        <TableCell>{size.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ProductTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [imageList, setImageList] = React.useState([]);
  const [form] = Form.useForm();
  const [subCategoryOptions, setSubCategoryOptions] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [isAddProduct, setIsAddProduct] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetchOrders = async () => {
    try {
      const res = await getProduct();
      const data = res.data;
      if (data.length > 0) {
        const formattedRows = data.map((item) =>
          createData(item.id, item.name, item.description, item.subCategory, item.images, item.sizes, item.category, item.status, item.new)
        );
        setRows(formattedRows);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleImageChange = (info) => {
    let fileList = [...info.fileList];

    setImageList(fileList);
  };



  React.useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleIsAddForm = () => {
    setIsAddProduct(true);
    setEditModalVisible(true);
    setImageList([]);
    setSelectedProduct(null);
    setEditModalVisible(true);

    form.setFieldsValue({
      name: "",
      description: "",
      category: "",
      subCategory: "",
      status: "",
      sizes: "",
      images: "",
      new: "",
    });
  }
  const openEditModal = (product) => {
    setIsAddProduct(false);

    setImageList(product?.images);
    setSelectedProduct(product);
    setEditModalVisible(true);

    form.setFieldsValue({
      name: product.name,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      status: product.status,
      sizes: product.sizes,
      images: imageList,
      new: product.new
    });

  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedProduct(null);
    form.resetFields();
  };

  const handleEditSubmit = async (values) => {

    try {
      setIsLoading(true);

      const newFiles = [];
      const existingUrls = [];

      imageList.forEach((fileWrapper) => {
        if (fileWrapper.originFileObj) {
          newFiles.push(fileWrapper.originFileObj);
        } else if (fileWrapper.url) {
          existingUrls.push(fileWrapper.url);
        }
      });

      const uploadedImages = await Promise.all(
        newFiles.map(async (file) => {
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

      const newUrls = uploadedImages.filter((url) => url !== null);

      const allUrls = [...existingUrls, ...newUrls];
      const formattedImages = allUrls.map((url) => ({ url }));

      const Product = {
        ...selectedProduct,
        ...values,
        images: formattedImages,
      };

      if (isAddProduct) {
        const res = await AddProduct(Product);
        if (res.data) {
          message.success('Product Added successfully');
          setIsLoading(false)
          setEditModalVisible(false);
          fetchOrders();
        } else {
          message.error('Product Added faile...');
        }
      } else {
        const res = await updateProduct(selectedProduct.id, Product);
        if (res.data) {
          message.success('Product updated successfully');
          setIsLoading(false)
          setEditModalVisible(false);
          fetchOrders();
        } else {
          message.error('Product updated faile...');
        }

      }
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Failed to update product');
    }
  };


  const handleCategoryChange = (value) => {
    setCategory(value);

    switch (value) {
      case 'Men':
        setSubCategoryOptions([
          { value: 'Shirts', label: 'Shirts' },
          { value: 'T-Shirts', label: 'T-Shirts' },
          { value: 'Suits', label: 'Suits' },
          { value: 'Jeans', label: 'Jeans' },
        ]);
        break;
      case 'Women':
        setSubCategoryOptions([
          { value: 'Dresses', label: 'Dresses' },
          { value: 'Tops', label: 'Tops' },
          { value: 'Sarees', label: 'Sarees' },
          { value: 'Skirts', label: 'Skirts' },
        ]);
        break;
      case 'Kids':
        setSubCategoryOptions([
          { value: 'Boys Clothing', label: 'Boys Clothing' },
          { value: 'DENIM', label: 'DENIM' },
          { value: 'Girls Clothing', label: 'Girls Clothing' },
          { value: 'School Uniforms', label: 'School Uniforms' },
          { value: 'Party Wear', label: 'Party Wear' },
        ]);
        break;
      case 'Baby':
        setSubCategoryOptions([
          { value: 'Baby Clothes', label: 'Baby Clothes' },
          { value: 'Baby Shoes', label: 'Baby Shoes' },
          { value: 'Baby Toys', label: 'Baby Toys' },
          { value: 'Baby Accessories', label: 'Baby Accessories' },
        ]);
        break;
      default:
        setSubCategoryOptions([]);
    }
  };

  return (
    <>
      <Button
        type="dashed"
        style={{ color: 'blue' }}
        onClick={handleIsAddForm}
        icon={<PlusOutlined />}

      >New Product</Button>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Product ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sub-Category</TableCell>
                  <TableCell>Is New</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <Row key={row.id} row={row} reloadTable={fetchOrders} openEditModal={openEditModal} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>


      </Box>

      <Modal
        title={isAddProduct ? "Add New Product" : "Edit Product "}
        visible={editModalVisible}
        onCancel={closeEditModal}
        footer={null}
        width={600}
        bodyStyle={{
          padding: "8px",
          maxHeight: "65vh",
          overflowY: "auto",
        }}

      >

        <Form
          layout='vertical'
          form={form}
          onFinish={handleEditSubmit}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select Category" onChange={handleCategoryChange}>
              <Select.Option value="Men">Men</Select.Option>
              <Select.Option value="Women">Women</Select.Option>
              <Select.Option value="Kids">Kids</Select.Option>
              <Select.Option value="Baby">Baby</Select.Option>
            </Select>
          </Form.Item>

          {/* Sub-Category Select */}
          <Form.Item
            label="Sub-Category"
            name="subCategory"
            rules={[{ required: true, message: "Please select a sub-category!" }]}
          >
            <Select placeholder="Select Sub-Category">
              {subCategoryOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Available">Available</Select.Option>
              <Select.Option value="Out of Stock">Out of Stock</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item label="Sizes" name="sizes">
            <Form.List name="sizes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }} gap={3}>
                      <Form.Item {...restField} name={[name, 'name']} label="Size" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'qty']} label="Quantity">
                        <Input type="number" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'price']} label="Price">
                        <Input type="number" />
                      </Form.Item>
                      <Button
                        type="dashed"
                        style={{ color: 'red' }}
                        onClick={() => remove(name)}
                        icon={<DeleteOutline />}
                      />
                    </Box>
                  ))}
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Add Size
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item label="Images" name="images">
            <Upload
              listType="picture-card"
              fileList={imageList}
              onChange={handleImageChange}
              customRequest={(options) => options.onSuccess()}
              showUploadList={true}
              maxCount={3}
            >
              <UploadOutlined />
            </Upload>
          </Form.Item>

          <Form.Item label="Is New" name="new" rules={[{ required: true }]}>
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false} >No</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" className='w-100' loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
}

