import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCookie } from "cookies-next";


const GET_PROFILE_URL = "https://ta7wela-api.in-general.net/v1/profile";
const UPDATE_PROFILE_URL = "https://ta7wela-api.in-general.net/v1/profile/update";


const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

interface User {
  id: number;
  username: string;
  name: string;
  mobile: string;
  email: string;
  [key: string]: any;
}



export default function settings() {

  const [user, setUser] = useState<User | null>(null);
  const token = getCookie("token");
 
  useEffect(() => {
   
    axios
      .get(GET_PROFILE_URL , {headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleSubmit = (values: User) => {
    axios
    .post(UPDATE_PROFILE_URL, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }




  return (
    <>
    
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
            <div className="bg-gray-800 text-white p-5 rounded-md my-2 mx-auto space-y-6">
            <h2 className="text-2xl font-bold mb-4"> Profile</h2>
            {/* Username */}
            <div>
               <Field type="hidden" name="id" />
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
              />
              <ErrorMessage name="username" component="p" className="text-sm text-red-700 mt-1" />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
              />
              <ErrorMessage name="name" component="p" className="text-sm text-red-700 mt-1" />
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium">
                Mobile Number
              </label>
              <Field
                type="text"
                id="mobile"
                name="mobile"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
              />
              <ErrorMessage name="mobile" component="p" className="text-sm text-red-700 mt-1" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
              />
              <ErrorMessage name="email" component="p" className="text-sm text-red-700 mt-1" />
            </div>
            </div>
            {/* Submit Button */}
           
            <div className="flex justify-end mt-6">
          <button
          type="submit"
          disabled={isSubmitting}
            className="px-6 py-3 bg-[#A5CBAD] text-sm text-black rounded-[100px]"
           
          >
          {isSubmitting ? "Updating" : "Edit Profile"}
          </button>
        </div>
          
          </Form>
        )}
      </Formik>
   


  
  
    <div className="bg-gray-800 text-white p-8 rounded-md my-4 mx-auto">
      <form className="space-y-6">
        {/* App Token */}
        <div>
          <label htmlFor="app-token" className="block text-sm font-medium">
            Your App Token
          </label>
          <input
            type="text"
            id="app-token"
            value="oat_OA.bHVTMnRkRkI1MmQ5bldvQklvRDIxY0Q4NGVIYnZjeHh3d0JIUjVNVDI2NDUwMjMx"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
            readOnly
          />
        </div>
  
        
      </form>
    </div>
    <div className="flex justify-end mt-6">
          <button
            className="px-6 py-3 bg-[#A5CBAD] text-sm text-black rounded-[100px]"
            type="button"
          >
            Change Token
          </button>
        </div>
  
    <div className="bg-gray-800 text-white p-8 rounded-md my-4 mx-auto">
      <form className="space-y-6">
        <h2 className="text-2xl font-bold mt-6 mb-4">Change Password</h2>
  
        {/* Current Password */}
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium">
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            placeholder="Current Password"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
            required
          />
          <p className="text-sm text-red-700 mt-1">
            Current Password is required
          </p>
        </div>
  
        {/* New Password */}
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            placeholder="New Password"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
            required
          />
          <p className="text-sm text-red-700 mt-1">New Password is required</p>
        </div>
  
        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm New Password"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
            required
          />
          <p className="text-sm text-red-700 mt-1">
            Confirm Password is required
          </p>
        </div>
  
      
      </form>
    </div>
    <div className="flex justify-end mt-6">
          <button
            className="px-6 py-3 bg-[#A5CBAD] text-sm text-black rounded-[100px]"
            type="button"
          >
            Change Password
          </button>
        </div>
  </>
  
  );
}