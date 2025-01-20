"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import getAuthHeaders from "../Shared/getAuth";



type Invoice = {
  id: number;
  total_amount: number;
  total_fees: number;
  late_fees: number;
  developer_fees: number;
  paid_at: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await axios.get(`${apiUrl}/invoices`, { headers: getAuthHeaders() });
  return response.data.result.data || [];
};

// Invoices component
const Invoices: React.FC = () => {
  const {
    data: invoices,
    error,
    isLoading,
  } = useQuery<Invoice[], Error>({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    toast.error("Error fetching invoices!");
    return <div>Error loading invoices.</div>;
  }
  if (!Array.isArray(invoices)) {
    toast.error("Invalid data format!");
    return <div>Error: Unexpected data format received from API.</div>;
  }

  return (
    <div className=" grid">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col overflow-hidden justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full text-white">
        <h1 className="text-2xl font-semibold mb-4">Invoices</h1>
        <div className="overflow-x-auto min-h-screen">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Total Amount</th>
                <th className="p-2">Total Fees</th>
                <th className="p-2">Late Fees</th>
                <th className="p-2">Developer Fees</th>
                <th className="p-2">Paid At</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
            {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-700">
                  <td className="p-2">{invoice.id}</td>
                  <td className="p-2">{invoice.total_amount}</td>
                  <td className="p-2">{invoice.total_fees}</td>
                  <td className="p-2">{invoice.late_fees}</td>
                  <td className="p-2">{invoice.developer_fees}</td>
                  <td className="p-2">{invoice.paid_at}</td>
                  <td className="p-2">
                    <Link href={`/dashboard/invoicesDetails/${invoice.id}`}>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-[2rem]">
                        Preview
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

export default Invoices;

