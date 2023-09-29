import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService } from './UserService'
import {toast} from 'react-toastify'

export const registerUser = createAsyncThunk("auth/register",async(userData, thunkAPI)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk("auth/login",async(userData, thunkAPI)=>{
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserWishlist = createAsyncThunk("auth/wishlist", async(thunkAPI)=>{
    try {
        return await authService.getWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
     }
})

export const addToCart = createAsyncThunk("auth/cart/add", async(cartData,thunkAPI)=>{
    try {
        return await authService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
     }
})

const getUserFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null ;

const initialState = {
    user : getUserFromLocalStorage,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const authSlice = createSlice({
    name : "auth",
    initialState:initialState,
    reducers : [],
    extraReducers : (builder) =>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createUser = action.payload;
            if(state.isSuccess == true){
                toast.success("User Created Successfully !");
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError == true){
                toast.success("action.error");
            }
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess == true){
                // console.log(action);
                localStorage.setItem("token",action.payload.token);
                toast.success("User LoggedIn Successfully !");
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError == true){
                toast.success("action.error");
            }
        }).addCase(getUserWishlist.pending,(state)=>{
            state.isLoading = true
        }).addCase(getUserWishlist.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
            // if(state.isSuccess == true){
            //     toast.success("User LoggedIn Successfully !");
            // }
        }).addCase(getUserWishlist.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            // if(state.isError == true){
            //     toast.success("action.error");
            // }
        }).addCase(addToCart.pending,(state)=>{
            state.isLoading = true
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProduct = action.payload;
        }).addCase(addToCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            // if(state.isError == true){
            //     toast.success("action.error");
            // }
        })
    }
})

export default authSlice.reducer;
