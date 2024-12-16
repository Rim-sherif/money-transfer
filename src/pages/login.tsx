import LocalizationLink from "./LocalizationLink";
import React, { useState } from "react";

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full">
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap min-h-screen">
            <div
              className="relative flex items-center isolate rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none min-h-full bg-gray-900"

            >
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#radial-gradient)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="radial-gradient">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" />
                  </radialGradient>
                </defs>
              </svg>
              <div className="px-4 py-6 text-white text-center md:mx-6 md:p-12">
                <h2 className="mb-6 text-3xl font-semibold">Fast, Efficient & Safe</h2>
                <p className="text-sm">
                  Take your website to new heights by seamlessly integrating the "vfcash" Gateway.
                  Enjoy a user-friendly and secure platform, making electronic wallet deposits effortless.
                  Explore the world of seamless transactions with confidence and ease, redefining your digital experience.
                </p>
              </div>
            </div>
            <div className="px-4 md:px-0 lg:w-6/12">
              <div className="md:mx-6 md:p-12">
                <div className="text-center">
                  <img
                    className="mx-auto w-40"
                    src="/mobile-money.png"
                    alt="logo"
                  />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                    {isRegister ? "Register" : "Login"}
                  </h4>
                </div>

                <form>


                  {/* Register button */}
                  {!isRegister && (
                    <div>
                      <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                          type="email"
                          className="peer block min-h-[auto] w-full  border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary  "
                          id="exampleFormControlInput1"
                          placeholder="Email"
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                        >
                          Email
                        </label>
                      </div>

                      <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill  "
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                        >
                          Password
                        </label>
                      </div>
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <LocalizationLink href="dashboard">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                          type="button"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          style={{
                            background: "linear-gradient(to right, #1f2937, #1f2937, #374151, #4b5563)",
                          }}
                        >
                          Login
                        </button>
                        </LocalizationLink>
                        

                      </div>
                      <div className="flex items-center justify-between pb-6">

                        <p className="mb-0 me-2">Don't have an account?</p>

                        <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                          onClick={toggleForm}
                        >
                          Register
                        </button>
                      </div>

                    </div>

                  )}


                  {isRegister && (
                    <div>
                      <div className="flex justify-between gap-2">
                        <div className="relative mb-4 w-full" data-twe-input-wrapper-init>
                          <input
                            type="text"
                            placeholder="First Name"
                            id="exampleFormControlInput5"
                            className="peer block min-h-[auto] w-full  border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary "
                          />
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                          >
                            First Name
                          </label>
                        </div>
                        <div className="relative mb-4 w-full" data-twe-input-wrapper-init>
                          <input
                            type="text"
                            id="exampleFormControlInput6"
                            placeholder="Last Name"
                            className="peer block min-h-[auto] w-full  border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary "
                          />
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                          >
                            Last Name
                          </label>
                        </div>
                      </div>
                      <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                          type="email"
                          className="peer block min-h-[auto] w-full  border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary  "
                          id="exampleFormControlInput1"
                          placeholder="Email"
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                        >
                          Email
                        </label>
                      </div>
                      <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                          type="number"
                          className="peer block min-h-[auto] w-full  border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary  "
                          id="exampleFormControlInput1"
                          placeholder="Mobile Number"
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                        >
                          Mobile Number
                        </label>
                      </div>

                      <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill  "
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full border rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill  "
                          id="exampleFormControlInput11"
                          placeholder="Confirm Password"
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 "
                        >
                          Confirm Password
                        </label>
                      </div>
                      <div className="mb-7 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                          type="button"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          style={{
                            background: "linear-gradient(to right, #1f2937, #1f2937, #374151, #4b5563)",
                          }}
                        >
                          Register
                        </button>

                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                          onClick={toggleForm}
                        >
                          Sign In
                        </button>
                      </div>

                    </div>

                  )}


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;

