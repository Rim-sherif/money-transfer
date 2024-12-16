
import Dashboard from "./dashboard";
import React, { useState } from "react";
import Transactions from "./transaction/transiaction";
import Stores from "./stores/stores";
import Price from "./price/index";
import settings from "./settings";


interface DropdownItem {
  text: string;
  value: string;
}


const views: Record<number, React.ComponentType> = {
  0: Dashboard,
  1: Transactions,
  4:Stores,
  5:Price,
  7:settings
  
};


const App = () => {

  const [selected, setSelected] = useState(0);
  const [isEnlarge, setIsEnlarge] = useState(true);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const nav = [
    {
      icon: (
        <i className="fas fa-tachometer-alt"></i>
      ),
      selectedIcon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      ),
      text: "Dashboard",
    },
    {
      icon: (
        <i className="fas fa-exchange-alt"></i>
      ),
      selectedIcon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      ),
      text: "Transactions",
    },
    {
      icon: (
        <i className="fas fa-hand-holding-usd"></i>
      ),
      text: "Manual Transactions",
      dropdown: [
        { text: "Manual Check", value: "manualCheck" },
        { text: "Test Store", value: "testStore" },
      ],
    },
    {
      icon: (
        <i className="fas fa-store"></i>
      ),
      selectedIcon: (
        <i className="fas fa-store"></i>
      ),
      text: "Stores",
    },
    {
      icon: (
        <i className="fas fa-plus-circle"></i>
      ),
      text: "Add New Store",
    },
    {
      icon: (
        <i className="fas fa-tag"></i>
      ),
      text: "Price",
    },
    {
      icon: (
        <i className="fas fa-comments"></i>
      ),
      text: "Our WhatsApp",
    },
    {
      icon: (
        <i className="fas fa-cogs"></i>
      ),
      text: "Settings",
    },
    {
      icon: (
      <i className="fas fa-sign-out-alt"></i>
      ),
      text: "Logout",
    },
    
  ];

  const SelectedComponent = views[selected] || (() => <div>Page Not Found</div>);


  const handleDropdownClick = (value: string) => {
    console.log("Selected value:", value);
   
    if (value === "manualCheck") {
    
      alert("Manual Check selected");
    } else if (value === "testStore") {
     
      alert("Test Store selected");
    }
  };
  
  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const enlarge = {
    decrease: (
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    enlarge: (
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  };

  return (
  <div className="min-h-screen bg-gray-900">
  {/* Top Header */}
  <div className="fixed top-0 left-0 right-0 bg-gray-900 shadow">
    <div className="flex justify-between items-center px-6 py-4">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-4">
        <img src="/mobile-money.png" alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-white">Money Transfer</span>
        <button
          className="h-8 w-6 p-1 bg-yellow-500 text-gray-900 rounded-lg hover:border-gray-300"
          onClick={() => setIsEnlarge(!isEnlarge)}
        >
          {isEnlarge ? enlarge.decrease : enlarge.enlarge}
        </button>
      </div>

  
      <div className="flex items-center space-x-4">
        <div className="text-gray-100  rounded-lg p-2 bg-green-500 ">
          <i className="fas fa-wifi"></i>
        </div>
        <button className="text-gray-600 p-2 rounded-full hover:bg-gray-100">
          <i className="fas fa-moon"></i>
        </button>
        <img
          src="/150-17.jpg"
          alt="User"
          className="h-10 w-10 rounded-lg mx-12"
        />
      </div>
    </div>
  </div>

 
  <header
  className={`fixed top-16 left-0 flex flex-col justify-between bg-gray-900 shadow p-6 transition-all ${
    isEnlarge ? "w-64" : "w-16"
  } `}
  style={{ height: "calc(100vh - 4rem)" }}
>
  <nav className="flex flex-col space-y-4">
    {nav.map((link, index) => (
      <div key={index} className="relative">
        <button
          className={`flex items-center text-white py-2 cursor-pointer hover:bg-gray-500 ${
            selected === index ? "bg-gray-400 text-indigo-500" : ""
          } ${isEnlarge ? "pl-2 pr-2 rounded-lg w-full" : "p-2 rounded-full "}`}
          onClick={() => {
            setSelected(index);
            handleDropdownToggle(index);
          }}
        >
          <span className={`w-6 h-6 ${isEnlarge ? "mr-5" : ""}`}>
            {selected === index ? link.selectedIcon : link.icon}
          </span>
          {isEnlarge && <span>{link.text}</span>}
        </button>
        {link.dropdown && openDropdownIndex === index && (
          <div className="top-full ml-8 mt-2 w-48 ">
            {link.dropdown.map((item, dropdownIndex) => (
              <button
                key={dropdownIndex}
                className="block w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-500 rounded-lg"
                onClick={() => handleDropdownClick(item.value)}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>
    ))}
  </nav>
</header>


  {/* Main Content */}
  <main
     className="  pt-6 p-10"
    style={{ marginLeft: isEnlarge ? "15rem" : "4rem", marginTop: "4rem", transition: "margin-left 0.3s" }}
  >
    <h1 className="text-sm font-bold text-gray-300 mb-2">
      Home / {nav[selected].text}
    </h1>
    <SelectedComponent />
  </main>
  
</div>


  );
};

export default App;

