// components/Sidebar.jsx
import { useState } from "react";
import Image from "next/image";
import { Plus, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarItems = ["PTMs Predictor", "Tools", "Databases"];
  
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-2 left-2 z-30">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-rose-700 text-white p-2 rounded shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Content */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-20
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-200 ease-in-out
          w-64 bg-[#F9F9ED] p-2 overflow-y-auto h-full
        `}
      >
        <div className="bg-blue-100 p-2 mb-2 text-sm">PRODUCTS OF CUCKOO</div>

        {sidebarItems.map((item, index) => (
          <div key={index} className="bg-[#097C7C] text-white p-2 mb-2 flex items-center text-sm cursor-pointer hover:bg-[#097C7C]">
            <Plus className="w-4 h-4 mr-2" />
            {item}
          </div>
        ))}

        <div className="mt-8 lg:mt-40 text-center">
          <div className="bg-black inline-block px-1">
            <span className="text-white text-xs sm:text-sm">0 0 1 0 1 3 7</span>
          </div>
          <div className="text-xs mt-2">Last update: Jun 1, 2019</div>

        
        </div>
      </div>
    </>
  );
}