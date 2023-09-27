import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Marquee from "react-fast-marquee";

// import ProductCard from "../components/ProductCard"
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import SpecialProducts from "../components/SpecialProducts";

// Icons
import { FaShippingFast, FaAmazonPay } from "react-icons/fa";
import { AiOutlineGift } from "react-icons/ai";
import { BiSupport, BiSolidOffer } from "react-icons/bi";

//Assets
import girl_headphone from "../assets/girl_headphone.webp";
import shopping_img from "../assets/shopping1.avif";
import main_headphone from "../assets/main_headphone.avif";
import main_laptop from "../assets/main_laptop.jpg";
import main_ipad from "../assets/main_ipad.jpg";
import main_watch from "../assets/main_watch.avif";

import laptop_img from "../assets/laptop_img.avif";
import camera_img from "../assets/camera_img.avif";
import tv_img from "../assets/TV_img.avif";
import watch_img from "../assets/watch_img.avif";
import gaming_img from "../assets/gaming_img.avif";
import phone_img from "../assets/phone_img.avif";
import headphone_img from "../assets/headphone_img.avif";
import earpod_img from "../assets/earpod_img.avif";
import speaker_img from "../assets/speaker_img.avif";
import appliance_img from "../assets/home-appliance_img.avif";

import brand1 from "../assets/brand-01.png";
import brand2 from "../assets/brand-02.png";
import brand3 from "../assets/brand-03.png";
import brand4 from "../assets/brand-04.png";
import brand5 from "../assets/brand-05.png";
import brand6 from "../assets/brand-06.png";
import brand7 from "../assets/brand-07.png";
import brand8 from "../assets/brand-08.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/ProductSlice";

import { getAllBlogs } from "../features/blogs/BlogSlice";

