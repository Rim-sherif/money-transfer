import React from "react";

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

  const data = transactions || [];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-400">
            <th className="p-2">ID</th>
            <th className="p-2">Store</th>
            <th className="p-2">From</th>
            <th className="p-2">Provider</th>
            <th className="p-2">Amount</th>
            <th className="p-2">State</th>
            <th className="p-2">Transaction</th>
            <th className="p-2">Sim Number</th>
            <th className="p-2">UserName</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  } hover:bg-gray-600 transition`}
              >
                <td className="p-2">{transaction.id}</td>
                <td className="p-2">{transaction.store}</td>
                <td className="p-2">{transaction.from}</td>
                <td className="p-2">{transaction.provider}</td>
                <td className="p-2 font-bold">{transaction.amount}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded ${transaction.state === "Pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-500 text-black"
                      }`}
                  >
                    {transaction.state}
                  </span>
                </td>
                <td className="p-2">{transaction.transaction}</td>
                <td className="p-2">{transaction.simNumber}</td>
                <td className="p-2">{transaction.userName}</td>
                <td className="p-2">{transaction.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td  className="p-4 text-center">
                No transactions available.
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
}

