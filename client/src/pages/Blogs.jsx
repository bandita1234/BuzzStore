import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

import { getAllBlogs } from "../features/blogs/BlogSlice";
import { useDispatch, useSelector } from "react-redux";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog.blog);
  // console.log(blogState);

  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  useEffect(() => {
    getblogs();
  }, []);

  return (
    <div>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />

      <div className="flex flex-col justify-center lg:flex-row items-start gap-3 mx-4">
        <div className="lg:w-1/5 mx-auto my-3 flex justify-center items-center">
          <div className="bg-box-background border border-border-color shadow-md shadow-box-background py-2 px-4 rounded-lg">
            <h2 className="text-sm sm:text-lg font-semibold text-main-color">
              Find By Categories
            </h2>
            <div className="flex flex-col">
              <Link>Watch</Link>
              <Link>Laptop</Link>
              <Link>Camera</Link>
              <Link>TV</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full">
          {blogState &&
            blogState?.map((item) => {
              return <BlogCard key={item._id} item={item}  />;
            })}

          {/* <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