const Home = () => {
  const productState = useSelector((state)=>state.product.product)
  // console.log(productState);
  const dispatch = useDispatch();

  
  const getproducts = ()=>{
    dispatch(getAllProducts());
  }
  
  
  const blogState = useSelector((state) => state.blog.blog);
  // console.log(blogState);
  
  const getblogs = () => {
    dispatch(getAllBlogs());
  };
  
  useEffect(()=>{
    getproducts();
    getblogs();
  },[])


  return (
    <>
      {/* Main Page */}

      <div className="flex flex-col gap-4 mt-3 p-2 lg:flex-row">
        <div className="w-full lg:w-1/2 relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            // spaceBetween={50}
            slidesPerView={1}
              autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide className="">
              <div className="w-full h-full">
                <div className="w-full h-full object-cover realtive blur-sm lg:blur-none">
                  <img className="h-full w-full " src={girl_headphone} alt="" />
                </div>
                <div className="absolute top-24 right-3">
                  <h2 className="text-3xl text-center font-serif text-[#1D5D9B]">
                    Unleash <br /> the Buzz of <br /> Online Shopping!!
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="">
                <div className="blur-sm lg:blur-none">
                  <img className="h-full w-full" src={shopping_img} alt="" />
                </div>
                <div className="absolute top-10 left-3">
                  <h2 className="text-3xl text-center font-serif text-[#0D1282]">
                    Discover the Buzz of Endless Shopping <br />
                    at <br /> BUZZ STORE!!
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="swiper-pagination absolute bottom-6 left-0 right-0 text-center"></div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <div className="w-full h-full object-cover">
              <img className="h-full w-full" src={main_laptop} alt="" />
            </div>
            <div className=" text-red font-bold  absolute top-4 left-2">
              <h2>BEST SALE😍</h2>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-full object-cover">
              <img className="h-full w-full" src={main_ipad} alt="" />
            </div>
            <div className=" text-red font-bold absolute top-2 left-2">
              <h2>25% OFF😍</h2>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-full object-cover">
              <img className="h-full w-full" src={main_watch} alt="" />
            </div>
            <div className=" text-red font-bold absolute top-4 left-2">
              <h2>NEW ARRIVAL✨</h2>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-full object-cover">
              <img className="h-full w-full" src={main_headphone} alt="" />
            </div>
            <div className=" text-red font-bold absolute top-4 left-2">
              <h2>FREE ENGRAVING!</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Home Footer */}
      <div className="flex flex-wrap mt-4 mb-6 items-center gap-3 lg:justify-between p-6 bg-[#142537]">
        <div className="flex items-center gap-3">
          <FaShippingFast size={"30px"} />
          <div>
            <h3 className="text-main-color text-lg font-semibold">
              Free Shipping
            </h3>
            <p>For all orders above ₹ 500</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AiOutlineGift size={"30px"} />
          <div>
            <h3 className="text-main-color text-lg font-semibold">
              Daily Suprise Offers
            </h3>
            <p>Save upto 50% off</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BiSupport size={"30px"} />
          <div>
            <h3 className="text-main-color text-lg font-semibold">
              Support 24/7
            </h3>
            <p>Shop with an expert</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BiSolidOffer size={"30px"} />
          <div>
            <h3 className="text-main-color text-lg font-semibold">
              Affordable Prices
            </h3>
            <p>Get a factory direct price</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaAmazonPay size={"30px"} />
          <div>
            <h3 className="text-main-color text-lg font-semibold">
              Secure Payments
            </h3>
            <p>100% Protected Payments</p>
          </div>
        </div>
      </div>

      {/* All Products */}
      <div className="mt-3 mb-3 px-3 bg-[#18312d72] shadow-[-6px_-6px_6px_1px_#75a29c72,_6px_6px_6px_1px_#75a29c72] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="flex items-center mt-2">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Computer and Laptops
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={laptop_img}
              alt="laptop"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Camera and Videos
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={camera_img}
              alt="camera"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Smart Television
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img src={tv_img} alt="tv" className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Smart Watches
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={watch_img}
              alt="watch"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Music & Gaming
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={gaming_img}
              alt="gaming"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Mobile and Tablets
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={phone_img}
              alt="phone"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">Headphones</h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={headphone_img}
              alt="headphone"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Accessories
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={earpod_img}
              alt="earpod"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Portable Speakers
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={speaker_img}
              alt="speaker"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-[#50c7c3]">
              Home Appliance
            </h3>
            <p className="text-[#908e8e]">8 items</p>
          </div>
          <div className="w-40 h-20 flex-1">
            <img
              src={appliance_img}
              alt="home-appliance"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div>
        <h2 className="text-2xl  text-main-color ml-3  text-center my-6">Our Featured Collections</h2>
        {/* change the heading */}
        <div className="flex flex-wrap justify-center">
        {productState && productState.map((item)=>{
            return(
              <ProductCard item={item}/>
            )
          })}
        </div>
      </div>

      {/* Special Products */}
      <div>
        <h2 className="text-2xl  text-main-color ml-3  text-center my-6">Our Special Products</h2>
        <div className="flex flex-wrap">
          <SpecialProducts />
          <SpecialProducts />
          <SpecialProducts />
          <SpecialProducts />
        </div>
      </div>

      {/* Popular Product */}
      <div>
        <h2 className="text-2xl  text-main-color ml-3  text-center my-6">Our Popular Products</h2>
        <div className="flex flex-wrap justify-center">
        {productState && productState.map((item)=>{
            return(
              <ProductCard item={item}/>
            )
          })}
        </div>
      </div>

      {/* Marquee-wrapper for brands */}
      <div className="bg-[#b6b2b2]">
        <Marquee className="">
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand1} alt="" />
          </div>
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand2} alt="" />
          </div>
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand3} alt="" />
          </div>
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand4} alt="" />
          </div>
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand5} alt="" />
          </div>
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand6} alt="" />
          </div>
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand7} alt="" />
          </div>
          <div className="w-40 h-40 mx-6">
            <img className="w-full h-full object-cover" src={brand8} alt="" />
          </div>
        </Marquee>
      </div>

      {/* Blog Section */}
      <div>
        <h2 className="text-4xl  text-main-color ml-3 text-center my-6">Our Latest Blogs</h2>
        <div className="flex flex-wrap justify-evenly mt-3 px-3">
        {
          blogState && blogState?.map((item,idx)=>{
            if(idx<4){
            return(
              <BlogCard key={idx} item={item}/>
            )
            }
          })
        }
          {/* <BlogCard />
          <BlogCard /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
