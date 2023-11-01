import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({children}) =>{
    const getTokenFromLocalStorage = localStorage.getItem("token");
    // console.log("token",getTokenFromLocalStorage);
    return getTokenFromLocalStorage!=undefined ? children : (<Navigate to="/login" replace={true} />)
}