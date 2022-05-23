import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Slider from "../Components/Slider";
import Loading from "../Components/Loading";
import RatingStars from "../Components/RatingStars";

export default function WorkerDetails() {
  const { workerId } = useParams();
  const [workerData, setWorkerData] = useState({});
  console.log("Worker Data", workerData);
  const fetchWorker = async () => {
    const { data } = await Axios.get(`/api/worker/getWorkers/${workerId}`);
    setWorkerData(data);
  };
  useEffect(() => {
    fetchWorker();
  }, []);
  return workerData.rating ? (
    <div className="p-8 lg:p-12">
      <div className="grid grid-cols-2 gap-8  items-center">
        <Slider images={workerData.images} />
        <div className="">
          <div className="flex items-center space-x-1 md:-mt-8">
            <img
              className="h-12 w-12 rounded-full"
              src={workerData.worker.profileImage}
            />
            <p className="text-3xl font-light">{workerData.worker.name}</p>
          </div>
          <p className="font-semibold my-4">{`Rs: ${workerData.price}/hour`}</p>
          <div className="flex items-center space-x-2">
            <RatingStars rating={workerData.rating} />
            <span className="text-sm text-gray-400">({workerData.rating})</span>
          </div>
          <p className="text-medium italic my-4">{workerData.description}</p>
          <p className="text-lg font-semibold mt-3">Categories: </p>
          <div className="flex space-x-4 my-1">
            {workerData.category.map(item => (
              <p className="shadow-md font-medium border border-gray-200 py-2 px-4 cursor-pointer rounded-lg">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p>Total Projects</p>
          <p>0</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p>Completed Projects</p>
          <p>0</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p>Cancel Projects</p>
          <p>0</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p>Joined</p>
          <p>0</p>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
