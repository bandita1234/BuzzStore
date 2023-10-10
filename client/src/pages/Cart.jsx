import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  getCart,
  updateQuantity,
} from "../features/user/UserSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  // const [quantity, setQuantity] = useState(0);
  const [cnt, setCnt] = useState(1);
  // console.log(totalCost);

  const cartState = useSelector((state) => state.auth.cartItems);
  // console.log(cartState);

  const deletedCartProduct = (id) => {
    dispatch(deleteCart(id));

    setTimeout(() => {
      dispatch(getCart());
    }, 200);
  };

  const cartQuantity = (newQuantity) => {
    dispatch(updateQuantity(newQuantity)).then(() => {
      setCnt(cnt + 1);
    });

    // dispatch(getCart());
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum +=
        Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
    }
    setTotalCost(sum);
  }, [cartState?.length, cnt]);

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />

      <div className="bg-box-background">
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10 lg:flex-row flex-col">
            <div className="w-3/4 px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="heading m-0">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {cartState?.length} Items
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-main-color text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-main-color text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-main-color text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-main-color text-xs uppercase w-1/5">
                  Total
                </h3>
              </div>

              {cartState?.length > 0 ? (
                cartState?.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-center hover:bg-[#4b6382b1] -mx-8 px-6 py-5"
                    >
                      <div className="flex w-2/5">
                        <div
                          className="w-20"
                          onClick={() =>
                            navigate(`/product/${item?.productId?._id}`)
                          }
                        >
                          <img
                            className="h-24"
                            src={item?.productId?.images[0]}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {item?.productId?.title}
                          </span>
                          <span className="text-main-color text-xs">
                            {item?.productId?.brand}
                          </span>
                          <span className="font-bold text-sm flex flex-wrap items-center">
                            Color :
                            <div>
                              <ul className="">
                                <li
                                  className="m-1 h-5 w-5 rounded-full"
                                  style={{
                                    backgroundColor: `${item?.color?.title}`,
                                  }}
                                ></li>
                              </ul>
                            </div>
                          </span>
                          <div
                            onClick={() => deletedCartProduct(item?._id)}
                            className="font-semibold text-red text-xl w-8 h-8 rounded-full bg-background-color flex items-center justify-center"
                          >
                            <RiDeleteBin6Line />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-1/5">
                        <BiMinus
                          size={20}
                          onClick={() =>
                            cartQuantity({
                              cartId: item?._id,
                              newQuantity: item?.quantity - 1,
                            })
                          }
                        />

                        <input
                          className="mx-2 border text-center w-8 bg-customTransparent border-main-color p-2"
                          type="text"
                          // value="1"
                          min={1}
                          max={10}
                          value={item?.quantity}
                        />

                        <BiPlus
                          size={20}
                          onClick={() =>
                            cartQuantity({
                              cartId: item?._id,
                              newQuantity: item?.quantity + 1,
                            })
                          }
                        />
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ₹{item?.price}
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ₹{item?.price * item?.quantity}
                      </span>
                    </div>
                  );
                })
              ) : (
                <h2 className="text-center text-2xl font-bold">
                  Opps! Your Cart is Empty!🙁
                </h2>
              )}

              {/* <div className="flex items-center hover:bg-[#4b6382b1] -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img
                    className="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">Iphone 6S</span>
                  <span className="text-main-color text-xs">Apple</span>
                  <span className="font-bold text-sm">Size : S</span>
                  <Link
                    to="#"
                    className="font-semibold text-red text-xl w-8 h-8 rounded-full bg-background-color flex items-center justify-center"
                  >
                    <RiDeleteBin6Line/>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center w-1/5">
                <BiMinus size={20}/>

                <input
                  className="mx-2 border text-center w-8 bg-customTransparent border-main-color p-2"
                  type="text"
                  value="1"
                />

                <BiPlus size={20}/>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
            </div>

            <div className="flex items-center hover:bg-[#4b6382b1] -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img
                    className="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">Iphone 6S</span>
                  <span className="text-main-color text-xs">Apple</span>
                  <span className="font-bold text-sm">Size : S</span>
                  <Link
                    to="#"
                    className="font-semibold text-red text-xl w-8 h-8 rounded-full bg-background-color flex items-center justify-center"
                  >
                    <RiDeleteBin6Line/>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center w-1/5">
                <BiMinus size={20}/>

                <input
                  className="mx-2 border text-center w-8 bg-customTransparent border-main-color p-2"
                  type="text"
                  value="1"
                />

                <BiPlus size={20}/>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
            </div> */}

              <Link
                to="/product"
                className="flex items-center gap-2 font-semibold text-main-color text-sm mt-10"
              >
                <BsArrowLeft size={20} />
                Continue Shopping
              </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="heading m-0">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Items {cartState?.length}{" "}
                </span>
                <span className="font-semibold text-sm">₹ {totalCost}</span>
              </div>

              <div className="py-6">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full bg-customTransparent border-2 border-main-color"
                />
              </div>
              <button className="bg-[#db7e7e] hover:bg-red px-5 py-2 text-sm uppercase">
                Apply
              </button>

              <div className="flex justify-between items-center pt-6">
              <h3 className="font-semibold text-xs  text-main-color">Discount on MRP</h3>
              <span>₹ 0</span>
              </div>
              <div className="flex justify-between items-center">
              <h3 className="font-semibold text-xs  text-main-color">Coupon Discount</h3>
              <span>₹ 0</span>
              </div>
              <div className="flex justify-between items-center">
              <h3 className="font-semibold text-xs  text-main-color">Shipping Charges</h3>
              <span>₹ 0</span>
              </div>


              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between items-center py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span className="text-xl text-main-color">₹ {totalCost}</span>
                </div>
                <button className="bg-[#42ab92] font-semibold hover:bg-main-color py-3 text-sm text-white uppercase w-full" onClick={()=>navigate("/checkout")}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
