import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import Axios from "axios";
import { connect } from "react-redux";
import {
  CART_DATA_REQUEST,
  EMPTY_CART,
  LOGOUT,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_SEARCH,
} from "../Redux/Constants";

function Header({ cart, user, fetchUserCart, logout, searchHandler }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user.name) {
      fetchUserCart(user._id);
    }
  }, [user]);

  console.log("Cart", cart);
  return (
    <div className="flex flex-row absolute top-0 w-full bg-violet-500 items-center justify-between p-2 px-6 z-50">
      <div>
        <p className="text-xl text-white font-bold">Smart Sanitary Store</p>
      </div>
      <div className="flex items-center justify-between ">
        <Link
          className="text-white font-semibold text-medium mr-12 cursor-pointer"
          to=""
        >
          Products
        </Link>
        <Link
          className="text-white font-semibold text-medium mr-12 cursor-pointer"
          to="/stores"
        >
          Stores
        </Link>
        <Link
          className="text-white font-semibold text-medium mr-12 cursor-pointer"
          to="workers"
        >
          Workers
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center bg-white py-1 px-2 rounded-md mr-8">
          <IoSearch className="text-gray-500 mr-2" />
          <input
            className="border-0  outline-0 bg-transparent text-sm"
            type="text"
            placeholder="Search product"
            onChange={e => searchHandler(e.target.value)}
          />
        </div>
        <div className="relative">
          <Link to="cart">
            <BsCart className="text-white text-2xl cursor-pointer" />

            <p className="absolute flex justify-center items-center -top-2 -right-3 text-medium bg-white font-semibold text-pink-700 rounded-full w-[22px] h-[22px]">
              {cart?.length}
            </p>
          </Link>
        </div>
        {user.name ? (
          <div className="relative group transition ease-out-500 duration-500 h-full cursor-pointer">
            <img
              src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
              className="cursor-pointer h-10 ml-8 w-10 rounded-full p-1 border border-white"
            />
            <div className="absolute hidden hover:block rounded-md  group-hover:block  shadow-md bg-gray-50 -right-4 min-w-48 w-full overflow-hidden z-10">
              <div className="  hover:bg-gray-200 h-8 flex-1  px-2 ">
                <Link to={`profile/${user._id}`}>Profile</Link>
              </div>
              <p
                className="px-2 border-gray-400 border-t h-8 hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <Link
            to="login"
            className="text-white  text-medium border border-white rounded-md py-1 px-4 ml-8"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCart: async userId => {
      const { data } = await Axios.get(`/api/cart/${userId}`);
      dispatch({
        type: CART_DATA_REQUEST,
        payload: data.products ? data.products : [],
      });
    },
    logout: () => {
      dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: EMPTY_CART,
      });
    },
    searchHandler: async keyword => {
      console.log("Keyword", keyword);
      try {
        const { data } = await Axios.post("/api/products/searchProduct", {
          keyword,
        });
        dispatch({
          type: PRODUCT_SEARCH,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
