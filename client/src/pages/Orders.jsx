import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { getCookie } from "cookies-next";
import HistoryCards from "../components/HistoryCards";
import { getOrders } from "../features/user/UserSlice";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
// import Head from "next/head";
// import EmptyOrder from "../components/EmptyOrder";

const Orders = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const getOrderedItems = () =>{
    dispatch(getOrders());
  }

  const orderState = useSelector((state)=>state?.auth?.orderedItems)
  // console.log(orderState);

  useEffect(() => {
    getOrderedItems();
  }, [])
  

  return (
    <>
    <Meta title="Orders" />
      <BreadCrumb title="Orders" />
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto lg:px-24 py-4">
          <h2 className="text-lg sm:text-2xl font-bold mx-2 my-2 sm:my-4 text-main-color">
            ORDER HISTORY
          </h2>
          {orderState?.map((order) => (
            <HistoryCards key={order._id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Orders;