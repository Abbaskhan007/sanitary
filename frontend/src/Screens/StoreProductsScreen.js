import React from "react";
import ProductCard from "../Components/ProductCard";

export default function StoreProductsScreen({ products }) {
  return (
    <div className="grid  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8  bg-[#ffffff]">
      {products?.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
