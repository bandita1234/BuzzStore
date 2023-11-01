import React from "react";
import { Link } from "react-router-dom";
// import Link from "next/link";
import HistoryProducts from "./HistoryProducts";

const HistoryCards = ({ order }) => {
  console.log(order);
  return (
    <div className="rounded-lg border-2 my-6 mx-2 shadow-lg border-border-color bg-box-background">
      <div className="flex items-center justify-between border-b-2 border-main-color">
        <div className="flex-grow flex justify-between md:justify-start items-center">
          <div className="m-3 sm:m-6 text-sm sm:text-base">
            <h3 className="font-semibold text-main-color">Order Number</h3>
            <p className="text-sm lg:text-base"># {order._id}</p>
          </div>
          <div className="m-3 sm:m-6 text-sm sm:text-base">
            <h3 className="font-semibold text-main-color">Date Placed</h3>
            <p className="text-sm lg:text-base">
              {order.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </p>
          </div>
          <div className="m-3 sm:m-6 text-sm sm:text-base hidden md:inline-block">
            <h3 className="font-semibold text-main-color">Total Amount</h3>
            <p className="font-bold text-sm lg:text-base">
              {" "}
              ₹ {order.totalPrice}
            </p>
          </div>
          <div className="m-3 sm:m-6 text-sm sm:text-base hidden md:inline-block">
            <h3 className="font-semibold text-main-color">
              Total Amount after Discount
            </h3>
            <p className="font-bold text-sm lg:text-base">
              {" "}
              ₹ {order.totalPriceAfterDiscount}
            </p>
          </div>
        </div>
        <div className="mx-6 hidden md:inline-block">
          <Link to={`/order/order.orderId`}>
            <a className="font-bold text-sm px-4 py-2 border-2 shadow-lg border-border-color text-main-color hover:border-main-color ">
              VIEW ORDER
            </a>
          </Link>
        </div>
      </div>

      <div className="relative m-2 divide-y-2">
        {order.orderItems?.map((product) => (
          <HistoryProducts
            key={product._id}
            product={product}
            status={order?.orderStatus}
          />
        ))}
      </div>

      <div className="flex md:hidden justify-between items-center border-t-2">
        <div className="m-3 sm:m-6 text-sm sm:text-base">
          <h3 className="font-semibold">Total Amount</h3>
          <p className="font-bold"> ₹ {order?.totalPrice}</p>
        </div>
        <div className="mx-6">
          {/* <Link>
            href={`/order/${order.orderId}`}
            <a className="font-bold text-xs px-2 py-1 border-2 hover:border-border-color">
              VIEW ORDER
            </a>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default HistoryCards;
