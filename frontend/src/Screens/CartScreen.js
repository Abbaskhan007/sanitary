import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import CartItem from "../Components/CartItem";
import ProductSummary from "../Components/productSummary";

function CartScreen({ cart }) {
  if (cart.length <= 0) {
    return (
      <div className="flex flex-1 items-center justify-center flex-col h-full  mt-32">
        
        <img
          className="w-[300px] m-0 "
          src="https://res.cloudinary.com/dlxyvl6sb/image/upload/v1657900283/vector-shopping-cart-icon-paper-sticker-with-shadow-colored-shopping-symbol-isolated_118339-1774-removebg_s1coie.png"
        />
        <p className="text-2xl -mt-12 text-gray-500 font-semibold">No items present in the cart</p>
      </div>
    );
  }
  return (
    <div className="mt-12 flex md:space-x-12 flex-col px-12 md:flex-row sm:flex-col">
      <div style={{ flex: 2 }}>
        {cart.map(item => (
          <CartItem item={item} />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <ProductSummary cartData={cart} />
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

//26
