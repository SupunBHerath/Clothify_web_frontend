import axios from 'axios';

export const AddProduct = async (product) => {
    try {
        const result = await axios.post('/product', product);
        return result;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const result = await axios.put(`/product/${id}`, product);
        return result;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const getProduct = async () => {
    try {
        const result = await axios.get('/product');
        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductByBestSellers = async () => {
    try {
        const result = await axios.get('/product/best');
        return result;
    } catch (error) {
        console.error("Error fetching best-selling products:", error);
        throw error;
    }
};
