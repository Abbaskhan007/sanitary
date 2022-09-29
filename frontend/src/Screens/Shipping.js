import React, { useState, useEffect } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { connect } from "react-redux";
import { SAVE_SHIPPING_DETAILS } from "../Redux/Constants";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBox from "../Components/ErrorBox";

function ShippingScreen({ user, saveShipping }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  console.log("Params", params);

  const onSubmitHandler = () => {
    if (name && address && city && country && postalCode) {
      saveShipping({ name, address, city, country, postalCode });
      navigate("/paymentMethod");
    } else {
      setError(true);
    }
  };
  console.log("User...", user);

  useEffect(() => {
    if (!user.name) {
      navigate("/login");
    }
  }, []);

  console.log(name, address, city, country, postalCode);

  return (
    <div className="sm:px-12 px-6 min-h-[calc(100vh-150px)] ">
      <CheckoutSteps step={2} />

      <div className="flex items-center justify-center">
        <div className="flex  justify-center flex-col w-[500px]">
          {error && <ErrorBox message="Fill all the values" variant="fail" />}
          <p className="text-lg font-medium my-4">Shipping Address</p>
          <label className="text-sm font-semibold mb-1">Full Name</label>
          <input
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            placeholder="Enter Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label className="text-sm font-semibold mb-1">Address</label>
          <input
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            placeholder="Enter Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <label className="text-sm font-semibold mb-1">City</label>
          <input
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            placeholder="Enter City Name"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <label className="text-sm font-semibold mb-1">Postal Code</label>
          <input
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
          <label className="text-sm font-semibold mb-1">Country</label>
          <input
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            placeholder="Enter Country Name"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <div
            onClick={onSubmitHandler}
            className="bg-violet-500 text-lg font-semibold text-center p-2 shadow-md text-white rounded-md my-2 cursor-pointer"
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveShipping: data => {
      dispatch({
        type: SAVE_SHIPPING_DETAILS,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingScreen);
