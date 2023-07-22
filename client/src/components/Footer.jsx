import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { AiFillTwitterCircle} from "react-icons/ai";
import {BsInstagram,BsWhatsapp,BsGithub,BsLinkedin} from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="md:mt-10 mt-6 p-4 bg-[#13073570] border border-border-color rounded-xl">
        <div className="flex flex-col items-center mb-3 gap-2 md:flex-row md:gap-10">
          <div className="flex items-center gap-2 ">
            <HiOutlineRocketLaunch size={"40px"} />
            <p className="text-2xl font-mono text-main-color">
              Sign Up For news letter!
            </p>
          </div>
          <div className="bg-main-color">
            <input type="text" className="p-2" />
            <button className="font-bold">Subscribe</button>
          </div>
        </div>
        <hr />
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between mb-3 py-3 text-center ">
          <div className="space-y-6 mb-3">
            <h4 className="text-xl font-bold text-main-color">Contact Us</h4>
            <div className="mb-3">
              <h5 className="text-xl">Buzz Store</h5>
              <p>"Unleash the Buzz of Online Shopping"</p>
            </div>
            <p>Saheed Nagar, Bhubaneswar</p>
            <p>Ph - +8114852522</p>
            <p>Email - barsasmile23@gmail.com</p>
          </div>
         
          <div className="space-y-4 mb-3">
            <h4 className="text-xl font-bold text-main-color">Information</h4>
            <p>Privacy Policy</p>
            <p>Refund Policy</p>
            <p>Shipping Policy</p>
            <p>Terms Of Service</p>
            <p>Blogs</p>
          </div>
          <div className="space-y-4 mb-3">
            <h4 className="text-xl font-bold text-main-color">Account</h4>
            <p>Search</p>
            <p>About Us</p>
            <p>FAQ</p>
            <p>Contact</p>
            <p>Size Chart</p>
          </div>
          <div className="flex flex-col gap-4 mb-3">
            <h4 className="text-xl font-bold text-main-color">Quick Links</h4>
            <Link>Accesories</Link>
            <Link>Laptops</Link>
            <Link>Headphones</Link>
            <Link>Smart Watches</Link>
            <Link>Tablets</Link>
          </div>
          <div className="space-y-4 mb-3">
            <h4 className="text-xl font-bold text-main-color">Our App</h4>
            <p>
              Download the App and get extra 15% Discount on your first order!
            </p>
          </div>
        </div>
        <div className="space-x-6">
        <Link><BsGithub size={'30px'}/></Link>
        <Link><BsInstagram size={'30px'}/></Link>
        <Link><BsWhatsapp size={'30px'}/></Link>
        <Link><BsLinkedin size={'30px'}/></Link>
        <Link><AiFillTwitterCircle size={'30px'}/></Link>
      </div>
        <hr />
        <div className="py-3">
          <p>@2023. Buzz Store - All Rights Reserved</p>
        </div>
      </div>
    
    </>
  );
};

export default Footer;
