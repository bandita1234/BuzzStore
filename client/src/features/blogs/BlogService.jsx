import React from 'react'
import axios from 'axios';
import { config } from '../../utils/axiosConfig';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getBlogs =async () => {
 try {
    const res = await axios.get(`${BASE_URL}/blog/getblogs/`)
   //  console.log(res);
   if(res.data){
      return res.data;
   }
 } catch (error) {
    alert(error);
 }
}

const getABlog = async(id) =>{
   try {
      const res = await axios.get(`${BASE_URL}/blog/getblog/${id}`)
   //  console.log(res);
   if(res.data){
      return res.data;
   }
      
   } catch (error) {
      console.log(error)
   }
}

export const BlogService = {getBlogs , getABlog}