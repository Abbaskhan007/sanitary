import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";

export default function StripePayment({ amount = 100 }) {
  console.log("________________");
  const payNow = async token => {
    try {
      const { data } = await Axios.post("/api/pay", {
        amount,
        name: "khan",
        orderId: "007",
      });
      console.log("Data_____", data);
    } catch (error) {
      console.log("Error_____", error);
    }
  };
  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51HgrsmFQ8VNGXjFtwPUTdZUmb1P15SIGe46mCpYt7ftLHjdCdYfGc2LH9nb6SnLcw3bxHIRVbwjPJNoG4qG2YhaH00BHd7uHbg"
        label="Pay Now"
        name="Pay With Credit Card"
        amount={100}
        description="Your total Price is"
        token={payNow}
        currency="pkr"
      />
    </div>
  );
}
