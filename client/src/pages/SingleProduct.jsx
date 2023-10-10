import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-rating-stars-component";
import headphone_img from "../assets/main_headphone.avif";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { IoMdGitCompare, IoMdHeartEmpty } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineLink } from "react-icons/ai";
import ProductCard from "../components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, getAllProducts } from "../features/product/ProductSlice";
import { addToCart, getCart } from "../features/user/UserSlice";
import Color from "../components/Color";
import { toast } from "react-toastify";
import Button from "../components/Button";

const SingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];
  console.log(product_id);

  const [ordedProduct, setOrdedProduct] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  // console.log(color);

  const [alreadyAdded, setAlreadyAdded] = useState(false);
// console.log(alreadyAdded);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast("Product link copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Sorry, Failed to Copy Product link now!");
      });
  };

  const getASingleProduct = () => {
    dispatch(getAProduct(product_id));
  };

  const productState = useSelector((state) => state?.product?.product);
  // console.log(productState);

  const singleProductState = useSelector(
    (state) => state?.product?.singleProduct
  );
  // console.log(singleProductState);

  const getproducts = () => {
    dispatch(getAllProducts());
  };

  const uploadToCart = () => {
    // console.log("abcd");
    if (!color) {
      toast.error("Please Select a Color!");
    } else {
      dispatch(
        addToCart({
          productId: singleProductState?._id,
          color: color,
          price: singleProductState?.price,
          quantity: quantity,
        })
      );
      toast.success("Product added to cart!");
    }
    // alert("Added to cart")
  };

  const cartState = useSelector((state) => state?.auth?.cartItems);
  // console.log(product_id);
  // console.log(cartState);

  useEffect(() => {
    getproducts();
    getASingleProduct();
    dispatch(getCart());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (product_id === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  return (
    <div>
      <Meta title="Product" />
      <BreadCrumb title="Product" />

      {/* Product Details */}
      <div className="flex gap-4 md:flex-row flex-col">
        <div className=" flex-1 object-contain">
          {/* <img src={headphone_img} alt="" className="w-full h-full object-contain"/> */}
          <div className="relative z-10 flex justify-center">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  // isFluidWidth: true,
                  width: 600,
                  height: 600,
                  src: singleProductState?.images[0],
                },
                largeImage: {
                  src: singleProductState?.images[0],
                  width: 1200,
                  height: 1000,
                },
              }}
            />
          </div>

          {singleProductState?.images.length > 1 ? (
            <div className="flex flex-wrap mt-2 lg:gap-4 gap-2 justify-center">
              {singleProductState?.images?.map((item) => {
                return (
                  <div className="lg:w-64 lg:h-56 w-28 h-28 border-main-color border-2 p-1">
                    <img
                      src={item}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex-1 bg-box-background p-8 rounded-lg border border-border-color">
          <h3 className="customh3">{singleProductState?.title}</h3>
          <h3 className="customh3 font-bold text-2xl">
            ₹{singleProductState?.price}
          </h3>
          <div className="flex items-center gap-2">
            <ReactStars
              count={5}
              size={24}
              value={parseInt(singleProductState?.totalrating)}
              edit={false}
              activeColor="#ffd700"
            />
            <p>(2 reviews)</p>
          </div>
          {/* <p className="mb-3">Write a review</p> */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p>Type : </p>
              <p className="customh3">{singleProductState?.category}</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Brand : </p>
              <p className="customh3">{singleProductState?.brand}</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Categories : </p>
              <p className="customh3">{singleProductState?.category}</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Tags : </p>
              <p className="bg-product-descripion font-bold text-[#21594c] rounded-lg px-2">
                {singleProductState?.tag}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p>Availibility : </p>
              <p className="customh3">In Stock</p>
            </div>

            {/* <div>
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
            </div> */}

            {alreadyAdded == false && (
              <div>
                <p>Colors : </p>
                <Color
                  colorData={singleProductState?.color}
                  setColor={setColor}
                  color={color}
                />
              </div>
            )}

            {alreadyAdded == false && (
              <div className="flex items-center gap-2">
                <p>Quantity : </p>
                <div>
                  <input
                    type="number"
                    style={{ width: "70px" }}
                    className="bg-box-background border-main-color border-2"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                handleClick={() => {
                  alreadyAdded ? navigate("/cart") : uploadToCart();
                }}
                text={alreadyAdded ? "GO TO CART" : "ADD TO CART"}
              />
              <Button text=" BUY NOW" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <IoMdHeartEmpty />
                <Link className="customh3">Add to Wishlist</Link>
              </div>
              <div className="flex items-center gap-1">
                <IoMdGitCompare />
                <Link className="customh3">Add to compare</Link>
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
                  We offer reliable and fast shipping options to ensure your
                  orders reach you promptly and in perfect condition. Our
                  dedicated shipping team works tirelessly to make sure your
                  shopping experience is hassle-free.
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-main-color text-2xl text-left mt-10 mb-4 font-semibold">
                {" "}
                Product Details
              </h2>
              <div className="bg-box-background">
                <p className="text-product-descripion">
                  {singleProductState?.description}
                </p>
              </div>
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
        <h2 className="text-2xl  text-main-color ml-3  text-center my-4">
          You may also like
        </h2>
        <div className="flex flex-wrap">
          {productState &&
            productState.map((item) => {
              return <ProductCard item={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
