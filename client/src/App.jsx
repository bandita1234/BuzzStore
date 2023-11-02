import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blogs from "./pages/Blogs";
import Wishlist from "./pages/Wishlist";
import CompareProducts from "./pages/CompareProducts";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import SingleProduct from "./pages/SingleProduct";
import { ToastContainer } from "react-toastify";
import Orders from "./pages/Orders";

import { PrivateRoutes } from "./routing/PrivateRoute";
import { OpenRoutes } from "./routing/OpenRoute";


const App = () => {
  return (
    <BrowserRouter>
     <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<OurStore />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/compare" element={<CompareProducts />} />
          <Route path="/wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
          <Route path="/orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />
          <Route path="/login" element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path="/signup" element={<OpenRoutes><SignUp /></OpenRoutes>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
