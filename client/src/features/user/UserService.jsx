import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const register = async(userData)=>{
    try {
        const response = await axios.post(`${BASE_URL}/user/register`,userData);
        console.log(response);
        if(response.data){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async(userData)=>{
    try {
        const response = await axios.post(`${BASE_URL}/user/login`,userData);
        console.log(response);
        if(response.data){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const authService = {
    register,login
}