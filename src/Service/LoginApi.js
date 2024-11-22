import axios from 'axios';

export const LoginApi = async (user) =>{
    const result = await axios.post('/auth/login',user);
    return result.data;
}

export const updatePassword = async (id,password,oldPassword) =>{
    const result = await axios.put(`/auth/${id}`,{password,oldPassword});
    return result.data;
}