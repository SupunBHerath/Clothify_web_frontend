import axios from 'axios';

export const ValidateToke = async (user) =>{
    const result = await axios.post('/auth/token',user);
    return result.data;
}