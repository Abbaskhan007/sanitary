import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
  PRODUCT_SEARCH,
} from "../Redux/Constants";
import Loading from "../Components/Loading";
import ErrorBox from "../Components/ErrorBox";
import ProductCard from "../Components/ProductCard";
import PriceSlider from "../Components/PriceSlider";
import Filter from "../Components/Filter";
import { IoSearch } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";

function HomeScreen({ fetchProducts, productList, searchHandler }) {
  const [showFilter, setShowFilter] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSearch = value => {
    searchHandler(value);
    setKeyword(value);
  };

  return productList.Loading ? (
    <Loading />
  ) : productList.error ? (
    <ErrorBox />
  ) : (
    <div className="p-8 px-12">
      <div className="flex items-center space-x-12  ">
        <div className="flex flex-1 items-center bg-white  p-2 px-3 rounded-md  border-2 border-gray-300 ">
          <IoSearch className="text-gray-500 mr-2" size={22} />
          <input
            className="border-0  outline-0 bg-transparent text-medium flex-1"
            type="text"
            placeholder="Search product"
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex cursor-pointer space-x-2 items-center border-2 border-gray-400 p-[6px] px-3 rounded-md"
        >
          <p className="text-xl font-medium text-gray-600">Filter</p>
          <FiFilter size={24} />
        </div>
      </div>

      {/* {showFilter && (
        <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
      )} */}
      <Filter
        keyword={keyword}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      <div className="grid  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8  bg-[#ffffff]">
        {productList.products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    productList: state.productList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async () => {
      //const data = axios.get("/");
      dispatch({ type: PRODUCT_FETCH_REQUEST });
      try {
        const { data } = await Axios.get("/api/products/getProducts");
        console.log(data);
        dispatch({
          type: PRODUCT_FETCH_REQUEST_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
