import axios from 'axios';

export const getUserById = async ( id) =>{
    const result = await axios.get(`/user/${id}`);
    return result.data;
}
export const updateUserById = async ( id , user) =>{
    const result = await axios.put(`/user/${id}`,user);
    return result.data;
}