"use client"
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCookie } from "cookies-next";
import getAuthHeaders from "../Shared/getAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


interface User {
  id: number;
  username: string;
  name: string;
  mobile: string;
  email: string;
  [key: string]: any;
}


interface PasswordChangeValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const token = (getCookie("token") ?? "") as string;


  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });


  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(token);
    toast.success("Token copied to clipboard!");
  };


  useEffect(() => {
    axios
      .get(`${apiUrl}/profile`, { headers: getAuthHeaders() })
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);


  const handleSubmit = (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(true);
    axios
      .post(`${apiUrl}/profile/update`, values, { headers: getAuthHeaders() })
      .then((response) => {
        const updatedUser = response.data.result;
        setUser((prevUser) => {
          if (!prevUser) return updatedUser;
          return { ...prevUser, ...updatedUser };
        });
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };



  const handlePasswordChange = (
    values: PasswordChangeValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(true);
    axios
      .post(
        `${apiUrl}/profile/change-password`,
        {
          id: user?.id,
          password: values.currentPassword,
          newPassword: values.newPassword,
        },
        { headers: getAuthHeaders() }
      )
      .then(() => {
        toast.success("Password changed successfully");
        resetForm();
      })
      .catch((error) => {
        toast.error("Failed to change password", error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!user) {
    return <></>;
  }



  return (
    <div className="flex flex-1 flex-col gap-2  text-white">
      <Toaster position="top-right" reverseOrder={false} />

      <Formik
        initialValues={{
          id: user.id,
          username: user.username || "",
          name: user.name || "",
          mobile: user.mobile || "",
          email: user.email || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className=" ">
            <div className="flex overflow-x flex-col justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] mb-4 max-md:max-w-full">
              <h2 className="text-xl font-bold mb-4"> Profile</h2>
              {/* Username */}
              <div className="mb-2">
                <Field type="hidden" name="id" />
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
                />
                <ErrorMessage name="username" component="p" className="text-sm text-red-700 mt-1" />
              </div>
              {/* Name */}
              <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
                />
                <ErrorMessage name="name" component="p" className="text-sm text-red-700 mt-1" />
              </div>
              {/* Mobile */}
              <div className="mb-2">
                <label htmlFor="mobile" className="block text-sm font-medium">
                  Mobile Number
                </label>
                <Field
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
                />
                <ErrorMessage name="mobile" component="p" className="text-sm text-red-700 mt-1" />
              </div>
              {/* Email */}
              <div className="mb-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
                />
                <ErrorMessage name="email" component="p" className="text-sm text-red-700 mt-1" />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#A5CBAD] text-sm text-black rounded-[16px]"

                >
                  {isSubmitting ? "Updating..." : "Edit Profile"}
                </button>
              </div>
            </div>
          </Form>)}
      </Formik>
      <div className="flex overflow-x flex-col justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full mb-4">
        <form className="space-y-4">
          <h2 className="text-xl font-bold my-2">Your App Token</h2>
          {/* App Token */}
          <div>
            <label htmlFor="app-token" className="block text-sm font-medium mb-2">
              App Token
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="app-token"
                value={token}
                className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
                readOnly />
              <button onClick={copyToClipboard} className="mt-1  bg-[#444444] border border-gray-600 rounded-[16px] p-2 ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 6L17 14C17 16.2091 15.2091 18 13 18H7M17 6C17 3.79086 15.2091 2 13 2L10.6569 2C9.59599 2 8.57857 2.42143 7.82843 3.17157L4.17157 6.82843C3.42143 7.57857 3 8.59599 3 9.65685L3 14C3 16.2091 4.79086 18 7 18M17 6C19.2091 6 21 7.79086 21 10V18C21 20.2091 19.2091 22 17 22H11C8.79086 22 7 20.2091 7 18M9 2L9 4C9 6.20914 7.20914 8 5 8L3 8" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={passwordValidationSchema}
        onSubmit={handlePasswordChange}
      >
        {({ isSubmitting }) => (
          <Form className="flex overflow-x flex-col justify-center px-8 py-6 w-full space-y-4 bg-neutral-900 rounded-[18px] max-md:max-w-full">
            <h2 className="text-xl font-bold my-2">Change Password</h2>
            {/* Current Password */}
            <div className="mb-2">
              <label htmlFor="current-password" className="block text-sm font-medium">
                Current Password
              </label>
              <Field
                name="currentPassword"
                type="password"
                id="current-password"
                placeholder="Current Password"
                className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
              />
              <ErrorMessage
                name="currentPassword"
                component="p"
                className="text-red-700"
                aria-live="assertive"
              />
            </div>
            {/* New Password */}
            <div className="mb-2">
              <label htmlFor="new-password" className="block text-sm font-medium">
                New Password
              </label>
              <Field
                name="newPassword"
                type="password"
                id="new-password"
                placeholder="New Password"
                className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
              />
              <ErrorMessage
                name="newPassword"
                component="p"
                className="text-red-700"
                aria-live="assertive"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                id="confirm-password"
                placeholder="Confirm New Password"
                className="mt-1 px-4 block w-full bg-[#444444] border border-gray-600 rounded-[16px] p-2 outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-700"
                aria-live="assertive"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-[#A5CBAD] text-sm text-black rounded-[16px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Changing..." : "Change Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}