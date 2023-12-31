import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/UserSlice";
import Button from "../components/Button";
import FormButtons from "../components/FormButtons";

import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import logo from "../assets/logo.png";

const LoginSchema = yup.object({
  email: yup.string().nullable().email("Email should be valid !"),
  password: yup.string().required("Password is required !"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openPassword, setOpenPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const loginData = await dispatch(loginUser(values));
      // console.log(loginData);
      if (loginData.payload) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    },
  });

  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="flex justify-center items-center mt-6">
        <form
          className=" md:w-1/3 bg-box-background text-center p-6 m-auto rounded-xl space-y-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-1/2 m-auto mb-4">
            <img src={logo} alt="" />
          </div>
          {/* <h2 className="heading">Login</h2> */}
          <p className="text-product-descripion">
            Please <span className="text-main-color text-xl">Login</span> to
            continue!
          </p>

          <div className="relative">
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              type="email"
              id="email"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>
          <div className="text-red text-left text-sm ms-2">
            {formik.touched.email && formik.errors.email}
          </div>

          {/* <div className="relative">
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none focus:outline-none focus:ring-0 peer"
              type="password"
              id="password"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div> */}
          <div className="relative">
            <span className="absolute right-3 top-3" onClick={()=>setOpenPassword(!openPassword)}>
              {openPassword ? (
                <AiOutlineEye size={"24px"} />
              ) : (
                <AiOutlineEyeInvisible size={"24px"}/>
              )}
            </span>
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none focus:outline-none focus:ring-0 peer"
              type={openPassword ? "text" : "password"}
              id="password"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>
          <div className="text-red text-left text-sm ms-2">
            {formik.touched.password && formik.errors.password}
          </div>

          <div>
            <Link
              to="/forgot-password"
              className="flex justify-end text-product-descripion"
            >
              Forgot Password ?
            </Link>
          </div>

          <div>
            <FormButtons text="Login" type="submit" />
          </div>

          <div className="mt-4">
            <p>
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-main-color">
                SignUp here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
