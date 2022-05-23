import Axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  WORKER_FETCH_FAILURE,
  WORKER_FETCH_REQUEST,
  WORKER_FETCH_SUCCESS,
} from "../Redux/Constants";
import Loading from "../Components/Loading";
import ErrorBox from "../Components/ErrorBox";
import WorkerCard from "../Components/WorkerCard";

function WorkerScreen({ worker, fetchWorkers }) {
  useEffect(() => {
    fetchWorkers();
  }, []);
  console.log("Worker", worker);
  if (worker.error) {
    <ErrorBox variant="fail" message={worker.error} />;
  } else if (worker.loading) {
    <Loading />;
  } else {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-8 p-8">
        {worker?.data?.map(item => (
          <WorkerCard worker={item } />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    worker: state.worker,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkers: async () => {
      console.log("Running");
      dispatch({ type: WORKER_FETCH_REQUEST });
      try {
        const { data } = await Axios.get("/api/worker/getWorkers");
        console.log("Workers Data --", data);
        dispatch({ type: WORKER_FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: WORKER_FETCH_FAILURE, payload: err.message });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerScreen);
