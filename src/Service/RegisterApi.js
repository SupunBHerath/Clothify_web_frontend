import axios from 'axios';

export const registerApi = async (user) => {
    try {
        const result = await axios.post('/auth', user);
        return result.data;
    } catch (error) {
        console.error("Error during user registration:", error);
        throw error;
    }
};
