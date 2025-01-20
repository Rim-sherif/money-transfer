"use client"
import React, { useState } from "react";
import Pagination from "@/components/pagination";
import { getCookie } from "cookies-next";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import getAuthHeaders from "../Shared/getAuth";

interface Transaction {
  id: number;
  store: string;
  from: string;
  provider: string;
  amount: string | number;
  state: string;
  transaction: string;
  simNumber: string;
  userName: string;
  date: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const token = getCookie("token");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const displayedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleMarkAsCompleted = async () => {
    if (selectedTransactionId && token) {
      try {
        await axios.post(
          `${apiUrl}/transactions/mark-as-completed/${selectedTransactionId}`,
          {},
          { headers: getAuthHeaders() }
        );
        toast.success("Transaction marked as completed!");
      } catch (error) {
        toast.error("Error marking transaction as completed.");
      } finally {
        setShowModal(false);
        setSelectedTransactionId(null);
      }
    }
  };

  return (
    <div className=" grid ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="overflow-x-auto min-h-screen">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="rounded-2xl">
            <tr className="text-white bg-[#161616] ">
              <th className="p-2">ID</th>
              <th className="p-2">From</th>
              <th className="p-2">Provider</th>
              <th className="p-2">Amount</th>
              <th className="p-2">State</th>
              <th className="p-2">UserName</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.length > 0 ? (
              displayedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-600 transition text-white"
                >
                  <td className="p-2">{transaction.id}</td>
                  <td className="p-2 text-[#F58C7B]">{transaction.from}</td>
                  <td className="p-2">{transaction.provider}</td>
                  <td className="p-2 font-bold text-[#A5CBAD]">{transaction.amount}</td>
                  <td className="p-2">
                    {transaction.state === "pending" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <circle cx="12" cy="12" r="10" stroke="#F58C7B" stroke-width="2" fill="none" />
                        <path d="M12 6v6h6" stroke="#F58C7B" stroke-width="2" fill="none" />
                      </svg>

                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="#4CAF50">
                        <path d="M9 16.2l-4.2-4.2 1.4-1.4 2.8 2.8 7.4-7.4 1.4 1.4z" fill="currentColor" />
                      </svg>
                    )}
                  </td>

                  <td className="p-2">{transaction.userName}</td>
                  <td className="p-2">{transaction.date}</td>
                  <td
                    className={`px-2 py-1.5 min-h-[30px] rounded-[16px] w-[52px] text-sm cursor-pointer text-center 
    ${transaction.state === "pending" ? "text-white bg-neutral-700 bg-opacity-50" : "text-gray-400 bg-gray-400 bg-opacity-30"}`}
                    onClick={() => {
                      setSelectedTransactionId(transaction.id);
                      setShowModal(true);
                    }}
                  >
                    {transaction.state === "pending" ? "Mark as Completed" : "Completed"}
                  </td>


                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center" colSpan={8}>
                  No transactions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChangeClient={handlePageChange}
      />




      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-neutral-800 p-4 rounded-[2rem] text-white">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="mt-2">Do you want to mark this transaction as completed?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-[2rem]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#A5CBAD] text-black rounded-[2rem]"
                onClick={handleMarkAsCompleted}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
