import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, userData);
    console.log(response);
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
      // navigate("/login");
      return response.data;
    }

  } catch (error) {
    console.log(error);
    if(error.response.data.error){
      toast.error(error.response.data.error);
    }else{
      toast.error(error.response.data.errors[0].msg);
    }
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, userData);
    console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.Error);
  }
};

const getWishlist = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/wishlist`, config);
    // console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch {
    console.log(error);
  }
};

const addToCart = async (cartData) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/cart`, cartData, config);
    // console.log(res);
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCart = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/getcart`, config);
    // console.log(res.data);
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const updateCartQuantity = async(newQuantity) =>{
  try {
    // console.log("api call");
    const response = await axios.patch(`${BASE_URL}/user/cart/updateQuantity`, newQuantity , config);
    console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteFromCart = async (id) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/user/cart/delete/${id}`,
      config
    );
    // console.log(res);
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createOrder = async(orderData)=>{
  try {
    const res = await axios.post(`${BASE_URL}/user/cart/createorder`, orderData, config);
    console.log(res.data);
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getOrders = async()=>{
  try {
    const res = await axios.get(`${BASE_URL}/user/cart/getorders`, config);
    // console.log(res.data);
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const authService = {
  register,
  login,
  getWishlist,
  addToCart,
  getCart,
  updateCartQuantity,
  deleteFromCart,
  createOrder,
  getOrders
};
