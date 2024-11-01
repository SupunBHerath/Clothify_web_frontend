import axios from 'axios';

export const registerApi = async (user) =>{
    const result = await axios.get('/register',user);
}