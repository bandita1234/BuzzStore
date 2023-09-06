import axios from 'axios';
import { config } from '../../utils/axiosConfig';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getProducts = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/product/`);
        // console.log(response);
        if(response.data){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

const addToWishList = async(prodId)=>{
    try {
        const response = await axios.put(`${BASE_URL}/product/wishlist`,{prodId},config);
        console.log(response);
        if(response.data){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export const productService = {
    getProducts, addToWishList
}