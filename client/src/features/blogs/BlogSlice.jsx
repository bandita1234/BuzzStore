import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogService } from "./BlogService";

export const getAllBlogs = createAsyncThunk("blogs/get", async (thunkAPI) => {
  try {
    return BlogService.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getABlog = createAsyncThunk("blog/get", async(id , thunkAPI)=>{
  try {
    return BlogService.getABlog(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const blogState = {
  blog: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const BlogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default BlogSlice.reducer;
