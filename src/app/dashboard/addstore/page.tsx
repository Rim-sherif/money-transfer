"use client"
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import getAuthHeaders from "../Shared/getAuth";

interface FormData {
  name: string;
  apiUrl: string;
  email: string;
  mobileWallet: string;

}

const StoreSettings: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    apiUrl: "",
    email: "",
    mobileWallet: "",
  });

  const [loading, setLoading] = useState<boolean>(false);


  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };







  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      name: formData.name,
      mobile: formData.mobileWallet,
      email: formData.email,
      webhook_url: formData.apiUrl,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/applications/create`,
        JSON.stringify(dataToSend),
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Store Created successfully!");
    
        setFormData({
          name: "",
          apiUrl: "",
          email: "",
          mobileWallet: "",
        });
      } else {
        toast.error(`Failed to create store: ${response.data.errorMessage}`);
      }
    } catch (error: any) {
      console.error("Error submitting the form", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error;
        const errorMessage =
          axiosError.response?.data?.errorMessage || "Unknown error occurred";
        toast.error(` ${errorMessage}`);
      } else {
        toast.error(
          `An unexpected: ${error.message || "Unknown error"}`
        );
      }
    } finally {
      setLoading(false);
    }
  };




  return (

    <div className=" text-white ">
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit}>
        <h2 className="block text-xl font-semibold mb-2">Add Store</h2>

        <div className="flex overflow-hidden flex-col justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full mb-4">
          <label className="block text-lg font-semibold mb-2">
            Store Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Store name"
            className="w-full bg-[#444444] text-white p-2 px-4 rounded-[16px] outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex overflow-hidden flex-col justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full">
          <label className="block text-lg font-semibold mb-2">
            API Options <span className="text-red-500">*</span>
          </label>




          <div className="mb-4">
            <label className="block mb-1">Webhook URL</label>
            <input
              name="apiUrl"
              value={formData.apiUrl}
              onChange={handleInputChange}
              className="w-full p-2 rounded-[16px] bg-[#444444] text-white px-4"
              placeholder="https://example.com"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded-[16px] bg-[#444444] text-white px-4"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Application Mobile Wallet</label>
            <input
              name="mobileWallet"
              value={formData.mobileWallet}
              onChange={handleInputChange}
              className="w-full p-2 rounded-[16px] bg-[#444444] text-white px-4"
              placeholder="+201000000000"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-[#A5CBAD] text-sm text-black rounded-[16px]"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save "}
          </button>
        </div>


      </form>
    </div>

  );

};

export default StoreSettings;
