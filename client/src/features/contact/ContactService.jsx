import axios from 'axios';
import { config } from '../../utils/axiosConfig';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const PostQuery = async(contactData) => {
  try {
    const res = await axios.post(`${BASE_URL}/enquiry/create`,{contactData});
    console.log(res);
  } catch (error) {
    alert(error);
  }
}

export const ContactService = {PostQuery};