import axios from 'axios';

export const registerApi = async (user) =>{
    const result = await axios.post('/auth',user);
    return result.data;
}