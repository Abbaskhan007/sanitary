import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ErrorBox from "../Components/ErrorBox";
import Loading from "../Components/Loading";
import StoreCard from "../Components/StoreCard";
import {
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";

function StoreScreen({ fetchStoreData, store }) {
  useEffect(() => {
    fetchStoreData();
  }, []);
  if (store.loading) return <Loading />;
  else if (store.error)
    return <ErrorBox variant="fail" message={store.error} />;
  else {
    return (
      <div className="grid grid-cols-4 p-12 gap-8">
        {store.data?.map(item => (
          <StoreCard store={item} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state.store,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStoreData: async () => {
      dispatch({ type: STORE_FETCH_REQUEST });

      try {
        const { data } = await axios.get("api/stores/getStores");
        dispatch({
          type: STORE_FETCH_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({ type: STORE_FETCH_FAILURE, payload: err.message });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen);
