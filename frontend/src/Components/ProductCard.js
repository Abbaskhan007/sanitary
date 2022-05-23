import React from "react";
import RatingStars from "./RatingStars";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="border-2 border-gray-200 shadow-lg rounded-lg cursor-pointer transition hover:scale-105 ease-in-out-300 duration: 300 overflow-hidden"
    >
      <img src={product.images[0]} />
      <div className="p-2 px-4">
        <p className="text-lg font-semibold my-1">{product.name}</p>
        <p className="text-md font-medium">Rs. {product.price}</p>
        <div className="flex items-center space-x-2">
          <RatingStars numRating={product.numRating} rating={product.rating} />
          <p className="text-gray-400 text-sm">({product.numRating})</p>
        </div>
      </div>
    </Link>
  );
}
