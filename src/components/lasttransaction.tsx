"use client"
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAuthHeaders from "../app/dashboard/Shared/getAuth";

export interface Transactions {
  id: number;
  transaction_id: string;
  mobile: string;
  payment_option: string;
  amount: number;
  status: string;
  success: boolean;
  result: any;
}


export default function LastTranaction() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  async function getTransaction() {
    const response = await fetch(`${apiUrl}/transactions?page=1`, {
          headers: getAuthHeaders(),
        });
    const data: Transactions = await response.json();
    return data.result.data;
  }
  const { data: transactions = [], isError, error } = useQuery({
    queryKey: ["transaction"],
    queryFn: getTransaction,
  });
  if (isError) {
    return <div className="text-red-500 text-center">Error: {error?.message}</div>;
  }
  const displayedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className=" grid ">
       <div className="flex overflow-hidden flex-col justify-center px-4 py-3 w-full bg-[#1F1F1F] rounded-[18px] max-md:max-w-full">
      <h2 className="text-2xl px-2 py-2 font-bold mb-2">Last Transactions</h2>
      <div className="overflow-x-auto min-h-72">
        <table className="w-full text-left ">
          <thead>
            <tr className="text-white bg-[#161616]">
              <th className="p-2">ID</th>
              <th className="p-2">Store</th>
              <th className="p-2">From</th>
              <th className="p-2">Provider</th>
              <th className="p-2">Amount</th>
              <th className="p-2">State</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.map((transaction: Transactions, index: number) => (

              <tr
                key={transaction.id}
                className={` hover:bg-stone-600 transition rounded-lg`}
              >
                <td className="p-2">{transaction.id}</td>
                <td className="p-2">{transaction.transaction_id || "-"} </td>
                <td className="p-2 text-[#F58C7B]">{transaction.mobile || "-"}</td>
                <td className="p-2">{transaction.payment_option || "-"}</td>
                <td className="p-2 font-bold">{transaction.amount || "-"}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1.5 min-h-[30px] rounded-[50px] w-[62px] text-sm ${transaction.status === "pending"
                      ? "text-red-400 bg-red-400 bg-opacity-50"
                      : "text-gray-400 bg-gray-400 bg-opacity-30"
                      }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
    </div>
   
  )
}