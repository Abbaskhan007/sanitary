import React from "react";

export default function ({ item, index }) {
  console.log("Item", item);
  const { product, quantity } = item;
  return (
    <div
      className={`flex items-center justify-between  py-4 ${
        index && "border-t-2  border-gray-300"
      } `}
    >
      <img src={product.images[0].url} className="w-24 h-24 rounded-md" />
      <p className="text-lg font-semibold">{product.name}</p>
      <p className="font-semibold">{`${product.price} x ${quantity} = ${
        product.price * quantity
      }`}</p>
    </div>
  );
}
