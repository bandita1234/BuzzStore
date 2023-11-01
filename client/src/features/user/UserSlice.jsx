import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      if (response) {
        localStorage.setItem("token", response.token);
        // toast.success("User LoggedIn Successfully !");
        // navigate("/"); // Navigate to the home page using the passed navigate function
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserWishlist = createAsyncThunk(
  "auth/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "auth/cart/add",
  async (cartData, thunkAPI) => {
    try {
      // console.log("addToCart", authService.addToCart(cartData));
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk("auth/getcart", async (thunkAPI) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCart = createAsyncThunk(
  "auth/deletecart",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "auth/updateQuantity",
  async (newQuantity, thunkAPI) => {
    try {
      return await authService.updateCartQuantity(newQuantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "auth/create-order",
  async (orderData, thunkAPI) => {
    try {
      return await authService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk("auth/getorder", async (thunkAPI) => {
  try {
    return await authService.getOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const getUserFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.createUser = action.payload;

        // console.log("payload",action.payload);

        if (action.payload) {
          toast.success("User Created Successfully !");
          // navigate("/login");
        }
        // else{
        //   toast.error("Please enter Correct Credentials");
        //   console.log(action);
        // }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.success(action.error);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        // if (state.isSuccess == true) {
          console.log(action);
        //   localStorage.setItem("token", action.payload.token);
        //   toast.success("User LoggedIn Successfully !");
        // }
        if (action.payload) {
          localStorage.setItem("token", action.payload.token);
          toast.success("User LoggedIn Successfully !");
        } else {
          // console.log(action);
          state.isError = true;
          // toast.error("Sorry, Some error Occured!");
          // navigate("/");
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.error(action.error);
        }
      })

      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        // if(state.isSuccess == true){
        //     toast.success("User LoggedIn Successfully !");
        // }
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        // if(state.isError == true){
        //     toast.success("action.error");
        // }
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        // if(state.isSuccess == true){
        //     toast.success("Product added to Cart");
        // }

        // if (action.payload) {
        //   // state.cartProduct = action.payload;
        //   toast.success("Product added to Cart");
        // }
        // else{
        //     // console.log(action);
        //     state.isError = true;
        //     toast.error("Sorry, Some error Occured!");
        // }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        // if(state.isError == true){
        //     toast.success("action.error");
        // }
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        console.log(action.payload);
        if (action.payload) {
          toast.error("Product deleted from Cart !");
        }
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.error("Sorry, Some Error Occured!");
        }
      })
      .addCase(updateQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.cartItems = state.cartItems.map((item) => {
        //   if (item._id == action.payload._id) item.quantity = item.quantity + 1;
        //   return item;
        // });
        state.cartItems = action.payload;

        // if (action.payload) {
        //   toast.success("Quantity Updated Successfully !");
        // }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderProducts = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        // if(state.isError == true){
        //     toast.success("action.error");
        // }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedItems = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
