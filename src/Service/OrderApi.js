import axios from 'axios';

export const getOrdersById = async (id) =>{
    const result = await axios.get(`/order/cus/${id}`);
    return result;
}
export const createOrders = async (orderList) =>{
    const result = await axios.post(`/order`,orderList);
    return result;
}