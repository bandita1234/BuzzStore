import React from "react";
import { useDispatch } from "react-redux";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { registerUser } from "../features/user/UserSlice";
import Button from "../components/Button";
import FormButtons from "../components/FormButtons";

const SignUpSchema = yup.object({
  firstname: yup.string().required("First Name is required !"),
  lastname: yup.string().required("Last Name is required !"),
  email: yup.string().nullable().email("Email should be valid !"),
  mobile: yup.string().required("Mobile Number is required !"),
  password: yup.string().required("Password is required !"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async(values) => {
      // console.log(values);
      const signupData = await dispatch(registerUser(values));
      // console.log(signupData);
      if(signupData.payload){
        // setTimeout(() => {
          navigate("/login");
        // }, 1000);
      }
    },
  });
  return (
    <>
      <Meta title="SignUp" />
      <BreadCrumb title="SignUp" />
      <div className="flex justify-center items-center mt-6">
        <form
          className="md:w-1/3 bg-box-background text-center p-6 m-auto rounded-xl space-y-2"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="heading">Create Account!</h2>
          <div className="relative">
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              type="text"
              placeholder=" "
              id="firstname"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
            />
            <label
              htmlFor="firstname"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              First Name
            </label>
          </div>

          <div className="text-red text-left text-sm ms-2">
            {formik.touched.firstname && formik.errors.firstname}
          </div>

          <div className="relative">
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              type="text"
              placeholder=" "
              id="lastname"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
            />
            <label
              htmlFor="lastname"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Last Name
            </label>
          </div>
          <div className="text-red text-left text-sm ms-2">
            {formik.touched.lastname && formik.errors.lastname}
          </div>

          <div className="relative">
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              type="email"
              placeholder=" "
              id="email"
              name="email"
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

          <div className="relative">
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              type="tel"
              placeholder=" "
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
            />
            <label
              htmlFor="mobile"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Mobile Number
            </label>
          </div>
          <div className="text-red text-left text-sm ms-2">
            {formik.touched.mobile && formik.errors.mobile}
          </div>

          <div className="relative">
            <span className="absolute right-3 top-3">
              <AiOutlineEye size={"24px"} />
            </span>
            <input
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none focus:outline-none focus:ring-0 peer"
              type="password"
              placeholder=" "
              id="password"
              name="password"
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
          <FormButtons text="SignUp" type= "submit"/>
          </div>

          <div className="mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-main-color">
                login here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
