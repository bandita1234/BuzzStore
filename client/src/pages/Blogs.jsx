import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
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
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
