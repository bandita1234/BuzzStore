import React from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className="bg-box-background">
      <div class="container mx-auto mt-10">
        <div class="flex shadow-md my-10">
          <div class="w-3/4 bg-white px-10 py-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">3 Items</h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>
            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img
                    class="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                    alt=""
                  />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">Iphone 6S</span>
                  <span class="text-red-500 text-xs">Apple</span>
                  <a
                    href="#"
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </a>
                </div>
              </div>
              <div class="flex justify-center items-center w-1/5">
                <BiMinus size={20}/>

                <input
                  class="mx-2 border text-center w-8 bg-customTransparent border-main-color p-2"
                  type="text"
                  value="1"
                />

                <BiPlus size={20}/>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
              <span class="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
            </div>

            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img
                    class="h-24"
                    src="https://drive.google.com/uc?id=10ht6a9IR3K2i1j0rHofp9-Oubl1Chraw"
                    alt=""
                  />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">Xiaomi Mi 20000mAh</span>
                  <span class="text-red-500 text-xs">Xiaomi</span>
                  <a
                    href="#"
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </a>
                </div>
              </div>
              <div class="flex justify-center items-center w-1/5">
                <BiMinus size={20}/>

                <input
                  class="mx-2 border text-center w-8 bg-customTransparent border-main-color p-2"
                  type="text"
                  value="1"
                />

               <BiPlus size={20}/>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">
                $40.00
              </span>
              <span class="text-center w-1/5 font-semibold text-sm">
                $40.00
              </span>
            </div>

            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img
                    class="h-24"
                    src="https://drive.google.com/uc?id=1vXhvO9HoljNolvAXLwtw_qX3WNZ0m75v"
                    alt=""
                  />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">Airpods</span>
                  <span class="text-red-500 text-xs">Apple</span>
                  <a
                    href="#"
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </a>
                </div>
              </div>
              <div class="flex items-center justify-center w-1/5">
                <BiMinus size={20}/>
                 
                <input
                  class="mx-2 border text-center w-8 bg-customTransparent border-main-color p-2"
                  type="text"
                  value="1"
                />

               <BiPlus size={20}/>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">
                $150.00
              </span>
              <span class="text-center w-1/5 font-semibold text-sm">
                $150.00
              </span>
            </div>

            <Link
              href="#"
              class="flex items-center gap-2 font-semibold text-indigo-600 text-sm mt-10"
            >
              <BsArrowLeft size={20}/>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" class="w-1/4 px-8 py-10">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase">Items 3</span>
              <span class="font-semibold text-sm">590$</span>
            </div>
            
            <div class="py-10">
              <label
                for="promo"
                class="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                class="p-2 text-sm w-full bg-customTransparent border-2 border-main-color"
              />
            </div>
            <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>$600</span>
              </div>
              <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
