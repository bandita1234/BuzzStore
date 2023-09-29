import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productService } from './ProductService'
import {toast} from 'react-toastify'

export const getAllProducts = createAsyncThunk("products/get",async(thunkAPI)=>{
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addToWishlist = createAsyncThunk("product/wishlist",async(prodId,thunkAPI)=>{
    try {
        return await productService.addToWishList(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAProduct = createAsyncThunk("product/getAproduct",async(prodId,thunkAPI)=>{
    try {
        return await productService.getAProduct(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const productState = {
    product : "",
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const productSlice = createSlice({
    name : "product",
    initialState:productState,
    reducers : [],
    extraReducers : (builder) =>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.isLoading = true
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
            
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            
        }).addCase(addToWishlist.pending,(state)=>{
            state.isLoading = true
        }).addCase(addToWishlist.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addtoWishlist = action.payload;
            state.message = "Product added to wishlist";
            
        }).addCase(addToWishlist.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error; 
        }).addCase(getAProduct.pending,(state)=>{
            state.isLoading = true
        }).addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.singleProduct = action.payload;
            
        }).addCase(getAProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error; 
        })
    }
})

export default productSlice.reducer;
