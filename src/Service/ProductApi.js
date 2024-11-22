import axios from 'axios';

export const AddProduct = async (product) =>{
    const result = await axios.post('/product',product);
    return result;
}
export const updateProduct = async (id,product) =>{
    const result = await axios.post(`/product/update/${id}`,product);
    return result;
}

export const getProduct = async ()=>{
    const result = await axios.get('/product');
    return result;
}
export const getProductByBestSellers = async ()=>{
    const result = await axios.get('/product/best');
    return result;
}