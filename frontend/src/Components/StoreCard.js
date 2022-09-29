import React from "react";
import RatingStars from "./RatingStars";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { connect } from "react-redux";
import Axios from "axios";
import {
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";
import axios from "axios";

function StoreCard({ store, seller, fetchStoreData }) {
  const navigate = useNavigate();

  const onDelete = async e => {
    e.stopPropagation();

    const response = await Axios.delete(`/api/stores/deleteStore/${store._id}`);
    console.log("Delete Response", response);
    if (response.status === 200) {
      fetchStoreData();
    } else {
    }
  };

  return (
    <div
      onClick={() => navigate(`${store._id}`)}
      className={`border-2 border-gray-200 shadow-lg rounded-lg cursor-pointer transition hover:scale-105 ease-in-out duration-300 delay-100 overflow-hidden flex flex-col ${
        store.seller?._id === seller && "group relative"
      }`}
    >
      {store.seller?._id === seller && (
        <div className="hidden group-hover:flex absolute inset-0 bg-black/60 items-center justify-center space-x-8 hover:cursor-default">
          <div
            onClick={e => {
              e.stopPropagation();
              navigate(`/sellerDashboard/editStore/${store._id}`);
            }}
            className="text-white z-40  flex-col items-center text-center cursor-pointer"
          >
            <MdModeEditOutline className="mx-auto mb-1 z-40" size={24} />
            <label>Edit</label>
          </div>
          <div onClick={e => onDelete(e)} className="text-white cursor-pointer">
            <MdDelete className="mx-auto mb-1" size={24} />
            <label>Delete</label>
          </div>
        </div>
      )}
      <img className="flex-1 object-cover max-h-[250px]" src={store.image} />
      <div className="p-2">
        <p className="text-lg font-medium mb-1">{store.name}</p>
        <p className="text-sm font-medium">
          Category: {store.category[0]}{" "}
          {store.category.length > 1 && (
            <span className="bg-gray-200 text-gray-500 py-2 px-3 rounded-md text-xs ml-2">
              {store.category.length - 1} more
            </span>
          )}
        </p>
        <div className=" py-2">
          <RatingStars rating={store.rating} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    seller: state.seller?._id,
    //store: state.store.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(StoreCard);
