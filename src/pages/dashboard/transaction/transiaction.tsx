import React, { useState } from "react";
import TransactionsTable from "./TransactionsTable";
import AddTransactionModal from "./AddTransactionModal";


interface Transaction {
    id: number;
    store: string;
    from: string;
    provider: string;
    amount: number;
    state: "Pending" | "Completed";
    transaction: string;
    simNumber: string;
    userName: string;
    date: string;
  }
  
  
  

export default function App() {
  const [transactions, setTransactions] = useState([
    { id: 319, store: "-", from: "01069664131", provider: "VF-Cash", amount: 74, state: "Pending", transaction: "-", simNumber: "-", userName: "-", date: "-" },
  { id: 312, store: "-", from: "01016772118", provider: "VF-Cash", amount: 10, state: "Pending", transaction: "-", simNumber: "-", userName: "-", date: "-" },
  { id: 297, store: "Manual", from: "01010586461", provider: "VF-Cash", amount: 10, state: "Completed", transaction: "-", simNumber: "-", userName: "-", date: "-" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterState, setFilterState] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

 
  const filteredTransactions =
    filterState === "All" ? transactions : transactions.filter((t) => t.state === filterState);

    const exportAsExcel = () => {
        alert("Exporting as Excel...");
       
      };
    
      const exportAsCSV = () => {
        alert("Exporting as CSV...");
      
      };
    
      const exportAsPDF = () => {
        alert("Exporting as PDF...");
     
      };
  
    const handleAddTransaction = (newTransaction: Transaction) => {
        setTransactions([...transactions, newTransaction]);
        setShowModal(false);
      };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-gray-200 shadow-lg rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex space-x-2 relative">
          {/* Filter Dropdown */}
          <select
            className="px-4 py-2 bg-gray-700 rounded"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-4 py-2 bg-gray-700 hover:bg-blue-600 rounded"
            >
              Export Report
            </button>
            {showDropdown && (
              <ul className="absolute right-0 mt-2 w-44 text-sm p-2 bg-gray-700 rounded shadow-lg">
                <li
                  onClick={exportAsExcel}
                  className="px-4 py-2 hover:bg-gray-600 hover:rounded-md hover:text-blue-500 cursor-pointer"
                >
                  Download as Excel
                </li>
                <li
                  onClick={exportAsCSV}
                  className="px-4 py-2 hover:bg-gray-600 hover:rounded-md hover:text-blue-500 cursor-pointer"
                >
                  Download as CSV
                </li>
                <li
                  onClick={exportAsPDF}
                  className="px-4 py-2 hover:bg-gray-600 hover:rounded-md hover:text-blue-500 cursor-pointer"
                >
                  Download as PDF
                </li>
              </ul>
            )}
          </div>

          {/* Add Transaction Button */}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded"
          >
            Add Transaction
          </button>
        </div>
      </div>

   
      <TransactionsTable transactions={filteredTransactions} />

   
      {showModal && (
        <AddTransactionModal onClose={() => setShowModal(false)} onSave={handleAddTransaction} />
      )}
    </div>
  );
}
