import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ContactService } from './ContactService'
import {toast} from 'react-toastify'

export const createQuery = createAsyncThunk("contact/post",async(contactData , thunkAPI)=>{
    try {
        return await ContactService.PostQuery(contactData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const contactState = {
    contact : "",
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const ContactSlice = createSlice({
    name : "contact",
    initialState:contactState,
    reducers : [],
    extraReducers : (builder) =>{
        builder.addCase(createQuery.pending,(state)=>{
            state.isLoading = true
        }).addCase(createQuery.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.contact = action.payload;
            
        }).addCase(createQuery.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            
        })
    }
})

export default ContactSlice.reducer;
