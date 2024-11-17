import axios from 'axios';

export const AddProduct = async (product) =>{
    const result = await axios.post('/product',product);
    return result;
}

export const getProduct = async ()=>{
    const result = await axios.get('/product');
    return result;
}