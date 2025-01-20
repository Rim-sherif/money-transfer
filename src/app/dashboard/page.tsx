"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LastTranaction from "@/components/lasttransaction";
import getAuthHeaders from "./Shared/getAuth";
import { getUserProfile, User } from '../../api/profile';


interface SummaryData {
  total_amount: number;
  total_pending_amount: number;
  total_transactions: number;
  total_applications: number;
  total_inactive_application: number;
  user: string | null;
  success: boolean;
  result: any;
}





export default function Main() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [user, setUser] = useState<User | null>(null);



  async function getSummery() {
    const response = await fetch(`${apiUrl}/user-summary`, {
      headers: getAuthHeaders(),
    });
    const data: SummaryData = await response.json();
    return data;
  }

  const { data, isLoading, isError, error } = useQuery({ queryKey: ["summary"], queryFn: getSummery });



  useEffect(() => {
    getUserProfile().then((profile) => {
      setUser(profile);
    });
  }, []);

  if (isError) {
    return <div className="text-red-500 text-center">Error: {error?.message}</div>;
  }

  return (
    <div className="min-h-screen  text-white  ">
      <div className="mb-6 ">
        <div className="flex flex-col flex-1 mb-2 shrink self-stretch leading-tight basis-0 max-md:max-w-full text-white">
          <div className="text-xl bg-gradient-to-r from-white via-black  text-transparent bg-clip-text">Welcome</div>
          <div className="mt-1.5 text-3xl font-medium max-md:max-w-full">
            {user?.name ? (
              <>
                {user.name.split(" ")[0]}{" "}
                <span className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 text-transparent bg-clip-text">
                  {user.name.split(" ")[1] || ""}
                </span>
              </>
            ) : (
              "User"
            )}
          </div>
          <div className="mt-1.5 text-lg text-stone-500 max-md:max-w-full">
            Here is your last statistic
          </div>
        </div>
        <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center mb-3 w-full pr-5">
          <div
            className="relative flex h-auto sm:h-42 md:h-46 lg:h-52 w-full sm:w-48 md:w-56 lg:w-60 flex-col gap-4 rounded-[2rem] transition-all"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets/TEMP/f514fe21a02e3e4367fd6b1f523c5e6e7d7d41d9f7c03b5fb1d6eaf31a7f865e?placeholderIfAbsent=true&apiKey=e5206c7ab90c497bbb63352a863ec8f5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center self-end ml-2">
              <div className="flex gap-5 justify-center items-center px-3 w-14 h-14 bg-neutral-900 min-h-[48px] rounded-[138px]">
                <svg width="24" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4285 9.99976C20.4285 15.5226 15.9513 19.9998 10.4285 19.9998C4.90562 19.9998 0.428467 15.5226 0.428467 9.99976C0.428467 4.47691 4.90562 -0.000244141 10.4285 -0.000244141C15.9513 -0.000244141 20.4285 4.47691 20.4285 9.99976ZM6.8033 9.99967C6.8033 9.6545 7.08313 9.37467 7.4283 9.37467H8.84877C8.97094 8.9146 9.03411 8.43741 9.03411 7.9544V7.38425C9.03411 6.27437 9.93385 5.37463 11.0437 5.37463C12.1536 5.37463 13.0533 6.27437 13.0533 7.38425V7.88199C13.0533 8.22717 12.7735 8.50699 12.4283 8.50699C12.0832 8.50699 11.8033 8.22717 11.8033 7.88199V7.38425C11.8033 6.96473 11.4633 6.62463 11.0437 6.62463C10.6242 6.62463 10.2841 6.96473 10.2841 7.38425V7.9544C10.2841 8.435 10.2331 8.91089 10.1338 9.37467H11.4283C11.7735 9.37467 12.0533 9.6545 12.0533 9.99967C12.0533 10.3449 11.7735 10.6247 11.4283 10.6247H9.73651C9.46685 11.2545 9.10132 11.8446 8.64823 12.3726C8.31048 12.7662 8.59012 13.3746 9.10875 13.3746H12.4283C12.7735 13.3746 13.0533 13.6545 13.0533 13.9996C13.0533 14.3448 12.7735 14.6246 12.4283 14.6246H9.10875C7.52183 14.6246 6.66617 12.7628 7.69964 11.5585C7.94864 11.2684 8.16521 10.9552 8.3473 10.6247H7.4283C7.08313 10.6247 6.8033 10.3449 6.8033 9.99967Z" fill="#A7A4A4" />
                </svg>

              </div>
            </div>
            <div className="relative flex flex-1 flex-col justify-betwen ">
              <div className="text-left ml-8  -mt-12 ">
                <p className="text-xl font-medium text-white py-4 ">Total <br />amount</p>
                <p className="text-2xl font-bold text-black">{data?.result.total_amount}<span className="text-sm ml-2">EGP</span></p>
              </div>

              <svg width="55" height="59" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-4 object-contain aspect-[0.89] w-[69px]">
                <path d="M22.558 11.645C22.558 11.645 28.4144 14.62 29.8027 19.6581C31.1911 24.696 27.7825 30.011 27.7825 30.011C27.7825 30.011 22.1229 27.1576 20.7343 22.1196C19.346 17.0817 22.558 11.645 22.558 11.645Z" fill="white" />
                <path d="M0.563824 19.2269C0.563824 19.2269 1.16013 12.6853 5.32664 9.53099C9.49294 6.37664 15.692 7.57612 15.692 7.57612C15.692 7.57612 15.1359 13.8899 10.9696 17.0444C6.80331 20.1988 0.563824 19.2269 0.563824 19.2269Z" fill="white" />
                <path d="M24.9057 4.50822C24.9057 6.65092 23.1687 8.38794 21.026 8.38794C18.8833 8.38794 17.1462 6.65092 17.1462 4.50822C17.1462 2.36552 18.8833 0.628491 21.026 0.628491C23.1687 0.628491 24.9057 2.36552 24.9057 4.50822Z" fill="white" />
                <path d="M17.1463 22.9703C17.1463 24.5219 15.8884 25.7798 14.3368 25.7798C12.7852 25.7798 11.5273 24.5219 11.5273 22.9703C11.5273 21.4187 12.7852 20.1609 14.3368 20.1609C15.8884 20.1609 17.1463 21.4187 17.1463 22.9703Z" fill="white" />
                <path d="M2.43005 39.1582H10.4571L10.4571 31.1312C6.01452 31.1767 2.43005 34.7517 2.43005 39.1582Z" fill="white" />
                <path d="M18.484 39.1582H10.457L10.457 31.1312C14.8995 31.1767 18.484 34.7517 18.484 39.1582Z" fill="white" />
              </svg>

            </div>
          </div>
          <div
            className="relative flex h-auto sm:h-42 md:h-46 lg:h-52 w-full sm:w-48 md:w-56 lg:w-60 flex-col gap-4 rounded-[2rem] transition-all"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets/TEMP/8a4aa9dee05fdd1d86b33fb483fdd3053eb5e397e4151bc7e7244d86ac76491c?placeholderIfAbsent=true&apiKey=e5206c7ab90c497bbb63352a863ec8f5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center self-end">
              <div className="flex gap-5 justify-center items-center px-3 w-14 h-14 bg-neutral-900 min-h-[48px] rounded-[138px]">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5142 13V18M21.5142 10.1503V17.9668C21.5142 20.1943 19.7233 22 17.5142 22H7.51416C5.30502 22 3.51416 20.1943 3.51416 17.9668V10.1503C3.51416 8.93937 4.05381 7.7925 4.98402 7.02652L9.98402 2.90935C11.4565 1.69689 13.5719 1.69688 15.0443 2.90935L20.0443 7.02652C20.9745 7.7925 21.5142 8.93937 21.5142 10.1503Z"
                    stroke="#A7A4A4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5142 10C13.5142 10.5523 13.0664 11 12.5142 11C11.9619 11 11.5142 10.5523 11.5142 10C11.5142 9.44772 11.9619 9 12.5142 9C13.0664 9 13.5142 9.44772 13.5142 10Z"
                    fill="#A7A4A4"
                  />
                </svg>
              </div>
            </div>
            <div className="relative flex flex-1 flex-col justify-betwen ">
              <div className="text-left ml-8  -mt-12 ">
                <p className="text-xl font-medium text-white py-4 ">Pending <br /> Amount</p>
                <p className="text-2xl font-bold text-black ">{data?.result.total_pending_amount}<span className="text-sm ml-2">EGP</span></p>
              </div>
              <svg width="55" height="59" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-4 object-contain aspect-[0.89] w-[69px]">
                <path d="M22.558 11.645C22.558 11.645 28.4144 14.62 29.8027 19.6581C31.1911 24.696 27.7825 30.011 27.7825 30.011C27.7825 30.011 22.1229 27.1576 20.7343 22.1196C19.346 17.0817 22.558 11.645 22.558 11.645Z" fill="white" />
                <path d="M0.563824 19.2269C0.563824 19.2269 1.16013 12.6853 5.32664 9.53099C9.49294 6.37664 15.692 7.57612 15.692 7.57612C15.692 7.57612 15.1359 13.8899 10.9696 17.0444C6.80331 20.1988 0.563824 19.2269 0.563824 19.2269Z" fill="white" />
                <path d="M24.9057 4.50822C24.9057 6.65092 23.1687 8.38794 21.026 8.38794C18.8833 8.38794 17.1462 6.65092 17.1462 4.50822C17.1462 2.36552 18.8833 0.628491 21.026 0.628491C23.1687 0.628491 24.9057 2.36552 24.9057 4.50822Z" fill="white" />
                <path d="M17.1463 22.9703C17.1463 24.5219 15.8884 25.7798 14.3368 25.7798C12.7852 25.7798 11.5273 24.5219 11.5273 22.9703C11.5273 21.4187 12.7852 20.1609 14.3368 20.1609C15.8884 20.1609 17.1463 21.4187 17.1463 22.9703Z" fill="white" />
                <path d="M2.43005 39.1582H10.4571L10.4571 31.1312C6.01452 31.1767 2.43005 34.7517 2.43005 39.1582Z" fill="white" />
                <path d="M18.484 39.1582H10.457L10.457 31.1312C14.8995 31.1767 18.484 34.7517 18.484 39.1582Z" fill="white" />
              </svg>
            </div>
          </div>
          <div
            className="relative flex h-auto sm:h-42 md:h-46 lg:h-52 w-full sm:w-48 md:w-56 lg:w-60 flex-col gap-4 rounded-[2rem] transition-all"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets/TEMP/4272922d3a69dc7da1904ed0ac194b6fcef8067217428ae735d0046e69d38f15?placeholderIfAbsent=true&apiKey=e5206c7ab90c497bbb63352a863ec8f5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center self-end">
              <div className="flex gap-5 justify-center items-center px-3 w-14 h-14 bg-neutral-900 min-h-[48px] rounded-[138px]">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.14524 2C3.10642 2 2.26429 2.84213 2.26429 3.88095V8.11905C2.26429 9.15787 3.10642 10 4.14524 10H10.3833C11.4222 10 12.2643 9.15787 12.2643 8.11905V3.88095C12.2643 2.84213 11.4222 2 10.3833 2H4.14524ZM14.1452 14C13.1063 14 12.2642 14.8422 12.2642 15.881V20.1191C12.2642 21.1579 13.1063 22 14.1452 22H20.3832C21.4221 22 22.2642 21.1579 22.2642 20.1191V15.881C22.2642 14.8422 21.4221 14 20.3832 14H14.1452ZM20.8678 6.75022L20.1481 7.46989C19.8552 7.76278 19.8552 8.23766 20.1481 8.53055C20.441 8.82344 20.9159 8.82344 21.2088 8.53055L22.5017 7.23766C23.1851 6.55424 23.1851 5.4462 22.5017 4.76278L21.2088 3.46989C20.9159 3.17699 20.441 3.17699 20.1481 3.46989C19.8552 3.76278 19.8552 4.23765 20.1481 4.53055L20.8678 5.25022H16.2642C15.85 5.25022 15.5142 5.586 15.5142 6.00022C15.5142 6.41443 15.85 6.75022 16.2642 6.75022H20.8678ZM4.38028 19.4697L3.66061 18.75H8.26416C8.67837 18.75 9.01416 18.4142 9.01416 18C9.01416 17.5858 8.67837 17.25 8.26416 17.25H3.66061L4.38028 16.5303C4.67317 16.2375 4.67317 15.7626 4.38028 15.4697C4.08738 15.1768 3.61251 15.1768 3.31962 15.4697L2.02672 16.7626C1.3433 17.446 1.34331 18.554 2.02672 19.2375L3.31962 20.5303C3.61251 20.8232 4.08738 20.8232 4.38028 20.5303C4.67317 20.2375 4.67317 19.7626 4.38028 19.4697Z" fill="#A7A4A4" />
                </svg>

              </div>
            </div>
            <div className="relative flex flex-1 flex-col justify-betwen ">
              <div className="text-left ml-8  -mt-12 ">
                <p className="text-xl font-medium text-white py-4 ">Total <br /> transactions</p>
                <p className="text-2xl font-bold text-black"> {data?.result.total_transactions} <span className="text-sm ml-2">Time</span></p>
              </div>
              <svg width="55" height="59" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-4 object-contain aspect-[0.89] w-[69px]">
                <path d="M22.558 11.645C22.558 11.645 28.4144 14.62 29.8027 19.6581C31.1911 24.696 27.7825 30.011 27.7825 30.011C27.7825 30.011 22.1229 27.1576 20.7343 22.1196C19.346 17.0817 22.558 11.645 22.558 11.645Z" fill="white" />
                <path d="M0.563824 19.2269C0.563824 19.2269 1.16013 12.6853 5.32664 9.53099C9.49294 6.37664 15.692 7.57612 15.692 7.57612C15.692 7.57612 15.1359 13.8899 10.9696 17.0444C6.80331 20.1988 0.563824 19.2269 0.563824 19.2269Z" fill="white" />
                <path d="M24.9057 4.50822C24.9057 6.65092 23.1687 8.38794 21.026 8.38794C18.8833 8.38794 17.1462 6.65092 17.1462 4.50822C17.1462 2.36552 18.8833 0.628491 21.026 0.628491C23.1687 0.628491 24.9057 2.36552 24.9057 4.50822Z" fill="white" />
                <path d="M17.1463 22.9703C17.1463 24.5219 15.8884 25.7798 14.3368 25.7798C12.7852 25.7798 11.5273 24.5219 11.5273 22.9703C11.5273 21.4187 12.7852 20.1609 14.3368 20.1609C15.8884 20.1609 17.1463 21.4187 17.1463 22.9703Z" fill="white" />
                <path d="M2.43005 39.1582H10.4571L10.4571 31.1312C6.01452 31.1767 2.43005 34.7517 2.43005 39.1582Z" fill="white" />
                <path d="M18.484 39.1582H10.457L10.457 31.1312C14.8995 31.1767 18.484 34.7517 18.484 39.1582Z" fill="white" />
              </svg>
            </div>
          </div>
          <div
            className="relative flex h-auto sm:h-42 md:h-46 lg:h-52 w-full sm:w-48 md:w-56 lg:w-60 flex-col gap-4 rounded-[2rem] transition-all"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets/TEMP/4272922d3a69dc7da1904ed0ac194b6fcef8067217428ae735d0046e69d38f15?placeholderIfAbsent=true&apiKey=e5206c7ab90c497bbb63352a863ec8f5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center self-end">
              <div className="flex gap-5 justify-center items-center px-3 w-14 h-14 bg-neutral-900 min-h-[48px] rounded-[138px]">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.51428 14L10.7892 15.2749C11.6817 16.1674 13.1674 16.0202 13.8675 14.9701L16.5143 11M21.5143 10.1503V17.9668C21.5143 20.1943 19.7234 22 17.5143 22H7.51428C5.30514 22 3.51428 20.1943 3.51428 17.9668V10.1503C3.51428 8.93937 4.05393 7.7925 4.98414 7.02652L9.98414 2.90935C11.4566 1.69689 13.572 1.69688 15.0444 2.90935L20.0444 7.02652C20.9746 7.7925 21.5143 8.93937 21.5143 10.1503Z" stroke="#A7A4A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>


              </div>
            </div>
            <div className="relative flex flex-1 flex-col justify-betwen ">
              <div className="text-left ml-8  -mt-12 ">
                <p className="text-xl font-medium text-white py-4 ">Active <br /> Stores</p>
                <p className="text-2xl font-bold text-black">{data?.result.total_applications} <span className="text-sm ml-2">Store</span></p>
              </div>
              <svg width="55" height="59" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-4 object-contain aspect-[0.89] w-[69px]">
                <path d="M22.558 11.645C22.558 11.645 28.4144 14.62 29.8027 19.6581C31.1911 24.696 27.7825 30.011 27.7825 30.011C27.7825 30.011 22.1229 27.1576 20.7343 22.1196C19.346 17.0817 22.558 11.645 22.558 11.645Z" fill="white" />
                <path d="M0.563824 19.2269C0.563824 19.2269 1.16013 12.6853 5.32664 9.53099C9.49294 6.37664 15.692 7.57612 15.692 7.57612C15.692 7.57612 15.1359 13.8899 10.9696 17.0444C6.80331 20.1988 0.563824 19.2269 0.563824 19.2269Z" fill="white" />
                <path d="M24.9057 4.50822C24.9057 6.65092 23.1687 8.38794 21.026 8.38794C18.8833 8.38794 17.1462 6.65092 17.1462 4.50822C17.1462 2.36552 18.8833 0.628491 21.026 0.628491C23.1687 0.628491 24.9057 2.36552 24.9057 4.50822Z" fill="white" />
                <path d="M17.1463 22.9703C17.1463 24.5219 15.8884 25.7798 14.3368 25.7798C12.7852 25.7798 11.5273 24.5219 11.5273 22.9703C11.5273 21.4187 12.7852 20.1609 14.3368 20.1609C15.8884 20.1609 17.1463 21.4187 17.1463 22.9703Z" fill="white" />
                <path d="M2.43005 39.1582H10.4571L10.4571 31.1312C6.01452 31.1767 2.43005 34.7517 2.43005 39.1582Z" fill="white" />
                <path d="M18.484 39.1582H10.457L10.457 31.1312C14.8995 31.1767 18.484 34.7517 18.484 39.1582Z" fill="white" />
              </svg>
            </div>
          </div>
          <div className="relative flex h-52 w-full sm:w-48 md:w-56 lg:w-60 flex-col gap-4 rounded-[2rem] transition-all">

            <Image
              width={100}
              height={100}
              loading="lazy"
              src="/Fram.png"
              alt=""
              className="object-cover w-[216px] lg:w-[267px] sm:w-[295px]  "
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white  bg-opacity-50">
              switch to <br />
              <span className="text-2xl font-semibold">DEV MODE</span>
              <br />
              to view cashback
            </div>
          </div>
        </div>


      </div>
      <LastTranaction />
    </div>
  )

}