"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import getAuthHeaders from "../../Shared/getAuth";
import Link from "next/link";
import Image from "next/image";

type CheckoutDetails = {
  id: number;
  item_id: string;
  ref_id: string;
  paid_at: string | null;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  extra: string;
  redirect_frame_url: string;
  application: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    logo: string | null;
  };
  customer: {
    id: number;
    name: string;
    email: string;
    mobile: string;
  };
};

interface Params {
  id: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CheckoutDetails({ params }: { params: Params }) {


  async function fetchCheckoutDetails() {
    const response = await axios.get(`${apiUrl}/checkouts/${params.id}`, {
      headers: getAuthHeaders(),
    });
    return response.data.result || {};
  };


  const { id } = params;

  const {
    data: checkout,
    error,
  } = useQuery<CheckoutDetails, Error>({
    queryKey: ["checkoutDetails", id],
    queryFn: () => fetchCheckoutDetails(),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  

  if (error || !checkout) {
    toast.error("Error fetching checkout details!");
    return <div>Error loading checkout details.</div>;
  }


  return (
    <div className="container mx-auto p-1 text-white">
   
    <div className="bg-neutral-900 rounded-xl p-8 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-left">Checkout Details</h1>
      
      <div className="flex flex-wrap justify-between border-b-4 border-stone-400 pb-6 mb-6 gap-8">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="space-y-2">
            <div>
              <strong>Name:</strong> {checkout.customer.name}
            </div>
            <div>
              <strong>Email:</strong> {checkout.customer.email}
            </div>
            <div>
              <strong>Mobile:</strong> {checkout.customer.mobile}
            </div>
          </div>
        </div>
  
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-xl font-semibold mb-4">Application Information</h2>
          <div className="space-y-2">
            <div>
              <strong>Name:</strong> {checkout.application.name}
            </div>
            <div>
              <strong>Email:</strong> {checkout.application.email}
            </div>
            <div>
              <strong>Mobile:</strong> {checkout.application.mobile}
            </div>
            <div>
              <strong>Logo:</strong>{" "}
              {checkout.application.logo ? (
                <Image
                width={30}
                height={30}
                  src={`${apiUrl}/uploads/${checkout.application.logo}`}
                  alt="Application Logo"
                  className="w-16 h-16 rounded-full shadow-md"
                />
              ) : (
                "No Logo"
              )}
            </div>
          </div>
        </div>
      </div>
  
      <div className="space-y-4 text-sm md:text-base">
        <div>
          <strong>ID:</strong> {checkout.id}
        </div>
        <div>
          <strong>Reference ID:</strong> {checkout.ref_id}
        </div>
        <div>
          <strong>Item ID:</strong> {checkout.item_id}
        </div>
        <div>
          <strong>Amount:</strong> {checkout.amount}
        </div>
        <div>
          <strong>Status:</strong> {checkout.status}
        </div>
        <div>
          <strong>Paid At:</strong> {checkout.paid_at || "N/A"}
        </div>
        <div>
          <strong>Created At:</strong> {checkout.created_at}
        </div>
        <div>
          <strong>Updated At:</strong> {checkout.updated_at}
        </div>
        <div>
          <strong>Extra Data:</strong> {checkout.extra}
        </div>
        <div>
          <strong>Redirect URL:</strong>{" "}
          <Link
            href={checkout.redirect_frame_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Open Link
          </Link>
        </div>
      </div>
    </div>
  </div>
  

  );
};


