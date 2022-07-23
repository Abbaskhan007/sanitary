import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { connect } from "react-redux";
import ErrorBox from "../Components/ErrorBox";
import Loading from "../Components/Loading";
import StoreCard from "../Components/StoreCard";
import Select from "react-select";
import {
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";

function StoreScreen({ fetchStoreData, store, filterStore }) {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");

  const data = [
    { value: "Urinals", label: "Urinals" },
    { value: "Basins", label: "Basins" },
    { value: "Showers", label: "Showers" },
  ];

  const onSearch = value => {
    setSearch(value);
    filterStore({ search: value, categories:category });
  };

  const onCategoryChange = e => {
    const categories = e.map(item => item.value);
    setCategory(categories);
    filterStore({ categories, search });
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  console.log("Category........", category);

  if (store.loading) return <Loading />;
  else if (store.error)
    return <ErrorBox variant="fail" message={store.error} />;
  else {
    return (
      <div className="p-12">
        <div className="flex items-center space-x-12 mb-12 ">
          <div className="flex flex-1 items-center bg-white  p-2 px-3 rounded-md  border-2 border-gray-300 ">
            <IoSearch className="text-gray-500 mr-2" size={22} />
            <input
              className="border-0  outline-0 bg-transparent text-medium flex-1"
              type="text"
              placeholder="Search product"
              onChange={e => onSearch(e.target.value)}
            />
          </div>
          <Select
            name="categories"
            options={data}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Please Select the categories"
            onChange={onCategoryChange}
            isMulti={true}
          />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2   gap-8">
          {store.data?.map(item => (
            <StoreCard store={item} />
          ))}
        </div>
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
    filterStore: async filterData => {
      console.log("********** Filtered Data", filterData);
      const { data } = await axios.post("api/stores/filterStore", filterData);
      console.log("Data of stores -----", data);
      dispatch({
        type: STORE_FETCH_SUCCESS,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen);
