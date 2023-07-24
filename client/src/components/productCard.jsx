import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import watch_img from "../assets/watch_img.avif";
import main_watch from "../assets/main_watch.avif";
import { Link } from "react-router-dom";

//Icons
import { IoMdHeartEmpty } from "react-icons/io";
import { BiShuffle, BiShoppingBag } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

const ProductCard = () => {
  const [showFirstImage, setShowFirstImage] = useState(true);
  const handleMouseEnter = () => {
    setShowFirstImage(false);
  };

  const handleMouseLeave = () => {
    setShowFirstImage(true);
  };
  return (
    <div className="px-1 py-2 sm:p-4 lg:w-1/4 w-1/2">
      {/* <Link href={`/product/${product.slug}`}> */}
      <div className="w-full max-w-xs mx-auto rounded-lg shadow-lg border-2 border-border-color bg-box-background cursor-pointer min-h-[400px]">
        <div
          className="relative text-center overflow-hidden w-full border-b-4 border-border-color group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showFirstImage ? (
            <img
              src={watch_img}
              alt="product"
              className="h-full w-full object-contain rounded-lg"
            />
          ) : (
            <img
              src={main_watch}
              alt="second_watch"
              // className="hidden"
              className="h-full w-full object-contain rounded-lg"
            />
          )}
        </div>
        <div className="lg:px-6 flex justify-evenly relative bottom-6">
          <Link className="rounded-full bg-box-background w-10 h-10 flex justify-center items-center pt-1 hover:bg-main-color text-2xl transition-all ease-in-out duration-500">
            <IoMdHeartEmpty />
          </Link>
          <Link className="rounded-full bg-box-background w-10 h-10 flex justify-center items-center hover:bg-main-color text-2xl transition-all ease-in-out duration-500">
            <BiShuffle />
          </Link>
          <Link className="rounded-full bg-box-background w-10 h-10 flex justify-center items-center hover:bg-main-color text-2xl transition-all ease-in-out duration-500">
            <AiOutlineEye />
          </Link>
          <Link className="rounded-full bg-box-background w-10 h-10 flex justify-center items-center hover:bg-main-color text-2xl transition-all ease-in-out duration-500">
            <BiShoppingBag />
          </Link>
        </div>
        {/* <div className="relative">
          {product.availability.filter((item) => item.qty > 0).length ==
            0 && (
            <div className="absolute right-0 bottom-0 px-2 py-1 bg-rose-200">
              <p className="text-rose-600 font-bold text-xs">OUT OF STOCK</p>
            </div>
          )}
        </div> */}
        <div className="p-4  m-0 text-center">
          <p className="text-sm sm:text-lg font-semibold text-main-color">
            Roadster
          </p>
          <h3 className="text-xs sm:text-base text-product-descripion mb-1">
            Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
            Myntra
          </h3>
          <div className="flex justify-start">
            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
          <h2 className="text-base font-semibold my-1 sm:my-2">
            <span> ₹1200 </span>
            <span className="mx-1 line-through text-main-color">₹2000</span>
          </h2>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
