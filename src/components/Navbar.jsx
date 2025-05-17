import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Search,
  Home,
  Filter,
  Info,
  BarChart2,
  Mail
} from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["BROWSE", "HOME", "REFINED SEARCH", "ABOUT", "STATISTICS", "CONTACT"];

  const iconMap = {
    BROWSE: <Search size={16} className="mr-2" />,
    HOME: <Home size={16} className="mr-2" />,
    "REFINED SEARCH": <Filter size={16} className="mr-2" />,
    ABOUT: <Info size={16} className="mr-2" />,
    STATISTICS: <BarChart2 size={16} className="mr-2" />,
    CONTACT: <Mail size={16} className="mr-2" />,
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex h-12 border-b border-gray-300">
        {navItems.map((item, index) => {
          const path = `/${item.toLowerCase().replace(/ /g, "-")}`;
          return (
            <Link 
              href={path} 
              key={index} 
              className="w-full h-full"
            >
              <div
                className={`w-full h-full px-2 lg:px-4 xl:px-6 text-xs lg:text-sm flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                  index === 0 
                    ? "bg-[#097C7C] text-white hover:bg-[#065e5e]" 
                    : "bg-[#F9F9ED] text-black hover:bg-[#097C7C] hover:text-white"
                }`}
              >
                {iconMap[item]} {item}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden border-b border-gray-300">
        <div className="flex justify-between items-center h-12">
          <Link href="/" className="h-full w-24">
            <div className="px-4 bg-[#097C7C] text-white h-full flex items-center justify-center transition-colors duration-200 hover:bg-[#065e5e]">
              <Home size={16} className="mr-2" /> HOME
            </div>
          </Link>
          <button 
            className="px-4 h-full flex items-center transition-colors duration-200 hover:bg-gray-100" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="bg-white shadow-md absolute w-full z-10">
            {navItems.slice(1).map((item, index) => {
              const path = `/${item.toLowerCase().replace(/ /g, "-")}`;
              return (
                <Link 
                  href={path} 
                  key={index} 
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div 
                    className="w-full px-4 py-3 border-b border-gray-100 transition-colors duration-200 hover:bg-rose-100 text-black text-sm flex items-center"
                  >
                    {iconMap[item]} {item}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
