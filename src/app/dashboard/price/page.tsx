"use client"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar"
export default function Price() {
  return (
    
    <section className="py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h4 className="text-2xl font-extrabold text-white sm:text-3xl">
        Pricing Plans
      </h4>
      <p className="mt-4 text-xl text-gray-400">
        Simple, transparent pricing for your business needs.
      </p>
    </div>

  

    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {/* Plan A */}
  <div className="bg-neutral-900 rounded-[53px] shadow-2xl p-6 transform hover:scale-105 transition duration-300">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-semibold text-white">PLAN A</h3>
      <p className="mt-4 text-gray-400">Best for Small Teams or Individuals.</p>
    </div>
    <div className="text-center mb-8">
      <span className="text-5xl font-extrabold text-white">$0</span>
      <span className="text-xl font-medium text-gray-400">/month</span>
    </div>
    <ul className="space-y-4 text-gray-400 mb-8">
      <li className="flex items-center">
        <svg className="h-6 w-6 text-[#A5CBAD] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
      <li className="flex items-center">
        <svg className="h-6 w-6 text-[#A5CBAD] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
      <li className="flex items-center">
        <svg className="h-6 w-6 text-[#A5CBAD] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
    </ul>
    <div className="text-center">
      <button className="w-full py-3 px-6 text-center rounded-[53px] text-white font-medium bg-[#A5CBAD] hover:bg-green-600">
        Get Started
      </button>
    </div>
  </div>

  {/* Plan B */}
  <div className="bg-neutral-900 rounded-[53px] shadow-2xl p-6 transform hover:scale-105 transition duration-300">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-semibold text-white">PLAN B</h3>
      <p className="mt-4 text-gray-400">Ideal for Growing Companies.</p>
    </div>
    <div className="text-center mb-8">
      <span className="text-5xl font-extrabold text-white">$19</span>
      <span className="text-xl font-medium text-gray-400">/month</span>
    </div>
    <ul className="space-y-4 text-gray-400 mb-8">
      <li className="flex items-center">
        <svg className="h-6 w-6 text-[#A5CBAD] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
      <li className="flex items-center">
        <svg className="h-6 w-6 text-[#A5CBAD] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
      <li className="flex items-center">
        <svg className="h-6 w-6 text-[#A5CBAD] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
    </ul>
    <div className="text-center">
      <button className="w-full py-3 px-6 text-center rounded-[53px] text-white font-medium bg-[#A5CBAD] hover:bg-green-600">
        Get Started
      </button>
    </div>
  </div>

  {/* Plan C */}
  <div className="bg-[#A5CBAD] rounded-[53px] shadow-lg p-6 transform hover:scale-105 transition duration-300">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-semibold ">PLAN C</h3>
      <p className="mt-4 ">Ultimate for Enterprise Solutions.</p>
    </div>
    <div className="text-center mb-8">
      <span className="text-5xl font-extrabold ">$49</span>
      <span className="text-xl font-medium ">/month</span>
    </div>
    <ul className="space-y-4  mb-8">
      <li className="flex items-center">
        <svg className="h-6 w-6  mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
      <li className="flex items-center">
        <svg className="h-6 w-6  mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
      <li className="flex items-center">
        <svg className="h-6 w-6  mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Write feature details here</span>
      </li>
    </ul>
    <div className="text-center">
      <button className="w-full py-3 px-6 text-center rounded-[53px] text-[#A5CBAD] font-medium bg-white hover:bg-gray-100">
        Get Started
      </button>
    </div>
  </div>
</div>

  </div>
</section>

  );
}