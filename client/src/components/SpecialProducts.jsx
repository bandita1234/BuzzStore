import React from "react";
import ReactStars from "react-rating-stars-component";
import watch_img from "../assets/watch_img.avif";
import { Link } from "react-router-dom";

//Icons
import { IoMdHeartEmpty } from "react-icons/io";
import { BiShuffle, BiShoppingBag } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

const SpecialProducts = () => {
  return (
    <div className="px-1 py-2 sm:p-4 lg:w-1/3 w-full">
      <div className="flex w-full mx-auto rounded-lg shadow-lg border-2 border-border-color bg-box-background cursor-pointer">
        <div className="w-1/2 h-full">
          <div className="overflow-hidden w-full border-b-4 border-border-color">
            <img
              src={watch_img}
              alt=""
              className="h-full w-full object-contain rounded-lg"
            />
          </div>
        </div>
        <div className="w-1/2 px-4 py-2">
          <p className="text-sm sm:text-lg font-semibold text-main-color">
            Roadster
          </p>
          <h3 className="text-xs sm:text-base text-[#c5d3e2] mb-1">
            Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
            Myntra
          </h3>
          <div className="">
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
          <div className="flex gap-3">
            <h4>
              <span>50</span> Days
            </h4>
            <div className="">
              <div className="inline-flex items-center mx-2 justify-center w-6 h-6 rounded-full text-sm font-semibold bg-red">
                <p>05</p>
              </div>
              :
              <div className="inline-flex items-center mx-2 justify-center w-6 h-6 rounded-full text-sm font-semibold bg-red">
                <p>43</p>
              </div>
              :
              <div className="inline-flex items-center mx-2 justify-center w-6 h-6 rounded-full text-sm font-semibold bg-red">
                <p>10</p>
              </div>
            </div>
            
          </div>
          <div className="mt-4 mb-4">
              <p>Products : 5</p>

              <div className="w-full bg-background-color rounded-full h-1.5">
                <div className="bg-main-color h-1.5 rounded-full" style={{width:'45%'}}></div>
              </div>
            </div>

            <div>
                <button>Options</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProducts;
