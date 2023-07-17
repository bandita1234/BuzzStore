import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMdGitCompare, IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";

const Header = () => {
  return (
    <>
    {/* First nav*/}
      <div className="flex justify-between p-2 bg-[#12263c]">
        <div>
          <p>Free Shipping Over Rs5000 and free Returns✨</p>
        </div>
        <div>
          <p>Helpline : +91 8114852522</p>
        </div>
      </div>
      <hr />

      {/* Second nav*/}
      <div className="flex justify-between items-center py-4 px-8 bg-[#142537]">
        <div>
          <Link> BUZZ STORE!</Link>
        </div>
        <div className="flex items-center max-w-md mx-auto px-3 border border-main-color rounded-xl w-96">
          <input
            className="flex-grow focus:outline-0 bg-[#142537] py-2"
            type="search"
            name=""
            id=""
            placeholder="Search Products..."
          />
          <div className="place-items-center ">
            <BsSearch />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <Link className="flex items-center gap-1">
              <IoMdGitCompare size={'25px'}/>
              <p>
                Compare <br /> Products
              </p>
            </Link>
          </div>
          <div> 
            <Link className="flex items-center gap-1">
              <IoMdHeartEmpty size={'30px'}/>
              <p>Favourite <br/> Wishlist</p>
            </Link>
          </div>
          <div>
            <Link className="flex items-center gap-1">
              <FaRegUser size={'25px'}/>
              <p>Login</p>
            </Link>
          </div>
          <div>
            <Link className="flex items-center gap-1">
              <AiOutlineShoppingCart size={'30px'}/>
              <p>Cart(2)</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Third nav*/}
      <div className="flex items-center gap-40 p-4 bg-[#13073570]">
      <div className="">
      <select className="py-2 w-60 bg-background-color">

      <option value="category">Shop Categories</option>
      <option value="fruit">Fruit</option>
      <option value="vegetable">Vegetable</option>
      <option value="meat">Meat</option>
    </select>
    </div>
      <div className="flex items-center gap-6">
      <Link to='/'>Home</Link>
      <Link>Our Store</Link>
      <Link>Blogs</Link>
      <Link to='/contact'>Contact</Link>
      </div>
      </div>
    </>
  );
};

export default Header;