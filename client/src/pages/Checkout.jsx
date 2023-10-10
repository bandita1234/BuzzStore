import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, loginUser } from "../features/user/UserSlice";
// import Button from "../components/Button";
import FormButtons from "../components/FormButtons";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const CheckoutSchema = yup.object({
  country: yup.string().required("Country is required!"),
  firstname: yup.string().required("FirstName is required !"),
  lastname: yup.string().required("LastName is required !"),
  address: yup.string().required("Address is required !"),
  area: yup.string().required("Area is required !"),
  pin: yup.string().required("PinCode is required !"),
  state: yup.string().required("State is required !"),
  dist: yup.string().required("District is required !"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  console.log(shippingInfo,paymentInfo);

  const [totalCost, setTotalCost] = useState(null);
  // const [cnt, setCnt] = useState(null);
  // console.log(totalCost);

  const[cartProducts,setCartProducts] = useState([]);

  const cartState = useSelector((state) => state.auth.cartItems);
  // console.log(cartState);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum +=
        Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
    }
    setTotalCost(sum);
  }, []);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      // console.log(cartState[index]);
      items.push({
        product: cartState[index]?.productId,
        color: cartState[index]?.color?._id,
        quantity: cartState[index]?.quantity,
        price: cartState[index]?.price,
      });
    }
    // console.log(items);
    setCartProducts(items);
  }, []);

  // console.log(cartProducts);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      country: "",
      address: "",
      area: "",
      pin: "",
      state: "",
      dist: "",
    },
    validationSchema: CheckoutSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      setShippingInfo(values);
      displayRazorPay(values);
      // setTimeout(() => {
      //   displayRazorPay();
      // }, 400);
      
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorPay = async (shippingDetails) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // console.log(config);

    // creating a new order
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      { amount: totalCost + 5 },
      config
    );

    // alert("hufhvu");

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data.order;

    // console.log(result.data.order);
    // console.log(amount);

    const options = {
      key: RAZORPAY_KEY, // Enter the RazorPay Key ID
      amount: amount,
      currency: currency,
      name: "Bandita Bahinipati",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          "http://localhost:5000/api/user/order/paymentVerification",
          data,
          config
        );

        // alert(result);
        // setPaymentInfo({
        //   razorpayPaymentId: response.razorpay_payment_id,
        //   razorpayOrderId: response.razorpay_order_id,
        // });
        
        await dispatch(
          createOrder({
            totalPrice: totalCost,
            totalPriceAfterDiscount: totalCost,
            orderItems: cartProducts,
            shippingInfo: shippingDetails,
            paymentInfo: {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            }
          })
        );
      },
      prefill: {
        name: "bandita Bahinipati",
        email: "bandita@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Bandita Bahinipati Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Meta title="Checkout" />
      <BreadCrumb title="Checkout" />

      <div className="flex justify-center items-center mt-6">
        <form
          className="bg-box-background text-center px-6 pt-8 m-6 rounded-xl space-y-2 lg:w-full "
          onSubmit={formik.handleSubmit}
        >
          <div className="flex gap-28">
            <div className="w-1/2">
              <h2 className="heading uppercase">Shipping Address</h2>

              <div className="lg:flex lg:justify-between lg:items-center my-4 gap-3">
                <div className="relative lg:w-1/2">
                  <div>
                    <input
                      className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                      type="text"
                      id="firstname"
                      placeholder=""
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                    <label
                      htmlFor="firstname"
                      className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="text-red text-left text-sm ms-2">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>

                <div className="relative lg:w-1/2">
                  <input
                    className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                    type="text"
                    id="lastname"
                    placeholder=" "
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <label
                    htmlFor="lastname"
                    className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Last Name
                  </label>

                  <div className="text-red text-left text-sm ms-2">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
              </div>

              <div className="">
                <select
                  className="bg-box-background border-2 p-3 w-full border-main-color mb-4 rounded-lg"
                  value={formik.values.country}
                  onChange={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                >
                  <option className="disabled hidden" value="">
                    Select Country
                  </option>
                  <option value="india" className="p-3">
                    India
                  </option>
                </select>

                <div className="text-red text-left text-sm ms-2">
                  {formik.touched.country && formik.errors.country}
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <div>
                    <input
                      className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                      type="text"
                      id="address"
                      placeholder=" "
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <label
                      htmlFor="address"
                      className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Address
                    </label>
                  </div>
                  <div className="text-red text-left text-sm ms-2">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <div>
                    <input
                      className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                      type="text"
                      id="area"
                      placeholder=" "
                      value={formik.values.area}
                      onChange={formik.handleChange("area")}
                      onBlur={formik.handleBlur("area")}
                    />
                    <label
                      htmlFor="area"
                      className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Street / Area
                    </label>
                  </div>
                  <div className="text-red text-left text-sm ms-2">
                    {formik.touched.area && formik.errors.area}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <div>
                    <input
                      className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                      type="number"
                      id="pin"
                      placeholder=" "
                      value={formik.values.pin}
                      onChange={formik.handleChange("pin")}
                      onBlur={formik.handleBlur("pin")}
                    />
                    <label
                      htmlFor="pin"
                      className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Pincode
                    </label>
                  </div>
                  <div className="text-red text-left text-sm ms-2">
                    {formik.touched.pin && formik.errors.pin}
                  </div>
                </div>
              </div>

              <div className="lg:flex lg:justify-between lg:items-center mb-4 gap-3">
                <div className="relative lg:w-1/2">
                  <div>
                    <input
                      className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                      type="text"
                      id="state"
                      placeholder=" "
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                    />
                    <label
                      htmlFor="state"
                      className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      State
                    </label>
                  </div>
                  <div className="text-red text-left text-sm ms-2">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>

                <div className="relative lg:w-1/2">
                  <input
                    className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 peer"
                    type="text"
                    id="dist"
                    placeholder=" "
                    value={formik.values.dist}
                    onChange={formik.handleChange("dist")}
                    onBlur={formik.handleBlur("dist")}
                  />
                  <label
                    htmlFor="dist"
                    className="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    District
                  </label>

                  <div className="text-red text-left text-sm ms-2">
                    {formik.touched.dist && formik.errors.dist}
                  </div>
                </div>
              </div>

              {/* <div>
              <FormButtons text="Proceed for payment" />
            </div> */}
            </div>

            {/* Order Summary */}
            <div className="w-1/3 px-8 py-10 bg-background-color rounded-t-3xl">
              <h1 className="heading m-0">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Total Items - {cartState?.length}
                </span>
                <span className="font-semibold text-sm">
                  ₹ {totalCost && totalCost}
                </span>
              </div>

              <div className="flex justify-between items-center pt-6">
                <h3 className="font-semibold text-xs  text-main-color">
                  Discount on MRP
                </h3>
                <span>₹ 0</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xs  text-main-color">
                  Coupon Discount
                </h3>
                <span>₹ 0</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xs  text-main-color">
                  Shipping Charges
                </h3>
                <span>₹ 5</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xs  text-main-color">
                  Delivery Charge
                </h3>
                <span>₹ 0</span>
              </div>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between items-center py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span className="text-xl text-main-color">
                    ₹ {totalCost ? totalCost + 5 : "0"}
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-[#42ab92] font-semibold hover:bg-main-color py-3 text-sm text-white uppercase w-full"
                >
                  Pay ₹ {totalCost ? totalCost + 5 : "0"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
