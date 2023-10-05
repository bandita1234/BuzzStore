import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import watch_img from "../assets/watch_img.avif";
import {RxCross2} from 'react-icons/rx'
import { Link, useLocation } from "react-router-dom";

const CompareProducts = (props) => {
  const location = useLocation();
  console.log(location);
  // const { itemName, itemBrand } = location?.state || {};

  // console.log(itemName);

  return (
    <div>
      <Meta title="Compare Products" />
      <BreadCrumb title="Compare Products" />
      <h2 className="heading">Compare Products</h2>
      <div className="flex flex-wrap item-center sm:gap-5 lg:gap-10 lg:mx-10 mx-2">
      {/* Item 1 */}
        <div className=" relative w-1/2 sm-w-1/3 max-w-xs md:w-1/4 lg:w-1/6 h-full object-cover bg-box-background rounded-xl shadow-lg border-2 border-border-color cursor-pointer min-h-[400px]">
          <div className="mb-3 relative">
            <img src={watch_img} alt="" className="h-full w-full rounded-xl"/>
          </div>
          <Link className="absolute top-0 right-0 rounded-full bg-box-background w-8 h-8 flex justify-center items-center hover:bg-main-color text-2xl transition-all ease-in-out duration-500">
          <RxCross2/>
          </Link>
          <div className="space-y-2 p-2">
            <h4 className="line-clamp-2">
              Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
              Myntra
            </h4>
            <h4>₹1200</h4>
            <hr className="text-[#908e8e]"/>
            <div className="flex justify-between items-center">
              <h4>Brand :</h4>
              <p>Roadster</p>
            </div>
            <hr className="text-[#908e8e]"/>
            <div className="flex justify-between items-center">
              <h4>Type :</h4>
              <p>Watch</p>
            </div>
            <hr className="text-[#908e8e]"/>
            <div className="flex justify-between items-center">
              <h4>SKU :</h4>
              <p>SJU033</p>
            </div>
            <hr className="text-[#908e8e]"/>
            <div className="flex justify-between items-center">
              <h4>Availibity :</h4>
              <p>In Stock</p>
            </div>
            <hr className="text-[#908e8e]"/>
            <div className="flex justify-between items-center">
              <h4>Color :</h4>
              <p>Roadster</p>
            </div>
            <hr className="text-[#908e8e]"/>
            <div className="flex justify-between items-center">
              <h4>Size :</h4>
              <p className="">S M L</p>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="w-1/2 sm-w-1/3 md:w-1/4 lg:w-1/6 h-full object-cover bg-box-background rounded-xl shadow-lg border-2 border-border-color cursor-pointer min-h-[400px]">
          <div className=" mb-3">
            <img src={watch_img} alt="" className="h-full w-full rounded-xl"/>
          </div>
          <div className="space-y-2 p-2">
            <h4 className="line-clamp-2">
              Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
              Myntra
            </h4>
            <h4>₹1200</h4>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Brand :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Type :</h4>
              <p>Watch</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>SKU :</h4>
              <p>SJU033</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Availibity :</h4>
              <p>In Stock</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Color :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Size :</h4>
              <p className="">S M L</p>
            </div>
          </div>
        </div>


        {/* Item 3 */}
        <div className="w-1/2 sm-w-1/3 md:w-1/4 lg:w-1/6 h-full object-cover bg-box-background rounded-xl shadow-lg border-2 border-border-color cursor-pointer min-h-[400px]">
          <div className=" mb-3">
            <img src={watch_img} alt="" className="h-full w-full rounded-xl"/>
          </div>
          <div className="space-y-2 p-2">
            <h4 className="line-clamp-2">
              Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
              Myntra
            </h4>
            <h4>₹1200</h4>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Brand :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Type :</h4>
              <p>Watch</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>SKU :</h4>
              <p>SJU033</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Availibity :</h4>
              <p>In Stock</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Color :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Size :</h4>
              <p className="">S M L</p>
            </div>
          </div>
        </div>

        {/* Item4 */}
        <div className="w-1/2 sm-w-1/3 md:w-1/4 lg:w-1/6 h-full object-cover bg-box-background rounded-xl shadow-lg border-2 border-border-color cursor-pointer min-h-[400px]">
          <div className=" mb-3">
            <img src={watch_img} alt="" className="h-full w-full rounded-xl"/>
          </div>
          <div className="space-y-2 p-2">
            <h4 className="line-clamp-2">
              Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
              Myntra
            </h4>
            <h4>₹1200</h4>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Brand :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Type :</h4>
              <p>Watch</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>SKU :</h4>
              <p>SJU033</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Availibity :</h4>
              <p>In Stock</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Color :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Size :</h4>
              <p className="">S M L</p>
            </div>
          </div>
        </div>

        {/* item 5 */}
        <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-full object-cover bg-box-background rounded-xl shadow-lg border-2 border-border-color cursor-pointer min-h-[400px]">
          <div className=" mb-3">
            <img src={watch_img} alt="" className="h-full w-full rounded-xl"/>
          </div>
          <div className="space-y-2 p-2">
            <h4 className="line-clamp-2">
              Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
              Myntra
            </h4>
            <h4>₹1200</h4>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Brand :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Type :</h4>
              <p>Watch</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>SKU :</h4>
              <p>SJU033</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Availibity :</h4>
              <p>In Stock</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Color :</h4>
              <p>Roadster</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h4>Size :</h4>
              <p className="">S M L</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompareProducts;
