import React from "react";
import blog_img from "../assets/blog_img.avif";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SingleBlog = () => {
  const navigate = useNavigate();
   const handleGoBack = () => {
    navigate(-1); // This will navigate back one step in your routing hierarchy
  };
  return (
    <div className="lg:mx-20 mx-5">
      <Meta title="Dynamic Blog name" />
      <BreadCrumb title="Dynamic Blog name" />
      <div className="">
        <div className="flex items-center gap-2" onClick={handleGoBack}>
          <BsArrowLeft size={"20"}/>
          <p className="text-[#908e8e]">Back to blog</p>
        </div>
        <h2 className="text-center mb-4">Blog Name</h2>
        <div className="w-full lg:h-[500px] object-contain">
          <img src={blog_img} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="px-6 py-4">
          <div className="text-center">
            <p className="text-[#908e8e]">20 July, 2023</p>
          </div>
          <h3 className="font-bold text-xl mb-2 text-main-color text-center">
            The Coldest Sunset
          </h3>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            praesentium illo voluptates quam ipsa accusamus rerum tempore sit
            vitae fuga. Neque, consectetur ratione enim voluptas nemo doloribus
            ducimus expedita unde. Accusamus inventore exercitationem, quae
            dolore non eveniet cupiditate perspiciatis, aliquid dicta officia
            placeat facilis rerum vitae modi, maxime nobis eius.
          </p>
        </div>
      </div>

      {/* Comment Form */}
      <div>
        <div className="flex justify-center items-center mt-6">
        <div className="w-full bg-box-background text-center p-6 m-auto rounded-xl">
          <h2 className="mb-3">Leave a Comment !</h2>
          <div className="relative mb-3">
          
            <input
              type="text"
              id="floating_outlined1"
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined1"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name
            </label>
          </div>
          <div className="relative mb-3">
            <input
              type="email"
              id="floating_outlined1"
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined2"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>
          <div className="relative mb-3">
            <input
              type="email"
              id="floating_outlined3"
              className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
              // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined3"
              className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Comment
            </label>
          </div>
          <div>
            <button>Post Comment</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SingleBlog;
