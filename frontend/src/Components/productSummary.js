import React from "react";

export default function productSummary({ cartData }) {
    console.log("cartData", cartData)
  const totalPrice = cartData.reduce(
    (total, current) => total + (parseFloat(current.product.price) * parseInt(current.quantity)),
    0
  );
  return (
    <div className="shadow-lg border-2  border-gray-100 p-4 rounded-lg">
      <p className="text-xl text-center font-medium mb-2">Product Summary</p>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Items</p>
        <p>7</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Items Price</p>
        <p>7</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Shipping Price</p>
        <p>7</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-lg my-1 font-semibold">SubTotal</p>
        <p>{totalPrice}</p>
      </div>
      <div className="bg-violet-500 text-white text-center text-lg font-semibold p-2 mt-2 rounded-md">
        Proceed to Checkout
      </div>
    </div>
  );
}
