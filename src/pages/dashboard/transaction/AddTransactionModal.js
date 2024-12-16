import React, { useState } from "react";

export default function AddTransactionModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    store: "",
    from: "",
    provider: "VF-Cash",
    amount: "",
    state: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...formData, id: Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Add Transaction</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="store"
            placeholder="Store"
            className="w-full p-2 bg-gray-700 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="from"
            placeholder="From"
            className="w-full p-2 bg-gray-700 rounded"
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="w-full p-2 bg-gray-700 rounded"
            onChange={handleChange}
          />
          <select
            name="state"
            className="w-full p-2 bg-gray-700 rounded"
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
