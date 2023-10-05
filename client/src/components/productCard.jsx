import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import watch_img from "../assets/watch_img.avif";
import main_watch from "../assets/main_watch.avif";
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/product/ProductSlice";

//React Icons
import { IoMdHeartEmpty } from "react-icons/io";
import { BiShuffle, BiShoppingBag } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserWishlist } from "../features/user/UserSlice";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item } = props;
  // console.log(item);
  const [alreadyWishlist, setAlreadyWishlist] = useState(false);
  // console.log("wishlist");
  const [showFirstImage, setShowFirstImage] = useState(true);
  const handleMouseEnter = () => {
    setShowFirstImage(false);
  };

  const handleMouseLeave = () => {
    setShowFirstImage(true);
  };

  const addProductToWishlist = (id) => {
    // alert(id);
    dispatch(addToWishlist(id));
    {
      alreadyWishlist ? 
      toast.error("Product removed from wishlist!") : toast.success("Product added to wishlist!") 
    }
  };

  const getwishlist = () => {
    dispatch(getUserWishlist());
  };
  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);
  console.log(wishlistState);

  useEffect(() => {
    getwishlist();

    for (let index = 0; index < wishlistState?.length; index++) {
      if (item?._id === wishlistState[index]?._id) {
        setAlreadyWishlist(true);
      }
    }
  }, []);


  return (
    <div className="px-1 py-2 sm:p-4 lg:w-1/4 w-1/2">
      <Link to={`/product/${item?._id}`}>
        <div className="w-[300px] max-w-xs mx-auto rounded-lg shadow-lg border-2 border-border-color bg-box-background cursor-pointer min-h-[400px]">
          <div
            className="relative text-center overflow-hidden h-[250px] w-full border-b-4 border-border-color group p-1 bg-[#fff] rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showFirstImage ? (
              <img
                // src={item?.images[0]?.url}
                src={item?.images[0]}
                alt="product"
                className="h-full w-full object-contain rounded-lg"
              />
            ) : (
              <img
                src={item?.images[1] ? item?.images[1] : item?.images[0]}
                alt="second_watch"
                // className="hidden"
                className="h-full w-full object-cover rounded-lg"
              />
            )}
          </div>
          <div className="lg:px-6 flex justify-evenly relative bottom-6">
            <Link
              className={`rounded-full w-10 h-10 flex justify-center items-center pt-1 hover:bg-main-color text-2xl transition-all ease-in-out duration-500 bg-${alreadyWishlist ? 'main-color' : 'box-background'}`}
              onClick={() => {
                setAlreadyWishlist(!alreadyWishlist);
                addProductToWishlist(item?._id);
              }}
            >
              <IoMdHeartEmpty />
            </Link>
            <Link
              // to={{
              //   pathname: "/compare",
              //   state: { item },
              // }}
              className="rounded-full bg-box-background w-10 h-10 flex justify-center items-center hover:bg-main-color text-2xl transition-all ease-in-out duration-500"
            >
              <BiShuffle />
            </Link>
            <Link
              to={`/product/${item?._id}`}
              className="rounded-full bg-box-background w-10 h-10 flex justify-center items-center hover:bg-main-color text-2xl transition-all ease-in-out duration-500"
            >
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
              {item?.brand}
            </p>
            <h3 className="text-xs sm:text-base text-product-descripion mb-1 line-clamp-1">
              {item?.title}
            </h3>
            <div className="flex justify-center">
              <ReactStars
                count={5}
                size={24}
                value={item?.totalrating}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <h2 className="text-base font-semibold my-1 sm:my-2">
              <span> ₹{item?.price} </span>
              <span className="mx-1 line-through text-main-color">₹2000</span>
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
