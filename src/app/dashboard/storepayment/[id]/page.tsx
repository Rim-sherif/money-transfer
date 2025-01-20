"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import getAuthHeaders from "../../Shared/getAuth";


interface Store {
    id: number;
    value: string;
    is_public: boolean;
    payment_option: string;
    created_at: string;
    updated_at: string;
    application_id: number;
    user_id: number;
}

interface Params {
    id: string;
}

export default function PaymentService({ params }: { params: Params }) {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenadd, setIsModalOpenadd] = useState(false);
    const [value, setValue] = useState<string>("");
    const [paymentOption, setPaymentOption] = useState<string>("");
    const paymentOptions = [
        { name: "VF- CASH", key: "vcash", img: "/vcash.svg" },
        { name: "Et- CASH", key: "ecash", img: "/ecash.svg" },
        { name: "WE- CASH", key: "wecash", img: "/wecash.svg" },
        { name: "OR- CASH", key: "ocash", img: "/ocash.svg" },
        { name: "INSTAPAY", key: "instapay", img: "/instapay.svg" },
    ];



    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const openModal = (store: Store) => {
        setSelectedStore(store);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStore(null);
        setIsModalOpen(false);
    };

    const openModal2 = () => {
        setIsModalOpenadd(true);
    };

    const closeModal2 = () => {
        setIsModalOpenadd(false);
    };

    const updateSelectedStoreField = (field: keyof Store, value: any) => {
        setSelectedStore((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    const handleAddPayment = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(
                `${apiUrl}/applications/add-payment`,
                {
                    id: params.id,
                    value: value,
                    payment_option: paymentOption,
                },
                {
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Payment added successfully!");
            setIsModalOpenadd(false);
            fetchStores();


        } catch (error: any) {
            console.error("Error submitting the form", error);

            if (axios.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response) {

                    const errorMessage =
                        axiosError.response.data.result.value || "Unknown error occurred";
                    toast.error(`${errorMessage}`);
                } else if (axiosError.request) {
                    toast.error("No response received from the server.");
                } else {
                    toast.error(`Error: ${axiosError.message}`);
                }
            } else {
                toast.error(`An unexpected error occurred: ${error.message || 'Unknown error'}`);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedStore) return;

        try {
            await axios.post(
                `${apiUrl}/applications/update-payment`,
                {
                    id: selectedStore.id,
                    value: selectedStore.value,
                    is_public: selectedStore.is_public,
                    payment_option: selectedStore.payment_option,
                },
                {
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Store updated successfully!");
            setIsModalOpen(false);

            setStores((prevStores) =>
                prevStores.map((store) =>
                    store.id === selectedStore.id ? { ...store, ...selectedStore } : store
                )
            );
        } catch (err) {
            toast.error("Failed to update store.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        const url = `${apiUrl}/applications/payments/${params.id}`;

        try {
            const response = await axios.get(url, { headers: getAuthHeaders() });
            setStores(response.data.result);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch stores");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="grid">
                <div className="flex flex-col overflow-hidden  bg-neutral-900 rounded-[18px] p-6 text-white">
                    <Toaster position="top-right" />
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Payment Services</h1>
                        <button className="bg-[#A5CBAD] hover:bg-[#88b190] text-black px-4 py-2 rounded-[16px] text-sm " onClick={() => openModal2()}>
                            + Add Payment Services
                        </button>
                    </div>
                    <div className="overflow-x-auto ">
                        <table className=" w-full text-left">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Value</th>
                                    <th className="p-2">Public</th>
                                    <th className="p-2">Payment Option</th>
                                    <th className="p-2">Created At</th>
                                    <th className="p-2">Updated At</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores && stores.length > 0 ? (
                                    stores.map((store) => (
                                        <tr key={store.id} className="hover:bg-[#444444]">
                                            <td className="p-2">{store.id}</td>
                                            <td className="p-2">{store.value}</td>
                                            <td className="p-2">{store.is_public ? "Yes" : "No"}</td>
                                            <td className="p-2">{store.payment_option}</td>
                                            <td className="p-2">{new Date(store.created_at).toLocaleString()}</td>
                                            <td className="p-2">{new Date(store.updated_at).toLocaleString()}</td>
                                            <td className="p-2">
                                                <button
                                                    onClick={() => openModal(store)}
                                                    className="bg-[#A5CBAD] hover:bg-[#88b190] px-3 py-1 rounded-[16px] text-black text-sm"
                                                >
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr >
                                        <td colSpan={7} className="text-center p-2">No payments found.</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                    {isModalOpen && selectedStore && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-neutral-900 rounded-[18px] p-6 shadow-lg mx-4">
                                <h2 className="text-xl font-bold mb-4">Update Store</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col leading-tight text-center text-white max-w-[596px]">
                                        <div className="text-xl font-semibold max-md:max-w-full">
                                            Choose Payment Option
                                        </div>
                                        <div className="flex flex-wrap gap-2 items-center self-center mt-4 font-medium max-md:max-w-full">
                                            {paymentOptions.map((option) => (
                                                <div
                                                    key={option.key}
                                                    onClick={() => {
                                                        setPaymentOption(option.key); // Update selected payment option on click
                                                        updateSelectedStoreField("payment_option", option.key); // Update the selected store's payment option field
                                                    }}
                                                    className={`flex flex-col justify-center self-stretch my-auto text-xs rounded-2xl bg-opacity-40 h-[80px] min-h-[80px] w-[80px] 
                                    ${selectedStore.payment_option === option.key
                                                            ? "bg-[#A5CBAD] text-white"
                                                            : "bg-gray-400 text-black hover:bg-[#A5CBAD] hover:text-white"
                                                        }`}
                                                >
                                                    <img
                                                        loading="lazy"
                                                        src={option.img}
                                                        alt={option.name}
                                                        className="object-contain self-center aspect-square w-[34px]"
                                                    />
                                                    <div className="mt-2.5">{option.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="my-4">
                                        <label className="block text-sm font-medium mb-1">Value</label>
                                        <input
                                            type="text"
                                            value={selectedStore.value}
                                            onChange={(e) => updateSelectedStoreField("value", e.target.value)}
                                            required
                                            className="w-full px-3 py-2 bg-[#444444] text-white rounded-[16px]"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Public</label>
                                        <select
                                            value={selectedStore.is_public ? "true" : "false"}
                                            onChange={(e) =>
                                                updateSelectedStoreField("is_public", e.target.value === "true")
                                            }
                                            className="w-full px-3 py-2 bg-[#444444] text-white rounded-[16px]"
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-[18px] mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-[#A5CBAD] hover:bg-[#88b190] text-black px-4 py-2 rounded-[18px]"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}





                    {isModalOpenadd && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-neutral-900 rounded-[18px] p-6 shadow-lg mx-4">
                                <h2 className="text-xl font-bold mb-4">Add Payment</h2>
                                <form onSubmit={handleAddPayment}>
                                    <div className="flex flex-col leading-tight text-center text-white max-w-[596px]">
                                        <div className="text-xl font-semibold max-md:max-w-full">
                                            Choose Payment Option
                                        </div>
                                        <div className="flex flex-wrap gap-2 items-center self-center mt-4 font-medium max-md:max-w-full">
                                            {paymentOptions.map((option) => (
                                                <div
                                                    key={option.key}
                                                    onClick={() => setPaymentOption(option.key)}
                                                    className={`flex flex-col justify-center self-stretch my-auto text-xs rounded-2xl bg-opacity-40 h-[80px] min-h-[80px] w-[80px] ${paymentOption === option.key
                                                        ? "bg-[#A5CBAD] text-white"
                                                        : "bg-gray-400 text-black hover:bg-[#A5CBAD] hover:text-white"
                                                        }`}
                                                >
                                                    <img
                                                        loading="lazy"
                                                        src={option.img}
                                                        alt={option.name}
                                                        className="object-contain self-center aspect-square w-[34px]"
                                                    />
                                                    <div className="mt-2.5">{option.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="my-4">
                                        <label className="block text-sm font-medium mb-1">Value</label>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="01********* || name@instapay "
                                            required
                                            className="w-full px-3 py-2 bg-[#444444] text-white rounded-[16px]"
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={closeModal2}
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
