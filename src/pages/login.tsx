"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import * as yup from "yup";

const API_URL = "https://ta7wela-api.in-general.net";

type FormData = {
  email: string;
  password: string;
  name: string;
  mobile: string;
};




const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });


  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ email: "", password: "", name: "", mobile: "" });
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    const body = new URLSearchParams();

    if (isRegister) {
      body.append("name", formData.name);
      body.append("mobile", formData.mobile);
    }
    body.append("email", formData.email);
    body.append("password", formData.password);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const data = await response.json();

      console.log(data)

      if (!response.ok) {
        throw new Error(data.errorMessage || "Something went wrong");
      }

      // sessionStorage.setItem("token", data.result.token);
      setCookie("token", data?.result?.token);

      alert(isRegister ? "Registration successful!" : "Login successful!");
      router.push("/dashboard");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full">
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap min-h-screen">
            <div
              className="relative flex items-center isolate rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none min-h-full bg-gray-900"
            >
              <div className="px-4 py-6 text-white text-center md:mx-6 md:p-12">
                <h2 className="mb-6 text-3xl font-semibold">Fast Efficient Safe</h2>
                <p className="text-sm">
                  Take your website to new heights by seamlessly integrating the vfcash Gateway.
                </p>
              </div>
            </div>
            <div className="px-4 md:px-0 lg:w-6/12">
              <div className="md:mx-6 md:p-12">
                <div className="text-center">
                  <Image
                    width={200}
                    height={200}
                    className="mx-auto w-40"
                    src="/mobile-money.png"
                    alt="logo"
                  />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                    {isRegister ? "Register" : "Login"}
                  </h4>
                </div>

                <form onSubmit={handleSubmit}>
                  {isRegister && (
                    <>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Name"
                          className="peer block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem]"
                        />
                      </div>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="Mobile"
                          className="peer block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem]"
                        />
                      </div>
                    </>
                  )}
                  <div className="relative mb-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="peer block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem]"
                    />
                  </div>
                  <div className="relative mb-4">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="peer block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem]"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                      type="submit"
                      style={{
                        background: "linear-gradient(to right, #1f2937, #1f2937, #374151, #4b5563)",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : isRegister ? "Register" : "Login"}
                    </button>
                  </div>
                </form>
                <div className="flex items-center justify-between pb-6">
                  <p className="mb-0 me-2">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                  </p>
                  <button
                    type="button"
                    className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase"
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
    </div>
  );
};

export default AuthForm;
