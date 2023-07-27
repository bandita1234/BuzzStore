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

const initialState = {
    user : "",
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
            state.createUser = action.payload;
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
        })
    }
})

export default authSlice.reducer;
