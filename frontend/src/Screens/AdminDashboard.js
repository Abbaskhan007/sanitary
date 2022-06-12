import React, { useState } from "react";
import { BsChatSquareQuote, BsShop } from "react-icons/bs";
import {
  IoChatboxOutline,
  IoChevronDownSharp,
  IoChevronForwardSharp,
  IoConstructOutline,
} from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import Login from "./Login";
import SellerRequests from "./SellerRequests";
import WorkerRequests from "./WorkerRequests";

export default function AdminDashboard() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  console.log("Request Open", requestOpen);
  return (
    <div className="flex  z-10">
      <div className="border-r-2 border-gray-100 w-[250px]  pt-24 fixed top-0 bottom-0  min-h-[calc(100vh-120px)] overflow-y-scroll">
        <h1 className="text-xl font-medium text-center mb-4">Dashboard</h1>
        <div className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8 "></div>
        <div className="flex items-center justify-between my-3 px-8 text-gray-400 cursor-pointer">
          <div
            onClick={() => setRequestOpen(!requestOpen)}
            className="flex items-center space-x-3"
          >
            <BsChatSquareQuote size={18} />
            <p>Requests</p>
          </div>
          {requestOpen ? (
            <IoChevronDownSharp />
          ) : (
            <IoChevronForwardSharp size={18} />
          )}
        </div>
        {requestOpen && (
          <>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
                  : undefined
              }
              className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8 pl-10"
              to="workerRequests"
            >
              <IoConstructOutline size={18} />
              <p>Worker Requests</p>
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
                  : undefined
              }
              className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8 pl-10"
              to="sellerRequests"
            >
              <BsShop size={18} />
              <p>Seller Requests</p>
            </NavLink>
          </>
        )}
      </div>
      <div className="ml-[250px] p-6 w-full">
        <Routes>
          <Route path="/workerRequests" element={<WorkerRequests />} />
          <Route path="/sellerRequests" element={<SellerRequests />} />
        </Routes>
      </div>
    </div>
  );
}
