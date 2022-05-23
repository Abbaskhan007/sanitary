import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import CartItem from "../Components/CartItem";
import ProductSummary from "../Components/productSummary";

function CartScreen({ cart }) {
  return (
    <div className="mt-12 flex md:space-x-12 flex-col px-12 md:flex-row sm:flex-col">
      <div style={{ flex: 2 }}>
        {cart.map(item => (
          <CartItem item={item} />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <ProductSummary cartData={cart}/>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeQuantity: async body => {
      const { data } = await Axios.post("/api/cart/changeQuantity", body);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
