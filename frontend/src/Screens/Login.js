import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
} from "../Redux/Constants";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import ErrorBox from "../Components/ErrorBox";

function Login({ loginAction, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();
    loginAction({ email, password });
  };

  useEffect(() => {
    if (user.user.name) {
      navigate("/");
    }
  }, [user]);

  return user.loading ? (
    <Loading />
  ) : (
    <div
      className={`flex flex-1 flex-col items-center justify-center  h-[calc(100vh-120px)] `}
    >
      <form
        onSubmit={submitHandler}
        className="w-[80%] lg:w-[30%] md:w-[40%] sm:w-[50%]"
      >
        <p className="text-4xl font-semibold mb-6 text-center">Login</p>

        <div className="flex flex-col mb-6">
          <label className="text-sm font-bold mb-2">Email Address</label>
          <input
            className="border border-gray-400 p-1 rounded-lg px-3 flex-1 outline-violet-500"
            type="Email"
            placeholder="Enter your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-sm font-bold mb-2">Password</label>
          <input
            className="border border-gray-400 p-1 rounded-lg px-3 flex-1 outline-violet-500"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 w-full p-2 text-white rounded-md my-4"
        >
          Log In
        </button>
        {user.error ? <ErrorBox message={user.error} variant="fail" /> : null}
      </form>
      <p className="text-sm font-bold">
        New customer?{" "}
        <Link to="/registeration" className="text-violet-700">
          Create your account
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("State", state);
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: async userData => {
      console.log("user data action", userData);
      dispatch({
        type: LOGIN_REQUEST,
      });
      try {
        const { data } = await Axios.post("/api/users/login", userData);
        console.log("Data----", data);
        if (data.message) {
          dispatch({
            type: LOGIN_REQUEST_FAIL,
            payload: data.message,
          });
        } else if (data.user) {
          dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: data.user,
          });
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (err) {
        dispatch({
          type: LOGIN_REQUEST_FAIL,
          payload: err?.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
