import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

//icons
import {FaHome,FaPhoneAlt} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import {FiInfo} from 'react-icons/fi'

const Contact = () => {
  return (
    <div>
      <Meta title="Contact" />
      <BreadCrumb title="Contact" />

      <div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14969.117024380408!2d85.83809927306267!3d20.28870504764965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190a02602a6077%3A0xf05e2bdfacc51ae9!2sSaheed%20Nagar%2C%20Bhubaneswar%2C%20Odisha%20751007!5e0!3m2!1sen!2sin!4v1689882471537!5m2!1sen!2sin"
            className="w-full h-[450px] border-0"
            // width="600"
            // height="450"
            // style="border:0;"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="flex items-center justify-center gap-3 lg:gap-20 bg-box-background mt-3 rounded-3xl">
          <div className="w-1/2">
            <h2>Contact Us</h2>
            <div class="relative mb-3">
              <input
                type="text"
                id="floating_outlined1"
                className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm text-main-color bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
                placeholder=" "
              />
              <label
                for="floating_outlined1"
                class="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Name
              </label>
            </div>

            <div class="relative mb-3">
              <input
                type="text"
                id="floating_outlined2"
                className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm text-main-color bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_outlined2"
                class="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>

            <div class="relative mb-3">
              <input
                type="text"
                id="floating_outlined3"
                className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm text-main-color bg-customTransparent rounded-lg border-2 border-main-color appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
                placeholder=" "
              />
              <label
                for="floating_outlined3"
                class="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Phone
              </label>
            </div>

            <div class="relative mb-3">
              <input
                type="text"
                id="floating_outlined4"
                className="block px-2.5 lg:pb-2.5 pt-4 w-full text-sm text-main-color bg-customTransparent rounded-lg border-2 border-main-color appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                // className="px-2.5 pb-2.5 pt-4 w-full accent-main-color text-main-color border-gray-300 rounded focus:ring-main-color focus:ring-2"
                placeholder=" "
              />
              <label
                for="floating_outlined4"
                class="absolute text-sm text-text-color bg-box-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Comment
              </label>
            </div>  
          </div>

          <div className="flex flex-col gap-3 text-sm lg:text-lg">
            <h2>Get In Touch With Us</h2>
            <div className="flex items-center gap-2">
            <FaHome/>
              <p>Saheed Nagr, Bhubaneswar</p>
            </div>
            <div className="flex items-center gap-2">
            <FaPhoneAlt/>
              <p>(+91)8114852522</p>
            </div>
            <div className="flex items-center gap-2">
            <MdEmail/>
              <p>barsasmile23@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
            <FiInfo/>
              <p>Monday-Friday 10AM - 9PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
