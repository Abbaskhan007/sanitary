import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { connect } from "react-redux";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { REMOVE_FROM_CART, UPDATE_CART } from "../Redux/Constants";
import Axios from "axios";
import ErrorBox from "./ErrorBox";

function CartItem({ item, updateCart, user, deleteProduct }) {
  const [qty, setQty] = useState(item.quantity);
  const [outOfStock, setOutOfStock] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateCart({
      productId: item._id,
      userId: user._id,
      quantity: qty,
    });
  }, [qty]);

  const qtyHandler = nums => {
    let num = parseInt(nums ? nums : 0);
    setOutOfStock(false);

    if (num + qty > item.product.inStock) {
      setOutOfStock(true);
    } else if (num < 1 && num + qty < 1) {
      return;
    } else {
      setQty(qty + num);
    }
  };

  const inputHandler = num => {
    setOutOfStock(false);

    if (num > item.product.inStock) {
      setOutOfStock(true);
    } else {
      setQty(parseInt(num));
    }
  };

  const deleteHandler = () => {
    console.log("Deleting");
    deleteProduct({
      userId: user._id,
      productId: item.product._id,
      quantity: item.quantity,
    });
  };

  return (
    <div className="flex mb-6 shadow-lg  rounded-lg  flex-row border border-gray-200 relative">
      <MdCancel
        onClick={deleteHandler}
        className="text-violet-500 text-lg absolute -top-[10px] -right-[10px] z-30 bg-white cursor-pointer"
        size={24}
      />

      <img
        className="w-52 h-52 rounded-tl-md rounded-bl-md "
        src={item.product.images[0]}
      />
      <div className="p-2 px-6">
        <p className="text-md font-bold my-1">{item.product.name}</p>
        <p className="text-md font-medium mb-1">Rs: {item.product.price}</p>
        <p className=" text-gray-500 italic my-1">{item.product.description}</p>
        <p>
          <span className="font-medium">Category: </span>
          <span className="text-gray-500">Basin's</span>
        </p>
        <p className="flex-1 my-3">
          <div className="flex items-center ">
            <p
              className="bg-gray-50 py-3 p-3 border border-gray-200"
              onClick={() => qtyHandler(-1)}
            >
              <AiOutlineMinus className="text-lg font-thin" />
            </p>
            <input
              placeholder="1"
              type="number"
              value={qty}
              className="w-16 py-[9px]  text-center outline-0  border-t border-b border-gray-200"
              onChange={e => inputHandler(e.target.value)}
              min={1}
            />

            <p
              className="bg-gray-50 py-3 p-3 border border-gray-200"
              onClick={() => qtyHandler(1)}
            >
              <IoAddOutline className="text-lg font-thin" />
            </p>
          </div>
        </p>
      </div>
    </div>
  );
  //   return (
  //     <div>
  //       <div className="flex  justify-between border-b border-gray-300 py-4">
  //         <div className="flex-1">
  //           <img src={item.product.images[0]} />
  //         </div>
  //         <div style={{ flex: 2 }} className="">
  //           <p className="text-md font-semibold my-1">{item.product.name}</p>
  //           <p className="text-gray-600 mb-1">{item.product.description}</p>
  //           <p className="text-gray-600 mb-1">Category: Basin</p>
  //           <p className="text-md font-semibold mb-1">Rs: {item.product.price}</p>
  //           <p className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center cursor-pointer">
  //             <MdDelete className="text-white text-lg" />
  //           </p>
  //           {outOfStock ? (
  //             <ErrorBox
  //               message="Product is out of stock!!! Please decrease the product quantity"
  //               variant="fail"
  //             />
  //           ) : null}
  //         </div>

  //         <p className="flex-1">
  //           <div className="flex items-center ">
  //             <p
  //               className="bg-gray-50 py-3 p-3 border border-gray-200"
  //               onClick={() => qtyHandler(-1)}
  //             >
  //               <AiOutlineMinus className="text-lg font-thin" />
  //             </p>
  //             <input
  //               placeholder="1"
  //               type="number"
  //               value={qty}
  //               className="w-16 py-[9px]  text-center outline-0  border-t border-b border-gray-200"
  //               onChange={e => inputHandler(e.target.value)}
  //               min={1}
  //             />

  //             <p
  //               className="bg-gray-50 py-3 p-3 border border-gray-200"
  //               onClick={() => qtyHandler(1)}
  //             >
  //               <IoAddOutline className="text-lg font-thin" />
  //             </p>
  //           </div>
  //         </p>
  //         <p className="self-stretch">"1020"</p>
  //       </div>
  //     </div>
  //   );
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCart: async productData => {
      console.log("Product Data", productData);
      const { data } = await Axios.post(
        "/api/cart/changeQuantity",
        productData
      );
      console.log("Data", data);
      dispatch({
        type: UPDATE_CART,
        payload: data.products,
      });
    },
    deleteProduct: async productData => {
      const { data } = await Axios.delete(
        `/api/cart/deleteProduct?productId=${productData.productId}&userId=${productData.userId}`
      );
      console.log("Data", data);
      dispatch({
        type: REMOVE_FROM_CART,
        payload: data.products,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
