import { configureStore } from '@reduxjs/toolkit'
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import  authReducer  from '../features/user/UserSlice'
import productReducer from '../features/product/ProductSlice'
import blogReducer from '../features/blogs/BlogSlice'
import contactReducer from '../features/contact/ContactSlice'


export const store = configureStore({
    reducer : {
        auth : authReducer,
        product : productReducer,
        blog : blogReducer,
        contact : contactReducer
    }, 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false,
        });
      },
})