import React from "react";
import RatingStars from "./RatingStars";
import { useNavigate } from "react-router-dom";

export default function StoreCard({ store }) {
  const navigate = useNavigate();
  console.log("Store(((((((", store);
  return (
    <div
      onClick={() => navigate(`${store._id}`)}
      className="border-2 border-gray-200 shadow-lg rounded-lg cursor-pointer transition hover:scale-105 ease-in-out-300 duration: 300 overflow-hidden"
    >
      <img src={store.image} />
      <div className="p-2">
        <p className="text-lg font-semibold my-1">{store.name}</p>
        <p className="text-md font-medium">Category: {store.category}</p>
        <div className=" py-2">
          <RatingStars rating={store.rating} />
        </div>
      </div>
    </div>
  );
}
