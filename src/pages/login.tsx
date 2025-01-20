"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const API_URL = "https://api.ta7wila.com";

console.log(process.env, process.env.NEXT_MAIN_API_VERSION);

type FormData = {
  email: string;
  password: string;
  name: string;
  mobile: string;
};

const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    name: isRegister ? Yup.string().required("Name is required") : Yup.string(),
    mobile: isRegister ? Yup.string().matches(/^[0-9]{10}$/, "Mobile number is not valid").required("Mobile number is required") : Yup.string(),
  });

  const register = async (values: FormData) => {
    try {
      const body = new URLSearchParams();
      body.append("name", values.name);
      body.append("mobile", values.mobile);
      body.append("email", values.email);
      body.append("password", values.password);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || "Something went wrong");
      }

      toast.success("Registration successful!");
      setIsRegister(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  const login = async (values: FormData) => {
    try {
      const body = new URLSearchParams();
      body.append("email", values.email);
      body.append("password", values.password);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || "Something went wrong");
      }

      setCookie("token", data?.result?.token);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex overflow-hidden max-h-screen flex-wrap px-14 bg-imgg min-h-screen max-md:px-5">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col self-start mt-14 max-md:mt-10">
        <Image width={200} height={200} loading="lazy" src="/Frame 1984078121.png" className="object-contain w-36 mx-auto" alt="Company Logo" />
      </div>

      <div className="w-full">
        <div className="g-0 lg:flex lg:flex-wrap justify-center">
          <div className="px-4 md:px-0 lg:w-6/12 bg-[#1F1F1F] rounded-[18px] text-white">
            <div className="md:mx-6 md:p-12">
              <div className="text-center">
                <h4 className="mb-12 pt-4 pb-1 text-xl font-semibold">{isRegister ? "Register" : "Login"}</h4>
              </div>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  mobile: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  if (isRegister) {
                    register(values);
                  } else {
                    login(values);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {isRegister && (
                      <>
                        <div className="relative mb-4">
                          <Field type="text" name="name" placeholder="Name" className="peer block min-h-[auto] w-full border-none rounded-lg bg-[#444444] px-3 py-[0.32rem]" />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mb-3" />
                        </div>
                        <div className="relative mb-4">
                          <Field type="text" name="mobile" placeholder="Mobile" className="peer block min-h-[auto] w-full border-none rounded-lg bg-[#444444] px-3 py-[0.32rem]" />
                          <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mb-3" />
                        </div>
                      </>
                    )}
                    <div className="relative mb-4">
                      <Field type="email" name="email" placeholder="Email" className="peer block min-h-[auto] w-full border-none rounded-lg bg-[#444444] px-3 py-[0.32rem]" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-3" />
                    </div>
                    <div className="relative mb-4">
                      <Field type="password" name="password" placeholder="Password" className="peer block min-h-[auto] w-full border-none rounded-lg bg-[#444444] px-3 py-[0.32rem]" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-3" />
                    </div>

                    <div className="mb-12 pb-1 pt-1 text-center">
                      <button
                        type="submit"
                        className="mb-3 inline-block w-full rounded-lg px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black"
                        style={{
                          background: "#A5CBAD",
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : isRegister ? "Register" : "Login"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="flex items-center justify-between pb-6">
                <p className="mb-0 me-2">{isRegister ? "Already have an account?" : "Don't have an account?"}</p>
                <button
                  type="button"
                  className="inline-block rounded-xl border-2 border-[#A5CBAD] px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-[#A5CBAD]"
                  onClick={toggleForm}
                >
                  {isRegister ? "Sign In" : "Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

