import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import watch_img from "../assets/watch_img.avif";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../features/user/UserSlice";
import { addToWishlist } from "../features/product/ProductSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const getwishlist = () => {
    dispatch(getUserWishlist());
  };

  useEffect(() => {
    getwishlist();
  }, []);

  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);
  // console.log(wishlistState);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserWishlist());
    }, 300);
  };
  return (
    <div>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="flex flex-wrap item-center sm:gap-5 lg:gap-10 lg:mx-10 m-2">
      {wishlistState?.length == 0 && <div className="text-xl">Oops! Your wishlist is empty. <Link to="/product" className="text-main-color">Shop here!</Link></div>}
        {wishlistState?.map((item, idx) => (
          <div key={idx} className=" relative w-1/2 sm-w-1/3 max-w-xs md:w-1/4 lg:w-1/6 h-full object-cover bg-box-background rounded-xl shadow-lg border-2 border-border-color cursor-pointer min-h-[300px]">
            <div className="mb-3 relative p-1">
              <img
                src={item?.images[0]}
                alt=""
                className="h-full w-full rounded-xl"
              />
            </div>
            <Link
              className="absolute top-0 right-0 rounded-full bg-box-background w-8 h-8 flex justify-center items-center hover:bg-main-color text-2xl transition-all ease-in-out duration-500"
              onClick={() => removeFromWishlist(item?._id)}
            >
              <RxCross2 />
            </Link>
            <div className="space-y-2 p-2 text-center">
              <p className="text-sm sm:text-lg font-semibold text-main-color">
                {item?.brand}
              </p>
              <h4 className="line-clamp-2">
                {/* Roadster Men Blue Analogue Watch MFB-PN-WTH-9710G (Onesize) by
              Myntra */}
                {item.title}
              </h4>
              <h2 className="text-base font-semibold my-1 sm:my-2">
                <span> ₹{item?.price} </span>
                <span className="mx-1 line-through text-main-color">₹2000</span>
              </h2>
            </div>
          </div>
        ))}
        {/* Item 1 */}
      </div>
    </div>
  );
};

export default Wishlist;
