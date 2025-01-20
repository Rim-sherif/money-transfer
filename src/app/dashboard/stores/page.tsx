"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/pagination";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import getAuthHeaders from "../Shared/getAuth";

interface Store {
  id: number;
  name: string;
  webhook_url: string;
  mobile: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentOptions: string[];
}

export default function StoresTable() {
  const [stores, setStores] = useState<Store[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(stores.length / itemsPerPage);
  const displayedStores = stores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  const toggleDropdown = (id: number) => {
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${apiUrl}/applications`,  { headers: getAuthHeaders() });
        const data = response.data.result.data;

        const transformedStores: Store[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          mobile: item.mobile,
          email: item.email,
          webhook_url: item.webhook_url,
          status: item.status,
          createdAt: new Date(item.created_at).toLocaleDateString(),
          updatedAt: new Date(item.updated_at).toLocaleDateString(),
          paymentOptions: item.payment_options,
        }));

        setStores(transformedStores);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch stores");
        toast.error("Failed to fetch stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="grid">
      <div className="flex overflow-hidden flex-col justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full text-white">
        <Toaster position="top-right" reverseOrder={false} />

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Stores</h1>
          <button className="bg-[#A5CBAD] hover:bg-[#92b59a] text-black px-4 py-2 rounded-[16px] text-sm">
            <Link href="/dashboard/addstore">+ Add New Store</Link>
          </button>
        </div>

        <div className="overflow-x-auto ">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created At</th>
                <th className="p-2">Updated At</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStores.length > 0 ? (
                displayedStores.map((store) => (
                  <tr key={store.id}>
                    <td className="p-2">{store.id}</td>
                    <td className="p-2">{store.name}</td>
                    <td className="p-2">{store.mobile}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-[2rem] ${
                          store.status === "active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {store.status}
                      </span>
                    </td>
                    <td className="p-2">{store.createdAt}</td>
                    <td className="p-2">{store.updatedAt}</td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          setSelectedStore(store);
                          toggleDropdown(store.id);
                        }}
                        className="text-white px-3"
                      >
                        ...
                      </button>
                      {dropdownOpen === store.id && (
                        <div className="absolute right-16 mt-2 w-28 bg-gray-800 border rounded-md border-gray-700 shadow-lg z-10">
                          <Link href={`/dashboard/storeupdate/${store.id}`}>
                            <button
                              className="block w-full px-4 py-2 text-left text-white"
                              onClick={() => setSelectedStore(store)}
                            >
                              Update
                            </button>
                          </Link>
                          <Link href={`/dashboard/storepayment/${store.id}`}>
                            <button className="block w-full px-4 py-2 text-left text-white">
                              Payment
                            </button>
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center" colSpan={7}>
                    No stores available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChangeClient={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
