"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import getAuthHeaders from "../Shared/getAuth";

type Checkout = {
  id: number;
  ref_id: string;
  amount: number;
  status: string;
  paid_at: string | null;
};

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchCheckouts = async (): Promise<Checkout[]> => {
  const response = await axios.get(`${apiUrl}/checkouts`, {
    headers: getAuthHeaders(),
  });
  return response.data.result.data || [];
};

const Checkout: React.FC = () => {
  const {
    data: checkouts,
    error,
    isLoading,
  } = useQuery<Checkout[], Error>({
    queryKey: ["checkouts"],
    queryFn: fetchCheckouts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    toast.error("Error fetching checkouts!");
    return <div>Error loading checkouts.</div>;
  }

  if (!Array.isArray(checkouts)) {
    toast.error("Invalid data format!");
    return <div>Error: Unexpected data format received from API.</div>;
  }

  return (
    <div className="grid">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col overflow-hidden justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full text-white">
        <h1 className="text-2xl font-semibold mb-4">Checkouts</h1>
        <div className="overflow-x-auto min-h-screen">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Ref ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Paid At</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {checkouts.map((checkout) => (
                <tr key={checkout.id} className="hover:bg-gray-700">
                  <td className="p-2">{checkout.id}</td>
                  <td className="p-2">{checkout.ref_id}</td>
                  <td className="p-2">{checkout.amount}</td>
                  <td className="p-2">{checkout.status}</td>
                  <td className="p-2">{checkout.paid_at || "N/A"}</td>
                  <td className="p-2">
                    <Link href={`/dashboard/checkoutDetails/${checkout.id}`}>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-[2rem]">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
