import axios from 'axios';

export const ValidateToke = async (user) => {
    try {
        const result = await axios.post('/auth/token', user);
        return result.data;
    } catch (error) {
        console.error("Error validating token:", error);
        throw error;
    }
};
