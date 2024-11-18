import React, { FormEvent, useEffect, useState } from "react";
import Input from "../../Constants/Input";
import AuthButton from "../../Constants/AuthButton";
import axios from "axios";
import { useCreateProductMutation } from "../../Redux/features/sellerSlice";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

interface productProps {
  setIsComplete: any;
  setModal: any;
}

const NewProduct = (property: productProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [discount, setDiscount] = useState<number>();
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [expiringDate, setExpiringDate] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const token = useAuthHeader();

  const [createProduct, { isLoading: uploadLoading, isError }] =
    useCreateProductMutation();

  const handleImages = (value: FileList): void => {
    const newImages = Array.from(value);
    if (newImages.length + image.length > 5) {
      return;
    } else {
      setImage([...image, ...newImages]);
    }
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      handleImages(event.target.files);
    }
  };
  const handelRemove = (index: any) => {
    console.log(index);
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage(newImages);
  };

  const validateForm = (): boolean => {
    setLoading(true);
    if (!name || !description || !discount || !price) {
      setError(true);
      return false;
    }
    if (image.length === 0) {
      setError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const uploadPromises = image.map((img) => {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "e-commerce");
        return axios.post(
          "https://api.cloudinary.com/v1_1/dnefzcfv6/image/upload",
          formData
        );
      });

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.map((response) => response.data.secure_url);

      const vendor = JSON.parse(localStorage.getItem("vendorData") as string);
      const data = {
        name,
        quantity,
        description,
        price,
        discount,
        category,
        image: imageUrls,
        id: vendor.vendorId,
        ...(expiringDate && { expiringDate }),
      };

      const response = await createProduct({ data, token }).unwrap();
      if (response.message && response.message === "Product Created") {
        console.log(response);
        setLoading(false);
        property.setModal(false);
        property.setIsComplete(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="w-full h-full top-0 z-[400] backdrop-blur-sm bg-black/20 absolute flex items-center justify-center left-0">
      <div className="w-1/2 max-h-[95vh] flex flex-col gap-[10px] bg-white overflow-y-scroll p-4 rounded-[12px]">
        <div className="w-full flex flex-row font-outfit items-center justify-between">
          <h1 className="text-[18px] font-[600]">New Products</h1>
          <div
            className="text-[20px] font-[600] cursor-pointer"
            onClick={() => property.setModal(false)}
          >
            X
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[10px] items-center"
        >
          <div className="grid grid-cols-2 gap-[10px] w-full">
            <Input
              label="Name"
              type="text"
              value={name}
              placeholder="Enter Product Name"
              error={error}
              onChange={(value) => setName(value)}
            />
            <Input
              label="Description"
              type="text"
              value={description}
              placeholder="Type Description"
              error={error}
              onChange={(value) => setDescription(value)}
            />
            <Input
              label="Price"
              type="number"
              value={price}
              placeholder="Enter Product Price"
              error={error}
              onChange={(value) => setPrice(value)}
            />
            <Input
              label="Quantity"
              type="number"
              value={quantity}
              placeholder="Enter Product Price"
              error={error}
              onChange={(value) => setQuantity(value)}
            />
            <Input
              label="Discount"
              type="number"
              value={discount}
              placeholder="Enter Product Discount"
              error={error}
              onChange={(value) => setDiscount(value)}
            />
            <div className="flex flex-col gap-[6px] w-full">
              <span className="text-[16px] font-[400] text-[#666666] font-outfit">
                Category
              </span>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                className={`p-3 border ${
                  error ? "border-red-500/60" : "border-border/50"
                }  rounded-[12px] font-outfit outline-none placeholder:font-[400] w-full`}
                id=""
              >
                <option value="">Please Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Food">Food</option>
                <option value="Mechanism">Mechanism</option>
                <option value="Sport Kit">Sport Kit</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Shoes">Shoes</option>
                <option value="Paintings">Paintings</option>
              </select>
            </div>
            <Input
              label="Expiring Date"
              type="date"
              value={expiringDate}
              placeholder="Enter Product Name"
              error={error}
              onChange={(value) => setExpiringDate(value)}
            />
          </div>
          <div className="w-full flex gap-[10px]">
            <label
              htmlFor="images"
              className="w-1/2 cursor-pointer hover:scale-95 transition-all duration-300 flex items-center justify-center p-3 rounded-[4px] bg-secondary"
            >
              <span className="text-white font-[600] font-outfit">
                Select Images +
              </span>
            </label>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              id="images"
              multiple
            />
            <button
              type="submit"
              className="w-1/2 p-3 bg-primary flex items-center justify-center text-white font-[600] text-[20px] rounded-[6px]"
            >
              {loading || uploadLoading ? "Loading.." : "Create"}
            </button>
          </div>
        </form>
        <div className="grid grid-cols-4 gap-[10px]">
          {image.map((photo, index) => {
            return (
              <div className="w-full h-[20vh] relative">
                <div
                  onClick={() => handelRemove(index)}
                  className="text-red-600 absolute right-0 top-0 font-[800] cursor-pointer"
                >
                  X
                </div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt=""
                  className="w-full h-full object-contain rounded-[4px]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
