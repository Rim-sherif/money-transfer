import { useState } from "react";

interface Store {
  id: number;
  storeName: string;
  url: string;
  currencyRate: string;
  mobileWallet: string;
  type: string;
  state: string;
  expiresAt: string;
  remainingDays: number;
}

export default function StoresTable() {
  const [stores] = useState<Store[]>([
    {
      id: 15,
      storeName: "Test store",
      url: "8be2-217-55-193-91.ngrok-free.app",
      currencyRate: "1 EGP",
      mobileWallet: "01003221396",
      type: "Amazing Panel",
      state: "Active",
      expiresAt: "07-01-2025",
      remainingDays: 21,
    },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Stores</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          + Add New Store
        </button>
      </div>

      <div className="overflow-x-auto min-h-screen">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2">ID</th>
              <th className="p-2">STORE</th>
              <th className="p-2">CURRENCY RATE</th>
              <th className="p-2">MOBILE WALLET</th>
              <th className="p-2">TYPE</th>
              <th className="p-2">STATE</th>
              <th className="p-2">EXPIRE AT</th>
              <th className="p-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-700">
                <td className="p-2">{store.id}</td>
                <td className="p-2">
                  <div className="font-semibold">{store.storeName}</div>
                  <div className="text-gray-400 text-sm">{store.url}</div>
                </td>
                <td className="p-2">{store.currencyRate}</td>
                <td className="p-2">{store.mobileWallet}</td>
                <td className="p-2">{store.type}</td>
                <td className="p-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                    {store.state}
                  </span>
                </td>
                <td className="p-2">
                  <div>{store.expiresAt}</div>
                  <div className="text-gray-400 text-sm">
                    Expires in ({store.remainingDays}) Days
                  </div>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => toggleDropdown(store.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
                  >
                    Actions
                  </button>
                  {dropdownOpen === store.id && (
                    <div className="absolute right-8 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                      <button
                        className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
                        onClick={() => alert(`Update store ${store.id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => alert(`Delete store ${store.id}`)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-gray-400">
        <span>Showing 1 to 1 of {stores.length} records</span>
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-gray-800 rounded-md">1</button>
        </div>
      </div>
    </div>
  );
}
