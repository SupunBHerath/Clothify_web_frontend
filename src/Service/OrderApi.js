import axios from 'axios';

export const getOrdersById = async (id) =>{
    const result = await axios.get(`/order/cus/${id}`);
    return result;
}
export const createOrders = async (orderList) =>{
    const result = await axios.post(`/order`,orderList);
    return result;
}
export const getAllOrders = async () =>{
    const result = await axios.get(`/order`);
    return result;
}
export const updateStatusById = async (id,satuts) =>{
    const result = await axios.put(`/order/${id}/${satuts}`);
    return result;
}