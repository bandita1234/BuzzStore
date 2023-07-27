import { configureStore } from '@reduxjs/toolkit'
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import  authReducer  from '../features/user/UserSlice'
import productReducer from '../features/product/ProductSlice'


export const store = configureStore({
    reducer : {
        auth : authReducer,
        product : productReducer
    }, 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false,
        });
      },
})