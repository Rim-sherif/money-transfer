"use client"
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import getAuthHeaders from "../Shared/getAuth";

interface Vendor {
  id: number;
  name: string;
  image: string | null;
  mobile: string;
  email: string;
}

interface Log {
  id: number;
  webhook_url: string;
  data: string;
  statusCode: number;
  status: string;
  created_at: string;
  updated_at: string;
  vendor_id: number;
  transaction_id: number;
  vendor: Vendor | null;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchLogs = async (currentPage: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`https://ta7wela-api.in-general.net/v1/logs?page=${currentPage}`,{ headers: getAuthHeaders() });
      const data = await response.json();
      if (data.success) {
        setLogs(data.result.data || []);
      } else {
        console.error('Failed to fetch logs:', data.message);
        setLogs([]);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  const clearLogs = (): void => {
    setLogs([]);
  };

  return (
    <div className=" grid">
      <div className="flex overflow-hidden flex-col justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full text-white">
        <Toaster position="top-right" reverseOrder={false} />

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Logs</h1>
          <button
            className="bg-[#A5CBAD] hover:bg-[#92b59a] text-black px-4 py-2 rounded-[16px] text-sm"
            onClick={clearLogs}
          >
            Clear Logs
          </button>
        </div>

        <div className="overflow-x-auto min-h-80">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : logs.length > 0 ? (
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2">ID</th>
                  <th className="p-2">Vendor Name</th>
                  <th className="p-2">Mobile</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#444444]">
                    <td className="p-2">{log.id}</td>
                    <td className="p-2">{log.vendor?.name || 'N/A'}</td>
                    <td className="p-2">{log.vendor?.mobile || 'N/A'}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-[1rem] ${
                          log.status === 'active' ? 'bg-green-500' : 'bg-red-600 text-black'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-2">{new Date(log.created_at).toLocaleString()}</td>
                    <td className="p-2">{new Date(log.updated_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">No logs available.</div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-[2rem]"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="text-white">Page {page}</span>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-[2rem]"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
