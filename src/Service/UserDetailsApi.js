import axios from 'axios';

export const getUserById = async (id) => {
    try {
        const result = await axios.get(`/user/${id}`);
        return result.data;
    } catch (error) {
        console.error(`Error fetching user by ID (${id}):`, error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const result = await axios.get(`/user`);
        return result.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

export const updateUserById = async (id, user) => {
    try {
        const result = await axios.put(`/user/${id}`, user);
        return result.data;
    } catch (error) {
        console.error(`Error updating user by ID (${id}):`, error);
        throw error;
    }
};

export const getUserByProductQty = async () => {
    try {
        const result = await axios.get(`/user/qty`);
        return result.data;
    } catch (error) {
        console.error("Error fetching users by product quantity:", error);
        throw error;
    }
};
