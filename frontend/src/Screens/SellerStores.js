import React, { useEffect, useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import StoreCard from "../Components/StoreCard";

function SellerStores({ seller, store }) {
  console.log("Seller", seller);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, [store]);

  const fetchStores = async () => {
    try {
      const response = await Axios.get(`/api/stores/getStores/${seller._id}`);
      console.log("Response", response);
      setStores(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="grid grid-cols-3 p-12 gap-8">
      {stores.map(store => (
        <StoreCard store={store} />
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    seller: state.seller,
    store: state.store.data
  };
};

export default connect(mapStateToProps, null)(SellerStores);
