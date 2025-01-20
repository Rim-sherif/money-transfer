"use client"
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TransactionsTable from "./TransactionsTable";
import getAuthHeaders from "../Shared/getAuth";
import axios from "axios";

export interface Transactions {
  id: number;
  store: string;
  from: string;
  provider: string;
  amount: number;
  state: string;
  transaction: string;
  simNumber: string;
  userName: string;
  date: string;
}

const filterOptions = ["All", "Pending", "Completed"];
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchTransactions = async (): Promise<Transactions[]> => {

  const response = await axios.get(
    `${apiUrl}/transactions`,
   { headers: getAuthHeaders() }
  );

  if (response.data.success && response.data.result && response.data.result.data) {
    return response.data.result.data.map((item: any) => ({
      id: item.id,
      store: item.transaction_id || "-",
      from: item.mobile || "-",
      provider: item.payment_option || "-",
      amount: item.amount || 0,
      state: item.status || "-",
      transaction: item.transaction_id || "-",
      simNumber: "-",
      userName: item.sender_name || "-",
      date: new Date(item.transaction_date).toLocaleDateString(),
    }));
  }

  throw new Error("Error fetching transactions");
};

export default function Transaction() {
  const [filterState, setFilterState] = useState<string>("All");

  const { data: transactions = [], isLoading, error } = useQuery<Transactions[]>(
    {
      queryKey: ["transactions"], 
      queryFn: fetchTransactions,
      
    }
  );
  

  const filteredTransactions =
    filterState === "All"
      ? transactions
      : transactions.filter((t: Transactions) => t.state === filterState);

 

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid">
      <div className="flex-col justify-center px-6 py-4 w-full bg-[#1F1F1F] rounded-[18px] max-md:max-w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0 text-white">Transactions</h2>
          <div className="flex gap-2 items-center self-stretch p-3 whitespace-nowrap bg-neutral-700  rounded-[16px]" role="button" tabIndex={0}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.8188 2H5.18117C3.442 2 2.40466 3.91555 3.36937 5.34564L9.09107 12.8274C9.56799 13.5344 9.82249 14.3651 9.82249 15.2148V20.9219C9.82249 21.8805 10.9952 22.3605 11.6811 21.6827L13.8586 19.5307C14.0628 19.329 14.1775 19.0553 14.1775 18.7699V15.2148C14.1775 14.3651 14.432 13.5344 14.9089 12.8274L20.6306 5.34564C21.5953 3.91555 20.558 2 18.8188 2Z" stroke="#D9D9D9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      <div className="self-stretch my-auto text-white text-sm">Filter</div>
    </div>


        </div>

        <TransactionsTable transactions={filteredTransactions} />

        
      </div>
    </div>
  );
}
