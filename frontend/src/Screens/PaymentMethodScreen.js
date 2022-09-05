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
      <div className="w-[500px] -mt-12 min-h-[calc(100vh-180px)] flex flex-col  mx-auto  justify-center">
        <p className="text-2xl font-semibold  mt-12 mb-8 text-center ">
          Payment Method
        </p>
        <div className="mb-2 ">
          <label className="font-semibold ">Bank Transfer</label>
          <img
            src="https://res.cloudinary.com/dlxyvl6sb/image/upload/v1660668034/Screen_Shot_2022-08-16_at_8.33.09_PM_qfcrpp.png"
            className={`w-[350px] h-[200px] cursor-pointer rounded-md shadow-md mb-8 mt-2 ${
              paymentMethod === "bank" &&
              "scale-110 ease-in-out-300 duration-300 mt-4" 
            } `}
            onClick={() => setPaymentMethod("bank")}
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold ">Blockchain</label>
          <img
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/how_to_start_a_career_in_blockchain_technology.jpg"
            className={`w-[350px] h-[200px] cursor-pointer rounded-md shadow-md my-2 ${
              paymentMethod === "blockchain" &&
              "scale-110 ease-in-out-300 duration-300 mt-4"
            }`}
            onClick={() => setPaymentMethod("blockchain")}
          />
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
