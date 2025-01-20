"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Store, Params } from "../types";
import getAuthHeaders from "../../Shared/getAuth";
import UploadLogo from "../logoUpload";





export default function StoreUpdate({ params }: { params: Params }) {
  const [isUpdatingSubdomain, setIsUpdatingSubdomain] = useState(false);
  const [isCheckingWebhook, setIsCheckingWebhook] = useState(false);
  const [isUpdatingWebhook, setIsUpdatingWebhook] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [webhookId, setWebhookId] = useState<number | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [formData, setFormData] = useState<Store>({
    name: "",
    apiUrl: "",
    email: "",
    mobileWallet: "",
    subdomain: "",
  });






  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\+20[0-9]{10}$/.test(phone);



  const isValidSubdomain = (subdomain: string) => /^[a-zA-Z0-9]+$/.test(subdomain);

  const handleSubdomainUpdate = async () => {
    if (!isValidSubdomain(formData.subdomain)) {
      toast.error("Invalid subdomain format.");
      return;
    }

    setIsUpdatingSubdomain(true);
    try {
      const response = await axios.post(
        `${apiUrl}/applications/update-subdomain`,
        JSON.stringify({ id: params.id, subdomain: formData.subdomain }),
        { headers: getAuthHeaders() }
      );
      if (response.status === 200) {
        toast.success("Subdomain updated successfully!");
      } else {
        toast.error(`Failed to update subdomain: ${response.data.errorMessage}`);
      }
    } catch (error: any) {
      toast.error("An error occurred while updating the subdomain.");
    } finally {
      setIsUpdatingSubdomain(false);
    }
  };


  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const fetchStoreDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/applications/${params.id}`,
        { headers: getAuthHeaders() }
      );
      setFormData({
        name: response.data.result.name || "",
        apiUrl: response.data.result.webhook.value || "",
        email: response.data.result.email || "",
        mobileWallet: response.data.result.mobile || "",
        subdomain: response.data.result.subdomain || "",
      });

      setWebhookId(response.data.webhook?.id || null);
    } catch (error) {
      toast.error("Failed to fetch store details.");
    }
  }, [params.id]);

  useEffect(() => {
    fetchStoreDetails();
  }, [fetchStoreDetails]);


  const handleWebhookCheck = async () => {
    setIsCheckingWebhook(true);
    try {
      const response = await axios.post(
        `${apiUrl}/webhooks/check/${webhookId}`, {},
        { headers: getAuthHeaders() }
      );
      if (response.status === 200) {
        toast.success("Webhook is valid!");
      } else {
        toast.error(`Webhook check failed: ${response.data.errorMessage}`);
        console.log(response.data.errorMessage);
      }
    } catch (error: any) {
      const errorMessage =

        error.response?.data?.errorMessage ||
        "An unknown error occurred";
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setIsCheckingWebhook(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!isValidPhone(formData.mobileWallet)) {
      toast.error("Invalid phone number. Must start with +20 and contain 10 digits.");
      return;
    }

    setIsSavingSettings(true);

    const dataToSend = {
      id: params.id,
      name: formData.name,
      mobile: formData.mobileWallet,
      email: formData.email,

    };

    try {
      const response = await axios.post(
        `${apiUrl}/applications/update`,
        JSON.stringify(dataToSend),
        { headers: getAuthHeaders() }
      );

      if (response.status === 200) {
        toast.success("Settings updated successfully!");
        fetchStoreDetails();
      } else {
        toast.error(`Failed to update settings: ${response.data.errorMessage}`);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.result?.email ||
        error.response?.data?.errorMessage ||
        "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleWebhookUpdate = async () => {
    if (!formData.apiUrl) {
      toast.error("Please enter a valid Webhook URL.");
      return;
    }

    setIsUpdatingWebhook(true);
    try {
      const response = await axios.post(
        `${apiUrl}/webhooks/update`,
        JSON.stringify({ id: params.id, value: formData.apiUrl }),
        { headers: getAuthHeaders() }
      );

      if (response.status === 200) {
        toast.success("Webhook URL updated successfully!");
      } else {
        toast.error(`Failed to update webhook URL: ${response.data.errorMessage}`);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || "An unknown error occurred";
      console.error(error)
      toast.error(errorMessage);
    } finally {
      setIsUpdatingWebhook(false);
    }
  };


  return (
    <div className="text-white py-2 ">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-semibold mb-2">Update Store</h2>
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-4">
        <div className=" w-full lg:order-1 ">
          {/* Profile Section */}
          <div className="rounded-[18px] bg-neutral-900 p-4 mb-4">
            {/* Form Fields */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Store Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Store name"
                  className="w-full bg-[#444444] text-white p-3 px-4 rounded-[16px] outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>



              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className="w-full bg-[#444444] text-white p-3 px-4 rounded-[16px] outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Mobile Wallet *</label>
                <input
                  name="mobileWallet"
                  value={formData.mobileWallet}
                  onChange={handleInputChange}
                  placeholder="+201000000000"
                  className="w-full bg-[#444444] text-white p-3  px-4 rounded-[16px] outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#A5CBAD] text-sm text-black rounded-[16px]"
                  disabled={isSavingSettings}
                >
                  {isSavingSettings ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>

          </div>
          {/* Sub Domain Section */}
          <div className="rounded-[18px] bg-neutral-900 p-4 mb-4 ">

            <div className="mb-2">
              <label className="block text-sm font-semibold mb-2">Sub Domain *</label>
              <input
                name="subdomain"
                value={formData.subdomain}
                onChange={handleInputChange}
                placeholder="Add Sub Domain"
                className="w-full bg-[#444444] text-white p-3 px-4 rounded-[16px] outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="px-5 py-2 bg-[#A5CBAD] text-sm text-black rounded-[16px]"
                onClick={handleSubdomainUpdate}
                disabled={isUpdatingSubdomain}
              >
                {isUpdatingSubdomain ? "Updating..." : "Update Subdomain"}
              </button>

            </div>
          </div>
          {/* Web hook Section */}
          <div className="rounded-[18px] bg-neutral-900 p-4 ">

            <div className="mb-2">
              <label className="block text-sm font-semibold mb-2">Webhook check *</label>
              <input
                name="apiUrl"
                value={formData.apiUrl}
                placeholder="Check your webhook"
                className="w-full bg-[#444444] text-white p-3 px-4 rounded-[16px] outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                type="submit"
                onClick={handleWebhookUpdate}
                className="px-5 py-2 bg-[#A5CBAD] text-sm text-black rounded-[16px] "

                disabled={isUpdatingWebhook}
              >
                {isUpdatingWebhook ? "Updating..." : "Update"}
              </button>
              <button
                type="submit"
                onClick={handleWebhookCheck}
                className="px-5 py-2 bg-[#A5CBAD] text-sm text-black rounded-[16px] "
                disabled={isCheckingWebhook}
              >
                {isCheckingWebhook ? "Checking..." : "Check"}
              </button>
            </div>
          </div>
        </div>
        {/* Logo Upload Section */}
        <div className="lg:order-2">
          <UploadLogo params={params} />
        </div>
      </div>

    </div>
  );
}
