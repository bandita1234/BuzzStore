import React from 'react'
import { Navigate } from 'react-router-dom';

export const OpenRoutes = ({children}) =>{
    const getTokenFromLocalStorage = localStorage.getItem("token");
    console.log("token",getTokenFromLocalStorage);
    return !getTokenFromLocalStorage ? children : (<Navigate to="/" replace={true} />)
}