import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMdGitCompare, IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/user/UserSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartItems);
  // console.log("cartState",cartState);

  const authState = useSelector((state) => state?.auth?.user);
  // console.log("authState",authState);

  const token = localStorage.getItem("token");
  // console.log(token);

  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/login");
    location.reload();
    // setTimeout(() => {
    //   toast.warn("Logged Out!")
    // }, 300);
  }

  useEffect(() => {
    dispatch(getCart());
    // dispatch(getU)
  }, []);

  return (
    <>
      {/* First nav*/}
      <div className="flex bg-[#12263c] gap-3 md:justify-between md:p-2">
        <div>
          <p>Free Shipping Over ₹500 and free Returns✨</p>
        </div>
        <div>
          <p>Helpline : +91 8917620421</p>
        </div>
      </div>
      <hr />

      {/* Second nav*/}
      <div className="flex justify-between px-2 lg:justify-between items-center py-4 lg:px-8 bg-[#142537]">
        <div className="w-48 flex items-center justify-center relative left-16">
          <Link to="/"> <img src={logo} alt="logo_img" className="w-full h-full object-cover"/></Link>
        </div>
        <div className="lg:flex items-center max-w-md mx-auto px-3 border border-main-color rounded-xl w-96 hidden">
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
            <Link to="/compare" className="flex items-center gap-1">
              <IoMdGitCompare size={"25px"} />
              <p className="hidden md:inline-block">
                Compare <br /> Products
              </p>
            </Link>
          </div>
          <div>
            <Link to="/wishlist" className="flex items-center gap-1">
              <IoMdHeartEmpty size={"30px"} />
              <p className="hidden md:inline-block">
                Favourite <br /> Wishlist
              </p>
            </Link>
          </div>
          <div>
            <Link to={token == null ? "/login" : ""} className="flex items-center gap-1">
              <FaRegUser size={"25px"} />
              {authState || token ? <p className="hidden md:inline-block">Welcome <br /> {authState?.firstname && <span className="text-main-color font-semibold ml-2">{authState?.firstname}</span> } </p> : <p className="hidden md:inline-block">Login</p>}
              
            </Link>
          </div>
          <div>
            <Link to="/cart" className="flex items-center gap-1">
              <AiOutlineShoppingCart size={"30px"} />
              <p className="hidden md:inline-block">Cart</p>
              <span className="bg-main-color text-background-color font-bold px-2 rounded-lg relative bottom-4">{cartState?.length}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Third nav*/}
      <div className="flex items-center gap-4 justify-center md:justify-normal md:gap-40 md:p-4 bg-[#13073570]">
        <div className="flex gap-1">
            <TbCategory size={"25px"} />
            <select className="hidden lg:inline-block lg:w-60 bg-background-color">
              <option className="disabled hidden" value="">Shop Categories</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="meat">Meat</option>
            </select>
        </div>
        <div className="flex items-center flex-wrap gap-3 lg:gap-6 text-product-descripion lg:text-md uppercase">
          <Link to="/">Home</Link>
          <Link to="/product">Our Store</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/orders">Orders</Link>
          {token && <Link className="text-red" onClick={handleLogout}>Logout</Link> }
        </div>
      </div>
    </>
  );
};

export default Header;
