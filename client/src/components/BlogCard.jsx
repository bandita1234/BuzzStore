import React from "react";
import blog_img from "../assets/blog_img.avif";

const BlogCard = () => {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden bg-[#142537] shadow-[-6px_-6px_6px_1px_#1d2c3b,_6px_6px_6px_1px_#1d2c3b]">
        <img
          className="w-full"
          src={blog_img}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
        <div> <p className="text-[#908e8e]">20 July, 2023</p> </div>
          <h3 className="font-bold text-xl mb-2 text-main-color">The Coldest Sunset</h3>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button cl>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
