import axios from 'axios';

export const getUserById = async ( id) =>{
    const result = await axios.get(`/user/${id}`);
    return result.data;
}

export const getUsers = async ( ) =>{
    const result = await axios.get(`/user`);
    return result.data;
}
export const updateUserById = async ( id , user) =>{
    const result = await axios.put(`/user/${id}`,user);
    return result.data;
}
export const getUserBtProductQty = async ( ) =>{
    const result = await axios.get(`/user/qty`);
    return result;
}
