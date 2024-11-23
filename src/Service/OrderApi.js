import axios from 'axios';

export const getOrdersById = async (id) => {
    try {
        const result = await axios.get(`/order/cus/${id}`);
        return result;
    } catch (error) {
        console.error("Error fetching orders by ID:", error);
        throw error;
    }
};

export const createOrders = async (orderList) => {
    try {
        const result = await axios.post(`/order`, orderList);
        return result;
    } catch (error) {
        console.error("Error creating orders:", error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const result = await axios.get(`/order`);
        return result;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
    }
};

export const updateStatusById = async (id, status) => {
    try {
        const result = await axios.put(`/order/${id}/${status}`);
        return result;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};

export const deleteOrderByOrderId = async (id) => {
    const jwt = localStorage.getItem("token");
    
    try {
        const result = await axios.delete(`/order/${id}`,{
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return result;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
};

export const OrderCounts = async () => {
    try {
        const result = await axios.get(`/order/count`);
        return result;
    } catch (error) {
        console.error("Error fetching order counts:", error);
        throw error;
    }
};

export const TotalRevenue = async () => {
    try {
        const result = await axios.get(`/order/price`);
        return result;
    } catch (error) {
        console.error("Error fetching total revenue:", error);
        throw error;
    }
};
