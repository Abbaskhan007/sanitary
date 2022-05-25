import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { SAVE_PAYMENT_METHOD } from "../Redux/Constants";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";

function PaymentMethodScreen({ user, savePaymentMethod }) {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name) {
      navigate("/login");
    }
  }, []);

  const onSubmitHandler = () => {
    savePaymentMethod(paymentMethod);
    navigate("/orderDetails");
  };

  return (
    <div>
      <CheckoutSteps className="px-12" step={3} />
      <div className="w-[500px] -mt-12 h-[calc(100vh-180px)] flex flex-col  mx-auto  justify-center">
        <p className="text-lg font-semibold mb-4">Payment Method</p>
        <div className="mb-2">
          <input
            name="payment"
            value="bank"
            type="radio"
            onChange={e => setPaymentMethod(e.target.value)}
            checked="checked"
          />
          <label className="font-semibold ml-2">Bank Transfer</label>
        </div>
        <div className="mb-2">
          <input
            name="payment"
            value="blockchain"
            onChange={e => setPaymentMethod(e.target.value)}
            type="radio"
          />
          <label className="font-semibold ml-2">Blockchain</label>
        </div>
        <div
          onClick={onSubmitHandler}
          className="bg-violet-500 cursor-pointer p-1 text-center text-lg my-4 text-white rounded-md font-semibold"
        >
          Continue
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
    savePaymentMethod: data => {
      dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodScreen);
