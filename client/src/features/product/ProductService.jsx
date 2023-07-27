import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getProducts = async(userData)=>{
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



export const productService = {
    getProducts
}