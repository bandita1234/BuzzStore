import React from "react";
import blog_img from "../assets/blog_img.avif";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BlogCard = (props) => {
  const { item } = props;
  // console.log(item);

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/blog/${item._id}`);
  };

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
    <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full px-2">
      <div className="max-w-xs mx-auto rounded overflow-hidden bg-[#12263c] border-border-color shadow-[-6px_-6px_6px_1px_#1d2c3b,_6px_6px_6px_1px_#1d2c3b]">
        <img className="w-full" src={blog_img} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div>
            <p className="text-[#908e8e]">{getformattedDate(item?.createdAt)}</p>
          </div>
          <h3 className="font-bold text-xl mb-2 text-main-color">
            {item?.title}
          </h3>
          <p className="text-gray-700 text-base line-clamp-2">{item?.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <Button handleClick={handleSubmit} text="Read More" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
