import axios from 'axios';

export const LoginApi = async (user) => {
    try {
        const result = await axios.post('/auth/login', user);
        return result.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const updatePassword = async (id, password, oldPassword) => {
    try {
        const result = await axios.put(`/auth/${id}`, { password, oldPassword });
        return result.data;
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
};

export const logoutApi = async (id) => {
    try {
        const result = await axios.put(`/auth/offline/${id}`);
        return result.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const accountStatusUpdate = async (id, status) => {
    const jwt = localStorage.getItem("token");
    try {
        const result = await axios.put(
            `/auth/account-status/${id}/${status}`, 
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        return result;
    } catch (error) {
        console.error("Error updating account status:", error);
        throw error;
    }
};
