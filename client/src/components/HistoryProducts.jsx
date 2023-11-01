import React from "react";
import { Link } from "react-router-dom";
// import Link from "next/link";
// import Image from "next/image";
import { BsCheckCircleFill, BsInfoCircleFill } from "react-icons/bs";
import { capitalize } from "lodash";
import headphone_img from "../assets/headphone_img.avif";
import Color from "../components/Color";

const HistoryProducts = ({ product, status }) => {
  //   console.log(product);
  //   console.log(status);
  return (
    <div className="py-2">
      <div className="flex flex-row">
        <div className="relative h-24 w-24 overflow-hidden m-2">
          <img
            className=" w-full h-full object-cover"
            src={product.product.images[0]}
            // src={headphone_img}
            alt="product"
            layout="fill"
          />
        </div>
        <div className="flex-grow flex flex-col sm:flex-row justify-between my-2 text-product-descripion">
          <div>
            <p className="text-xs font-semibold text-main-colorx">
              {product.product.brand}
            </p>
            <h3 className="text-sm sm:text-lg  text-cust_dark hover:text-main-color mb-1 font-semibold">
              <Link href={`/product/${product.slug}`}>
                <a>{product.product.title}</a>
              </Link>
            </h3>
            <div className="flex flex-col sm:flex-row ">
              <p className="mr-6 flex">
                Color:{" "}
                <div>
                  <ul className="">
                    <li
                      className="m-1 h-5 w-5 rounded-full border-2"
                      style={{
                        backgroundColor: `${product?.color?.title}`,
                      }}
                    ></li>
                  </ul>
                </div>{" "}
              </p>
              <div>
                <p>Qty: {product.quantity}</p>
              </div>
            </div>
          </div>
          <div className="mr-4">
            <h2 className="text-base sm:text-xl text-main-color mb-1 font-semibold">
              <span> ₹ {product?.product?.dicountedPrice} </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex items-center m-2 font-semibold text-sm text-gray-400">
        {product.status == "delivered" ? (
          <BsCheckCircleFill className="mr-2 text-main-color text-lg" />
        ) : (
          <BsInfoCircleFill className="mr-2 text-main-color text-lg" />
        )}

        {/*Delivered on Aug 20, 2022*/}
        {status}
      </div>
    </div>
  );
};

export default HistoryProducts;
