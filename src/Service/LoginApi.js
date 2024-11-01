import axios from 'axios';

export const LoginApi = async (user) =>{
    const result = await axios.post('/auth/login',user);
    return result.data;
}