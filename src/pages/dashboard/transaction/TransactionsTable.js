import React from "react";

export default function TransactionsTable({ transactions }) {
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
          {transactions.map((t, index) => (
            <tr
              key={t.id}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
              } hover:bg-gray-600 transition`}
            >
              <td className="p-2">{t.id}</td>
              <td className="p-2">{t.store}</td>
              <td className="p-2">{t.from}</td>
              <td className="p-2">{t.provider}</td>
              <td className="p-2 font-bold">{t.amount}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    t.state === "Pending" ? "bg-yellow-500 text-black" : "bg-green-500 text-black"
                  }`}
                >
                  {t.state}
                </span>
              </td>
              <td className="p-2">{t.transaction}</td>
            <td className="p-2">{t.simNumber}</td>
            <td className="p-2">{t.userName}</td>
            <td className="p-2">{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
