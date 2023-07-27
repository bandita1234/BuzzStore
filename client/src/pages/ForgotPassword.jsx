import React from "react";
import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/reset-password");
  };
  return (
    <div>
      <Meta title="Forgot Password" />
      <BreadCrumb title="Forgot Password" />
      <div>
        <div className="flex justify-center items-center mt-6">
          <div className="md:w-1/3 bg-box-background text-center p-6 m-auto rounded-xl">
            <h2 className="mb-3">Forgot Password</h2>
            <p className="mb-3 text-product-descripion text-xs">
              Forgot Password? Don't worry, We'll send you an email to reset
              your password !
            </p>
            <div className="relative mb-3">
              <input
                type="text"
                id="floating_outlined2"
                className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_outlined2"
                className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>
            <div>
              <button onClick={handleSubmit} className="mr-4">Send</button>
              <Link to="/login">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
