
import Dashboard from "./dashboard";
import { Menu } from '@headlessui/react'
import React, { useState } from "react";
import Transactions from "./transaction/transiaction";
import Stores from "./stores/stores";
import Price from "./price/index";
import settings from "./settings";
import StoreSettings from './stores/addStore'
import Manualcheck from "./manualTransaction/manualcheck";
import TestStore from "./manualTransaction/testStore";


interface DropdownItem {
  text: string;
  value: string;
}


const views: Record<number, React.ComponentType> = {
  0: Dashboard,
  1: Transactions,
  2: Manualcheck,
  3: TestStore,
  4: Stores,
  5: StoreSettings,
  6: Price,
  8: settings

};


const App = () => {

  const [selected, setSelected] = useState(0);
  const [isEnlarge, setIsEnlarge] = useState(true);
  const [isOn, setIsOn] = useState(false);
  // const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

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
      selectedIcon: (
        <i className="fas fa-hand-holding-usd"></i>
      ),
      text: "Manual Check",
    },
    {
      icon: (
        <i className="fas fa-solid fa-dumpster-fire"></i>
      ),
      selectedIcon: (
        <i className="fas fa-solid fa-dumpster-fire"></i>
      ),
      text: "Store Check",
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
      selectedIcon: (
        <i className="fas fa-plus-circle"></i>
      ),
      text: "Add New Store",
    },
    {
      icon: (
        <i className="fas fa-tag"></i>
      ),
      selectedIcon: (
        <i className="fas fa-tag"></i>
      ),
      text: "Price",
    },
    {
      icon: (
        <i className="fas fa-comments"></i>
      ),
      selectedIcon: (
        <i className="fas fa-comments"></i>
      ),
      text: "Our WhatsApp",
    },
    {
      icon: (
        <i className="fas fa-cogs"></i>
      ),
      selectedIcon: (
        <i className="fas fa-cogs"></i>
      ),
      text: "Settings",
    },
    {
      icon: (
        <i className="fas fa-sign-out-alt"></i>
      ),
      selectedIcon: (
        <i className="fas fa-sign-out-alt"></i>
      ),
      text: "Logout",
    },

  ];

  const SelectedComponent = views[selected] || (() => <div>Page Not Found</div>);

  


  // const handleDropdownClick = (value: string) => {
  //   console.log("Selected dropdown item:", value); 
  //   setOpenDropdownIndex(null); 
  // };

  // const handleDropdownToggle = (index: number) => {
  //   setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  // };

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

  const toggleStatus = () => setIsOn((prevState) => !prevState);

  return (
    <div className="min-h-screen bg-gray-900">

      <div className="fixed top-0 left-0 right-0 bg-gray-900 shadow">
        <div className="flex justify-between items-center px-6 py-4">

          <div className="flex items-center space-x-4">
            <img src="/mobile-money.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">Money Transfer</span>
            <button
              className="h-8 w-6 p-1 bg-yellow-500 text-gray-900 rounded-lg hover:border-gray-300 sm:block hidden"
              onClick={() => setIsEnlarge(!isEnlarge)}
            >
              {isEnlarge ? enlarge.decrease : enlarge.enlarge}
            </button>
          </div>


          <div className="flex items-center space-x-4">
            <div
              className={`text-gray-100 rounded-lg p-2 transition-colors duration-300 ${isOn ? 'bg-green-500' : 'bg-red-500'
                }`}
            >

              <button onClick={toggleStatus} className=" text-white ">
                <i className="fas fa-wifi" />
              </button>
            </div>
            <button className="text-gray-600 p-2 rounded-full hover:bg-gray-100">
              <i className="fas fa-moon"></i>
            </button>
            <Menu as="div" >
              <div>
                <Menu.Button className="h-10 w-10   ">
                  <img
                    src="/150-17.jpg"
                    alt="User"
                    className="rounded-lg"
                  />
                </Menu.Button>
              </div>
              <Menu.Items
                className="absolute right-0 z-10 mt-2 w-36 mr-4 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100 text-gray-900' : ''}`}
                      >
                        Account settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100 text-gray-900' : ''}`}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100 text-gray-900' : ''}`}
                      >
                        License
                      </a>
                    )}
                  </Menu.Item>
                  <form action="#" method="POST">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${active ? 'bg-gray-100 text-gray-900' : ''}`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Menu>

          </div>
        </div>
      </div>


      <header
        className={`fixed top-16 left-0 flex flex-col justify-between  bg-gray-900 shadow p-6 transition-all ${isEnlarge ? "w-64" : "w-16"
          } `}
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <nav className=" flex-col space-y-4 ">
      {nav.map((link, index) => (
        <div key={index} className="relative">
          <button
            className={`flex items-center text-white py-2 cursor-pointer hover:bg-gray-500 ${selected === index ? "bg-gray-400 text-indigo-500" : ""} ${isEnlarge ? "pl-2 pr-2 rounded-lg w-full" : "p-2 rounded-full"}`}
            onClick={() => {
              setSelected(index);
             
            }}
          >
            <span className={`w-6 h-6 ${isEnlarge ? "mr-5" : ""}`}>
              {selected === index ? link.selectedIcon : link.icon}
            </span>
            {isEnlarge && <span>{link.text}</span>}
          </button>
         
        </div>
      ))}
      {isEnlarge ? (
        <button className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 ">

        <i className="fas fa-solid fa-download mr-6 "></i>
          Download App
        </button>
        ):(
          ""
        )
 
        }
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

