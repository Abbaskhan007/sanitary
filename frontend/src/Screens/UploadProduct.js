import Axios from "axios";
import React, { useState, useRef } from "react";
import { IoCameraOutline, IoCloseOutline } from "react-icons/io5";
import Select from "react-select";
import ErrorBox from "../Components/ErrorBox";
import Loading from "../Components/Loading";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function UploadProduct({ seller }) {
  const data = [
    { value: "Urinals", label: "Urinals" },
    { value: "Basins", label: "Basins" },
    { value: "Showers", label: "Showers" },
  ];
  const imageRef = useRef(null);
  const { storeId } = useParams();
  const navigate = useNavigate();

  console.log("StoreId", storeId);

  const [name, setName] = useState(null);
  const [description, setDescrption] = useState(null);
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [images, setImages] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [categories, setCategories] = useState(null);
  const [cloudinaryImages, setCloudinaryImage] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("Images", images);

  const onImageChange = e => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImages(prevImages => [
      ...prevImages,
      { url: objectUrl, file: e.target.files[0] },
    ]);
  };

  const onDelete = img => {
    const updatedImages = images.filter(image => image !== img);
    setImages(updatedImages);
  };

  console.log("images", images);

  const onSave = async () => {
    console.log("-----------------");
    setLoading(true);
    if (
      images.length === 0 ||
      !description ||
      !categories ||
      !price ||
      !inStock ||
      !name ||
      !shippingPrice
    ) {
      setError("Please Enter All the Fields");
      alert("Please Enter all the fields");
    } else {
      const uploadedImages = await Promise.all(
        images.map(async image => {
          const imageData = new FormData();
          imageData.append("file", image.file);
          imageData.append("upload_preset", "sanitary");
          const response = await Axios.post(
            "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
            imageData
          );
          return { url: response.data.url, public_id: response.data.public_id };
        })
      );
      console.log("Uploaded Images", uploadedImages);
      const categoriesValue = categories.map(category => category.value);
      const data = {
        name,
        images: uploadedImages,
        description,
        price,
        inStock,
        shippingPrice,
        category: categoriesValue,
        seller,
        store: storeId,
      };
      try {
        const response = await Axios.post("/api/products/addProduct", data);
        console.log("Response*************************", response);
        if (response.status === 200) {
          toast.success("Product Uploaded Successfully!!!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate(-1);
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-[calc(100vh-150px)] ">
      <div className="sm:px-12 px-4 flex items-center justify-center">
        <div className="flex  justify-center flex-col sm:w-[500px] py-8">
          <h1 className="text-3xl font-medium mb-8 text-center">Add Product</h1>
          {error && <ErrorBox variant="fail" message={error} />}
          <ToastContainer />
          <label className="text-sm font-semibold mb-1">Name</label>
          <input
            placeholder="Enter Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          />

          <label className="text-sm font-semibold mb-1 ">Price</label>
          <input
            placeholder="Enter Product Price"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          />
          <label className="text-sm font-semibold mb-1 ">InStock</label>
          <input
            placeholder="Enter Product Price"
            value={inStock}
            onChange={e => setInStock(e.target.value)}
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          />
          <label className="text-sm font-semibold mb-1 ">Shipping Price</label>
          <input
            placeholder="Enter Shipping Price"
            value={shippingPrice}
            onChange={e => setShippingPrice(e.target.value)}
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          />
          <label className="text-sm font-semibold mb-1 ">Description</label>
          <input
            placeholder="Enter Product Description"
            value={description}
            onChange={e => setDescrption(e.target.value)}
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          />
          <label className="text-sm font-semibold mb-1 ">
            Product Category
          </label>
          <Select
            isMulti
            name="categories"
            options={data}
            className="basic-multi-select"
            classNamePrefix="select"
            className=" mt-1"
            placeholder="Please Select the categories"
            onChange={setCategories}
            value={categories}
          />
          <input
            onChange={onImageChange}
            ref={imageRef}
            type="file"
            className="hidden"
          />
          <div className="mt-8">
            <label className="text-lg font-medium ">Upload Image</label>
            <IoCameraOutline
              onClick={() => imageRef.current.click()}
              className="text-gray-400 text-8xl border-2 border-gray-200 p-4 rounded-md mx-auto cursor-pointer mt-2"
            />
          </div>
          <div className="my-4">
            <label className="text-lg font-medium mt-4 ">Product Images</label>
            {images.length <= 0 && (
              <h3 className="text-center text-3xl font-light text-gray-400 mt-8 mb-3">
                No Images Selected
              </h3>
            )}
            <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4 mt-6">
              {images?.map(image => (
                <div className="relative group hover:bg-black hover:rounded-md">
                  <img
                    className="rounded-md shadow-md h-full group-hover:opacity-50 "
                    src={image.url}
                  />
                  <IoCloseOutline
                    onClick={() => onDelete(image)}
                    size={24}
                    className="absolute top-1 right-1 cursor-pointer sm:hidden group-hover:block bg-white opacity-80 rounded-full p-1 border border-gray-400"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onSave}
            className="bg-violet-500 text-lg p-2 my-4 text-white rounded-md font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    seller: state.seller._id,
  };
};

export default connect(mapStateToProps, null)(UploadProduct);
