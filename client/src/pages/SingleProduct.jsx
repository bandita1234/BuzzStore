import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-rating-stars-component";
import headphone_img from "../assets/main_headphone.avif";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { IoMdGitCompare, IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineLink } from "react-icons/ai";
import ProductCard from "../components/ProductCard"

const SingleProduct = () => {
  const [ordedProduct, setOrdedProduct] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const imageUrl = `${window.location.origin}${headphone_img}`; // Replace this with your actual image URL

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(imageUrl)
      .then(() => {
        alert("Image link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy image link: ", error);
      });
  };

  return (
    <div>
      <Meta title="Product" />
      <BreadCrumb title="Product" />

      {/* Product Details */}
      <div className="flex gap-4 md:flex-row flex-col">
        <div className=" flex-1 object-contain">
          {/* <img src={headphone_img} alt="" className="w-full h-full object-contain"/> */}
          <div className="relative z-10">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: headphone_img,
                },
                largeImage: {
                  src: headphone_img,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className="flex flex-wrap mt-2 lg:gap-4 gap-2 justify-center">
            <div className="lg:w-64 lg:h-56 w-28 h-28">
              <img
                src={headphone_img}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="lg:w-64 lg:h-56 w-28 h-28">
              <img
                src={headphone_img}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="lg:w-64 lg:h-56 w-28 h-28">
              <img
                src={headphone_img}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="lg:w-64 lg:h-56 w-28 h-28">
              <img
                src={headphone_img}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 bg-box-background p-8 rounded-lg border border-border-color">
          <h3>Kids hradphone bulk 10 pack multi colored for students</h3>
          <h3>₹1200</h3>
          <div className="flex items-center gap-2">
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p>(2 reviews)</p>
          </div>
          <p className="mb-3">Write a review</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p>Type : </p>
              <p>Headsets</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Brand : </p>
              <p>Headsets</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Categories : </p>
              <p>headphonr,camera etc..</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Tags : </p>
              <p>Headsets,headphones,mobile</p>
            </div>

            <div className="flex items-center gap-2">
              <p>SKU : </p>
              <p>SKU027</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Availibility : </p>
              <p>541, I</p>
            </div>

            <div>
              <p>Size : </p>
              <div className="flex gap-2">
                <span className=" bg-background-color px-3 py-2 hover:bg-main-color border border-1 border-border-color font-semi-bold">
                  S
                </span>
                <span className=" bg-background-color px-3 py-2 hover:bg-main-color border border-1 border-border-color font-semi-bold">
                  M
                </span>
                <span className=" bg-background-color px-3 py-2 hover:bg-main-color border border-1 border-border-color font-semi-bold">
                  L
                </span>
                <span className=" bg-background-color px-3 py-2 hover:bg-main-color border border-1 border-border-color font-semi-bold">
                  XL
                </span>
              </div>
            </div>

            <div>
              <p>Colors : </p>
              <p>mjkfnew</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Quantity : </p>
              <div>
                <input
                  type="number"
                  style={{ width: "70px" }}
                  className="bg-box-background border-main-color border-2"
                  min={1}
                  max={10}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button>ADD TO CART</button>
              <button>BUY NOW</button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <IoMdHeartEmpty />
                <Link>Add to Wishlist</Link>
              </div>
              <div className="flex items-center gap-1">
                <IoMdGitCompare />
                <Link>Add to compare</Link>
              </div>
            </div>

            {/* Copy Link */}
            <div className="flex items-center gap-2 mt-3 border border-border-color shadow-sm shadow-text-color p-2">
              <AiOutlineLink />
              <p>Product Link : </p>
              <button
                onClick={copyToClipboard}
                className="cursor-pointer text-[#908e8e]"
              >
                Copy Product Link
              </button>
            </div>

            {/* Shipping Accordian Section */}
            <div>
              <h2
                className="cursor-pointer flex items-center justify-between w-full p-5 font-medium text-left text-product-descripion border border-b-0 border-main-color focus:ring-4 focus:ring-main-color"
                onClick={toggleAccordion}
              >
                <span className="flex items-center">
                  <LiaShippingFastSolid size={24} className="mr-3" />
                  Shipping Details
                </span>
                <svg
                  className={`w-3 h-3 rotate-${isOpen ? "0" : "180"} shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </h2>
              {isOpen && (
                <div className="p-5 border border-b-0 border-main-color text-product-descripion">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  excepturi atque suscipit? Rem architecto eos excepturi atque
                  nesciunt corrupti fugit aliquid, dicta odio voluptas facilis,
                  vero ullam impedit quaerat deleniti facere inventore
                  doloribus. Adipisci nemo tempora praesentium eligendi
                  voluptatum dolorum.
                </div>
              )}
            </div>

            {/* Payment Methods */}
            {/* <div className="">
              <h2>Payment Methods</h2>
              <div className="w-56 ">
                <img src="https://t4.ftcdn.net/jpg/04/55/10/23/360_F_455102361_RsJAeKOVlrrbvLLRtrFQ3K6VAuDg0b4b.jpg" alt="" />
              </div>
            </div> */}


          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="mb-3">Details</h2>
        <div className="bg-box-background p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic odio
            repudiandae nam voluptate dolores sapiente dicta repellendus quasi
            fugit nostrum aperiam eaque magni at atque, assumenda placeat vero
            eum! Quia consectetur pariatur excepturi magni illo laboriosam quasi
            voluptatum nihil. Est, sapiente. Corrupti ipsam, at quibusdam
            laboriosam facere maiores laudantium esse?
          </p>
        </div>
      </div>

      {/* Review */}
      <div>
        <h2 className="mb-3">Reviews</h2>
        <div className="bg-box-background p-4">
          <h4>Customer Reviews</h4>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="text-sm">Based on 2 reviews</p>
            </div>
            {ordedProduct && (
              <div>
                <p className="underline underline-offset-2">Write a review</p>
              </div>
            )}
          </div>
          <hr />

          {/* Post Review */}
          <div className="mt-3">
            <h2>Post a review</h2>
            <div className="">
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <textarea
              name="comments"
              id=""
              rows="5"
              placeholder="Comments"
              className="bg-customTransparent border border-main-color w-full px-4"
            ></textarea>
            <div className="flex justify-end items-center">
              <button>SUbmit Review</button>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <div>
        <h2>You may also like</h2>
        <div className="flex flex-wrap">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
