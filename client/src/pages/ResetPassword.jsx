import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FormButtons from "../components/FormButtons";

const ResetPassword = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
      navigate("/login");
    };
  return (
    <div>
      <Meta title="Reset Password" />
      <BreadCrumb title="Reset Password" />
      <div className="flex justify-center items-center mt-6">
        <div className="md:w-1/3 bg-box-background text-center p-6 m-auto rounded-xl">
          <h2 className="mb-3">Reset Password!</h2>
          <div className="relative mb-3">
          <span className='absolute right-3 top-3'><AiOutlineEye size={'24px'}/></span>
            <input
              type="Password"
              id="floating_outlined1"
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined1"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>
          <div className="relative mb-3">
          <span className='absolute right-3 top-3'><AiOutlineEye size={'24px'}/></span>
            <input
              type="Password"
              id="floating_outlined2"
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined1"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Confirm Password
            </label>
          </div>
          <div>
            <FormButtons handleClick={handleSubmit} text="Ok" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
