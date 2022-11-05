import React, { useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { FETCH_SELLER_DATA } from "../Redux/Constants";

function SellerHome({ user, fetchSellerData }) {
  useEffect(() => {
    fetchSellerData(user);
  }, []);
  return <div>SellerHome</div>;
}

const mapStateToProps = state => {
  return {
    user: state.user.user._id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSellerData: async user => {
      try {
        const response = await Axios.get(`/api/seller/getSeller/${user}`);
        console.log("Response", response);
        dispatch({ type: FETCH_SELLER_DATA, payload: response.data });
      } catch (err) {
        alert(err.message);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);
