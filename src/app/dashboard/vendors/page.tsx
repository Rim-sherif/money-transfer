"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import getAuthHeaders from "../Shared/getAuth";

interface User {
  id: number;
  name: string;
  webhook_url: string;
  mobile: string;
  email: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;

}

export default function Vendors() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVendors, setTotalVendors] = useState(1);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [showAddModal, setShowAddModal] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  const handleSubmit = async (e: React.FormEvent, user: User, newStatus: string) => {
    e.preventDefault();

    if (!user) {
      toast.error("No user selected to update.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        `${apiUrl}/vendors/update-status/${user.id}`,
        { status: newStatus },
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Status updated successfully!");

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, status: newStatus } : u
        )
      );
    } catch (err: any) {
      const message =
        err.response?.data?.message || "An error occurred while updating the status.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };


  const fetchUsers = async (page: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/vendors?page=${page}`,
        { headers: getAuthHeaders() }
      );
      const data = response.data.result.data;

      const transformedUsers: User[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        mobile: item.mobile,
        email: item.email,
        image: item.image,
        status: item.status,
        createdAt: new Date(item.created_at).toLocaleDateString(),
        updatedAt: new Date(item.updated_at).toLocaleDateString(),
      }));

      setUsers(transformedUsers);
      setTotalPages(response.data.result.totalPages);
      setTotalVendors(response.data.result.total)
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "You aren't developer to do this action, upgrade your account from normal user to developer to be able to do this action then try again"
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddVendor = async () => {
    try {
      await axios.post(
        `${apiUrl}/vendors/add`,
        newVendor,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Vendor added successfully!");
      setShowAddModal(false);
      fetchUsers(currentPage);
    } catch (err: any) {
      const message =
        err.response?.data?.errorMessage || "An error occurred while adding the vendor.";
      toast.error(message);
    }
  };


  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const mobileNumber = value.startsWith("+20") ? value : "+20" + value.replace(/^0+/, "");
    setSelectedUser((prev) => {
      if (prev) {
        return { ...prev, mobile: mobileNumber };
      }
      return prev;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="text-white grid">
        <div className="flex overflow-hidden flex-col justify-center px-8 py-6 w-full bg-neutral-900 rounded-[18px] max-md:max-w-full text-white">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Vendors</h1>
            <div className=" space-x-2">
              <button className="bg-[#A5CBAD] hover:bg-[#88aa8f] text-black px-4 py-2 rounded-[16px] text-sm">
                Total Vendors : {totalVendors}
              </button>
              <button className="bg-[#A5CBAD] hover:bg-[#88aa8f] text-black px-4 py-2 rounded-[16px] text-sm" onClick={() => setShowAddModal(true)}>
                + Add New Vendor
              </button>
            </div>
          </div>
          <div className="overflow-x-auto min-h-screen">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2">ID</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Mobile</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700">
                    <td className="p-2">{user.id}</td>
                    <td className="p-2">
                      <Image
                        src={user.image || "/no-dp_16.webp"}
                        className="rounded-full"
                        alt={`${user.name}'s Avatar`}
                        width={40}
                        height={40}
                      />
                    </td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.mobile}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-[16px] text-black ${user.status === "active" ? "bg-green-500" : "bg-[#F58C7B]"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-2">{user.createdAt}</td>
                    <td className="p-2">
                      <button onClick={(e) => handleSubmit(e, user, user.status === "active" ? "inactive" : "active")} className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-[16px]">
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`mx-1 rounded-full w-11 h-11 flex justify-center items-center ${currentPage === 1 ? "bg-[#A5CBAD] cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 17.772L9 12.772L14 7.77197"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className="px-2 py-3">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={` mx-1 rounded-full w-11 h-11 flex justify-center items-center ${currentPage === totalPages ? "bg-[#A5CBAD] cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17.772L15 12.772L10 7.77197" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            </button>
          </div>
          {showAddModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-neutral-900 rounded-[18px] p-6 shadow-lg mx-6 max-w-[600px]">
                <h2 className="text-xl font-bold mb-4">Add New Vendor</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddVendor();
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    value={newVendor.name}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#444444] text-white rounded-[18px]"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newVendor.email}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#444444] text-white rounded-[18px]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Mobile"
                    value={newVendor.mobile}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, mobile: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#444444] text-white rounded-[18px]"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newVendor.password}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, password: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#444444] text-white rounded-[18px]"
                    required
                  />

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-[18px] mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#A5CBAD] hover:bg-[#88b190] text-black px-4 py-2 rounded-[18px]"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

