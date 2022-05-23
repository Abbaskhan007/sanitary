import React from "react";
import RatingStars from "../Components/RatingStars";
import moment from "moment";

export default function StoreDescriptionScreen({ description }) {
  console.log("Description", description);
  return (
    <div>
      <p className="text-xl font-medium my-1">
        Category: {description.category}
      </p>
      <div className="grid grid-cols-4 gap-12 my-6">
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Rating</p>
          <div className="flex items-center space-x-2">
            <RatingStars rating={description.rating} />
            <span className="text-sm text-gray-400">
              ({description.rating})
            </span>
          </div>
        </div>

        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Orders Delivered</p>
          <p className="text-3xl font-light">{description.orderDelivered}</p>
        </div>

        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Orders Cancelled</p>
          <p className="text-3xl font-light">{description.orderCancelled}</p>
        </div>

        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Joined</p>
          <p className="text-2xl font-light">
            {moment(description.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <p>{description.description}</p>
      <div className="my-6">
        <p className="text-2xl text-light border-b-2 border-gray-300 pb-1 mb-3 w-44">
          About the seller
        </p>
        <div className="flex items-center space-x-2 ">
          <img
            className="w-16 h-16 p-1 border-2 border-gray-300 rounded-full"
            src={description.seller.user.profileImage}
          />
          <p className="text-lg font-medium">{description.seller.user.name}</p>
          <p className="text-sm text-gray-400">({description.seller.rating})</p>
        </div>
        <p className="my-2">{description.seller.description}</p>
      </div>
      <div>
        <p className="text-2xl ">Rating and Reviews</p>
        <div>
          {description.products.map(item =>
            item.reviews.map(review => <div>{review.message}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
