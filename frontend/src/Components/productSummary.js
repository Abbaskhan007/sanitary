import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductSummary({ cartData }) {
  const navigate = useNavigate();
  const totalPrice = cartData.reduce((total, current) => {
    return (
      total + parseFloat(current.product.price) * parseInt(current.quantity)
    );
  }, 0);
  const items = cartData.reduce((total, current) => {
    return total + current.quantity;
  }, 0);
  console.log("Items", items);
  return (
    <div className="shadow-lg border-2  border-gray-100 p-4 rounded-lg">
      <p className="text-xl text-center font-medium mb-2">Product Summary</p>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Items</p>
        <p>{items}</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Items Price</p>
        <p>{totalPrice}</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Shipping Price</p>
        <p>7</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-lg my-1 font-semibold">SubTotal</p>
        <p>{7 + totalPrice}</p>
      </div>
      <div
        className="bg-violet-500 text-white text-center text-lg font-semibold p-2 mt-2 rounded-md cursor-pointer"
        onClick={() => navigate("/shipping")}
      >
        Proceed to Checkout
      </div>
    </div>
  );
}
