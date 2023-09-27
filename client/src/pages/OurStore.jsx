import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import watch_img from "../assets/watch_img.avif";
import ProductCard from "../components/productCard"
import {getAllProducts} from '../features/product/ProductSlice'

//icons
import { RxDragHandleVertical } from "react-icons/rx";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import { HiMiniBars3 } from "react-icons/hi2";
import { FiBarChart2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const OurStore = () => {
  const [colArr, setcolArr] = useState([
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ]);

  const productState = useSelector((state)=>state.product.product)
  // console.log(productState);
  const dispatch = useDispatch();

  
  const getproducts = ()=>{
    dispatch(getAllProducts());
  }
  
  useEffect(()=>{
    getproducts();
  },[])
  
  return (
    <div className="">
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />

      <div className="flex mx-4">
        <div className="w-1/4 flex flex-col lg:gap-4 gap-2">
          {/* Shop By Categories */}
          <div className="bg-box-background border border-border-color shadow-md shadow-box-background py-2 px-4 rounded-lg">
            <h2 className="text-sm sm:text-lg font-semibold text-main-color">
              Shop By Categories
            </h2>
            <div className="flex flex-col">
              <Link>Watch</Link>
              <Link>Laptop</Link>
              <Link>Camera</Link>
              <Link>TV</Link>
            </div>
          </div>

          {/* Filter By */}
          <div className="bg-box-background border border-border-color shadow-md shadow-box-background py-2 px-4 rounded-lg">
            <h2 className="text-sm sm:text-lg font-semibold text-main-color">
              Filter By
            </h2>
            <div className="my-3">
              <h4 className="text-lg text-main-color">Availability</h4>
              <div>
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-md font-medium"
                  >
                    In Stock(20)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-md font-medium"
                  >
                    Out Of Stock(2)
                  </label>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-3">
              <h3 className="text-main-color text-lg mb-2">Price</h3>
              <div className="flex gap-3">
                <div className="relative flex justify-center items-center">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block p-2 w-20 text-sm bg-customTransparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-main-color peer-focus:bg-background-color peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    From
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block p-2 w-20 text-sm bg-customTransparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-main-color peer-focus:bg-background-color peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    To
                  </label>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-3">
              <h2 className="text-main-color text-lg">Colors</h2>
              <div className="flex flex-wrap">
                {colArr.map((item) => (
                  <div key={item}
                    className={`m-1 h-5 w-5 rounded-full`}
                    style={{ backgroundColor: item }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h2 className="text-main-color text-lg">Size</h2>
              <div>
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-main-color accent-main-color focus:ring-main-color ring-offset-main-color focus:ring-2 focus:bg-main-color border-main-color"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-md font-medium"
                  >
                    Default radio
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-main-color accent-main-color focus:ring-main-color ring-offset-main-color focus:ring-2 focus:bg-main-color border-main-color"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-md font-medium"
                  >
                    Checked state
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tag */}
          <div className="bg-box-background border border-border-color shadow-md shadow-box-background py-2 px-4 rounded-lg">
            <h2 className="text-sm sm:text-lg font-semibold text-main-color mb-2">
              Product Tag
            </h2>

            <div className="flex items-center flex-wrap gap-2">
              <span className="bg-main-color text-background-color text-sm py-1 px-4 text-center rounded-xl">
                Watch
              </span>
              <span className="bg-main-color text-background-color text-sm py-1 px-4 text-center rounded-xl">
                Headphone
              </span>
              <span className="bg-main-color text-background-color text-sm py-1 px-4 text-center rounded-xl">
                Laptop
              </span>
              <span className="bg-main-color text-background-color text-sm py-1 px-4 text-center rounded-xl">
                Speakers
              </span>
              <span className="bg-main-color text-background-color text-sm py-1 px-4 text-center rounded-xl">
                Mobiles
              </span>
            </div>
          </div>

          {/* Random Products */}
          <div className="bg-box-background border border-border-color shadow-md shadow-box-background py-2 px-4 rounded-lg">
            <h2 className="text-sm sm:text-lg font-semibold text-main-color mb-3">
              Random Products
            </h2>
            {/* Item 1 */}
            <div className="mb-3">
              <div className="flex gap-3">
                <div className="h-full w-1/2 object-cover">
                  <img
                    src={watch_img}
                    alt=""
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-2/3">
                  <h3 className="text-xs sm:text-sm font-bold text-product-descripion mb-1 line-clamp-2">
                    Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize)
                    by Myntra
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
                  <h2 className="text-base font-semibold my-1">
                    <span> ₹1200 </span>
                  </h2>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="mb-2">
              <div className="flex gap-3">
                <div className="h-full w-1/2 object-cover">
                  <img
                    src={watch_img}
                    alt=""
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-2/3">
                  <h3 className="text-xs sm:text-sm font-bold text-product-descripion mb-1 line-clamp-2">
                    Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize)
                    by Myntra
                  </h3>
                  <div className="">
                    <ReactStars
                      count={5}
                      size={"6px"}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <h2 className="text-base font-semibold my-1">
                    <span> ₹1200 </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-4">
          {/* Sort Nav */}
          <div className="flex justify-between px-4 rounded-lg items-center bg-box-background w-full h-10">
            <div className="flex items-center">
              <h2 className="text-main-color">Sort By : </h2>
              <select className="hidden lg:inline-block lg:w-60 bg-box-background">
                <option value="featured">Featured</option>
                <option className="" value="best-selling">
                  Best Selling
                </option>
                <option value="price-asending">Price -- low to high </option>
                <option value="price-decending">Price -- high to low </option>
                <option value="new">Newest First</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-[#908e8e]">21 Products</h2>
              <div className="bg-background-color p-1 text-3xl rounded-md hover:bg-main-color">
                <RxDragHandleVertical />
              </div>
              <div className="bg-background-color p-1 text-3xl rounded-md hover:bg-main-color">
                <FiBarChart2 />
              </div>
              <div className="bg-background-color p-1 text-3xl rounded-md hover:bg-main-color">
                <LiaGripLinesVerticalSolid />
              </div>
              <div className="bg-background-color p-1 text-3xl rounded-md hover:bg-main-color">
                <HiMiniBars3 />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-wrap">
          {productState && productState.map((item)=>{
            return(
              <ProductCard item={item}/>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
