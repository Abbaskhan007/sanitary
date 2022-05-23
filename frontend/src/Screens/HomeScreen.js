import React, { useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
} from "../Redux/Constants";
import Loading from "../Components/Loading";
import ErrorBox from "../Components/ErrorBox";
import ProductCard from "../Components/ProductCard";

function HomeScreen({ fetchProducts, productList }) {
  useEffect(() => {
    fetchProducts();
  }, []);

  return productList.Loading ? (
    <Loading />
  ) : productList.error ? (
    <ErrorBox />
  ) : (
    <div className="grid  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8 p-8 px-12 bg-[#ffffff]">
      {productList.products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
