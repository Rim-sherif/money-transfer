"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import getAuthHeaders from "../../Shared/getAuth";




interface Params {
  id: string;
}

interface Invoice {
  id: number;
  status: string;
  total_amount: number;
  subscription_amount: number;
  subscription_period: number;
  subscription_type: string;
  amount_without_fees: number;
  amount_includes_fees: number;
  total_fees: number;
  late_fees: number;
  developer_fees: number;
  invoice_date: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    is_developer: boolean;
  };
}

export default function InvoiceDetails({ params }: { params: Params }) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/invoices/${params.id}`, { headers: getAuthHeaders() }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch invoice");
        }
        const data = await response.json();
        if (data.success) {
          setInvoice(data.result);
        } else {
          setError("Unable to retrieve invoice details");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!invoice) {
    return <div>No invoice found</div>;
  }

  return (
    <div className="container">
      <div className="flex text-left bg-green-200 p-4 gap-1 rounded-md mb-4 text-green-700 items-center">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path>
        </svg>
        <span>Info</span>
        <div>Invoice {invoice.status === "not-paid" ? "not paid" : "paid"}</div>
      </div>

      <div className="bg-[#1F1F1F] rounded-lg shadow-lg px-8 py-10 mx-auto">
        <div className="flex justify-between mb-8 flex-wrap">
          <div className="flex items-center mb-4">
            <img className="h-18 w-18" src="/Frame 1984078121.png" alt="Logo" />
          </div>
          <div className="text-white text-center sm:text-left">
            <div className="font-bold text-xl mb-2 text-green-200">INVOICE</div>
            <div className="text-sm">Date: {invoice.invoice_date}</div>
            <div className="text-sm">Invoice #: {invoice.id}</div>
          </div>
        </div>

        <div className="flex justify-between mb-8 border-b-2 border-green-200 pb-8 flex-wrap">
          <div className="mb-8 w-full sm:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-green-200">Bill To:</h2>
            <div className="text-white mb-2">
              <span className="font-bold">Name:</span> {invoice.user.name}
            </div>
            <div className="text-white mb-2">
              <span className="font-bold">Email:</span> {invoice.user.email}
            </div>
            <div className="text-white mb-2">
              <span className="font-bold">Mobile:</span> {invoice.user.mobile}
            </div>


          </div>

          <div className="space-y-2 w-full sm:w-1/4">
            <div className="shadow-md rounded-lg p-4 bg-gray-800 flex items-center space-x-4">
              <span className="text-white text-2xl">
                <i className="fas fa-tags"></i>
              </span>
              <div>
                <p className="text-white font-semibold">Subscription Type</p>
                <p className="text-gray-400">{invoice.subscription_type}</p>
              </div>
            </div>
            <div className="shadow-md rounded-lg p-4 bg-gray-800 flex items-center space-x-4">
              <span className="text-white text-2xl">
                <i className="fas fa-file-invoice"></i>
              </span>
              <div>
                <p className="text-white font-semibold">Subscription Period</p>
                <p className="text-gray-400">{invoice.subscription_period} Days</p>
              </div>
            </div>
          </div>
        </div>

  
        <div className="overflow-x-auto">
          <div className="block lg:hidden mb-4">
            <div className="flex justify-between">
              <span className="text-white">Amount w/o Fees:</span>
              <span className="text-white">{invoice.amount_without_fees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Late Fees:</span>
              <span className="text-white">{invoice.late_fees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Developer Fees:</span>
              <span className="text-white">{invoice.developer_fees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Total Fees:</span>
              <span className="text-white">{invoice.total_fees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Subscription Amount:</span>
              <span className="text-white">{invoice.subscription_amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Amount Including Fees:</span>
              <span className="text-white">{invoice.amount_includes_fees}</span>
            </div>
          </div>

          {/* For Larger Screens */}
          <div className="hidden lg:block">
            <table className="w-full text-center mb-8">
              <thead>
                <tr>
                  <th className="text-white font-bold uppercase p-2">Amount w/o Fees</th>
                  <th className="text-white font-bold uppercase p-2">Late Fees</th>
                  <th className="text-white font-bold uppercase p-2">Developer Fees</th>
                  <th className="text-white font-bold uppercase p-2">Total Fees</th>
                  <th className="text-white font-bold uppercase p-2">Subscription amount</th>
                  <th className="text-white font-bold uppercase p-2">Amount include Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 text-white">{invoice.amount_without_fees}</td>
                  <td className="py-4 text-white">{invoice.late_fees}</td>
                  <td className="py-4 text-white">{invoice.developer_fees}</td>
                  <td className="py-4 text-white">{invoice.total_fees}</td>
                  <td className="py-4 text-white">{invoice.subscription_amount}</td>
                  <td className="py-4 text-white">{invoice.amount_includes_fees}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mb-2">
          <div className="text-green-200 font-bold text-xl mr-2">Total:</div>
          <div className="text-white font-bold text-xl">{invoice.total_amount} EGY</div>
        </div>

        <div className="border-t-2 border-green-200 pt-8 mb-8">
          <div className="mb-8 px-3 text-center text-white mt-5">
            <span>Please pay the invoice before the due date.</span>
            <b className="underline font-bold ml-2">{invoice.invoice_date}</b> specifying the invoice #
          </div>

          <div className="mb-8 text-4xl text-center px-3 text-white">
            <span>Thank you!</span>
          </div>

          <div className="text-center text-sm px-3 text-white">
            ta7wila@ta7wila.com ∖ www.ta7wila.com
          </div>
        </div>
      </div>
    </div>



  );
}
