import React, { useEffect } from "react";
import blog_img from "../assets/blog_img.avif";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/BlogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This will navigate back one step in your routing hierarchy
  };

  const location = useLocation();
  const blog_id = location.pathname.split("/")[2];
  // console.log(blog_id);

  const getASingleBlog = () => {
    dispatch(getABlog(blog_id));
  };

  useEffect(() => {
    getASingleBlog();
  }, []);

  const singleBlogState = useSelector((state)=>state?.blog?.singleBlog);
  // console.log(singleBlogState);

  const getformattedDate = (postDate) => {
    const timestamp = postDate;
    const date = new Date(timestamp);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <div className="lg:mx-20 mx-5">
      <Meta title="Dynamic Blog name" />
      <BreadCrumb title={singleBlogState?.title} />
      <div className="">
        <div className="flex items-center gap-2" onClick={handleGoBack}>
          <BsArrowLeft size={"20"} />
          <p className="text-[#908e8e]">Back to blog</p>
        </div>
        <h2 className="text-center mb-4">{singleBlogState?.title}</h2>
        <div className="w-full lg:h-[500px] object-contain">
          <img src={blog_img} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="px-6 py-4">
          <div className="text-center">
            <p className="text-[#908e8e]">{getformattedDate(singleBlogState?.createdAt)}</p>
          </div>
          <h3 className="font-bold text-xl mb-2 text-main-color text-center">
            {singleBlogState?.title}
          </h3>
          <p className="text-gray-700 text-base">
            {singleBlogState?.description}
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
